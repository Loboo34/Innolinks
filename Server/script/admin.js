const { PrismaClient, AccountStatus } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const createAdmin = async () => {
  try {
    const admin = await prisma.user.findFirst({
      where: {
        role: "admin",
      },
    });
    if (admin) {
      return;
    }
   const hashedPassword = await bcrypt.hash("@admin123", 10);
    await prisma.user.create({
      data: {
        fullName: "Admin",
        email: "rayovers40@gmail.com",
        password: hashedPassword,
        role: "admin",
        accountStatus: "active",
      },
    });
  } catch (err) {
    console.log("server error", err);
  }
};



module.exports = createAdmin;
