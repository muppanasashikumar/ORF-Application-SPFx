/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import commonStyles from "../styles/Common.module.scss";
import Heading from "../common/Heading";
import TextArea from "../common/TextArea";
import Dropdown from "../common/Dropdown";

type OtherQualificationsData = {
  RUC_OtherQualifications:string;
  RUC_FurtherQualifications:string;
  RUC_FieldofExpertise:string;
  RUC_ApplicationStatus:string
}

type OtherQualificationsDataProps = OtherQualificationsData & {
  updateFields: (fields: Partial<OtherQualificationsData>) => void;
  allDataBinding: any;
  contentTypeField: any;
  register: any;
  errors: any;
  control: any;
  formDisable?: boolean;
  userRole:string
}

const OtherQualifications = ({
  RUC_OtherQualifications,
  RUC_FurtherQualifications,
  RUC_FieldofExpertise,
  RUC_ApplicationStatus,
  allDataBinding,
  contentTypeField,
  register,
  errors,
  control,
  updateFields,
  formDisable,
  userRole
}: OtherQualificationsDataProps) => {

  const fieldofExpertise = allDataBinding
    ? allDataBinding.fieldOfExpertise
    : [{ value: "", label: "" }];

  return (
    <>
      <div className={commonStyles.mainSection}>
        <Heading number={2} heading={"Qualification Details"} appStatus={RUC_ApplicationStatus} _userRole={userRole} />
        <div className={commonStyles.formSection}>
          <div className="d-flex justify-content-end">
            <span className={commonStyles.mandatoryField}>Mandatory Fields</span>
          </div>
          <div className={commonStyles.headingContainer}>
            <h2 className={commonStyles.heading}>Other Qualifications</h2>
          </div>
          <div className={commonStyles.gridContainer}>
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_OtherQualifications";
            }).length > 0 && (
                <TextArea
                  internalName={"RUC_OtherQualifications"}
                  cntTyp={contentTypeField}
                  title={"Details of Qualifications"}
                  fieldName={"details"}
                  value={RUC_OtherQualifications}
                  setTextAreaText={updateFields}
                  textAreaText={RUC_OtherQualifications}
                  errors={errors}

                  onChange={updateFields} register={register}
                  formDisable={formDisable}
                />)}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_FurtherQualifications";
            }).length > 0 && (
                <TextArea
                  internalName={"RUC_FurtherQualifications"}
                  cntTyp={contentTypeField}
                  title={"Further Qualifications"}
                  fieldName={"furtherQualifications"}
                  value={RUC_FurtherQualifications}
                  setTextAreaText={updateFields}
                  textAreaText={RUC_FurtherQualifications}
                  errors={errors}

                  onChange={updateFields} register={register}
                  formDisable={formDisable}
                />)}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_FieldofExpertise";
            }).length > 0 && (
                <Dropdown
                  internalName={"RUC_FieldofExpertise"}
                  cntTyp={contentTypeField}
                  title={"Field of Expertise"}
                  dropdownOptions={fieldofExpertise}
                  drpvalue={RUC_FieldofExpertise}
                  setFormDataCb={updateFields}
                  isMulti={true}
                  register={register} errors={errors} control={control}
                  formDisable={formDisable}
                />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherQualifications;
