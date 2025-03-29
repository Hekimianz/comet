import styles from './css/ChatLabel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faUserGroup,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

const ChatLabel = ({ chat, active, handleClick, index }) => {
  const participant = chat.participants[0].user.username;
  return (
    <li
      onClick={() => handleClick(index)}
      className={`${styles.chat_cont} ${active && styles.active_chat}`}
    >
      <div>
        <FontAwesomeIcon
          className={styles.icon}
          icon={chat.isGroup ? faUserGroup : faUser}
        />
      </div>
      <p>{chat.isGroup ? chat.name : participant}</p>
      <FontAwesomeIcon className={styles.trash} icon={faTrashCan} />
    </li>
  );
};

export default ChatLabel;
