/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import commonStyles from "../styles/Common.module.scss";
import Heading from "../common/Heading";
import InputBox from "../common/InputBox";
// import File from "../common/File";
//import Dropdown from "../common/Dropdown";
import fileStyles from '../styles/File.module.scss';
import FileClass from "../common/FileClass";
import CountryDropDown from "../common/CountryDropDown";
type DetailsofNominatorData = {
  RUC_FullnameOfYourNominator: string;
  RUC_CompanyInstitute: string;
  RUC_LetterOfNomination: any;
  RUC_Organisation_Ministry:string;
  RUC_NominatorCountry:string;
  FILE_Content_LetterofNomination:any;
  RUC_ApplicationStatus:string;
  
};

type DetailsofNominatorDataProps = DetailsofNominatorData & {
  updateFields: (fields: Partial<DetailsofNominatorData>) => void;
  allDataBinding: any;
  contentTypeField: any;
  register: any;
  errors: any;
  control: any;
  formDisable: boolean;
  userRole:string;
  wpContext:any
  siteurl:string;
  doclibname:string;
  author:string

};

const DetailsOfNominator = ({
  RUC_FullnameOfYourNominator,
  RUC_CompanyInstitute,
  RUC_LetterOfNomination,
  RUC_Organisation_Ministry,
  RUC_NominatorCountry,
  FILE_Content_LetterofNomination,
  RUC_ApplicationStatus,
  allDataBinding,
  contentTypeField,
  register,
  errors,
  updateFields,
  control,
  formDisable,
  userRole,
  wpContext,
  siteurl,
  doclibname,
  author,
}: DetailsofNominatorDataProps) => {
  const nominatorCountryCode = allDataBinding
  ? allDataBinding.countryCode
  : [{ value: "", label: "" ,code:""}];
  return (
    <>
      <div className={commonStyles.mainSection}>
        <Heading number={1} heading={"Personal Details"} appStatus={RUC_ApplicationStatus} _userRole={userRole}/>
        <div className={commonStyles.formSection}>
          <div className="d-flex justify-content-end">
            <span className={commonStyles.mandatoryField}>Mandatory Fields</span>
          </div>
          <div className={commonStyles.headingContainer}>
            <h2 className={commonStyles.heading}>Details of Nominator</h2>
          </div>
          <div className={`mb-4 ${commonStyles.gridContainer}`}>

            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_FullnameOfYourNominator";
            }).length > 0 && (
                <InputBox
                  title={"Full name of your Nominator"}
                  internalName="RUC_FullnameOfYourNominator"
                  fieldName={"fullName"}
                  value={RUC_FullnameOfYourNominator}
                  errors={errors}
                  mandatory={true}
                  onChange={updateFields}
                  register={register}
                  cntTyp={contentTypeField}
                  formDisable={formDisable}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_CompanyInstitute";
            }).length > 0 && (
                <InputBox
                  title={"Company/Institute"}
                  internalName="RUC_CompanyInstitute"
                  fieldName={"companyName"}
                  value={RUC_CompanyInstitute}
                  errors={errors}
                  mandatory={true}
                  onChange={updateFields}
                  cntTyp={contentTypeField}
                  register={register}
                  formDisable={formDisable}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_Organisation_Ministry";
            }).length > 0 && (
                <InputBox
                  title={"Organisation/Ministry"}
                  internalName="RUC_Organisation_Ministry"
                  fieldName={"Organisation/Ministry"}
                  value={RUC_Organisation_Ministry}
                  errors={errors}
                  mandatory={true}
                  onChange={updateFields}
                  cntTyp={contentTypeField}
                  register={register}
                  formDisable={formDisable}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_NominatorCountry";
            }).length > 0 && (
                <CountryDropDown
                  title={"NominatorCountry"}
                  internalName={"RUC_NominatorCountry"}
                  cntTyp={contentTypeField}
                  dropdownOptions={nominatorCountryCode}
                  setFormDataCb={updateFields}
                  isMulti={false}
                  drpvalue={RUC_NominatorCountry}
                  register={register}
                  errors={errors}
                  control={control}
                  formDisable={formDisable}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_LetterOfNomination";
            }).length > 0 && (
                <FileClass
                  title={"Letter of Nomination (PDF only)"}
                  internalName="RUC_LetterOfNomination"
                  cntTyp={contentTypeField}
                  register={register}
                  errors={errors}
                  fileContent={FILE_Content_LetterofNomination}
                  fileName={RUC_LetterOfNomination}
                  updateFields={updateFields}
                  filecontentstatename={"FILE_Content_LetterofNomination"}
                  control={control}
                  acceptedFileType={['application/pdf','application/octet-stream']}
                  fileStyles={fileStyles.label}
                  _formDisable={formDisable}
                  _wpcontext={wpContext} 
                  siteurl={siteurl}
                  doclibname={doclibname}
                  author={author}/>
              )}
          </div>

        </div>
      </div>
    </>
  );
};

export default DetailsOfNominator;
