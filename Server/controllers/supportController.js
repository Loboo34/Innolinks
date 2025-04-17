const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

// Fetch all support tickets
const getSupportTickets = async (req, res) => {
  const supportTickets = await prisma.supportTicket.findMany();
  res.json(supportTickets);
};

// Fetch a single support ticket
const getSupportTicket = async (req, res) => {
  const { id } = req.params;
  const supportTicket = await prisma.supportTicket.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(supportTicket);
};

// Create a new support ticket
const createTicket = async (req, res) => {
    try{
        const { userId, subject, description} = req.body;
        if (!userId  || !subject || !description) {
            return res.status(400).json({ error: "Please fill all fields" });
        }
        const supportTicket = await prisma.supportTicket.create({
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
                subject,
                description,
            }
        });
        res.json(supportTicket);

    } catch(err){
        console.log("server error", err)
    }
}

// Update a support ticket
const updateTicket = async (req, res) => {
    try{
        const { id } = req.params;
        const { userId, subject, description} = req.body;
        const supportTicket = await prisma.supportTicket.update({
            where: {
                id: parseInt(id),
            },
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
                subject,
                description,
            }
        });
        res.json(supportTicket);
    } catch(err){
        console.log("server error", err)
    }
}

// Delete a support ticket
const deleteTicket = async (req, res) => {
    try{
        const { id } = req.params;
        const supportTicket = await prisma.supportTicket.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.json(supportTicket);
    } catch(err){
        console.log("server error", err)
    }
}

//support response
const responseTicket = async (req, res) => {
    try{
        const {ticketId, userId, message} = req.body;
        if (!ticketId || !userId || !message) {
            return res.status(400).json({ error: "Please fill all fields" });
        }

        const supportResponse = await prisma.supportResponse.create({
            data: {
                ticket: {
                    connect: {
                        id: ticketId,
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
                message,
            }
        });
        res.json(supportResponse);

    } catch(err){
        console.log("server error", err)
    }}

module.exports = { getSupportTickets, getSupportTicket, createTicket, updateTicket, deleteTicket, responseTicket };