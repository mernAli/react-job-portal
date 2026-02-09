import { useEffect } from "react";
import { useToast } from "../ui/toast/useToast";

const Network = () => {
  const { showToast } = useToast();

  const toastNotification = () => {
    showToast("Netwrok Page is not created at the moment", "error");
  };

  useEffect(() => {
    toastNotification()
  },[])

  return (
    <div>
      <h2 style={{ color: "white" }}>Network – Work in Progress 🚧</h2>
    </div>
  );
};

export default Network;
