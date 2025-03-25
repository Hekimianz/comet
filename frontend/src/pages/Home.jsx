import styles from './css/Home.module.css';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faG, faGear } from '@fortawesome/free-solid-svg-icons';
import astronaut from '../assets/astronaut.png';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  });
  return (
    <section className={styles.home_cont}>
      <div className={styles.open_menu_cont}>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <FontAwesomeIcon icon={faGear} className={styles.settings_icon} />
      <img src={astronaut} alt="hi" className={styles.astronaut} />
      <p className={styles.empty_title}>No chat selected!</p>
      <p className={styles.empty_subtitle}>
        Select one from the contacts menu!
      </p>
    </section>
  );
};

export default Home;
