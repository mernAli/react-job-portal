import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import Loader from "./Loader";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data.slice(0, 8));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 15000); // auto refresh

    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="notification-wrapper">
      <h2>Notifications</h2>
      {notifications.map((item) => (
        <NotificationItem
          key={item.id}
          title={item.name}
          message={item.body}
        />
      ))}
    </div>
  );
};

export default NotificationList;
