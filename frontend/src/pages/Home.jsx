import styles from './css/Home.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowLeft,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import astronaut from '../assets/astronaut.png';
import { getChats } from '../api/chats';
import ChatLabel from '../components/chatLabel';

const Home = () => {
  const { user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chats, setChats] = useState([]);
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

  if (loading) {
    return <span className={styles.loader}></span>;
  }

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
        {chats.map((chat) => (
          <ChatLabel key={chat.id} chat={chat} />
        ))}
      </ul>
      <FontAwesomeIcon
        onClick={() => {
          navigate('/settings');
        }}
        icon={faGear}
        className={styles.settings_icon}
      />
      <div className={styles.chat_cont}>
        <img src={astronaut} alt="hi" className={styles.astronaut} />
        <p className={styles.empty_title}>No chat selected!</p>
        <p className={styles.empty_subtitle}>Select one from the chats menu!</p>
      </div>
    </section>
  );
};

export default Home;
