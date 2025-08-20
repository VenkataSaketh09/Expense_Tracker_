import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { LuUser, LuMail, LuLock, LuEye, LuEyeOff } from "react-icons/lu";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName) {
      setError("Please Enter your Name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please Enter a Valid Email");
      return;
    }
    if (!password) {
      setError("Please Enter a Password");
      return;
    }
    setError("");
    //SignUp API Call
    try {
      const response = await axiosInstance.post(API_PATHS.Auth.REGISTER, {
        userName,
        email,
        password,
      });
      
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        // Invalidate and refetch user data
        queryClient.invalidateQueries({ queryKey: ['user'] });
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("something went wrong.please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-lg mx-auto px-6 py-8 sm:px-8 lg:px-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Create an Account
          </h3>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Join us Today by Entering Your Details Below
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Name Input */}
            <div>
              <Input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                icon={<LuUser className="w-5 h-5" />}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<LuMail className="w-5 h-5" />}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<LuLock className="w-5 h-5" />}
                endIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <LuEyeOff className="w-5 h-5" />
                    ) : (
                      <LuEye className="w-5 h-5" />
                    )}
                  </button>
                }
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
              >
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
