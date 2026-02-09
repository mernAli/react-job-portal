import { useEffect } from "react";
import { useToast } from "../ui/toast/useToast";

const Notifications = () => {

  const {showToast} = useToast()

  useEffect(() => {
    showToast("Notification is not created properly at this moment", "info")
  })

  return <h2 style={{ color: "white" }}>Notifications – Work in Progress 🚧</h2>;
};

export default Notifications;
