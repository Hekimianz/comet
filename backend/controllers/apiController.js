const prisma = require('../config/prismaClient');

exports.getChats = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const chats = await prisma.chat.findMany({
      where: {
        participants: {
          some: { userId },
        },
      },
      include: {
        participants: {
          select: {
            user: { select: { id: true, username: true } },
          },
        },
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.sendMessage = async (req, res) => {
  const { text, senderId, chatId } = req.body;

  if (!text || !senderId || !chatId) {
    return res
      .status(400)
      .json({ error: 'Text, senderId, and chatId are required' });
  }
  try {
    const newMsg = await prisma.message.create({
      data: {
        content: text,
        senderId: senderId,
        chatId: chatId,
      },
    });
    res.status(201).json(newMsg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
