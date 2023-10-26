/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import commonStyles from '../styles/Common.module.scss';

interface IFellowShipButtonProps{
    buttonImage: string,
    buttonStyle: string,
    onShow: any,
    isOpen: boolean | undefined,
}

const FellowShipButton = ({buttonImage, buttonStyle,onShow,isOpen}:IFellowShipButtonProps) => {
  return (
    <div>
        <button onClick={onShow}  type='button' className={`d-flex justify-content-center ${buttonStyle} ${isOpen ? commonStyles.rotateIcon : ''}`}><img src={buttonImage} /></button>
    </div>
  )
}

export default FellowShipButton