import React, { useState } from 'react'
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";
const Input = ({value,onChange,label,placeholder,type}) => {
    const [showPassword,setShowPassword]=useState(false);
    const toggleShowPassword=()=>{
        setShowPassword(!showPassword)
    }
  return (
    <div>
      <label>{label}</label>
      <div className='input-box'>
        <input type={type==="password"?showPassword?"text":"password":type} placeholder={placeholder} className='' value={value} onChange={(e)=>onChange(e)} />
        {
            type==="password" && (
                <>
                {
                    showPassword?(
                        <FaRegEye size={22} className="" onClick={toggleShowPassword}/>
                    ):(<FaRegEyeSlash size={22} className="" onClick={toggleShowPassword}/>)
                }
                </>
            )
        }
      </div>
    </div>
  )
}

export default Input
