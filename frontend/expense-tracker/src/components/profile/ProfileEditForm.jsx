import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage";
import Input from "../Inputs/Input";
import { LuSave, LuUser, LuMail, LuImage } from "react-icons/lu";

const ProfileEditForm = ({ user }) => {
  const { updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    userName: user?.user?.userName || "",
    email: user?.user?.email || "",
    profileImageUrl: user?.user?.profileImageUrl || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const handleRemoveImage = () => {
    setProfilePic(null);
    setFormData((prev) => ({
      ...prev,
      profileImageUrl: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.email) {
      toast.error("Username and email are required");
      return;
    }

    const loadingToast = toast.loading("Updating profile...");
    setLoading(true);

    try {
      let profileImageUrl = formData.profileImageUrl;

      // Upload new image if selected
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.put(API_PATHS.Auth.UPDATE_PROFILE, {
        ...formData,
        profileImageUrl,
      });

      if (response.data) {
        // Update user context with new data
        updateUser({
          ...user,
          user: response.data.user,
        });

        toast.dismiss(loadingToast);
        toast.success("Profile updated successfully! ✨");

        // Clear the selected file
        setProfilePic(null);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error.response?.data?.message || "Failed to update profile";
      toast.error(`Error: ${errorMessage}`);
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormChanged = () => {
    return (
      formData.userName !== (user?.user?.userName || "") ||
      formData.email !== (user?.user?.email || "") ||
      profilePic !== null ||
      formData.profileImageUrl !== (user?.user?.profileImageUrl || "")
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Edit Profile Information
        </h3>
        <p className="text-gray-600 text-sm">
          Update your personal information and profile picture.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image Section */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center space-x-2 mb-6">
            <LuImage className="w-5 h-5 text-purple-600" />
            <h4 className="text-md font-medium text-gray-900">
              Profile Picture
            </h4>
          </div>

          {/* Profile Photo Selector - Matching SignUp Style */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Main circular background */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-purple-100 rounded-full flex items-center justify-center relative overflow-hidden border-4 border-white shadow-lg">
                {profilePic ? (
                  <img
                    src={URL.createObjectURL(profilePic)}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : formData.profileImageUrl ? (
                  <img
                    src={formData.profileImageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </div>

              {/* Upload button - positioned at bottom right */}
              <div className="absolute -bottom-1 -right-1">
                <label htmlFor="profile-upload" className="cursor-pointer">
                  <div className="w-9 h-9 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Remove button - only show if there's an image */}
              {(profilePic || formData.profileImageUrl) && (
                <div className="absolute -top-1 -right-1">
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Image Upload Instructions */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {profilePic ? (
                <span className="text-green-600 font-medium">
                  ✓ New image selected
                </span>
              ) : (
                "Click the upload button to change your profile picture"
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: JPG, PNG, GIF (Max 5MB)
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Username"
              name="userName"
              type="text"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Enter your username"
              icon={<LuUser className="w-5 h-5" />}
              required
            />
          </div>

          <div>
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              icon={<LuMail className="w-5 h-5" />}
              required
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-gray-200">
          <div className="mb-4 sm:mb-0">
            {isFormChanged() && (
              <p className="text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                ⚠️ You have unsaved changes
              </p>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  userName: user?.user?.userName || "",
                  email: user?.user?.email || "",
                  profileImageUrl: user?.user?.profileImageUrl || "",
                });
                setProfilePic(null);
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
              disabled={loading}
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={loading || !isFormChanged()}
              className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
            >
              <LuSave className="w-4 h-4" />
              <span>{loading ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
