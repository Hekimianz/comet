import styles from './css/Settings.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { updateDisplayName } from '../api/chats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
  const { user, logout, loading } = useAuth();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  if (loading) {
    return <span className={styles.loader}></span>;
  }

  return (
    <section className={styles.settings_cont}>
      <h1 className={styles.welcome_text}>Hello {user?.username}!</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await updateDisplayName(username, user.id);
          setUsername('');
          window.location.reload();
        }}
        className={styles.field}
        id="updateForm"
      >
        <label htmlFor="name">Change display name:</label>
        <input
          type="text"
          placeholder={user?.username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="name"
        />
      </form>
      {user?.username && username && username !== user?.username && (
        <button form="updateForm" className={styles.update_btn}>
          Update
        </button>
      )}
      <button
        onClick={async () => {
          await logout();
          navigate('/sign-in');
        }}
        className={styles.logout_button}
      >
        Log out
      </button>
      <FontAwesomeIcon
        onClick={() => navigate('/')}
        className={styles.exit}
        icon={faArrowLeft}
      />
    </section>
  );
};

export default Settings;
