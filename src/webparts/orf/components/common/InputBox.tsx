/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import styles from "../styles/InputBox.module.scss";
import commonStyles from "../styles/Common.module.scss";

interface IInputProps {
  title?: string;
  mandatory: boolean;
  fieldName: string;
  typeOf?: string;
  internalName: string;
  value?: string;
  onChange: any;
  register: any;
  errors?: any;
  cntTyp?: any;
  disabled?: boolean;
  IsBranchofStudyField?: boolean;
  index?: number;
  _setValue?:any;
  formDisable?:boolean;
}

const InputBox = ({
  title,
  internalName,
  cntTyp,
  typeOf = "text",
  value,
  onChange,
  register,
  errors,
  fieldName,
  disabled,
  IsBranchofStudyField,
  index,
  formDisable
  //_setValue
}: IInputProps) => {
  const field = cntTyp?.filter((eachField: any) => {
    return eachField.InternalName === internalName;
  });
  const isRequired = field[0]?field[0].Required:false;

  //console.log(errors);
  const obj: { [key: string]: any } = {};
  let validationObj = {} as any;
 
  switch (fieldName) {
    case "phone":
    case "cellPhone":
      validationObj = {
        value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
        message:
          "Please enter a vaild phone number, country code is optional, phone number should be 10 digit long",
      };
      break;
    case "zipCode":
      validationObj = {
        value: /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/,
        message: "Please enter a vaild zip code, can contain -, 0-9, A-Z",
      };

      break;
      case "email":
      validationObj = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Invalid email format",
      };

      break;
  }
  //console.log(`${internalName} ${validationObj?.message}`);
  // if(IsBranchofStudyField){
  //   _setValue(`${internalName}-${index}`,value)
  // }
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
      <input
        id={title}
        className={styles.inputBox}
        type={typeOf}
        // value={value}
        disabled={formDisable ? formDisable : disabled?disabled:false}
        autoFocus={errors[internalName] ? true : false}
        name={`${index ? `${internalName}-${index}` : `${internalName}`}`}
        {...register(
          `${index ? `${internalName}-${index}` : `${internalName}`}`,
          {
            required: isRequired,
            pattern: validationObj,
          },
          { value: value  }
        )}
      
        onChange={(e: any) => {
          if (IsBranchofStudyField) {
            onChange(index, e.target.value, internalName);
          } else {
            obj[internalName] = e.target.value;
            onChange(obj);
          }
        }}
      />
      {errors[`${index ? `${internalName}-${index}` : `${internalName}`}`]
        ?.type === "required" && (
        <span style={{ color: "red", fontSize: "12px" }}>
          {title} is a mandatory field
        </span>
      )}

      {errors[`${index ? `${internalName}-${index}` : `${internalName}`}`]
        ?.message && (
        <span style={{ color: "red", fontSize: "12px" }}>
          {
            errors[`${index ? `${internalName}-${index}` : `${internalName}`}`]
              .message
          }
        </span>
      )}
    </div>
  );
};

export default InputBox;
