import React from 'react'
import CustomPieChart from '../charts/CustomPieChart'
const COLORS=['#8B5CF6','#F97316','#DC2626'] 
const FinanceOverview = ({totalBalance,totalIncome,totalExpense}) => {
    const balanceOverview=[
        {name:"Total Balance",amount:totalBalance},
        {name:"Total Income",amount:totalIncome},
        {name:"Total Expense",amount:totalExpense}
    ]
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100 h-full">
      <div className="mb-4 sm:mb-6">
        <h5 className="text-lg sm:text-xl font-semibold text-gray-900">Financial Overview</h5>
      </div>
      <div className="h-64 sm:h-80">
        <CustomPieChart 
          data={balanceOverview} 
          label="Total Balance" 
          totalAmount={`$${totalBalance}`} 
          colors={COLORS} 
          showTextAnchor
        />
      </div>
    </div>
  )
}

export default FinanceOverview
