import React from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../charts/CustomBarChart'
import { useState } from 'react'
import { useEffect } from 'react'
import { prepareIncomeBarChartData } from '../../utils/helper'

const IncomeOverview = ({transactions, onAddIncome}) => {
    const [chartData, setChartData] = useState([])
    
    useEffect(() => {
        if (transactions && transactions.length > 0) {
            const result = prepareIncomeBarChartData(transactions)
            setChartData(result)
        }
        return () => {};
    }, [transactions])

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className='flex items-center justify-between mb-6'>
                <div className=''>
                    <h5 className='text-xl font-semibold text-gray-900'>Income Overview</h5>
                    <p className='text-sm text-gray-500 mt-1'>Track your earnings over time and analyze your income trends.</p>
                </div>
                <button 
                    className='flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium' 
                    onClick={onAddIncome}
                >
                    <LuPlus className='text-lg'/> Add Income
                </button>
            </div>
            
            {/* Chart Container with fixed height */}
            <div className='h-80 w-full'>
                {chartData.length > 0 ? (
                    <CustomBarChart data={chartData} title={"Income Data"}/>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        No income data available
                    </div>
                )}
            </div>
        </div>
    )
}

export default IncomeOverview