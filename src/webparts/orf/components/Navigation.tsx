/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import formStyles from "./styles/Common.module.scss";
import navigationStyles from "./styles/Navigation.module.scss";
import styles from "./styles/Button.module.scss";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

type Navigation = {
  currentstepindex: number;
  currentheadingindex: number;
  completedsteps: any;
  goToStep: any;
  applicationStatus: string;
  setCurrentheading: any;
};

const Navigation = ({
  currentstepindex,
  currentheadingindex,
  completedsteps,
  goToStep,
  applicationStatus,
  setCurrentheading,
}: Navigation) => {
  const steps = [
    {
      label: "Select campaign settings",
      heading: "Personal Details",
      subHeading: "Enter your personal details",
      items: [
        { idx: 0, label: "Personal Data" },
        { idx: 1, label: "Details of Nominator" },
        { idx: 2, label: "Private Address" },
        { idx: 3, label: "Business Address" },
      ],
      stepIndex: 0,
    },
    {
      label: "Create an ad group",
      heading: "Qualification Details",
      subHeading: "Enter your qualification details",
      items: [
        { idx: 4, label: "Branch of Study" },
        { idx: 5, label: "Other Qualifications" },
      ],
      stepIndex: 1,
    },
    {
      label: "Create an ad",
      heading: "Upload Documents",
      subHeading: "Upload your personal documents",
      items: [{ idx: 6, label: "" }],
      stepIndex: 2,
    },
  ];

  const onClickHeader = (_stepIndex:number) => {
    const filteredSteps:any = steps.filter((item:any) => {
      return item.stepIndex === _stepIndex
    })
    
    goToStep(filteredSteps[0].items[0].idx);
   
    setCurrentheading(_stepIndex);
  }
  return (
    <div className={navigationStyles.navigationContainer}>
      <div className="pt-0">
        <div className={`text-center ${navigationStyles.navigationHeader}`}>
          <h1 className={navigationStyles.heading}> Application Form </h1>
          <p className={navigationStyles.description}>
            Complete the 3 steps in the form
          </p>
        </div>
        <div
          className={`d-flex gap-2 ${navigationStyles.navigationLinksContainer}`}
        >
          <div>
            <Stepper activeStep={currentheadingindex} orientation="vertical">
              {steps.map(({ label, heading, subHeading, items, stepIndex }) => (
                <Step
                  key={label}
                  expanded
                  completed={completedsteps[stepIndex]}
                  sx={{
                    "& .MuiStepLabel-root .Mui-completed": {
                      color: "#61341A!important", // circle color (COMPLETED)
                    },
                    "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                      {
                        color: "#61341A", // Just text label (COMPLETED)
                      },
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "#61341A", // circle color (ACTIVE)
                    },
                    "& .MuiStepLabel-root .Mui-disabled": {
                      color: "#B4A048", // Just text label (ACTIVE)
                      //fontWeight: 500,
                    },
                    "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                      fill: "white", // circle's number (ACTIVE)
                    },
                  }}
                >
                  <StepLabel>
                    <h2 onClick={() => {applicationStatus !== "Draft" && onClickHeader(stepIndex)}}
                    className={applicationStatus !== "Draft" ? `${navigationStyles.title} ${navigationStyles.title_pointer}` : navigationStyles.title}>{heading}</h2>
                  </StepLabel>
                  <StepContent>
                    <div
                      className={`d-flex flex-column gap-2 ${formStyles.stepMarginTop}`}
                    >
                      {items && (
                        <>
                          <span className={navigationStyles.subHeading}>
                            {subHeading}
                          </span>
                          <ul>
                            {items.map((element, index) => {
                              return (
                                <>
                                  {element.label !== "" && (
                                    <li
                                      onClick={() => {
                                        applicationStatus !== "Draft" &&
                                          goToStep(element.idx);
                                      }}
                                      className={
                                        applicationStatus !== "Draft"
                                          ? currentstepindex === element.idx
                                            ? `${styles.cursorPointer}  ${styles.activeText}`
                                            : `${styles.cursorPointer} `
                                          : currentstepindex === element.idx
                                          ? `  ${styles.activeText}`
                                          : ""
                                      }
                                      key={index}
                                    >
                                      {element.label}
                                    </li>
                                  )}
                                </>
                              );
                            })}
                          </ul>
                        </>
                      )}
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
