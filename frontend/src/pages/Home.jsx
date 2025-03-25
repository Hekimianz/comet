import styles from './css/Home.module.css';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faGear } from '@fortawesome/free-solid-svg-icons';
import astronaut from '../assets/astronaut.png';

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate('/sign-in');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <span className={styles.loader}></span>;
  }
  return (
    <section className={styles.home_cont}>
      <div className={styles.open_menu_cont}>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <FontAwesomeIcon
        onClick={() => {
          navigate('/settings');
        }}
        icon={faGear}
        className={styles.settings_icon}
      />
      <img src={astronaut} alt="hi" className={styles.astronaut} />
      <p className={styles.empty_title}>No chat selected!</p>
      <p className={styles.empty_subtitle}>Select one from the chats menu!</p>
    </section>
  );
};

export default Home;
