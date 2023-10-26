/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as React from "react";
import commonStyles from "../styles/Common.module.scss";
import Heading from "../common/Heading";
import InputBox from "../common/InputBox";
import Dropdown from "../common/Dropdown";
import TextArea from "../common/TextArea";
import CountryDropDown from "../common/CountryDropDown";
import PhoneInputComp from "../common/PhoneInputComp"
type PrivateAddress = {
  RUC_PAStreet: string;
  RUC_2ndLineOfAddress: string;
  RUC_PAZipcode: string;
  RUC_PACity: string;

  RUC_PACountry: string;
  RUC_PAContinent: string;
  RUC_PAPhone: string;
  RUC_PACellPhone: string;
  RUC_ApplicationStatus:string;
  RUC_PAEmail: string;
 
};

type PrivateAddressProps = PrivateAddress & {
  updateFields: (fields: Partial<PrivateAddress>) => void;
  allDataBinding: any;
  contentTypeField: any;
  register: any;
  errors: any;
  control: any;
  formDisable:boolean;
  userRole:string;
  _setValue:any

};

const PrivateAddress = ({
  RUC_PAStreet,
  RUC_2ndLineOfAddress,
  RUC_PAZipcode,
  RUC_PACity,
  RUC_PACountry,
  RUC_PAContinent,
  RUC_PAPhone,
  RUC_PACellPhone,
  RUC_PAEmail,
  RUC_ApplicationStatus,
  allDataBinding,
  contentTypeField,
  register,
  errors,
  control,
  updateFields,
  formDisable,
  userRole,
  _setValue
}: PrivateAddressProps) => {
  const country = allDataBinding
  ? allDataBinding.countryCode
  : [{ value: "", label: "" ,code:""}];

  const continent = allDataBinding
    ? allDataBinding.continent
    : [{ value: "", label: "" }];

  return (
    <>
      <div className={commonStyles.mainSection}>
        <Heading number={1} heading={"Personal Details"} appStatus={RUC_ApplicationStatus} _userRole={userRole}/>
        <div className={commonStyles.formSection}>
          <div className="d-flex justify-content-end">
            <span className={commonStyles.mandatoryField}>Mandatory Fields</span>
          </div>
          <div className={commonStyles.headingContainer}>
            <h2 className={commonStyles.heading}>Private Address</h2>
          </div>
          <div className={commonStyles.gridContainer}>
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_PAStreet";
            }).length > 0 && (
              <TextArea
                title={"Street"}
                fieldName={"street"}
                internalName="RUC_PAStreet"
                cntTyp={contentTypeField}
                value={RUC_PAStreet}
                setTextAreaText={updateFields}
                textAreaText={RUC_PAStreet}
                mandatory={true}
                errors={errors}
               
                onChange={updateFields} register={register}
                formDisable={formDisable}
              />
            )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_2ndLineOfAddress";
            }).length > 0 && (
              <TextArea
                title={"2nd Line of Address"}
                fieldName={"address"}
                internalName="RUC_2ndLineOfAddress"
                cntTyp={contentTypeField}
                value={RUC_2ndLineOfAddress}
                setTextAreaText={updateFields}
                textAreaText={RUC_2ndLineOfAddress}
                errors={errors}
               
                onChange={updateFields} register={register}
                formDisable={formDisable}
              />
            )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_PAZipcode";
            }).length > 0 && (
              <InputBox
              
                fieldName={"zipCode"}
                title={"Zipcode"}
                internalName="RUC_PAZipcode"
                value={RUC_PAZipcode}
                errors={errors}
                mandatory={true}
                cntTyp={contentTypeField}
                onChange={updateFields}
                register={register}
                formDisable={formDisable}
              />
            )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_PACity";
            }).length > 0 && (
              <InputBox
                fieldName={"cityName"}
                title={"City"}
                internalName="RUC_PACity"
                value={RUC_PACity}
                errors={errors}
                mandatory={true}
                cntTyp={contentTypeField}
                onChange={updateFields}
                register={register}
                formDisable={formDisable}
              />
            )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_PACountry";
            }).length > 0 && (
              <CountryDropDown
                title={"Country"}
                internalName="RUC_PACountry"
                cntTyp={contentTypeField}
                isMulti={false}
                dropdownOptions={country}
                drpvalue={RUC_PACountry}
                setFormDataCb={updateFields}
                register={register}
                errors={errors} 
                control={control}
                formDisable={formDisable}
                _setValue={_setValue}
              />
            )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_PAContinent";
            }).length > 0 && (
              <Dropdown
                title={"Continent"}
                internalName="RUC_PAContinent"
                cntTyp={contentTypeField}
                dropdownOptions={continent}
                drpvalue={RUC_PAContinent}
                setFormDataCb={updateFields}
                isMulti={false}
                register={register}
                errors={errors}
                control={control}
                formDisable={formDisable}
              />
            )}

            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_PAPhone";
            }).length > 0 && (
              <PhoneInputComp
               
                cntTyp={contentTypeField}
                fieldName={"phone"}
                title={"Phone"}
                mandatory={true}
                errors={errors}
                _value={RUC_PAPhone}
                internalName="RUC_PAPhone"
                setFormDataCb={updateFields}
                register={register}
                formDisable={formDisable}
                country={RUC_PACountry}
                control={control}
              />
            )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_PACellPhone";
            }).length > 0 && (
              <PhoneInputComp
                cntTyp={contentTypeField}
                fieldName={"cellPhone"}
                title={"Cell Phone"}
                _value={RUC_PACellPhone}
                errors={errors}
                internalName="RUC_PACellPhone"
                mandatory={true}
                setFormDataCb={updateFields}
                register={register}
                formDisable={formDisable}
                country={RUC_PACountry}
                control={control}
              />
            )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_PAEmail";
            }).length > 0 && (
              <InputBox
                cntTyp={contentTypeField}
                //typeOf={"email"}
                fieldName={"email"}
                title={"Email"}
                errors={errors}
                mandatory={true}
                internalName="RUC_PAEmail"
                onChange={updateFields}
                register={register}
                value={RUC_PAEmail}
                formDisable={formDisable}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateAddress;
