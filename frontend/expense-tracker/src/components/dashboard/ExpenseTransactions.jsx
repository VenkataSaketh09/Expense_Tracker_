import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionsInfoCard from '../cards/TransactionsInfoCard'
import moment from 'moment'

const ExpenseTransactions = ({transactions,onSeeMore}) => {
  return (
    <div>
      <div>
        <h5>Expenses</h5>
        <button onClick={onSeeMore}>See All <LuArrowRight className='text-base'/></button>
      </div>
      <div>
        {
            transactions?.slice(0,5)?.map((expense)=>(
                <TransactionsInfoCard key={expense._id} title={expense.category} icon={expense.icon} date={moment(expense.date).format("DD-MM-YYYY")} amount={expense.amount} type="expense" hideDeleteBtn/>
            ))
        }
      </div>
    </div>
  )
}

export default ExpenseTransactions
