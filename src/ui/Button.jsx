
import { useTheme } from "../context/ThemeContext";

const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  loading= false,
  disabled = false, 
  fullWidth, 
  variant = "primary" 

}) => {
  const { theme } = useTheme();

  const variantClasses = {
    primary: `${theme.primary} text-white ${theme.primaryHover}`,
    secondary: `${theme.border} border ${theme.textPrimary} ${theme.hover}`,
    danger: `${theme.danger} text-white hover:bg-red-600`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
        fullWidth ? "w-full" : ""
      } ${variantClasses[variant]} ${
        loading || disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;