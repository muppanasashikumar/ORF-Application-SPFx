/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import styles from "../styles/DatePicker.module.scss";
import commonStyles from "../styles/Common.module.scss";
// import inputBoxStyles from "../styles/InputBox.module.scss";
import { Controller } from "react-hook-form";
import { DatePicker, IDatePicker, IDatePickerStyles } from "@fluentui/react";
import moment from "moment";

type DatePickerProps = {
  _value: string;
  _onChange: any;
  internalName: string;
  register: any;
  errors: any;
  control: any;
  cntTyp?: any;
  title: string;
  IsBranchofStudyField?: boolean;
  index?: number;
  fromDate?: any;
  formDisable?: boolean;
  _setFocus?: any;
};

const formatDate = (date?: any): string => {
  // console.log('Date', date);
  // const monthName = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];
  // if (!date) return "";
  // const month = monthName[moment(date).month()];
  // // + 1 because 0 indicates the first Month of the Year.
  // const day = moment(date).date();
  // const year = moment(date).year();
  const formattedDate = moment(date).format('DD-MMM-YYYY');
  return formattedDate;
};

const DatePickerComp = ({
  _value,
  title,
  _onChange,
  internalName,
  cntTyp,
  register,
  errors,
  control,
  IsBranchofStudyField,
  index,
  fromDate,
  formDisable,
}: DatePickerProps) => {
  const field = cntTyp?.filter((eachField: any) => {
    return eachField.InternalName === internalName;
  });
  
  const datePickerStyles: Partial<IDatePickerStyles> = {
    icon: [
      {
        color: "#e1cd72",
        bottom: "0px",
        top: "0px",
        height: "19px",
        padding: "3px 5px 0 0",
        lineHeight: "40px",
        fontWeight: "700",
      },
    ],
    root: [
      {
        maxWidth: 450,
        selectors: {
          ".ms-TextField-field": {
            height: "45px",
            borderRadius: "4px",
            border: "1px solid #eee6ba",
            fontFamily: "Euclid Flex",
            fontSize: "14px",
            color: "black",
          },
          ".ms-TextField-fieldGroup": {
            height: "45px",
            border: "none",
          },
        },
      },
    ],
  };
  //console.log("fromDate", fromDate);
  const isRequired = field[0] ? field[0].Required : false;
  const obj: { [key: string]: any } = {};
  const datePickerRef = React.useRef<IDatePicker>(null);
  let rulesObj = {};
  switch (internalName) {
    case "RUC_DateofBirth":
      rulesObj = {
        required: isRequired,
        validate: {
          futureDate: (_value: any) => {
            return (
              moment(_value).isBefore(moment()) ||
              "Future date not accepted"
            );
          },
          // ageCriteria: (_value: any) => {
          //   let diff_ms = Date.now() - new Date(_value).getTime();
          //   let age_dt = new Date(diff_ms);

          //   return (
          //     (Math.abs(age_dt.getUTCFullYear() - 1970) >= 28 &&
          //       Math.abs(age_dt.getUTCFullYear() - 1970) <= 35) ||
          //     "Age should be between 28 and 35 years"
          //   );

          // },
        },
      };
      datePickerRef.current?.focus();
      break;
    case "RUC_Branch1To":
    case "RUC_Branch2To":
    case "RUC_Branch3To":
    case "RUC_Branch4To":
      rulesObj = {
        required: isRequired,
        validate: {
          futureDate: (_value: any) => {
            return (

              moment(_value).isBefore(moment())
              ||
              "Future date not accepted"
            );
          },
          toDate: (_value: any) => {
            return (
             moment(_value).isAfter(moment(fromDate)) ||
              "To date should be greater than from date"
            );
            // return (
            //   (new Date().getFullYear() - new Date(_value).getFullYear() >=
            //     28 &&
            //     new Date().getFullYear() - new Date(_value).getFullYear() <=
            //       35) ||
            //   "Age should be between 28 and 35 years"
            // );
          },
        },
      };
      datePickerRef.current?.focus();
      break;
    default:
      rulesObj = {
        required: isRequired,
        validate: {
          futureDate: (_value: any) => {
            return (
             moment(_value).isBefore(moment()) ||
              "Future date not accepted"
            );
          },
        },
      };
      datePickerRef.current?.focus();
      break;
  }
  return (
    <div className={commonStyles.input}>
      <label
        htmlFor="dateofbirth"
        className={`${commonStyles.label} ${isRequired === true ? commonStyles.mandatoryFields : ""
          }`}
      >
        {title}
      </label>
      <Controller
        name={`${index ? `${internalName}-${index}` : `${internalName}`}`}
        control={control}
        rules={rulesObj}
        defaultValue={_value}
        render={({ field: { onChange, value } }) => {
          return (
            <DatePicker
              
              componentRef={datePickerRef}
              styles={datePickerStyles}
              allowTextInput
              formatDate={() => formatDate(_value)}
              ariaLabel="Select a date"
              disabled={formDisable ? formDisable : false}
              // defaultValue={new Date(value).toLocaleDateString()}
              value={_value !== "" ? new Date(_value) : undefined}
              onSelectDate={(date: Date) => {
                if (IsBranchofStudyField) {
                  obj[internalName] = date
                    ? moment(date).format('DD-MMM-YYYY')
                    : "";
                  _onChange(
                    index,
                    moment(date).format('DD-MMM-YYYY'),
                    internalName
                  );
                  onChange(date ? moment(date).format('DD-MMM-YYYY') : "");
                } else {
                  obj[internalName] = date
                    ? moment(date).format('DD-MMM-YYYY')
                    : "";
                  _onChange(obj);
                  onChange(date ? moment(date).format('DD-MMM-YYYY') : "");
                }
              }}
            />
          );
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
                ?.message
            }
          </span>
        )}
    </div>
  );
};

export default DatePickerComp;
