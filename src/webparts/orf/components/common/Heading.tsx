/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
// import styles from "./OrfForm.module.scss";
import commonStyles from "../styles/Common.module.scss";


interface IHeadingProps {
  heading: string;
  number?: number;
  appStatus: string;
  _userRole:string
}

const Heading = ({ number, heading, appStatus,_userRole }: IHeadingProps) => {
  let status: any;
  if(_userRole==="Guest"){
    if (appStatus === "Draft") {
      status = appStatus;
    } else if (appStatus === "Rejected") {
      status = appStatus;
    } else {
      status = "Submitted";
    }
  }
  else{
    status=appStatus
  }
  
  return (
    <div className={commonStyles.borderBottom}>
      <div className={commonStyles.formHeadingContainer}>
        <div className={commonStyles.formHeading}>
          {/* <div className={commonStyles.headingNumberContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                >
                  <circle cx="15" cy="15" r="15" fill="#FAC600" />
                </svg>
                <p className={commonStyles.headingNumber}>{number}</p>
              </div> */}
          <div>
            <h1 className={commonStyles.heading}>{heading}</h1>
          </div>
        </div>
        <div className="d-flex flex-column">
          <span className={commonStyles.applicationDetails}>
            Application ID -{" "}
            <span className={commonStyles.applicationDetailValue}>
              {Number(sessionStorage.getItem("applicationId")) === 0
                ? "NA"
                : sessionStorage.getItem("applicationId")?.toUpperCase()}
            </span>
          </span>
          <span className={commonStyles.applicationDetails}>
            Application Status -{" "}
            <span className={commonStyles.applicationDetailValue}>
              {status}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Heading;
