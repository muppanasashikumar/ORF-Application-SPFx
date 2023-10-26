/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
// import DetailsOfNominator from './PersonalDetails/DetailsOfNominator';
// import PrivateAddress from './PersonalDetails/PrivateAddress';
// import PersonalData from './PersonalDetails/PersonalData';
// import UploadDocuments from './UploadDocuments/UploadDocuments';
// import BranchOfStudy from './QualificationDetails/BranchOfStudy';
// import BusinessAddress from './PersonalDetails/BusinessAddress';
// import Navigation from './Navigation';
// import { HashRouter as Router, Route,Routes } from 'react-router-dom';
// import OtherQualifications from './QualificationDetails/OtherQualifications';
// import { IYoungFellowState } from './IYoungFellowState';


export const StepContext = React.createContext({
    activeStepCount: 0,
    subActiveStepCount: 0,
    activeStepCountLast: 0,
    backButton: false,
    setBackButton: (backButton:boolean) => {},
    setSubActiveStepCount: (subActiveStepCount:number) => {},
    setActiveStepCount: (activeStepCount:number) => {},
    setActiveStepCountLast: (activeStepCountLast:number) => {},
    handleNext: () => {},
    handleBack: () =>  {},
    updateStepCountNext: () => {},
    updateStepCountPrev: () => {},
});
export const ParentPropsContext = React.createContext({
    allDataBinding:{salutation:[],country:[],continent:[],fieldOfActivity:[],branchofstudy:[],fieldOfExpertise:[]},
    contentTypeField:[]
});

const OrfParent = (props:any) => {
    const [activeStepCount,setActiveStepCount] = React.useState(0);
    // const [formData,setFormData]=React.useState(youngFellowListItem)
    


    // console.log("ORF Parent Props",props)
    const [subActiveStepCount,setSubActiveStepCount] = React.useState(0);
    const [subActiveStepCountLast,setSubActiveStepCountLast] = React.useState(0);
    const [activeStepCountLast,setActiveStepCountLast] = React.useState(0);
    const [backButton,setBackButton] = React.useState(false);

    // const setFormDataCb=(internalName:string,value:string)=>{
    //     let _listItem:any=formData;
    //     _listItem[internalName]=value
    //     setFormData(_listItem)

    // }
    const handleNext = () => {
        // console.log('next');
        setActiveStepCountLast(activeStepCount);
        setActiveStepCount((prevActiveStep) => prevActiveStep + 1);
        setSubActiveStepCountLast(subActiveStepCount);
        setSubActiveStepCount(0); 
    };

    const handleBack = () => {
        // console.log('back');
        setBackButton(true);
        setActiveStepCountLast(activeStepCountLast);
        // setActiveStepCount((prevActiveStep) => prevActiveStep - 1);
        setSubActiveStepCount(subActiveStepCountLast);
    };

    const updateStepCountNext = () => {
        // console.log('Next step count',subActiveStepCount);
        setSubActiveStepCountLast(subActiveStepCount);
        setSubActiveStepCount((prevActiveStep) => prevActiveStep + 1)
    }

    const updateStepCountPrev = () => {
        // console.log('Prev step count',subActiveStepCount);
        setSubActiveStepCountLast(subActiveStepCount);
        setSubActiveStepCount((prevActiveStep) => prevActiveStep - 1)
    }
    return (
        <StepContext.Provider value={{activeStepCount,activeStepCountLast,setActiveStepCount,handleNext,handleBack,subActiveStepCount,setSubActiveStepCount,updateStepCountNext,updateStepCountPrev,setActiveStepCountLast,backButton,setBackButton}}>
             {/* <ParentPropsContext.Provider value={props}>
             <Router>
                <div className='d-flex flex-wrap'>
                <Navigation />
                    <Routes>
                    <Route path={"/privateAddress" } element={<PrivateAddress />} />
                        <Route path={"/businessAddress"} element={<BusinessAddress />} />
                        <Route path={"/branchOfStudy"} element={<BranchOfStudy />} />
                        <Route path={"/uploadDocuments"} element={<UploadDocuments />} />
                        <Route path={"/details"} element={<DetailsOfNominator />} />
                        <Route path={"/otherQualification"} element={<OtherQualifications />} />
                        <Route path={"/personalData"}  element={<PersonalData formaData={formData} setFormDataCb={setFormDataCb}/>} />
                    </Routes>
                </div>
            </Router>  
            </ParentPropsContext.Provider> */}
        </StepContext.Provider>
             
    )
}

export default OrfParent