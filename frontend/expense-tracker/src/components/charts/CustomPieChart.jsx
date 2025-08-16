import React from 'react'
import {PieChart,Pie,Tooltip,Cell,ResponsiveContainer,Legend} from "recharts"
import customTooltip from './customTooltip'

const CustomPieChart = ({data,label,totalAmount,colors,showTextAnchor}) => {
  return (
   <ResponsiveContainer width="100%" height="100%">
    <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={73}
          outerRadius={90}
          paddingAngle={2}
          dataKey="amount"
        >
            {data.map((entry,index)=>(
                <Cell key={`cell-${index}`} fill={colors[index%colors.length]}/>
            ))}
        </Pie>
        <Tooltip content={customTooltip}/>
        <Legend 
          verticalAlign="bottom" 
          height={36}
          iconType="circle"
          wrapperStyle={{
            paddingTop: "20px",
            fontSize: "12px"
          }}
        />
        {showTextAnchor && (
            <>
            {/* <text 
              x="50%" 
              y="45%" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              className="fill-gray-600 text-xs sm:text-sm font-medium"
            >
                {label}
            </text>
            <text 
              x="50%" 
              y="55%" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              className="fill-gray-900 text-sm sm:text-base font-bold"
            >
                {totalAmount}
            </text> */}
            </>
        )}
    </PieChart>
   </ResponsiveContainer>
  )
}

export default CustomPieChart