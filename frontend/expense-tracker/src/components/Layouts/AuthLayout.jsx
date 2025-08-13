import React from 'react'
import LoginCard from "../../assets/images/LoginCard.jpg"
import { LuTrendingUpDown } from "react-icons/lu";
const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
        <div>
      <h2>Expense Tracker</h2>
      {children}
    </div>
    <div>
        <div></div>
        <div></div>
        <div></div>
        <div className='grid grid-cols-1 z-20'>
            <StatsInfoCard icon={<LuTrendingUpDown/>} label="Track Your Expenses and Income" value="95,000" colors="bg-primary"/>
        </div>
        <img src={LoginCard} alt="login_card" />
    </div>
    </div>
    
    
  )
}

export default AuthLayout
const StatsInfoCard=({icon,label,value,colors})=>{
    return(
        <div className=''>
        <div className={`${colors}`}>
            {icon}
        </div>
        <div>
            <h6>{label}</h6>
            <span>{value}</span>
        </div>
        </div>
    )

}