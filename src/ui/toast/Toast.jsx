const toastStyles = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
};

const Toast = ({ message, type }) => {
  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded-lg text-white shadow-lg text-sm ${toastStyles[type]}`}
    >
      {message}
    </div>
  );
};

export default Toast;
