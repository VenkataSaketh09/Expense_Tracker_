import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({value, onChange, label, placeholder, type}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    
    const handleFocus = () => {
        setIsFocused(true);
    }
    
    const handleBlur = () => {
        setIsFocused(false);
    }
    
    return (
        <div className="space-y-2">
            {/* Label */}
            <label className={`block text-sm font-semibold transition-colors duration-200 ${
                isFocused 
                    ? 'text-purple-600' 
                    : value 
                        ? 'text-gray-700' 
                        : 'text-gray-600'
            }`}>
                {label}
            </label>
            
            {/* Input Container */}
            <div className={`relative flex items-center transition-all duration-300 ${
                isFocused 
                    ? 'ring-2 ring-purple-500 ring-opacity-50' 
                    : 'ring-1 ring-gray-300'
            } rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md`}>
                
                {/* Input Field */}
                <input 
                    type={type === "password" ? showPassword ? "text" : "password" : type} 
                    placeholder={placeholder} 
                    className={`w-full px-4 py-3 sm:py-4 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 text-sm sm:text-base transition-all duration-200 ${
                        type === "password" ? 'pr-12' : ''
                    }`}
                    value={value} 
                    onChange={(e) => onChange(e)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                
                {/* Password Toggle Button */}
                {type === "password" && (
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-3 p-2 text-gray-400 hover:text-purple-600 transition-colors duration-200 focus:outline-none focus:text-purple-600"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <FaRegEye size={20} className="transition-transform duration-200 hover:scale-110" />
                        ) : (
                            <FaRegEyeSlash size={20} className="transition-transform duration-200 hover:scale-110" />
                        )}
                    </button>
                )}
                
                {/* Focus indicator */}
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 ${
                    isFocused ? 'w-full' : 'w-0'
                }`}></div>
            </div>
            
            {/* Input state indicator */}
            {value && !isFocused && (
                <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 font-medium">Valid</span>
                </div>
            )}
        </div>
    )
}

export default Input