/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react'
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import commonStyles from './styles/Common.module.scss'
import FellowShipCard from './common/FellowShipCard'
import { WebPartContext } from '@microsoft/sp-webpart-base'
import spOperation from './Service/spService'

export interface IHomePage {
    spcontext: WebPartContext,
    listid: string;
    mainTitle: string;
    description: string;
    _baseurl: any;
    myapplicationPageurl: string;
    groupApplicants: any
}

const HomePageContainer = (props: IHomePage) => {

    const [data, setData] = React.useState([] as any);
    const [isOpen, setIsOpen] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isUserButton, setisUserButton] = React.useState(false)
    const toggleOpen = (id: any) => () => {
        setIsOpen(isOpen => isOpen === id ? null : id,);


    };

    useEffect(() => {
        if (isOpen === null) {
            setIsExpanded(false);
        } else {
            setIsExpanded(true);
        }
    }, [isOpen]);

    const _objspservice: spOperation = new spOperation(props._baseurl, props.spcontext);

    React.useEffect(() => {

        _objspservice.getcurrentuserGroups(props.groupApplicants[0]?.id).then((res: boolean) => {
            if (res || props.spcontext.pageContext.user.isExternalGuestUser) {
                setisUserButton(true)
            }
            else {
                setisUserButton(false)
            }
        })

        _objspservice.getFellowshipPrograms(props.listid).then((res: any) => {
            //console.log(res);

            _checkuserapplication(res).then(() => {
                //console.log("Final Data", res);
                setData(res);
            })

        })
    }, [])

    const _checkuserapplication = async (res: any) => {
        for (let i = 0; i < res?.length; i++) {
            await _objspservice.getCurrentuserApplication(res[i].RUC_ListName, props.spcontext.pageContext.user.email).then((ret: number) => {
                //ret = 0-> the user has an application and user can only view the status
                //ret = -1-> the user can apply for a new application as valid application does not exist
                //ret = -2 -> Applicant does not have any applications
                if (ret === -1) {
                    //Applicant has applications but all previous applications are Rejected
                    if (res[i].RUC_ApplicationStatus === "Open") {
                        res[i].ButtonTitle = "Apply Now";
                        res[i].RUC_RedirectURL = res[i].RUC_RedirectURL + `?applicationId=0&FormMode=Edit`;
                        res[i].isButtonVisible = true
                    }

                    else {
                        res[i].ButtonTitle = "View My Applications";
                        res[i].RUC_RedirectURL = props.myapplicationPageurl;
                        res[i].isButtonVisible = true
                    }

                }
                else if (ret === -2) {
                    //Applicant does not have any application previously
                    if (res[i].RUC_ApplicationStatus === "Open") {
                        res[i].ButtonTitle = "Apply Now";
                        res[i].RUC_RedirectURL = res[i].RUC_RedirectURL + `?applicationId=0&FormMode=Edit`;
                        res[i].isButtonVisible = true
                    }
                    else {
                        res[i].isButtonVisible = false
                    }
                }
                else {
                    //Applicant has applicationwhich is not in rejected state
                    res[i].ButtonTitle = "View My Applications";
                    res[i].RUC_RedirectURL = props.myapplicationPageurl;
                    res[i].isButtonVisible = true
                }
            })
        }

        return res;
    }





    return (
        <div>
            <div className={`${commonStyles.fellowShipSectionHeader} d-flex justify-content-between align-items-center`}>
                <h2 className={commonStyles.fellowShipSectionTitle}>{props.mainTitle}</h2>
                <p className={commonStyles.fellowShipSectionDescription}>{props.description}</p>
            </div>



            <div className="">
                <div className='row'>
                    {
                        data?.map((item: any, index: number) => {
                            return (
                                <>
                                    <div className="col-6 p-0 relative">

                                        <FellowShipCard
                                            isOpen={isOpen === index}
                                            toggle={toggleOpen(index)}
                                            fellowShipTitle={item.Title}
                                            fellowShipLogo={item.RUC_FellowshipImage}
                                            fellowShipStatus={item.RUC_ApplicationStatus}
                                            fellowShipLastDate={item.RUC_EndDate}
                                            fellowShipInformation={item.RUC_FellowshipInformation}
                                            fellowShipEligibility={item.RUC_Eligibility}
                                            redirectURL={item.RUC_RedirectURL}
                                            index={index}
                                            isExpanded={isExpanded}
                                            buttonTitle={item.ButtonTitle}
                                            isGuestUser={isUserButton}
                                            isbuttonvisible={item.isButtonVisible}
                                        />
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePageContainer;