/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import styles from './styles/TeamContainer.module.scss'
import TeamMember from './TeamMember'
import Slider from 'react-slick'
import { WebPartContext } from '@microsoft/sp-webpart-base';
import spOperation from './Services/spService';


export interface ITeamContainer {
    spcontext: WebPartContext,
    listid: string;
    _baseurl: any;
}

const TeamContainer = (props: ITeamContainer) => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        cssEase: "linear"
    };

    const [data, setData] = React.useState([] as any);

    const _objspservice: spOperation = new spOperation(props._baseurl, props.spcontext);

    React.useEffect(() => {
        _objspservice.getOurTeamInfo(props.listid).then((res: any) => {
            // console.log(res);
            setData(res);
        })
    }, [])

    return (
        <div className={styles.sectionContainer}>
            <div className={styles.sectionHeading}>
                <h2>Our Team</h2>
                <img className={styles.underlineImage} src={require("../assets/underlineBackground.svg")} alt="heading underlines" />
            </div>
            <Slider className={`text-center ${styles.teamSlideShow}`} {...settings}>
                    {
                        data?.map((each:any)=>{
                            return (
                                <TeamMember imageURL={each.Image} name={each.Name} designation={each.Designation} email={each.Email} context={props.spcontext}/>
                            )
                        })
                    }
            </Slider>
        </div>
    )
}

export default TeamContainer