/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import styles from "../styles/Button.module.scss";

interface buttonProps{
    buttonTitle: string,
    buttonStyle: string,
    next?: boolean,
    handleNext?: () => void,
    handleBack?: () =>  void,   
}

const UpdateTickButton = ({buttonTitle, buttonStyle,next, handleNext, handleBack}:buttonProps) => {
  return (
    <>
    <button onClick={next === true ? handleNext :handleBack} type='button' className={`${styles.formButton} ${buttonStyle}`}>{buttonTitle}</button>  
    </>
  )
}

export default UpdateTickButton
