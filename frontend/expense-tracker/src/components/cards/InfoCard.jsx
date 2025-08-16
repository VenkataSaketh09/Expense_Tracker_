import React from 'react'

const InfoCard = ({icon,label,value,color}) => {
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className={`${color} p-2 sm:p-3 rounded-full text-white text-lg sm:text-xl flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12`}>
          {icon}
        </div>
        <div className="flex-1">
          <h6 className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{label}</h6>
          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">${value}</span>
        </div>
      </div>
    </div>
  )
}

export default InfoCard