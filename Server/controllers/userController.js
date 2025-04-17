const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bycrypt = require("bcryptjs");
const {generateToken} = require('../utils/jwtUtil');
const {getUserNotifications, createNotification} = require('../utils/notificationServices');


// Fetch all users
const getUsers = async (req, res) => {
  const users = await prisma.user.findMany(
    //where user is not admin
    {
      where: {
        role: {
          not: "admin",
        },
      },
    }
  );
  res.json(users);
};

// Fetch a single user
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
};

// Create a new user
const registerUser = async (req, res) => {
  const { fullName, email, password, phone } = req.body;

  if (!fullName || !email || !password || !phone) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      phone,
    },
  });

  const userN = await prisma.user.findFirst({
    where: {
      role: "admin",
    },
    select: { id: true },
  });
    

 await createNotification({
   userId: parseInt(userN),
   type: "user_registered",
   message: `New user with email ${email} has been registered`,
 });

  res.json(user);
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try{
     const user = await prisma.user.findUnique({
       where: {
         email,
       },
     });

     if (!user) {
       return res.status(400).json({ error: "Invalid Email" });
     }

     const isMatch = await bycrypt.compare(password, user.password);

     if (!isMatch) {
       return res.status(400).json({ error: "Invalid password" });
     }

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

     const token = generateToken({ id: user.id, email: user.email });

     res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

// //google login
// googleLogin = async (req, res) => {
//   const { token } = req.body;
//   const { data, error } = await supabase.auth.getUser(token);
//   if (error) return res.status(400).json({ error: error.message });

//   // Generate a JWT Token for session handling
//   const jwtToken = jwt.sign({ userId: data.user.id }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });

//   res.json({ token: jwtToken, user: data.user });
// };


//get user profile
const getUserProfile = async (req, res) => {
  try{
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
        
      },
    });
    if(!user){
      return res.status(404).json({error: "User not found"});
    }

    res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

//set user status
const userStatus = async (req, res) => {
 const { accountStatus } = req.body;
  try{
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

   //update accountStatus
    await prisma.user.update({
      where: { id: user.id },
      data: { accountStatus },
    });

      res.json({ message: "User status updated", user });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }

  const user = await prisma.user.findFirst({
    where: {
      role: "user"
    },
    select: { id: true},
  })
  await createNotification({
    userId: parseInt(user),
    type: "system",
    message: "Your Account status has been updated"
    
  })
};

//get user Notifications
const getNotifications = async (req, res) => {
  try{
    const notifications = await getUserNotifications(parseInt(req.params.id));
    res.json(notifications);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};



module.exports = {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  //googleLogin,
  getUserProfile,
  userStatus,
  getNotifications,
};
