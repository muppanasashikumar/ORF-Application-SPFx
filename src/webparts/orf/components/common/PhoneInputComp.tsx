/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
//import styles from "../styles/InputBox.module.scss";
import { Controller } from "react-hook-form";
import commonStyles from "../styles/Common.module.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
interface IInputProps {
  title?: string;
  mandatory: boolean;
  fieldName: string;
  typeOf?: string;
  internalName: string;
  _value?: string;
  setFormDataCb: any;
  register: any;
  errors?: any;
  cntTyp?: any;
  disabled?: boolean;
  IsBranchofStudyField?: boolean;
  index?: number;
  _setValue?: any;
  formDisable?: boolean;
  country: any;
  control: any;
  // baChecked?:boolean;
}

const PhoneInputComp = ({
  title,
  internalName,
  cntTyp,
  typeOf = "text",
  _value,
  setFormDataCb,
  register,
  errors,
  fieldName,
  disabled,
  IsBranchofStudyField,
  index,
  formDisable,
  country,
  control,
  _setValue,
}: //_setValue
IInputProps) => {
  React.useEffect(() => {});
  const field = cntTyp?.filter((eachField: any) => {
    return eachField.InternalName === internalName;
  });
  const isRequired = field[0] ? field[0].Required : false;

  let validPhoneNumber = false;
  let validationString: string = "";

  const validatePhoneNumber = (
    inputNumber: string,
    country: any,
    isDirty: boolean,
    phoneLength: number
  ) => {
    if (
      inputNumber &&
      inputNumber?.replace(country.dialCode, "")?.trim() === ""
    ) {
      if (isRequired) {
        validPhoneNumber = false;
        validationString = "Phone Number is not added";
        return false;
      } else {
        validPhoneNumber = true;
        return true;
      }
    } else {
      if (inputNumber?.replace(country.dialCode, "")?.trim().length > 0) {
        validPhoneNumber = true;
        return true;
      } else {
        validPhoneNumber = false;
        return false;
      }
    }
  };

  //console.log(errors);
  let disableinput: any;
  if (formDisable) {
    disableinput = true;
  } else {
    if (disabled) {
      disableinput = true;
    } else {
      if (country.length === 0) {
        disableinput = true;
      } else {
        disableinput = false;
      }
    }
  }
  let cd: string = "";
  if (country.length > 0) {
    cd = country[0].code.toLowerCase();
  }
  if (country === "") {
    cd = "";
  }

  const obj: { [key: string]: any } = {};

  return (
    <div className={commonStyles.input}>
      <label
        htmlFor={title}
        className={`${commonStyles.label} ${
          isRequired === true ? commonStyles.mandatoryFields : ""
        }`}
      >
        {title}
      </label>
      <Controller
        name={internalName}
        control={control}
        //defaultValue={_value}
        render={(props) => {
          let inputPropsObj = {};

          if (disabled) {
            inputPropsObj = {
              id: internalName,
              ref: props.field.ref,
              value: _value,
              internalName,
              isRequired,
              autoComplete: "none",
              "data-testid": `input-${internalName}-id`,
            };
          } else {
            inputPropsObj = {
              id: internalName,
              ref: props.field.ref,
              internalName,
              isRequired,
              autoComplete: "none",
              "data-testid": `input-${internalName}-id`,
            };
          }
          return (
            <PhoneInput
            placeholder=""
              onChange={(e, country, event, formattedValue) => {
                props.field.onChange(formattedValue);
                obj[internalName] = formattedValue;

                setFormDataCb(obj);
                //setPhone(e);
              }}
              inputProps={inputPropsObj}
              country={cd}
              value={_value}
              disabled={disableinput}
              disableDropdown={true}
              countryCodeEditable={false}
              isValid={(inputNumber, country: any, countries) => {
                const phoneLength = Math.ceil(
                  (
                    countries.filter(
                      (val: any) => val.dialCode === country.dialCode
                    )[0] as any
                  )?.format.length / 2
                );

                return validatePhoneNumber(
                  inputNumber,
                  country,
                  props.formState.isDirty,
                  phoneLength
                );
              }}
              specialLabel=""
            />
          );
        }}
        rules={{
          required: isRequired,
          validate: () => validPhoneNumber || validationString,
        }}
      />
      {errors[internalName]?.type === "required" && (
        <span style={{ color: "red", fontSize: "12px" }}>
          {title} is a mandatory field
        </span>
      )}
      {errors[internalName]?.message && (
        <span style={{ color: "red", fontSize: "12px" }}>
          {errors[internalName].message}
        </span>
      )}
    </div>
  );
};

export default PhoneInputComp;
