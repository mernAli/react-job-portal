import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light"); // light, dark, darker

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newError = {};

    if (!email) {
      newError.email = "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newError.email = "Invalid email format";
    }

    if (!password) {
      newError.password = "Password is required";
    } else if (password.length < 8) {
      newError.password = "Password must be at least 8 characters long";
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      setLoading(true);

      setTimeout(() => {
        localStorage.setItem("auth", "true");
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
      tabActive: "bg-white text-gray-800",
      tabInactive: "bg-[#0ea5e9] text-white",
      forgotPassword: "text-[#0ea5e9]",
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
      tabActive: "bg-[#4a5568] text-white",
      tabInactive: "bg-[#0ea5e9] text-white",
      forgotPassword: "text-[#0ea5e9]",
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
      tabActive: "bg-black text-white",
      tabInactive: "bg-[#0ea5e9] text-white",
      forgotPassword: "text-[#0ea5e9]",
    },
  };

  const currentTheme = themes[theme];

  return (
    <div className={`h-screen w-full flex flex-col overflow-hidden ${currentTheme.bg} font-sans relative`}>
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
        <h1 className="text-white font-semibold text-xl md:text-2xl tracking-wider">
          ZECPATH
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center flex-1 px-4 md:px-8 gap-8 lg:gap-16 overflow-y-auto">
        {/* Left: Login Card */}
        <div
          className={`${currentTheme.cardBg} rounded-2xl p-6 md:p-8 w-full max-w-[400px] shadow-2xl mt-10 pt-3`}
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
              className={`flex-1 py-3 ml-8 rounded-lg font-semibold text-sm transition-all ${currentTheme.tabActive}`}
            >
              Sign Up
            </button>
          </div>

          {/* Welcome Title */}
          <h2
            className={`text-xl md:text-2xl font-bold ${currentTheme.cardText} mb-2`}
          >
            Welcome Back !
          </h2>

          {/* Subtitle */}
          <p className={`${currentTheme.labelText} mb-6 text-sm`}>
            Log in to your account to connect with professionals and explore
            opportunities.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-5">
              <label
                className={`block ${currentTheme.labelText} text-xs font-medium mb-2`}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="semira3002@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${currentTheme.inputBorder} ${currentTheme.inputBg} ${currentTheme.inputText} focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition-all text-sm`}
              />
              {error.email && (
                <div className="text-xs text-red-500 mt-1">{error.email}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                className={`block ${currentTheme.labelText} text-xs font-medium mb-2`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${currentTheme.inputBorder} ${currentTheme.inputBg} ${currentTheme.inputText} focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition-all text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {error.password && (
                <div className="text-xs text-red-500 mt-1">
                  {error.password}
                </div>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-6">
              <span
                className={`${currentTheme.forgotPassword} text-xs font-medium cursor-pointer hover:underline`}
              >
                Forgot Password?
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`w-full py-3 ${currentTheme.buttonBg} ${currentTheme.buttonText} font-semibold rounded-lg ${currentTheme.buttonHover} transition-colors duration-300 shadow-lg text-sm`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className={`mx-3 ${currentTheme.labelText} text-xs`}>
              Or Continue With
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
                src="/images/Login and registration.png"
                alt="Professional workspace illustration"
                className="w-[350px] h-[350px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;