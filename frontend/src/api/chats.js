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
