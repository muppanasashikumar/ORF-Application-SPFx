/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { WebPartContext } from '@microsoft/sp-webpart-base';
import React from 'react'
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import spOperation from './Services/spService';
import styles from './common/styles/ContactUsContainer.module.scss';
import FellowShipCard from './common/FellowShipCard';


export interface IContactus {
    spcontext: WebPartContext,
    listid: string;
    _baseurl: any;
    contactdetails: string;
}

const ContactusContainer = (props: IContactus) => {

    const [data, setData] = React.useState([] as any);

    const _objspservice: spOperation = new spOperation(props._baseurl, props.spcontext);

    React.useEffect(() => {
        _objspservice.getFellowshipcontacts(props.listid).then((res: any) => {
            //console.log(res);
            setData(res);
        })
    }, [])


    return (
        <div>
            {
                data.map((each: any) => {
                    return (
                        <div>
                            <div className={`d-flex justify-content-between align-items-center ${styles.contactSectionHeader}`} >
                                <div className={`d-flex justify-content-between align-items-center`}>
                                    <h2 className={styles.contactSectionTitle}>Contact US</h2>
                                </div>
                            </div>
                            <div className={styles.sectionContainer}>
                                <div className={styles.sectionHeading}>
                                    <h2>Get in Touch</h2>
                                    <img className={styles.underlineImage} src={require("../assets/underlineBackground.svg")} alt="heading underlines" />
                                </div>
                                <div className={styles.sectionContent}>
                                    <div className={styles.sectionContentHeading}>Our Address:</div>
                                    <div>{each.AddressLine1}</div>
                                    <div>{each.AddressLine2}</div>
                                    <div>Phone: {each.Phone}</div>
                                    <div>Fax: {each.Fax}</div>
                                </div>
                            </div>
                            <div className={styles.sectionContainer}>
                                <div className={styles.sectionContent}>
                                    <div className={styles.sectionContentHeading}>For any programme related queries:</div>
                                    <div className={`mt-4 d-flex gap-5`}>
                                        <FellowShipCard fellowShipTitle="Raisina Young Fellows Programme" fellowShipLogo={each.RYFP_Logo} fellowShipInformation={each.MailID_RYFP}/>
                                        <FellowShipCard fellowShipTitle="Raisina Forum for Future of Diplomacy" fellowShipLogo={each.RFFD_Logo} fellowShipInformation={each.MailID_RFFD}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ContactusContainer;