import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const SideMenu = ({activeMenu}) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };
  
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };
  console.log("user data:",user)
  return (
    <div className="h-full flex flex-col p-6">
      {/* User Profile Section */}
      <div className="mb-8 pb-6 border-b border-gray-100">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Profile Image */}
          <div className="relative">
            {user?.user?.profileImageUrl ? (
              <img 
                src={user?.user?.profileImageUrl || ""} 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover border-4 border-purple-100 shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">
                  {user?.user?.userName?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            )}
            {/* Online status indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          {/* User Name */}
          <div>
            <h5 className="text-lg font-bold text-gray-800 mb-1">
              {user?.user?.userName || "Guest User"}
            </h5>
            <p className="text-sm text-gray-500">Welcome back!</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">
            Navigation
          </p>
        </div>
        
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = activeMenu === item.label;
          const isLogout = item.label === "Logout";
          
          return (
            <button 
              key={index} 
              className={`w-full flex items-center gap-4 text-sm font-medium transition-all duration-200 py-3 px-4 rounded-xl mb-1 group ${
                isActive 
                  ? 'text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg transform scale-[1.02]' 
                  : isLogout 
                    ? 'text-red-600 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50 border border-transparent hover:border-purple-200'
              }`} 
              onClick={() => handleClick(item.path)}
            >
              <div className={`p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-white/20' 
                  : isLogout 
                    ? 'group-hover:bg-red-100' 
                    : 'group-hover:bg-purple-100'
              }`}>
                <item.icon className={`text-lg ${
                  isActive 
                    ? 'text-white' 
                    : isLogout 
                      ? 'text-red-500 group-hover:text-red-600' 
                      : 'text-gray-500 group-hover:text-purple-600'
                }`} />
              </div>
              
              <span className="flex-1 text-left">
                {item.label}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
              )}
              
              {/* Arrow for non-logout items */}
              {!isLogout && !isActive && (
                <svg 
                  className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-all duration-200 transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>All systems operational</span>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;