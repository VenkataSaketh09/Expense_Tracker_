import React, { useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import Input from "../Inputs/Input";
import { LuSave, LuUser, LuMail } from "react-icons/lu";
import { useQueryClient } from "@tanstack/react-query";
import { getUserData, getUserName, getUserEmail } from "../../utils/helper";

const ProfileEditForm = ({ user }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const userData = getUserData(user);
  const userName = getUserName(user);
  const userEmail = getUserEmail(user);

  const [formData, setFormData] = useState({
    userName: userName,
    email: userEmail,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormChanged()) {
      toast.error("No changes detected");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Updating profile...");

    try {
      const response = await axiosInstance.put(API_PATHS.Auth.UPDATE_PROFILE, {
        userName: formData.userName,
        email: formData.email,
      });

      if (response.data) {
        // Invalidate and refetch user data
        queryClient.invalidateQueries({ queryKey: ['user'] });

        toast.dismiss(loadingToast);
        toast.success("Profile updated successfully! ✨");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error.response?.data?.message || "Failed to update profile";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const isFormChanged = () => {
    return (
      formData.userName !== userName ||
      formData.email !== userEmail
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Edit Profile
        </h3>
        <p className="text-sm sm:text-base text-gray-600">
          Update your personal information and preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Name Input */}
        <div>
          <Input
            type="text"
            name="userName"
            placeholder="Enter your name"
            value={formData.userName}
            onChange={handleInputChange}
            icon={<LuUser className="w-5 h-5" />}
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            icon={<LuMail className="w-5 h-5" />}
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={loading || !isFormChanged()}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </>
            ) : (
              <>
                <LuSave className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData({
                userName: userName,
                email: userEmail,
              });
            }}
            disabled={loading}
            className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
