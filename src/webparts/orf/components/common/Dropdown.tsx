/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Select from "react-select";
import dropDownStyles from "../styles/Dropdown.module.scss";
import commonStyles from "../styles/Common.module.scss";
import { Controller } from "react-hook-form";

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
  setValue?: any;
}

const Dropdown = ({
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
  setValue,
}: IDropdownProps) => {
  const [isMultiError, setIsMultiError] = useState(false);
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
          <Select
            maxMenuHeight={120}
            ref={selectref}
            menuShouldScrollIntoView={false}
            options={dropdownOptions}
            className={`${formDisable ? `${dropDownStyles.selectBox}  aria-errormessage ${dropDownStyles.disabledBackground}` : `${dropDownStyles.selectBox}  aria-errormessage`}`}
            blurInputOnSelect
            value={value}
            isDisabled={formDisable ? formDisable : disabled ? disabled : false}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                height: "fit-content",
                borderWidth: "0px",
                color: disabled ? 'black' : 'rgb(170, 170, 170)',
                backgroundColor: state.isDisabled ? 'rgba(239, 239, 239, 0.3)':'white',
                outline: state.isFocused ? "1px solid #e1cd72" : "",
                "&:focus": {
                  border: disabled? "1px solid #897a36": "1px solid #897a36 !important",
                  boxShadow: "none",
                },
                "&:hover": {
                  border: disabled? "1px solid #e1cd72": "none",
                  boxShadow: "none",
                },
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
                obj[internalName] = e ? [e] : [];
                setFormDataCb(obj);
                onChange(e);
                if (internalName === "RUC_Branch1") {
                  let obj: { [key: string]: any } = {};
                  setValue("RUC_Branch1Other", "", {
                    shouldValidate: true,
                  });

                  obj["RUC_Branch1Other"] = "";
                  setFormDataCb(obj);
                }
                if (internalName === "RUC_Branch2") {
                  let obj: { [key: string]: any } = {};
                  setValue("RUC_Branch2Other", "", {
                    shouldValidate: true,
                  });

                  obj["RUC_Branch2Other"] = "";
                  setFormDataCb(obj);
                }
                if (internalName === "RUC_Branch3") {
                  let obj: { [key: string]: any } = {};
                  setValue("RUC_Branch3Other", "", {
                    shouldValidate: true,
                  });

                  obj["RUC_Branch3Other"] = "";
                  setFormDataCb(obj);
                }
                if (internalName === "RUC_Branch4") {
                  let obj: { [key: string]: any } = {};
                  setValue("RUC_Branch4Other", "", {
                    shouldValidate: true,
                  });

                  obj["RUC_Branch4Other"] = "";
                  setFormDataCb(obj);
                }
              }

              if (action === "remove-value") {
                setTimeout(() => selectref.current.blur(), 1);
              }
            }}
          />
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

export default Dropdown;
