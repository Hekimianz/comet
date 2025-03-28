import styles from './css/Home.module.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowLeft,
  faGear,
  faUser,
  faUserGroup,
  faPaperPlane,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import astronaut from '../assets/astronaut.png';
import { getChats, sendMessage, createChat } from '../api/chats';
import ChatLabel from '../components/chatLabel';
import Message from '../components/Message';

const Home = () => {
  const { user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeChatIndex, setActiveChatIndex] = useState(null);
  const [newMsg, setNewMsg] = useState('');
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [addingUsername, setAddingUsername] = useState('');
  const [addError, setAddError] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate('/sign-in');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchChats = async () => {
      if (!user?.id) return;
      try {
        const chatsData = await getChats(user.id);

        const chatsFormatted = chatsData.map((chat) => ({
          id: chat.id,
          name: chat.name,
          isGroup: chat.isGroup,
          participants: chat.participants.filter(
            (id) => id.user.id !== user.id
          ),
          messages: chat.messages,
        }));
        setChats(chatsFormatted);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };
    fetchChats();
  }, [user?.id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat?.messages]);

  if (loading) {
    return <span className={styles.loader}></span>;
  }

  const handleChatClick = (i) => {
    setActiveChatIndex(i);
    setSelectedChat(chats[i]);
  };

  const handleMessageSend = async () => {
    try {
      const newMessage = await sendMessage(newMsg, user.id, selectedChat.id);
      if (newMessage) {
        setSelectedChat((prevChat) => ({
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        }));
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <section className={styles.home_cont}>
      <div
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        className={`${styles.mobile_menu_btn} ${
          mobileMenuOpen && styles.mobile_menu_btn_open
        }`}
      >
        <FontAwesomeIcon icon={mobileMenuOpen ? faArrowLeft : faArrowRight} />
      </div>
      <ul
        className={`${styles.mobile_menu} ${
          mobileMenuOpen && styles.mobile_menu_open
        }`}
      >
        {chats.length > 0 ? (
          chats.map((chat, index) => (
            <ChatLabel
              active={activeChatIndex === index}
              key={chat.id}
              chat={chat}
              handleClick={handleChatClick}
              index={index}
            />
          ))
        ) : (
          <span className={styles.loader}></span>
        )}

        {!addMenuOpen && (
          <button
            onClick={() => {
              setAddMenuOpen(true);
              setMobileMenuOpen(false);
            }}
            className={styles.add_btn}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
      </ul>
      <FontAwesomeIcon
        onClick={() => {
          navigate('/settings');
        }}
        icon={faGear}
        className={styles.settings_icon}
      />
      <div className={styles.chat_cont}>
        {addMenuOpen && (
          <>
            <div className={styles.overlay}></div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const newChat = await createChat(user.id, addingUsername);
                if (newChat) {
                  console.error('Error', newChat);
                  setAddError(newChat);
                } else {
                  setAddMenuOpen(false);
                  setAddingUsername('');
                  window.location.reload();
                }
              }}
              className={styles.add_menu}
            >
              <FontAwesomeIcon
                className={styles.exit_add_menu}
                icon={faXmark}
                onClick={() => setAddMenuOpen(false)}
              />

              <span className={styles.error}>{addError}</span>
              <div className={styles.add_field}>
                <label htmlFor="name">Enter user's name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={addingUsername}
                  onChange={(e) => setAddingUsername(e.target.value)}
                />
              </div>
              {/* <FontAwesomeIcon className={styles.add_user} icon={faUserPlus} /> */}
              <button>Create chat</button>
            </form>
          </>
        )}
        {!selectedChat ? (
          <>
            <img src={astronaut} alt="hi" className={styles.astronaut} />
            <p className={styles.empty_title}>No chat selected!</p>
            <p className={styles.empty_subtitle}>
              Select one from the chats menu!
            </p>
          </>
        ) : (
          <section className={styles.active_chat}>
            <div className={styles.contact_info}>
              <FontAwesomeIcon
                className={styles.icon}
                icon={selectedChat.isGroup ? faUserGroup : faUser}
              />
              <h2>
                {selectedChat.isGroup
                  ? selectedChat.name
                  : selectedChat.participants[0].user.username}
              </h2>
            </div>
            <ul className={styles.messages_cont}>
              {selectedChat.messages.map((msg) => (
                <Message
                  key={msg.id}
                  content={msg.content}
                  senderId={msg.senderId}
                  time={msg.createdAt}
                  isOwn={msg.senderId === user.id}
                />
              ))}
              <div ref={messagesEndRef}></div>
            </ul>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleMessageSend();
                setNewMsg('');
              }}
              className={styles.send_message_cont}
            >
              <input
                type="text"
                className={styles.send_message}
                placeholder="Send message..."
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
              />
              <button disabled={!newMsg}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </section>
        )}
      </div>
    </section>
  );
};

export default Home;
