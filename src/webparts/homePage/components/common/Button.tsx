/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
interface buttonProps{
    buttonTitle: string,
    buttonStyle: string,
    buttonurl:string;
    buttondisabled?: boolean
}

const Button = ({buttonTitle, buttonStyle,buttonurl,buttondisabled}:buttonProps) => {
  return (
    <>
    <button type='button' className={`${buttonStyle}`} onClick={()=>{window.open(buttonurl)}} disabled={buttondisabled}>{buttonTitle}</button>
    </>
  )
}

export default Button
