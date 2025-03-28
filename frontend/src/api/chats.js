const base_url = import.meta.env.VITE_API_BASE_URL;
export const getChats = async (userId) => {
  try {
    const response = await fetch(`${base_url}/api/chats?userId=${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users' chats");
    throw error;
  }
};

export const sendMessage = async (text, senderId, chatId) => {
  try {
    const response = await fetch(`${base_url}/api/chat`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, senderId, chatId }),
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error sending message');
    throw error;
  }
};

export const updateDisplayName = async (newName, userId) => {
  try {
    const response = await fetch(`${base_url}/api/user/changeName`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newName, userId }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating name');
    throw error;
  }
};

export const createChat = async (userId, recipient) => {
  try {
    const response = await fetch(`${base_url}/api/chats/new`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, recipient }),
    });
    const data = await response.json();

    if (response.status === 201) {
      // Successfully created the chat
      return data;
    }

    if (response.status === 409) {
      // Chat already exists (Conflict)
      return data.message;
    }

    if (!response.ok) {
      // For other errors
      return data.error;
    }

    return null;
  } catch (error) {
    console.error('Error creating chat', error);
    throw error;
  }
};
