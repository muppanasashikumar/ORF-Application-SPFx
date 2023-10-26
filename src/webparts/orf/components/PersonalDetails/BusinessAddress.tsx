/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable dot-notation */
/* eslint-disable prefer-const */
import React from "react";
import commonStyles from "../styles/Common.module.scss";
import Heading from "../common/Heading";
import InputBox from "../common/InputBox";
import Dropdown from "../common/Dropdown";
import TextArea from "../common/TextArea";
import CheckBox from "../common/CheckBox";
import CountryDropDown from "../common/CountryDropDown";
import PhoneInputComp from "../common/PhoneInputComp";
type BusinessAddress = {
  RUC_FieldofActivity: string;
  RUC_Employer: string;
  RUC_Department: string;
  RUC_Position: string;
  RUC_BAStreet: string;
  RUC_BACity: string;
  RUC_BAZipcode: string;
  RUC_BACountry: string;
  RUC_BAContinent: string;
  RUC_BAPhone: string;
  RUC_BACellPhone: string;
  RUC_BAEmail: string;

  RUC_PAStreet: string;
  RUC_2ndLineOfAddress: string;
  RUC_PAZipcode: string;
  RUC_PACity: string;
  RUC_PACountry: string;
  RUC_PAContinent: string;
  RUC_PAPhone: string;
  RUC_PACellPhone: string;
  RUC_PAEmail: string;
  RUC_ApplicationStatus:string,
  RUC_BAPACheckbox:boolean
};

type BusinessAddressProps = BusinessAddress & {
  updateFields: (fields: Partial<BusinessAddress>) => void;
  allDataBinding: any;
  contentTypeField: any;
  register: any;
  errors: any;
  control: any;
  _setValue: any;
  formDisable: boolean;
  userRole:string
};

const BusinessAddress = ({
  RUC_FieldofActivity,
  RUC_Employer,
  RUC_Department,
  RUC_Position,
  RUC_PAStreet,
  RUC_BAStreet,
  RUC_BACity,
  RUC_BAZipcode,
  RUC_BACountry,
  RUC_BAContinent,
  RUC_BAPhone,
  RUC_BACellPhone,
  RUC_BAEmail,
  RUC_2ndLineOfAddress,
  RUC_PAZipcode,
  RUC_PACity,
  RUC_PACountry,
  RUC_PAContinent,
  RUC_PAPhone,
  RUC_PACellPhone,
  RUC_PAEmail,
  RUC_BAPACheckbox,
  RUC_ApplicationStatus,
  allDataBinding,
  contentTypeField,
  register,
  errors,
  control,
  updateFields,
  _setValue,
  userRole,
  formDisable
}: BusinessAddressProps) => {
  const [_BAChecked, setBAChecked] = React.useState(RUC_BAPACheckbox);


  const country = allDataBinding
  ? allDataBinding.countryCode
  : [{ value: "", label: "" ,code:""}];

  const continent = allDataBinding
    ? allDataBinding.continent
    : [{ value: "", label: "" }];

  const fieldofActivity = allDataBinding
    ? allDataBinding.fieldOfActivity
    : [{ value: "", label: "" }];

  const handleSameAddresscb = (_checked: any) => {
    let obj: { [key: string]: any } = {};

    // console.log("cb called", _checked);
    setBAChecked(_checked);
    _setValue("RUC_BAPACheckbox", _checked, {
      shouldValidate: true,
    });
    obj["RUC_BAPACheckbox"] = _checked;
    updateFields(obj);
    // console.log("BAPACheckbox", RUC_BAPACheckbox);
    if (_checked) {
     
      _setValue("RUC_BAStreet", RUC_PAStreet, {
        shouldValidate: true,
      });
      obj["RUC_BAStreet"] = RUC_PAStreet;
      updateFields(obj);
      _setValue("RUC_BACity", RUC_PACity, {
        shouldValidate: true,
      });
      obj["RUC_BACity"] = RUC_PACity;
      updateFields(obj);
      _setValue("RUC_BAZipcode", RUC_PAZipcode, {
        shouldValidate: true,
      });
      obj["RUC_BAZipcode"] = RUC_PAZipcode;
      updateFields(obj);
      _setValue("RUC_BACountry", RUC_PACountry, {
        shouldValidate: true,
      });
      obj["RUC_BACountry"] = RUC_PACountry;
      updateFields(obj);

      _setValue("RUC_BAContinent", RUC_PAContinent, {
        shouldValidate: true,
      });
      obj["RUC_BAContinent"] = RUC_PAContinent;
      updateFields(obj);

      _setValue("RUC_BAPhone", RUC_PAPhone, {
        shouldValidate: true,
      });
      obj["RUC_BAPhone"] = RUC_PAPhone;
      updateFields(obj);

      _setValue("RUC_BACellPhone", RUC_PACellPhone, {
        shouldValidate: true,
      });
      obj["RUC_BACellPhone"] = RUC_PACellPhone;
      updateFields(obj);

      _setValue("RUC_BAEmail", RUC_PAEmail, {
        shouldValidate: true,
      });
      obj["RUC_BAEmail"] = RUC_PAEmail;
      updateFields(obj);
    }
   
  };

  return (
    <>
      <div className={commonStyles.mainSection}>
        <Heading number={1} heading={"Personal Details"} appStatus={RUC_ApplicationStatus} _userRole={userRole}/>
        <div className={commonStyles.formSection}>
          <div className="d-flex justify-content-end">
            <span className={commonStyles.mandatoryField}>Mandatory Fields</span>
          </div>
          <div className={commonStyles.headingContainer}>
            <h2 className={commonStyles.heading}>Business Address</h2>
          </div>
          <div className={`mb-4 ${commonStyles.gridContainer}`}>
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_FieldofActivity";
            }).length > 0 && (
                <Dropdown
                  title={"Field of Activity"}
                  dropdownOptions={fieldofActivity}
                  internalName="RUC_FieldofActivity"
                  cntTyp={contentTypeField}
                  drpvalue={RUC_FieldofActivity}
                  setFormDataCb={updateFields}
                  isMulti={false}
                  register={register}
                  errors={errors}
                  control={control}
                  formDisable={formDisable}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_Employer";
            }).length > 0 && (
                <InputBox
                  cntTyp={contentTypeField}
                  fieldName={"employer"}
                  internalName="RUC_Employer"
                  title={"Employer (Not applicable for Entrepreneurs)"}
                  value={RUC_Employer}
                  errors={errors}
                  mandatory={true}
                  onChange={updateFields}
                  register={register}
                  formDisable={formDisable}
                />
              )}

            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_Department";
            }).length > 0 && (
                <InputBox
                  fieldName={"department"}
                  internalName="RUC_Department"
                  title={"Department"}
                  errors={errors}
                  mandatory={true}
                  onChange={updateFields}
                  cntTyp={contentTypeField}
                  value={RUC_Department}
                  register={register}
                  formDisable={formDisable}
                />
              )}

            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_Position";
            }).length > 0 && (
                <InputBox
                  fieldName={"position"}
                  title={"Position"}
                  errors={errors}
                  internalName="RUC_Position"
                  mandatory={true}
                  onChange={updateFields}
                  cntTyp={contentTypeField}
                  value={RUC_Position}
                  register={register}
                  formDisable={formDisable}
                />
              )}
          </div>

          <CheckBox
            title="Same as Private Address"
            //value="true"
            checked={_BAChecked}
            internalName="BA_SameAS_PA"
            updatefields={updateFields}
            cbFunc={handleSameAddresscb}
            formDisable={formDisable}
          />
          <div className={`mt-4 ${commonStyles.gridContainer}`}>
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_BAStreet";
            }).length > 0 && (
                <TextArea
                  fieldName={"street"}
                  title={"Street"}
                  internalName="RUC_BAStreet"
                  mandatory={true}
                  cntTyp={contentTypeField}
                  value={RUC_BAStreet}
                  setTextAreaText={updateFields}
                  textAreaText={RUC_BAStreet}
                  errors={errors}
                  disable={_BAChecked}
                  onChange={updateFields}
                  register={register}
                  formDisable={formDisable}
                />
              )}

            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_BAZipcode";
            }).length > 0 && (
                <InputBox
                  fieldName={"zipCode"}
                  title={"Zipcode"}
                  internalName="RUC_BAZipcode"
                  mandatory={true}
                  errors={errors}
                  onChange={updateFields}
                  value={RUC_BAZipcode}
                  register={register}
                  cntTyp={contentTypeField}
                  disabled={_BAChecked}
                  formDisable={formDisable}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_BACity";
            }).length > 0 && (
                <InputBox
                  fieldName={"cityName"}
                  errors={errors}
                  title={"City"}
                  internalName="RUC_BACity"
                  cntTyp={contentTypeField}
                  mandatory={true}
                  onChange={updateFields}
                  value={RUC_BACity}
                  register={register}
                  disabled={_BAChecked}
                  formDisable={formDisable}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_BACountry";
            }).length > 0 && (
                <CountryDropDown
                  title={"Country"}
                  dropdownOptions={country}
                  internalName="RUC_BACountry"
                  cntTyp={contentTypeField}
                  drpvalue={RUC_BACountry}
                  setFormDataCb={updateFields}
                  isMulti={false}
                  register={register}
                  errors={errors}
                  control={control}
                  disabled={_BAChecked}
                  formDisable={formDisable}
                  _setValue={_setValue}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_BAContinent";
            }).length > 0 && (
                <Dropdown
                  title={"Continent"}
                  internalName="RUC_BAContinent"
                  cntTyp={contentTypeField}
                  dropdownOptions={continent}
                  drpvalue={RUC_BAContinent}
                  setFormDataCb={updateFields}
                  isMulti={false}
                  register={register}
                  errors={errors}
                  control={control}
                  disabled={_BAChecked}
                  formDisable={formDisable}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_BAPhone";
            }).length > 0 && (
                <PhoneInputComp
                  fieldName={"phone"}
                  title={"Phone"}
                  errors={errors}
                  internalName="RUC_BAPhone"
                  cntTyp={contentTypeField}
                  mandatory={true}
                  setFormDataCb={updateFields}
                  _value={RUC_BAPhone}
                  register={register}
                  disabled={_BAChecked}
                  formDisable={formDisable}
                  country={RUC_BACountry}
                  control={control}
                
                 
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_BACellPhone";
            }).length > 0 && (
                <PhoneInputComp
                  fieldName={"cellPhone"}
                  title={"Cell Phone"}
                  errors={errors}
                  cntTyp={contentTypeField}
                  internalName="RUC_BACellPhone"
                  mandatory={true}
                  setFormDataCb={updateFields}
                  _value={RUC_BACellPhone}
                  register={register}
                  disabled={_BAChecked}
                  formDisable={formDisable}
                  country={RUC_BACountry}
                  control={control}
                
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_BAEmail";
            }).length > 0 && (
                <InputBox
                  fieldName={"email"}
                  //typeOf={"email"}
                  title={"Email"}
                  internalName="RUC_BAEmail"
                  onChange={updateFields}
                  errors={errors}
                  cntTyp={contentTypeField}
                  value={RUC_BAEmail}
                  mandatory={true}
                  register={register}
                  disabled={_BAChecked}
                  formDisable={formDisable}
                />
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessAddress;
