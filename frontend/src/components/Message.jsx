import styles from './css/Message.module.css';

const Message = ({ content, time, senderId, isOwn }) => {
  const formatDate = () => {
    const date = new Date(time);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className={`${styles.message_cont} ${isOwn && styles.own_message}`}>
      <div className={styles.icon}></div>
      <p className={`${styles.message_text} ${isOwn && styles.own_message}`}>
        {content}
      </p>
      <span className={styles.time_text}>{formatDate()}</span>
    </div>
  );
};

export default Message;
