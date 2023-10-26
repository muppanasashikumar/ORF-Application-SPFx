/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import commonStyles from './styles/FellowShipCard.module.scss'


interface IFellowShipCardProps {
    fellowShipTitle: string,
    fellowShipLogo: string,
    fellowShipInformation: string,
}



const FellowShipCard = ({ fellowShipTitle, fellowShipLogo, fellowShipInformation }: IFellowShipCardProps) => {

    return (
        <>
            <div className={`card ${commonStyles.fellowshipCard}`}>
                <div className={`card-body d-flex flex-column align-items-center ${commonStyles.fellowShipCardBody}`}>
                    <img src={fellowShipLogo} alt="" className={`card-img ${commonStyles.fellowshipCardImage}`} />
                    <h3 className={`${commonStyles.fellowshipCardTitle}`}>{fellowShipTitle}</h3>

                    <div className={`${commonStyles.fellowshipCardContentContainer}`}>
                        <h4 className={`${commonStyles.fellowshipCardContentTitle}`}>Email us at:</h4>
                        {/* <p className={`${commonStyles.fellowshipCardContent}`}>{fellowShipInformation}</p> */}
                        <a className={`${commonStyles.fellowshipCardContent}`} href={`mailto:${fellowShipInformation}`}>
                          {fellowShipInformation}
                        </a>
                    </div>

                </div>
            </div>
        </>

    )
}

export default FellowShipCard