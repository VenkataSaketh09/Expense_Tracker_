import React from "react";
import { getUserData, getUserName, getUserEmail } from "../../utils/helper";
import { LuUser, LuMail, LuCalendar, LuShield } from "react-icons/lu";

const ProfileOverview = ({ user }) => {
  const userData = getUserData(user);
  const userName = getUserName(user);
  const userEmail = getUserEmail(user);

  // Get registration date (you might need to adjust this based on your user model)
  const registrationDate = userData?.createdAt 
    ? new Date(userData.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Profile Overview
        </h3>
        <p className="text-sm sm:text-base text-gray-600">
          Your account information and details
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Avatar */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        {/* User Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <LuUser className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Full Name</p>
              <p className="text-base font-semibold text-gray-900">{userName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <LuMail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Email Address</p>
              <p className="text-base font-semibold text-gray-900">{userEmail}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <LuCalendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Member Since</p>
              <p className="text-base font-semibold text-gray-900">{registrationDate}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <LuShield className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Account Status</p>
              <p className="text-base font-semibold text-green-600">Active</p>
            </div>
          </div>
        </div>

        {/* Account Security Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <LuShield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Account Security</p>
              <p className="text-sm text-blue-700 mt-1">
                Your account is protected with secure authentication. Keep your credentials safe and never share them with others.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
