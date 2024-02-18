import React from 'react'
import { Button as AntDButton, ButtonProps } from 'antd'

interface ButtonPropsInterface extends ButtonProps{
validationMessage?:string;
validation?:boolean;
label:string;
className?:string;
style?:React.CSSProperties,
}
const Button:React.FC<ButtonPropsInterface> = ({label,validationMessage='',validation,className,style,...props}) => {
  return (
    <div className='flex flex-col gap-1'>
        <AntDButton className={className} style={style} {...props} >{label}</AntDButton>
        {validation && <p className='bg-red text-lg'>{validationMessage}</p>}
    </div>
  )
}

export default Button
