import React from 'react'
import LoginCard from "../../assets/images/LoginCard.jpg"
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({children}) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex'>
      {/* Left Side - Form Section */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10'>
        <div className='w-full max-w-md lg:max-w-lg'>
          {/* Logo/Brand Section */}
          <div className='text-center mb-8 lg:mb-12'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-4 shadow-lg'>
              <LuTrendingUpDown className='text-white text-2xl' />
            </div>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight'>
              Expense Tracker
            </h2>
            <p className='text-gray-600 text-sm sm:text-base mt-2'>
              Manage your finances with ease
            </p>
          </div>
          
          {/* Form Content */}
          {children}
        </div>
      </div>

      {/* Right Side - Visual Section */}
      <div className='hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-100'>
        {/* Background Decorative Elements */}
        <div className='absolute inset-0'>
          {/* Static geometric shapes with violet borders */}
          <div className='absolute top-16 left-16 w-34 h-34 border-8 rounded-2xl border-purple-600'></div>
          <div className='absolute top-32 right-20 w-32 h-16 border-2 border-purple-500'></div>
          <div className='absolute bottom-30 left-16 w-28 h-28 border-2 border-purple-500 rotate-45'></div>
          <div className='absolute bottom-124 left-15 w-14 h-36 border-2 border-indigo-700 rotate-45'></div>
          <div className='absolute bottom-10 left-32 w-36 h-24 border-2 border-violet-500 -rotate-1'></div>
          <div className='absolute top-20 right-8 w-16 h-16 border-2 border-violet-600'></div>
          <div className='absolute top-82 right-20 w-14 h-36 border-2 border-indigo-700 rotate-45'></div>
          <div className='absolute bottom-16 right-16 w-34 h-34 border-8 rounded-2xl border-purple-600'></div>
          
          {/* Additional corner elements */}
          <div className='absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-violet-500 rounded-tl-3xl'></div>
          <div className='absolute bottom-0 right-0 w-40 h-40 border-r-4 border-b-4 border-purple-600 rounded-br-3xl'></div>
        </div>

        {/* Content Container */}
        <div className='relative z-10 flex flex-col items-center justify-center w-full p-12 text-gray-800'>
          {/* Stats Card */}
          <div className='mb-12 transform hover:scale-105 transition-all duration-300'>
            <StatsInfoCard 
              icon={<LuTrendingUpDown className='text-2xl text-white'/>} 
              label="Track Your Expenses and Income" 
              value="₹95,000" 
              colors="bg-gradient-to-r from-violet-500 to-purple-600"
            />
          </div>

          {/* Main Image */}
          <div className='relative max-w-md w-full'>
            <div className='absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent rounded-3xl'></div>
            <img 
              src={LoginCard} 
              alt="Financial Dashboard" 
              className='w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500'
            />
            
            {/* Floating elements */}
            <div className='absolute -top-4 -right-4 bg-violet-500 backdrop-blur-lg rounded-2xl p-4 shadow-lg'>
              <div className='flex items-center space-x-2'>
                <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-sm font-medium text-white'>Live Data</span>
              </div>
            </div>
            
            <div className='absolute -bottom-4 -left-4 bg-purple-600 backdrop-blur-lg rounded-2xl p-4 shadow-lg'>
              <div className='text-center'>
                <div className='text-lg font-bold text-white'>24/7</div>
                <div className='text-xs text-white'>Secure</div>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className='mt-12 grid grid-cols-3 gap-6 w-full max-w-sm'>
            <div className='text-center'>
              <div className='w-12 h-12 bg-violet-500 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-2'>
                <span className='text-xl'>📊</span>
              </div>
              <p className='text-sm text-gray-600'>Analytics</p>
            </div>
            <div className='text-center'>
              <div className='w-12 h-12 bg-purple-600 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-2'>
                <span className='text-xl'>🔒</span>
              </div>
              <p className='text-sm text-gray-600'>Secure</p>
            </div>
            <div className='text-center'>
              <div className='w-12 h-12 bg-violet-600 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-2'>
                <span className='text-xl'>⚡</span>
              </div>
              <p className='text-sm text-gray-600'>Fast</p>
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className='absolute bottom-0 left-0 right-0'>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className='w-full h-16 fill-current text-white/10'>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({icon, label, value, colors}) => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 max-w-xs'>
      <div className='flex items-start space-x-4'>
        <div className={`${colors} rounded-xl p-3 shadow-lg`}>
          {icon}
        </div>
        <div className='flex-1'>
          <h6 className='text-gray-600 text-sm font-medium mb-1 leading-tight'>
            {label}
          </h6>
          <span className='text-2xl font-bold text-gray-900'>
            {value}
          </span>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className='mt-4'>
        <div className='flex justify-between text-xs text-gray-500 mb-1'>
          <span>This month</span>
          <span className='text-green-600 font-medium'>+12%</span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div className='bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full w-3/4 shadow-sm'></div>
        </div>
      </div>
    </div>
  )
}