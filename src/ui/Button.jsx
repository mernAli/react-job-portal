const Button = ({
  children,
  variant = "primary",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  fullWidth = false,
}) => {
  const baseStyle =
    "px-4 py-3 rounded-lg font-semibold transition text-sm";

  const variants = {
    primary: "bg-[#0ea5e9] text-white hover:bg-[#0284c7]",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
