/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Select from "react-select";
import dropDownStyles from "../styles/Dropdown.module.scss";
import commonStyles from "../styles/Common.module.scss";
import { Controller } from "react-hook-form";
import ReactCountryFlag from "react-country-flag";
interface IDropdownProps {
  title: string;
  dropdownOptions: any;
  internalName: string;
  cntTyp?: any;
  drpvalue: any;
  setFormDataCb?: any;
  register: any;
  errors?: any;
  control?: any;
  isMulti: boolean;
  disabled?: boolean;
  IsBranchofStudyField?: boolean;
  index?: number;
  formDisable?: boolean;
  _setValue?:any
}

const CountryDropDown = ({
  title,
  disabled,
  dropdownOptions,
  cntTyp,
  internalName,
  isMulti,
  drpvalue,
  setFormDataCb,
  register,
  errors,
  control,
  IsBranchofStudyField,
  index,
  formDisable,
  _setValue
}: IDropdownProps) => {
  const [isMultiError, setIsMultiError] = useState(false);
  //const [countryCode]=useState(drpvalue && drpvalue[0].code?drpvalue[0].code.toString():"")
  const field = cntTyp?.filter((eachField: any) => {
    return eachField.InternalName === internalName;
  });
  const isRequired = field[0] ? field[0].Required : false;
  const selectref: any = React.useRef(null);
  const obj: { [key: string]: any } = {};
  //console.log(errors);

  return (
    <div className={commonStyles.input}>
      <label
        htmlFor="salutation"
        className={`${commonStyles.label} ${
          isRequired === true ? commonStyles.mandatoryFields : ""
        }`}
      >
        {title}
      </label>
      <Controller
        name={`${index ? `${internalName}-${index}` : `${internalName}`}`}
        control={control}
        defaultValue={drpvalue}
        render={({ field: { value, onChange } }) => (
          <>
            {/* {drpvalue.length > 0 && (
             
               
                <ReactCountryFlag
                  countryCode={drpvalue && drpvalue[0].code?drpvalue[0].code.toString():""}
                  svg
                  style={{
                    width: "2em",
                    height: "2em",
                  }}
                  title={drpvalue && drpvalue[0].code?drpvalue[0].code.toString():""}
                />
            
            )} */}
            <Select
              maxMenuHeight={120}
              ref={selectref}
              menuShouldScrollIntoView={false}
              options={dropdownOptions}
              className={`${dropDownStyles.selectBox}  aria-errormessage`}
              blurInputOnSelect
              value={value}
              isDisabled={
                formDisable ? formDisable : disabled ? disabled : false
              }
              formatOptionLabel={(option: any) => {
                //console.log(option);
                return (
                  <div style={{ display: "flex" }}>
                    {option.code && (
                      <ReactCountryFlag
                        countryCode={option.code}
                        svg
                        style={{
                          width: "1.15em",
                          height: "2.5em",
                          // margin: "0 10px",
                          //boxShadow: "3px 5px 7px 1px grey",
                        }}
                        title={option.code}
                      />
                    )}
                    <div style={{ paddingLeft: "25px", paddingTop: "8px" }}>
                      {option.label}
                    </div>
                  </div>
                );
              }}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  height: "fit-content",
                  borderWidth: "0px",
                  "&:focus": {
                    border: "1px solid #e1cd72",
                    boxShadow: "none",
                  },
                  // "&:hover": {
                  //   border: "1px solid #e1cd72",
                  //   boxShadow: "none",
                  // },
                }),
                placeholder: (defaultStyles) => {
                  return {
                    ...defaultStyles,
                    color: "#000",
                    fontWeight: 400,
                  };
                },
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#e1cd72", // Custom colour
                }),
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
              isMulti={isMulti}
              components={{
                IndicatorSeparator: () => null,
              }}
              noOptionsMessage={() => null}
              closeMenuOnSelect={isMulti ? false : true}
              onChange={(e: any, { action }) => {
                if (isMulti) {
                  if (e.length <= 4) {
                    obj[internalName] = e ? e : [];
                    setFormDataCb(obj);
                    onChange(e);
                  } else {
                    setIsMultiError(true);
                  }
                } else {
                  if (IsBranchofStudyField) {
                    setFormDataCb(index, e ? e : [], internalName);
                    onChange(e);
                  } else {
                    if(internalName==="RUC_BACountry"){
                      _setValue("RUC_BAPhone", "", {
                        shouldValidate: true,
                      });
                      obj["RUC_BAPhone"] = "";
                      setFormDataCb(obj);
                
                      _setValue("RUC_BACellPhone", "", {
                        shouldValidate: true,
                      });
                      obj["RUC_BACellPhone"] = "";
                      setFormDataCb(obj);
                    }
                    if(internalName==="RUC_PACountry"){
                      _setValue("RUC_PAPhone", "", {
                        shouldValidate: true,
                      });
                      obj["RUC_PAPhone"] = "";
                      setFormDataCb(obj);
                
                      _setValue("RUC_PACellPhone", "", {
                        shouldValidate: true,
                      });
                      obj["RUC_PACellPhone"] = "";
                      setFormDataCb(obj);
                    }
                    obj[internalName] = e ? [e] : [];
                    setFormDataCb(obj);
                    onChange(e);
                   
                  }
                }

                if (action === "remove-value") {
                  setTimeout(() => selectref.current.blur(), 1);
                }
              }}
            />
          </>
        )}
        rules={{ required: isRequired }}
      />
      {errors[`${index ? `${internalName}-${index}` : `${internalName}`}`]
        ?.type === "required" && (
        <span style={{ color: "red", fontSize: "12px" }}>
          {title} is a mandatory field
        </span>
      )}
      {isMultiError && (
        <span style={{ color: "red", fontSize: "12px" }}>
          {title} can have maximum 4 choices{" "}
        </span>
      )}
    </div>
  );
};

export default CountryDropDown;
