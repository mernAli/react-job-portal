import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newError = {};

    if (!email) {
      newError.email = "Email is required";
    }

    if (!password) {
      newError.password = "Password is required";
    } else if (password.length < 8) {
      newError.password = "Password must be at least 8 characters long";
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      setEmail("");
      setPassword("");
      alert(" 🎉 You are successfully logged in! 🥳");
    }
  };

  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    navigate("/app");
  };

  const handleSignUpRedirect = () => {
    navigate("/register");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
        <div className="min-h-screen bg-[#f4f4f2] font-sans">
      {/* Top Navigation Bar - Outside the card */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-black font-bold text-lg">Logo</div>
        <div className="flex gap-6">
          <span 
            className="font-semibold text-[#9aa0a6] cursor-pointer"
            onClick={handleLoginRedirect}
          >
            Login
          
          </span>
          <span 
            className="text-[#0077b6] cursor-pointer hover:text-[#0077b6] transition-colors"
            onClick={handleSignUpRedirect}
          >
            Sign Up
          </span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-80px)] px-4 md:px-0">
        {/* Left: Login Card */}
        <div className="bg-white rounded-2xl p-8 md:p-10 w-full max-w-md md:max-w-lg shadow-lg">
          {/* Mobile time indicator (only on mobile) */}
         

          {/* Welcome Title */}
          <h1 className="text-2xl md:text-[28px] font-bold text-gray-800 mb-2">
            If You Are <span className="text-[#0077b6] ">NEW</span> 
          </h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 mb-8 text-sm md:text-base">
            Create an account to connect with professionals and explore opportunities.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="semira3002@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:border-transparent transition-all"
              />
              {error.email && (
                <div className="text-xs text-red-600 mt-1">{error.email}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0077b6] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "︶" : "👁"}
                </button>
              </div>
              {error.password && (
                <div className="text-xs text-red-600 mt-1">{error.password}</div>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-8">
              <span className="text-[#0077b6] text-sm font-medium cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full p-4 bg-[#0077b6] text-white font-semibold rounded-lg hover:bg-[#005a8c] transition-colors duration-300 shadow-md"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">Or Continue With</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center gap-4 md:gap-6">
            {/* Google Button */}
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex-1 max-w-[120px]">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>

            {/* Facebook Button */}
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors duration-200 flex-1 max-w-[120px]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium">Facebook</span>
            </button>

            {/* Apple Button */}
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 flex-1 max-w-[120px]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 0 0-4.14 2.53C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.8 2.58 3.12 2.53s1.75-.76 3.28-.76 2 .76 3.3.73 2.22-1.24 3.06-2.45a11 11 0 0 0 1.38-2.85 4.41 4.41 0 0 1-2.68-4.04z"/>
              </svg>
              <span className="text-sm font-medium">Apple ID</span>
            </button>
          </div>
        </div>

        {/* Right: Illustration (Desktop only) */}
        <div className="hidden md:flex md:ml-16 lg:ml-24 xl:ml-32">
          <div className="w-full  max-w-md">
            <img
              src="data:image/jpeg;base64,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"
              alt="Professional networking illustration"
              className="w-140 h-140 mb-55 rounded-lg object-contain"
            />
          </div>
        </div>
      </div>

      {/* Mobile Footer Note */}
      <div className="md:hidden text-center text-gray-500 text-xs mt-8 pb-4">
        © 2024 ConnectPro. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
