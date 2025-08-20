import React, { useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import Input from "../Inputs/Input";
import { LuLock, LuEye, LuEyeOff, LuShield } from "react-icons/lu";

const PasswordChangeForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    if (!formData.currentPassword) {
      toast.error("Current password is required");
      return false;
    }

    if (!formData.newPassword) {
      toast.error("New password is required");
      return false;
    }

    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return false;
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.error("New password must be different from current password");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const loadingToast = toast.loading("Updating password...");
    setLoading(true);

    try {
      const response = await axiosInstance.put(API_PATHS.Auth.UPDATE_PASSWORD, {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response.data) {
        toast.dismiss(loadingToast);
        toast.success("Password updated successfully! 🔒");

        // Clear form
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error.response?.data?.message || "Failed to update password";
      toast.error(`Error: ${errorMessage}`);
      console.error("Error updating password:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: "", color: "" };

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 2)
      return {
        level: 1,
        text: "Weak",
        color: "text-red-500 bg-red-50 border-red-200",
      };
    if (score < 4)
      return {
        level: 2,
        text: "Fair",
        color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      };
    if (score < 5)
      return {
        level: 3,
        text: "Good",
        color: "text-blue-600 bg-blue-50 border-blue-200",
      };
    return {
      level: 4,
      text: "Strong",
      color: "text-green-600 bg-green-50 border-green-200",
    };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Change Password
        </h3>
        <p className="text-gray-600 text-sm">
          Update your password to keep your account secure. Make sure to use a
          strong password.
        </p>
      </div>

      {/* Security Tips */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start space-x-3">
          <LuShield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Password Security Tips
            </h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Use at least 8 characters</li>
              <li>• Include uppercase and lowercase letters</li>
              <li>• Add numbers and special characters</li>
              <li>• Avoid common words or personal information</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Current Password */}
          <div className="relative">
            <Input
              label="Current Password"
              name="currentPassword"
              type={showPasswords.current ? "text" : "password"}
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter your current password"
              icon={<LuLock className="w-5 h-5" />}
              required
              showPasswordToggle={false}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute right-3 top-12 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.current ? (
                <LuEyeOff className="w-5 h-5" />
              ) : (
                <LuEye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <Input
              label="New Password"
              name="newPassword"
              type={showPasswords.new ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter your new password"
              icon={<LuLock className="w-5 h-5" />}
              required
              showPasswordToggle={false}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-3 top-12 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.new ? (
                <LuEyeOff className="w-5 h-5" />
              ) : (
                <LuEye className="w-5 h-5" />
              )}
            </button>

            {/* Password Strength Indicator */}
            {formData.newPassword && (
              <div className="mt-2">
                <div
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${passwordStrength.color}`}
                >
                  Password Strength: {passwordStrength.text}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type={showPasswords.confirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your new password"
              icon={<LuLock className="w-5 h-5" />}
              required
              showPasswordToggle={false}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-3 top-12 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.confirm ? (
                <LuEyeOff className="w-5 h-5" />
              ) : (
                <LuEye className="w-5 h-5" />
              )}
            </button>

            {/* Password Match Indicator */}
            {formData.confirmPassword && (
              <div className="mt-2">
                {formData.newPassword === formData.confirmPassword ? (
                  <div className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-green-600 bg-green-50 border border-green-200">
                    ✓ Passwords match
                  </div>
                ) : (
                  <div className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-red-600 bg-red-50 border border-red-200">
                    ✗ Passwords do not match
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-end pt-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
              disabled={loading}
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                !formData.currentPassword ||
                !formData.newPassword ||
                !formData.confirmPassword
              }
              className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
            >
              <LuLock className="w-4 h-4" />
              <span>{loading ? "Updating..." : "Update Password"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
