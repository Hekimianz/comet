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
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { messages: { _count: 'desc' } },
    });
    res.json(chats);
  } catch (error) {
    console.error('error');
    res.status(500).json({ error: 'Internal server error' });
  }
};
