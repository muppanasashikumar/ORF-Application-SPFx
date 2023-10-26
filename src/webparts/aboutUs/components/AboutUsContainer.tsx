// /* eslint-disable react/jsx-key */
// /* eslint-disable @typescript-eslint/no-floating-promises */
// /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import styles from './styles/AboutUsContainer.module.scss';
import spOperation from './Services/spService';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import "../../../common/fonts/fonts.scss";


export interface IAboutUsProps {
    spcontext: WebPartContext,
    listid: string;
    _baseurl: any;
}

const AboutUsContainer = (props: IAboutUsProps) => {

    const [data, setData] = React.useState([] as any);

    const _objspservice: spOperation = new spOperation(props._baseurl, props.spcontext);

    React.useEffect(() => {
        _objspservice.getAboutUsDescription(props.listid).then((res: any) => {
           setData(res);
        })
    }, [])

    return (
        <>
            <div className={`d-flex justify-content-between align-items-center ${styles.aboutSectionHeader}`} >
                <div className={`d-flex justify-content-between align-items-center`}>
                    <h2 className={styles.aboutSectionTitle}>About US</h2>
                </div>
            </div>
            <div className={styles.sectionContainer}>
                <div className={styles.sectionHeading}>
                    <h2>about Orf</h2>
                    <img className={styles.underlineImage} src={require("../assets/underlineBackground.svg")} alt="heading underlines" />
                </div>
                <div className={styles.sectionContent} dangerouslySetInnerHTML={{__html: data[0]?.RUC_AboutUs}}>
                    {/* <p>ORF began its journey in 1990 at the juncture of ideation tempered by pragmatism. During the period of India’s transition to a new engagement with the international economic order, several challenges emerged, evoking a need for an independent forum that could critically examine the problems facing the country and help develop coherent policy responses. ORF was thus formed, and brought together, for the first time, leading Indian economists and policymakers to present the agenda for India’s economic reforms.</p>
                    <p>Propelled by the process of reforms initiated in the 1990s, ORF, over the past 30 years of its existence, has effectively narrated and participated in India’s story as the country has acquired an unmistakable global footprint. From primarily looking inward and engaging with domestic reforms, to gradually forging global partnerships, ORF today plays a seminal role in building political and policy consensus that enables India to interact with the world.</p>
                    <p>ORF’s aim is to encourage voices from all quarters, geographies and gender, both those that fall in and those that question dominant narratives. It is this plurality of thought and voice — in a country of over a billion individuals — that ORF seeks to carry abroad, while simultaneously bringing contemporary global debates to India.</p> */}
                </div>
            </div>
        </>
    )
}

export default AboutUsContainer
