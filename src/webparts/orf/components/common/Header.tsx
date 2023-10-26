/*eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import headerStyles from '../styles/Header.module.scss';

export interface IHeader {
    mainTitle: string;
    imageURL: string;
}

const Header = ({mainTitle, imageURL}:IHeader) => {
    return (
        <div className={`${headerStyles.formSectionHeader}`} >
            <div className={`d-flex justify-content-between align-items-center`}>
                <h2 className={headerStyles.formSectionTitle}>{mainTitle}</h2>
                <div className={`d-flex justify-content-center align-items-center ${headerStyles.formSectionImageContainer}`}>
                    <img className={headerStyles.formSectionImage} src={imageURL} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header