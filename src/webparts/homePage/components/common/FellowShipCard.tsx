/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import commonStyles from "../styles/Common.module.scss";
import FellowShipButton from "../common/FellowShipButton";
import Button from "./Button";

interface IFellowShipCardProps {
  fellowShipTitle: string;
  fellowShipStatus: string;
  fellowShipLastDate: string;
  fellowShipLogo: string;
  fellowShipInformation: string;
  fellowShipEligibility: string;
  isOpen?: boolean;
  toggle?: any;
  redirectURL: string;
  index: number;
  isExpanded: boolean;
  buttonTitle: string;
  isGuestUser: boolean;
  isbuttonvisible: boolean;
}

const FellowShipCard = ({
  fellowShipTitle,
  fellowShipStatus,
  fellowShipLastDate,
  fellowShipLogo,
  fellowShipInformation,
  fellowShipEligibility,
  redirectURL,
  isOpen,
  toggle,
  index,
  isExpanded,
  buttonTitle,
  isGuestUser,
  isbuttonvisible,
}: IFellowShipCardProps) => {
  return (
    <>
      <div
        className={`${
          index === 0
            ? commonStyles.fellowShipTopBackgroundLightYellow
            : commonStyles.fellowShipTopBackground
        }`}
      />
      <div
        className={`${
          isExpanded
            ? index === 0
              ? `${commonStyles.fellowShipBottomBackgroundExpanded} ${commonStyles.fellowShipBottomBackgroundLeft}`
              : `${commonStyles.fellowShipBottomBackgroundExpanded} ${commonStyles.fellowShipBottomBackgroundRight}`
            : index === 0
            ? commonStyles.fellowShipBottomBackgroundLeft
            : commonStyles.fellowShipBottomBackgroundRight
        }`}
      >
        <div className="d-flex justify-content-center">
          <div
            className={`d-flex flex-column justify-content-center align-items-center ${commonStyles.customMarginTop}`}
          >
            <div className={`card ${commonStyles.fellowshipCard}`}>
              <div
                className={`card-body d-flex flex-column align-items-center ${commonStyles.fellowShipCardBody}`}
              >
                <img
                  src={fellowShipLogo}
                  alt=""
                  className={`card-img ${commonStyles.fellowshipCardImage}`}
                />
                <h3
                  className={`${commonStyles.fellowshipCardTitle}`}
                  title={fellowShipTitle}
                >
                  {fellowShipTitle}
                </h3>
                <p className={`${commonStyles.fellowshipCardDetails}`}>
                  Application Status: <span>{fellowShipStatus}</span>
                </p>
                {fellowShipLastDate !== "" ? (
                  <p className={`${commonStyles.fellowshipCardDetails} `}>
                    Last Date to apply: <span>{fellowShipLastDate}</span>
                  </p>
                ) : (
                  <p
                    className={`${commonStyles.fellowshipCardDetails} ${commonStyles.hidelastdate}`}
                  >
                    Last Date to apply: <span>{fellowShipLastDate}</span>
                  </p>
                )}

                {isOpen && (
                  <div
                    className={`${
                      commonStyles.fellowshipCardContentContainer
                    } ${
                      isOpen
                        ? commonStyles.showContent
                        : commonStyles.hideContent
                    }`}
                  >
                    <h4
                      className={`${commonStyles.fellowshipCardContentTitle}`}
                    >
                      Info
                    </h4>
                    <p className={`${commonStyles.fellowshipCardContent}`}>
                      {fellowShipInformation}
                    </p>
                    <h4
                      className={`${commonStyles.fellowshipCardContentTitle}`}
                    >
                      Eligibility
                    </h4>
                    <p className={`${commonStyles.fellowshipCardContent}`}>
                      {fellowShipEligibility}
                    </p>
                  </div>
                )}
              </div>
              <div
                className={`card-footer d-flex justify-content-center align-items-center ${commonStyles.fellowshipCardFooter}`}
              >
                {/* <button className={`${commonStyles.fellowshipButton}`}>Apply Now</button> */}
                {isGuestUser && isbuttonvisible && (
                  <Button
                    buttonStyle={commonStyles.fellowshipButton}
                    buttonTitle={buttonTitle}
                    buttonurl={redirectURL}
                  />
                )}
              </div>
            </div>
            <FellowShipButton
              buttonStyle={commonStyles.fellowshipExpand}
              buttonImage={require("../../assets/arrow.svg")}
              onShow={toggle}
              isOpen={isOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FellowShipCard;
