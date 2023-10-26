/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
//import styles from "../styles/DatePicker.module.scss";
//import inputBoxStyles from "../styles/InputBox.module.scss";
import commonStyles from "../styles/Common.module.scss";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Heading from "../common/Heading";
import Dropdown from "../common/Dropdown";
import InputBox from "../common/InputBox";
import DatePickerComp from "../common/DatePickerComp";
import CountryDropDown from "../common/CountryDropDown";

type PersonalData = {
  RUC_Salutation: string;
  RUC_Title: string;
  RUC_LastName: string;
  RUC_FirstName: string;
  RUC_DateofBirth: string;
  RUC_Nationality: string;
  RUC_OtherNationality: string;
  RUC_CurrentCountryofResidence: string;
  RUC_ApplicationStatus:string
};

type PersonalDataProps = PersonalData & {
  updateFields: (fields: Partial<PersonalData>) => void;
  allDataBinding: any;
  contentTypeField: any;
  register: any;
  errors: any;
  control: any;
  formDisable: boolean;
  userRole:string;
};

const PersonalData = ({
  RUC_Salutation,
  RUC_Title,
  RUC_LastName,
  RUC_FirstName,
  RUC_DateofBirth,
  RUC_Nationality,
  RUC_OtherNationality,
  RUC_CurrentCountryofResidence,
  allDataBinding,
  contentTypeField,
  RUC_ApplicationStatus,
  register,
  errors,
  control,
  userRole,
  updateFields,
  formDisable,
  
}: PersonalDataProps) => {
  // const _datepickerref = React.useRef();

  const salutation = allDataBinding
    ? allDataBinding.salutation
    : [{ value: "", label: "" }];

  // const nationality = allDataBinding
  //   ? allDataBinding.country
  //   : [{ value: "", label: "" }];
    const nationalityCode = allDataBinding
    ? allDataBinding.countryCode
    : [{ value: "", label: "" ,code:""}];

  const otherNationalityCode = allDataBinding
  ? allDataBinding.countryCode
  : [{ value: "", label: "" ,code:""}];

  const countryOfResidenceCode = allDataBinding
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
            <h2 className={commonStyles.heading}>Personal Data</h2>
          </div>
          <div className={commonStyles.gridContainer}>
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_Salutation";
            }).length > 0 && (
                <Dropdown
                  title={"Salutation"}
                  internalName={"RUC_Salutation"}
                  dropdownOptions={salutation}
                  cntTyp={contentTypeField}
                  drpvalue={RUC_Salutation}
                  isMulti={false}
                  setFormDataCb={updateFields}
                  register={register}
                  errors={errors}
                  control={control}
                  formDisable={formDisable}
                  
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_Title";
            }).length > 0 && (
                <InputBox
                  register={register}
                  title={"Title (ex. Dr., Prof., any other such title)"}
                  internalName={"RUC_Title"}
                  fieldName={"title"}
                  mandatory={true}
                  value={RUC_Title}
                  errors={errors}
                  cntTyp={contentTypeField}
                  onChange={updateFields}
                  formDisable={formDisable}
                 
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_LastName";
            }).length > 0 && (
                <InputBox
                  title={"Last Name"}
                  internalName={"RUC_LastName"}
                  fieldName={"lastName"}
                  mandatory={true}
                  value={RUC_LastName}
                  errors={errors}
                  cntTyp={contentTypeField}
                  onChange={updateFields}
                  register={register}
                  formDisable={formDisable}
                 
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_FirstName";
            }).length > 0 && (
                <InputBox
                  title={"First Name"}
                  internalName={"RUC_FirstName"}
                  fieldName={"firstName"}
                  mandatory={true}
                  value={RUC_FirstName}
                  errors={errors}
                  cntTyp={contentTypeField}
                  onChange={updateFields}
                  register={register}
                  formDisable={formDisable}
                  
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_DateofBirth";
            }).length > 0 && (
                <div className={commonStyles.input}>
                  <DatePickerComp
                    title={"Date of Birth"}
                    _value={RUC_DateofBirth}
                    _onChange={updateFields}
                    internalName={"RUC_DateofBirth"}
                    register={register}
                    errors={errors}
                    control={control}
                    cntTyp={contentTypeField}
                    formDisable={formDisable}
                    
                  />
                  {/* <input
                    ref={_datepickerref}
                    value={RUC_DateofBirth}
                    type="hidden"
                    {...register("RUC_DateofBirth", {
                      required: true
                    })}
                  />
                  {errors?.RUC_DateofBirth && (
                    <span style={{ "color": "red", "fontSize": "12px" }}>
                      Birthdate is required
                    </span>
                  )} */}
                </div>
              )}
            {/* {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_Nationality";
            }).length > 0 && (
                <Dropdown
                  title={"Nationality"}
                  internalName={"RUC_Nationality"}
                  cntTyp={contentTypeField}
                  dropdownOptions={nationality}
                  setFormDataCb={updateFields}
                  isMulti={false}
                  drpvalue={RUC_Nationality}
                  register={register}
                  errors={errors}
                  control={control}
                  formDisable={formDisable}
                />
              )} */}
               {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_Nationality";
            }).length > 0 && (

                <CountryDropDown
                  title={"Nationality"}
                  internalName={"RUC_Nationality"}
                  cntTyp={contentTypeField}
                  dropdownOptions={nationalityCode}
                  setFormDataCb={updateFields}
                  isMulti={false}
                  drpvalue={RUC_Nationality}
                  register={register}
                  errors={errors}
                  control={control}
                  formDisable={formDisable}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_OtherNationality";
            }).length > 0 && (
                <CountryDropDown
                  title={"Other Nationality"}
                  internalName={"RUC_OtherNationality"}
                  cntTyp={contentTypeField}
                  dropdownOptions={otherNationalityCode}
                  setFormDataCb={updateFields}
                  isMulti={false}
                  drpvalue={RUC_OtherNationality}
                  register={register}
                  errors={errors}
                  control={control}
                  formDisable={formDisable}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_CurrentCountryofResidence";
            }).length > 0 && (
                <CountryDropDown
                  title={"Current Country of Residence"}
                  internalName={"RUC_CurrentCountryofResidence"}
                  cntTyp={contentTypeField}
                  dropdownOptions={countryOfResidenceCode}
                  isMulti={false}
                  setFormDataCb={updateFields}
                  drpvalue={RUC_CurrentCountryofResidence}
                  register={register}
                  errors={errors}
                  control={control}
                  formDisable={formDisable}
                />
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalData;
