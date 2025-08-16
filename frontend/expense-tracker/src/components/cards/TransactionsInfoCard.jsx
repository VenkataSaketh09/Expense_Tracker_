import React from 'react'
import { LuTrash2, LuTrendingDown, LuTrendingUp, LuUtensils } from 'react-icons/lu'

const TransactionsInfoCard = ({key,title,icon,date,amount,type,hideDeleteBtn,onDelete}) => {
    const getAmountStyles=()=>{
        return type==="income"?"bg-green-50 text-green-500":"bg-red-50 text-red-500"
    }
  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 mb-3 border border-gray-100 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
            {icon ?(
                <img src={icon} alt={title} className='w-6 h-6 sm:w-8 sm:h-8 object-cover rounded'/>
            ):(
                <LuUtensils className="w-5 h-5 sm:w-6 sm:h-6"/>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{title}</p>
            <p className="text-xs sm:text-sm text-gray-500">{date}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
            {!hideDeleteBtn && (
                <button className='p-1 hover:bg-gray-100 rounded' onClick={onDelete}>
                    <LuTrash2 size={16} className="text-gray-500"/>
                </button>
            )}
            <div className={`${getAmountStyles()} px-2 py-1 sm:px-3 sm:py-1 rounded-lg flex items-center space-x-1`}>
                <h6 className="text-xs sm:text-sm font-semibold">{type==="income"?"+":"-"} ${amount}</h6>
                {type==="income"?<LuTrendingUp className="w-3 h-3 sm:w-4 sm:h-4"/>:<LuTrendingDown className="w-3 h-3 sm:w-4 sm:h-4"/>}
            </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsInfoCard