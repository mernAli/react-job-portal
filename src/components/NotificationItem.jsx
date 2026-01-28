import './Notification.css'

const NotificationItem = ({ title, message }) => {
  return (
    <div className="notification-card">
      <div className="avatar"></div>

      <div className="content">
        <p className="title">{title}</p>
        <p className="message">{message}</p>
      </div>

      <div className="time">4d ago</div>
    </div>
  );
};

export default NotificationItem;
