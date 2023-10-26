/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import inputBoxStyles from "../styles/InputBox.module.scss";
import commonStyles from "../styles/Common.module.scss";
import textAreaStyles from "../styles/TextArea.module.scss";

interface ITextAreaProps {
  title: string;

  setTextAreaText: any;
  textAreaText: any;
  mandatory?: boolean;
  fieldName: string;
  internalName: string;
  cntTyp?: any;
  onChange: any;
  register: any;
  errors?: any;
  disable?: boolean;
  value?: string;
  formDisable?: boolean;
}

const TextArea = ({
  title,
  disable,
  cntTyp,
  errors,
  internalName,
  value,
  register,
  onChange,
  formDisable,
  mandatory = false,
  fieldName,
}: ITextAreaProps) => {
  const obj: { [key: string]: any } = {};
  const field = cntTyp?.filter((eachField: any) => {
    return eachField.InternalName === internalName;
  });
  const isRequired = field[0] ? field[0].Required : false;
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
      <textarea
        style={{resize: 'none'}}
        id={title}
        className={`${inputBoxStyles.inputBox} ${textAreaStyles.textArea}`}
        // value={value}
        //name={fieldName}
        disabled={formDisable ? formDisable : disable ? disable : false}
        {...register(internalName, { required: isRequired }, { pattern: {} })}
        onChange={(e: any) => {
          obj[internalName] = e.target.value;
          onChange(obj);
        }}
      />
      {errors[internalName] && (
        <span style={{ color: "red", fontSize: "12px" }}>
          {title} is a mandetory field
        </span>
      )}
    </div>
  );
};

export default TextArea;
