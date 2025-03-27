import styles from './css/ChatLabel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';

const ChatLabel = ({ chat }) => {
  console.log(chat);
  const participant = chat.participants[0].user.username;
  return (
    <li className={styles.chat_cont}>
      <div>
        <FontAwesomeIcon
          className={styles.icon}
          icon={chat.isGroup ? faUserGroup : faUser}
        />
      </div>
      <p>{chat.isGroup ? chat.name : participant}</p>
    </li>
  );
};

export default ChatLabel;
