import React from 'react'

const customTooltip = ({active,payload}) => {
    if(active && payload && payload.length){
        return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-900 mb-1">{payload[0].name}</p>
        <p className="text-sm text-gray-600">
          Amount: <span className="font-semibold text-gray-900">${payload[0].value}</span>
        </p>
    </div>
  )
    }
  return null;
}

export default customTooltip