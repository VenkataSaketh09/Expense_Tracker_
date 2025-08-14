import React, { useState,useContext } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    if (!userName) {
      setError("Please Enter your Name");
      return;
    }
    if (!validateEmail) {
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
      //upload image if present
      if(profilePic){
        const imgUploadRes=await uploadImage(profilePic);
        profileImageUrl=imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.Auth.REGISTER, {
        userName,
        email,
        password,
        profileImageUrl
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.message) {
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
            {/* Profile Photo Selector */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative">
                {/* Main circular background */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-100 rounded-full flex items-center justify-center relative overflow-hidden">
                  {profilePic ? (
                    <img 
                      src={URL.createObjectURL(profilePic)} 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                
                {/* Upload button - positioned at bottom right */}
                <div className="absolute -bottom-1 -right-1">
                  <label htmlFor="profile-upload" className="cursor-pointer">
                    <div className="w-8 h-8 bg-purple-400 hover:bg-violet-500 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="space-y-6">
              {/* Full Name - Full width on mobile, part of grid on larger screens */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="lg:col-span-2">
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="John Wick"
                    label="Enter Your Full Name"
                    type="text"
                  />
                </div>
              </div>

              {/* Email and Password Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-2">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email Address"
                    placeholder="saketh@mail.com"
                    type="text"
                  />
                </div>
                
                <div className="space-y-2">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    placeholder="Min 8 characters"
                    type="password"
                  />
                </div>
              </div>

              {/* Password Strength Indicator */}
              <div className="space-y-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                        password.length >= i * 2
                          ? password.length >= 8
                            ? 'bg-green-400'
                            : password.length >= 6
                            ? 'bg-yellow-400'
                            : 'bg-red-400'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Password strength: {
                    password.length >= 8 ? (
                      <span className="text-green-600 font-medium">Strong</span>
                    ) : password.length >= 6 ? (
                      <span className="text-yellow-600 font-medium">Medium</span>
                    ) : password.length > 0 ? (
                      <span className="text-red-600 font-medium">Weak</span>
                    ) : (
                      <span className="text-gray-400">Enter password</span>
                    )
                  }
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-red-600 font-medium flex items-center">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-xs sm:text-sm text-gray-600">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-700 underline font-medium">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-700 underline font-medium">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>

            {/* SignUp Button */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 text-sm sm:text-base"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="relative my-6 sm:my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  Already a member?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-600">
                Already have an Account?{" "}
                <Link 
                  className="font-semibold text-purple-600 hover:text-purple-700 underline decoration-2 underline-offset-2 transition-colors duration-200" 
                  to="/login"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center mt-8 space-x-2">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs sm:text-sm text-gray-500 font-medium">
            Your data is secure and encrypted
          </span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;