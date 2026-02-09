import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useToast } from "../ui/toast/useToast"

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light"); // light, dark, darker
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { showToast } = useToast()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newError = {};

    

    if (!formData.name) newError.name = "Name is required";

    if (!emailRegex.test(formData.email))
      newError.email = "Invalid email format";

    if (formData.password.length < 8)
      newError.password = "Password must be at least 8 characters";

    if (formData.password !== formData.confirmPassword)
      newError.confirmPassword = "Passwords do not match";

    if (!agreeTerms) newError.agreeTerms = "Check the agree term box";

    setError(newError);

    if (Object.keys(newError).length === 0) {
      setLoading(true);

      setTimeout(() => {
        localStorage.setItem("auth", "true");
        console.log("Submit Clicked");
        
        showToast("Account created successfully", "success")
        console.log("Toast called");
        
        navigate("/app");
        setLoading(false);
      }, 1500);
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/register");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  // Theme configurations
  const themes = {
    light: {
      bg: "bg-[#1a2758]",
      cardBg: "bg-white",
      cardText: "text-gray-800",
      inputBg: "bg-white",
      inputBorder: "border-gray-300",
      inputText: "text-gray-800",
      labelText: "text-gray-700",
      buttonBg: "bg-[#0ea5e9]",
      buttonHover: "hover:bg-[#0284c7]",
      buttonText: "text-white",
      linkText: "text-[#0ea5e9]",
      tabActive: "bg-[#0ea5e9] text-white",
      tabInactive: "bg-white text-gray-600 ",
      checkboxBorder: "border-gray-400",
      checkboxText: "text-gray-600",
    },
    dark: {
      bg: "bg-[#1a2758]",
      cardBg: "bg-[#2d3748]",
      cardText: "text-white",
      inputBg: "bg-white",
      inputBorder: "border-gray-300",
      inputText: "text-gray-800",
      labelText: "text-gray-300",
      buttonBg: "bg-[#0ea5e9]",
      buttonHover: "hover:bg-[#0284c7]",
      buttonText: "text-white",
      linkText: "text-[#0ea5e9]",
      tabActive: "bg-[#0ea5e9] text-white",
      tabInactive: "bg-transparent text-[#0ea5e9] ",
      checkboxBorder: "border-gray-400",
      checkboxText: "text-gray-300",
    },
    darker: {
      bg: "bg-[#1a2758]",
      cardBg: "bg-black",
      cardText: "text-white",
      inputBg: "bg-white",
      inputBorder: "border-gray-300",
      inputText: "text-gray-800",
      labelText: "text-gray-300",
      buttonBg: "bg-[#0ea5e9]",
      buttonHover: "hover:bg-[#0284c7]",
      buttonText: "text-white",
      linkText: "text-[#0ea5e9]",
      tabActive: "bg-[#0ea5e9] text-white",
      tabInactive: "bg-transparent text-[#0ea5e9] ",
      checkboxBorder: "border-gray-400",
      checkboxText: "text-gray-300",
    },
  };

  const currentTheme = themes[theme];

  return (
    <div
      className={`h-screen w-full flex flex-col overflow-hidden ${currentTheme.bg} font-sans relative`}
    >
      {/* Theme Selector - Positioned at top right */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setTheme("light")}
          className={`px-3 py-1 rounded text-xs font-medium transition-all ${
            theme === "light"
              ? "bg-white text-gray-800 shadow-md"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`px-3 py-1 rounded text-xs font-medium transition-all ${
            theme === "dark"
              ? "bg-gray-700 text-white shadow-md"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Dark
        </button>
        <button
          onClick={() => setTheme("darker")}
          className={`px-3 py-1 rounded text-xs font-medium transition-all ${
            theme === "darker"
              ? "bg-black text-white shadow-md"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Darker
        </button>
      </div>

      {/* Logo/Header */}
      <div className="text-center pt-6 md:pt-8 pb-4">
        <h1 className="text-white font-bold text-2xl md:text-3xl tracking-wider">
          ZECPATH
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center flex-1 px-4 md:px-8 gap-8 lg:gap-16 overflow-y-auto">
        {/* Left: Register Card */}
        <div
          className={`${currentTheme.cardBg} rounded-2xl p-6 md:p-8 w-full max-w-[400px] shadow-2xl mt-51 pt-3`}
        >
          {/* Tabs */}
          <div className="flex mb-6 gap-2">
            <button
              onClick={handleLoginRedirect}
              className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${currentTheme.tabInactive}`}
            >
              Login
            </button>
            <button
              onClick={handleSignUpRedirect}
              className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${currentTheme.tabActive}`}
            >
              Sign Up
            </button>
          </div>

          {/* Welcome Title */}
          <h2
            className={`text-xl md:text-2xl font-bold ${currentTheme.cardText} mb-2`}
          >
            Create an account
          </h2>

          {/* Subtitle */}
          <p className={`${currentTheme.labelText} mb-6 text-sm`}>
            Build your profile, connect with peers, and discover jobs.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="Semira"
                value={formData.name}
                onChange={handleChange}
                error={error.name}
              />

              {error.name && (
                <p className="text-xs text-red-500 mt-1">{error.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="semira3002@gmail.com"
                value={formData.email}
                onChange={handleChange}
                error={error.email}
              />
              {error.email && (
                <div className="text-xs text-red-500 mt-1">{error.email}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={error.password}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 text-xs"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                }
              />

              {error.password && (
                <div className="text-xs text-red-500 mt-1">
                  {error.password}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={error.confirmPassword}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-500 text-xs"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                }
              />

              {/* {error.confirmPassword && (
                <div className="text-xs text-red-500 mt-1">
                  {error.confirmPassword}
                </div>
              )} */}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start mb-6">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className={`mt-1 h-4 w-4 rounded border ${currentTheme.checkboxBorder} focus:ring-2 focus:ring-[#0ea5e9]`}
              />
              <label
                htmlFor="terms"
                className={`ml-2 text-xs ${currentTheme.checkboxText}`}
              >
                I agree to the Terms & Conditions and Privacy Policy
              </label>

              {error.agreeTerms && (
                <div className="text-xs text-red-500 mt-1">
                  {error.agreeTerms}
                </div>
              )}
            </div>

            {/* Sign Up Button from ui folder created as per the part of the Day: 15 task */}
            <Button type="submit" loading={loading} fullWidth>
              Sign Up
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className={`mx-3 ${currentTheme.labelText} text-xs`}>
              Or Sign Up With
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          {/* Social Login Button */}
          <div className="flex justify-center">
            <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
          </div>
        </div>

        {/* Right: Illustration (Desktop only) */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Main illustration container */}
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-2xl p-8 border border-blue-700/30">
              <img
                src="/images/Register.png.png"
                alt="Registration illustration"
                className="w-[350px] h-[350px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
