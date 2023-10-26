/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable dot-notation */
/* eslint-disable prefer-const */
import * as React from "react";
import commonStyles from "../styles/Common.module.scss";
import Heading from "../common/Heading";

// import CheckBox from "../common/CheckBox";

//import BranchOfStudyCommon from "../common/BranchOfStudyCommon";
import Dropdown from "../common/Dropdown";
import InputBox from "../common/InputBox";
import DatePickerComp from "../common/DatePickerComp";
import CheckBox from "../common/CheckBox";
import CountryDropDown from "../common/CountryDropDown";
type BranchOfStudyDataProps = {
  RUC_Branch1: any;
  RUC_Branch1Other: string;
  RUC_Branch1University: string;
  RUC_Branch1City: string;
  RUC_Branch1Country: any;
  RUC_Branch1Continent: any;
  RUC_Branch1From: string;
  RUC_Branch1To: string;
  RUC_Branch1Degree: string;
  RUC_Branch1DegreeOther: string;
  RUC_Branch1TitleofBA_MA: string;
  RUC_Branch2: any;
  RUC_Branch2Other: string;
  RUC_Branch2University: string;
  RUC_Branch2City: string;
  RUC_Branch2Country: any;
  RUC_Branch2Continent: any;
  RUC_Branch2From: string;
  RUC_Branch2To: string;
  RUC_Branch2Degree: string;
  RUC_Branch2DegreeOther: string;
  RUC_Branch2TitleofBA_MA: string;
  RUC_Branch3: any;
  RUC_Branch3Other: string;
  RUC_Branch3University: string;
  RUC_Branch3City: string;
  RUC_Branch3Country: any;
  RUC_Branch3Continent: any;
  RUC_Branch3From: string;
  RUC_Branch3To: string;
  RUC_Branch3Degree: string;
  RUC_Branch3DegreeOther: string;
  RUC_Branch3TitleofBA_MA: string;
  RUC_Branch4: any;
  RUC_Branch4Other: string;
  RUC_Branch4University: string;
  RUC_Branch4City: string;
  RUC_Branch4Country: any;
  RUC_Branch4Continent: any;
  RUC_Branch4From: string;
  RUC_Branch4To: string;
  RUC_Branch4Degree: string;
  RUC_Branch4DegreeOther: string;
  RUC_Branch4TitleofBA_MA: string;
  RUC_Branch2Checkbox: boolean;
  RUC_Branch3Checkbox: boolean;
  RUC_Branch4Checkbox: boolean;

  RUC_ApplicationStatus: string;
  updateFields: any;
  allDataBinding: any;
  contentTypeField: any;
  register: any;
  errors: any;
  control: any;
  _setValue: any;
  formDisable?: boolean;
  userRole: string;
  resetFields: any;
  _formData: any;
  _getValues: any;
  // addBranhofStudy: any;
  // removeBranchofStudy: any;
  // _branch2: boolean;
  // _branch3: boolean;
  // _branch4: boolean;
};

const BranchOfStudy = ({
  RUC_Branch1,
  RUC_Branch1Other,
  RUC_Branch1University,
  RUC_Branch1City,
  RUC_Branch1Country,
  RUC_Branch1Continent,
  RUC_Branch1Degree,
  RUC_Branch1DegreeOther,
  RUC_Branch1TitleofBA_MA,
  RUC_Branch1From,
  RUC_Branch1To,
  RUC_Branch2,
  RUC_Branch2Other,
  RUC_Branch2University,
  RUC_Branch2City,
  RUC_Branch2Country,
  RUC_Branch2Continent,
  RUC_Branch2Degree,
  RUC_Branch2DegreeOther,
  RUC_Branch2TitleofBA_MA,
  RUC_Branch2From,
  RUC_Branch2To,
  RUC_Branch3,
  RUC_Branch3Other,
  RUC_Branch3University,
  RUC_Branch3City,
  RUC_Branch3Country,
  RUC_Branch3Continent,
  RUC_Branch3Degree,
  RUC_Branch3DegreeOther,
  RUC_Branch3TitleofBA_MA,
  RUC_Branch3From,
  RUC_Branch3To,
  RUC_Branch4,
  RUC_Branch4Other,
  RUC_Branch4University,
  RUC_Branch4City,
  RUC_Branch4Country,
  RUC_Branch4Continent,
  RUC_Branch4Degree,
  RUC_Branch4DegreeOther,
  RUC_Branch4TitleofBA_MA,
  RUC_Branch4From,
  RUC_Branch4To,
  RUC_Branch2Checkbox,
  RUC_Branch3Checkbox,
  RUC_Branch4Checkbox,
  RUC_ApplicationStatus,
  allDataBinding,
  contentTypeField,
  register,
  errors,
  control,
  updateFields,

  _setValue,
  formDisable,
  userRole,
  resetFields,
  _formData,
  _getValues,
}: // removeBranchofStudy,
// addBranhofStudy,

BranchOfStudyDataProps) => {
  const [br2checked, setbr2Checked] = React.useState(RUC_Branch2Checkbox);
  const [br3checked, setbr3Checked] = React.useState(RUC_Branch3Checkbox);
  const [br4checked, setbr4Checked] = React.useState(RUC_Branch4Checkbox);
  const [branch1Other, setBranch1Other] = React.useState(false);
  const [branch2Other, setBranch2Other] = React.useState(false);
  const [branch3Other, setBranch3Other] = React.useState(false);
  const [branch4Other, setBranch4Other] = React.useState(false);
  React.useEffect(() => {
    // console.log("useEffect");
    if (
      RUC_Branch1?.length > 0 &&
      RUC_Branch1[0]?.label?.toLowerCase() === "other"
    ) {
      setBranch1Other(true);
    } else {
      setBranch1Other(false);
    }
    if (
      RUC_Branch2?.length > 0 &&
      RUC_Branch2[0]?.label?.toLowerCase() === "other"
    ) {
      setBranch2Other(true);
    } else {
      setBranch2Other(false);
    }
    if (
      RUC_Branch3?.length > 0 &&
      RUC_Branch3[0]?.label?.toLowerCase() === "other"
    ) {
      setBranch3Other(true);
    } else {
      setBranch3Other(false);
    }
    if (
      RUC_Branch4?.length > 0 &&
      RUC_Branch4[0]?.label?.toLowerCase() === "other"
    ) {
      setBranch4Other(true);
    } else {
      setBranch4Other(false);
    }
  }, [
    RUC_Branch1,
    RUC_Branch2,
    RUC_Branch3,
    RUC_Branch4,
    br2checked,
    br3checked,
    br4checked,
  ]);
  const country = allDataBinding
    ? allDataBinding.countryCode
    : [{ value: "", label: "", code: "" }];

  const continent = allDataBinding
    ? allDataBinding.continent
    : [{ value: "", label: "" }];

  const branchOptions = allDataBinding
    ? allDataBinding.branchofstudy
    : [{ value: "", label: "" }];

  const handlebranch2Change = (e: any, branch: string) => {
    if (branch === "branch2") {
      if (br3checked) {
        let obj: { [key: string]: any } = {};
        _setValue("RUC_Branch2Checkbox", true, {
          shouldValidate: true,
        });

        obj["RUC_Branch2Checkbox"] = true;
        updateFields(obj);

        setbr2Checked(true);
      } else {
        let obj: { [key: string]: any } = {};
        _setValue("RUC_Branch2Checkbox", e.target.checked, {
          shouldValidate: true,
        });
        obj["RUC_Branch2Checkbox"] = e.target.checked;
        updateFields(obj);

        if (!e.target.checked) {
          _setValue("RUC_Branch2", []);
          obj["RUC_Branch2"] = [];
          updateFields(obj);

          _setValue("RUC_Branch2Other", "");
          obj["RUC_Branch2Other"] = "";
          updateFields(obj);

          _setValue("RUC_Branch2University", "");
          obj["RUC_Branch2University"] = "";
          updateFields(obj);

          _setValue("RUC_Branch2City", "");
          obj["RUC_Branch2City"] = "";
          updateFields(obj);

          _setValue("RUC_Branch2Country", []);
          obj["RUC_Branch2Country"] = [];
          updateFields(obj);

          _setValue("RUC_Branch2Continent", []);
          obj["RUC_Branch2Continent"] = [];
          updateFields(obj);

          _setValue("RUC_Branch2Degree", "");
          obj["RUC_Branch2Degree"] = "";
          updateFields(obj);

          _setValue("RUC_Branch2DegreeOther", "");
          obj["RUC_Branch2DegreeOther"] = "";
          updateFields(obj);

          _setValue("RUC_Branch2TitleofBA_MA", "");
          obj["RUC_Branch2TitleofBA_MA"] = "";
          updateFields(obj);

          _setValue("RUC_Branch2From", "");
          obj["RUC_Branch2From"] = "";
          updateFields(obj);
 
          _setValue("RUC_Branch2To", "");
          obj["RUC_Branch2To"] = "";
          updateFields(obj);

          const newData={ ..._formData,
            RUC_Branch2: [],
            RUC_Branch2Other: "",
            RUC_Branch2University: "",
            RUC_Branch2City: "",
            RUC_Branch2Country: [],
            RUC_Branch2Continent: [],
            RUC_Branch2From: "",
            RUC_Branch2To: "",
            RUC_Branch2Degree: "",
            RUC_Branch2DegreeOther: "",
            RUC_Branch2TitleofBA_MA: "",
          }
          resetFields(
            {
              ...newData
            })
        }
        setbr2Checked(e.target.checked);
      }
    }
  };
  const handlebranch3Change = (e: any, branch: string) => {
    if (branch === "branch3") {
      if (br4checked) {
        let obj: { [key: string]: any } = {};
        _setValue("RUC_Branch3Checkbox", true, {
          shouldValidate: true,
        });

        obj["RUC_Branch3Checkbox"] = true;
        updateFields(obj);

        setbr3Checked(true);
      } else {
        let obj: { [key: string]: any } = {};
        _setValue("RUC_Branch3Checkbox", e.target.checked, {
          shouldValidate: true,
        });
        obj["RUC_Branch3Checkbox"] = e.target.checked;
        updateFields(obj);

        if (!e.target.checked) {
          _setValue("RUC_Branch3", []);
          obj["RUC_Branch3"] = [];
          updateFields(obj);

          _setValue("RUC_Branch3Other", "");
          obj["RUC_Branch3Other"] = "";
          updateFields(obj);

          _setValue("RUC_Branch3University", "");
          obj["RUC_Branch3University"] = "";
          updateFields(obj);

          _setValue("RUC_Branch3City", "");
          obj["RUC_Branch3City"] = "";
          updateFields(obj);

          _setValue("RUC_Branch3Country", []);
          obj["RUC_Branch3Country"] = [];
          updateFields(obj);

          _setValue("RUC_Branch3Continent", []);
          obj["RUC_Branch3Continent"] = [];
          updateFields(obj);

          _setValue("RUC_Branch3Degree", "");
          obj["RUC_Branch3Degree"] = "";
          updateFields(obj);

          _setValue("RUC_Branch3DegreeOther", "");
          obj["RUC_Branch3DegreeOther"] = "";
          updateFields(obj);

          _setValue("RUC_Branch3TitleofBA_MA", "");
          obj["RUC_Branch3TitleofBA_MA"] = "";
          updateFields(obj);

          _setValue("RUC_Branch3From", "");
          obj["RUC_Branch3From"] = "";
          updateFields(obj);

          _setValue("RUC_Branch3To", "");
          obj["RUC_Branch3To"] = "";
          updateFields(obj);

          const newData={ ..._formData,
            RUC_Branch3: [],
            RUC_Branch3Other: "",
            RUC_Branch3University: "",
            RUC_Branch3City: "",
            RUC_Branch3Country: [],
            RUC_Branch3Continent: [],
            RUC_Branch3From: "",
            RUC_Branch3To: "",
            RUC_Branch3Degree: "",
            RUC_Branch3DegreeOther: "",
            RUC_Branch3TitleofBA_MA: "",
          }
          resetFields(
            {
              ...newData
            })
        }
        setbr3Checked(e.target.checked);
      }
    }
  };
  const handlebranch4Change = (e: any, branch: string) => {
    if (branch === "branch4") {
      let obj: { [key: string]: any } = {};
      _setValue("RUC_Branch4Checkbox", e.target.checked, {
        shouldValidate: true,
      });
      obj["RUC_Branch4Checkbox"] = e.target.checked;
      updateFields(obj);

      if (!e.target.checked) {
        _setValue("RUC_Branch4", []);
        obj["RUC_Branch4"] = [];
        updateFields(obj);

        _setValue("RUC_Branch4Other", "");
        obj["RUC_Branch4Other"] = "";
        updateFields(obj);

        _setValue("RUC_Branch4University", "");
        obj["RUC_Branch4University"] = "";
        updateFields(obj);

        _setValue("RUC_Branch4City", "");
        obj["RUC_Branch4City"] = "";
        updateFields(obj);

        _setValue("RUC_Branch4Country", []);
        obj["RUC_Branch4Country"] = [];
        updateFields(obj);

        _setValue("RUC_Branch4Continent", []);
        obj["RUC_Branch4Continent"] = [];
        updateFields(obj);

        _setValue("RUC_Branch4Degree", "");
        obj["RUC_Branch4Degree"] = "";
        updateFields(obj);

        _setValue("RUC_Branch4DegreeOther", "");
        obj["RUC_Branch4DegreeOther"] = "";
        updateFields(obj);

        _setValue("RUC_Branch4TitleofBA_MA", "");
        obj["RUC_Branch4TitleofBA_MA"] = "";
        updateFields(obj);

        _setValue("RUC_Branch4From", "");
        obj["RUC_Branch4From"] = "";
        updateFields(obj);

        _setValue("RUC_Branch4To", "");
        obj["RUC_Branch4To"] = "";
        updateFields(obj);
        const newData={ ..._formData,
          RUC_Branch4: [],
          RUC_Branch4Other: "",
          RUC_Branch4University: "",
          RUC_Branch4City: "",
          RUC_Branch4Country: [],
          RUC_Branch4Continent: [],
          RUC_Branch4From: "",
          RUC_Branch4To: "",
          RUC_Branch4Degree: "",
          RUC_Branch4DegreeOther: "",
          RUC_Branch4TitleofBA_MA: "",
        }
        resetFields(
          {
            ...newData
          }
        );
      }
      setbr4Checked(e.target.checked);
    }
  };

  return (
    <>
      <div className={commonStyles.mainSection}>
        <Heading
          heading={"Qualification Details"}
          appStatus={RUC_ApplicationStatus}
          _userRole={userRole}
        />

        <>
          <div className={commonStyles.formSection}>
            <div className="d-flex justify-content-end">
              <span className={commonStyles.mandatoryField}>
                Mandatory Fields
              </span>
            </div>
            <div className={commonStyles.headingContainer}>
              <h2 className={commonStyles.heading}>Branch of Study - 1</h2>
            </div>
            <div className={commonStyles.gridContainer}>
              {contentTypeField?.filter((eachField: any) => {
                return eachField.InternalName === "RUC_Branch1";
              }).length > 0 && (
                <Dropdown
                  title={"Branch"}
                  internalName={"RUC_Branch1"}
                  cntTyp={contentTypeField}
                  dropdownOptions={branchOptions}
                  drpvalue={RUC_Branch1}
                  setFormDataCb={updateFields}
                  isMulti={false}
                  register={register}
                  errors={errors}
                  control={control}
                  formDisable={formDisable}
                  setValue={_setValue}
                  //IsBranchofStudyField={true}
                  //index={index}
                />
              )}
              {contentTypeField?.filter((eachField: any) => {
                return eachField.InternalName === "RUC_Branch1Other";
              }).length > 0 &&
                branch1Other && (
                  <InputBox
                    fieldName={"branchOther"}
                    title={"Branch: Other"}
                    cntTyp={contentTypeField}
                    internalName={"RUC_Branch1Other"}
                    errors={errors}
                    mandatory={true}
                    onChange={updateFields}
                    value={RUC_Branch1Other}
                    register={register}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index+1}
                    // _setValue={_setValue}
                  />
                )}
            </div>
          </div>
          <div className={commonStyles.formSection}>
            <div className={commonStyles.headingContainer}>
              <h2 className={commonStyles.heading}>City and Period of Study</h2>
            </div>
            <div className={commonStyles.gridContainer}>
              {contentTypeField?.filter((eachField: any) => {
                return eachField.InternalName === "RUC_Branch1University";
              }).length > 0 && (
                <InputBox
                  fieldName={"univeristy"}
                  title={"University"}
                  cntTyp={contentTypeField}
                  internalName={"RUC_Branch1University"}
                  mandatory={true}
                  onChange={updateFields}
                  errors={errors}
                  value={RUC_Branch1University}
                  register={register}
                  formDisable={formDisable}
                  //IsBranchofStudyField={true}
                  // index={index+1}
                  // _setValue={_setValue}
                />
              )}
              {contentTypeField?.filter((eachField: any) => {
                return eachField.InternalName === "RUC_Branch1City";
              }).length > 0 && (
                <InputBox
                  fieldName={"cityName"}
                  title={"City"}
                  cntTyp={contentTypeField}
                  internalName={"RUC_Branch1City"}
                  value={RUC_Branch1City}
                  onChange={updateFields}
                  mandatory={true}
                  errors={errors}
                  register={register}
                  formDisable={formDisable}
                  //IsBranchofStudyField={true}
                  // index={index+1}
                  // _setValue={_setValue}
                />
              )}
              {contentTypeField?.filter((eachField: any) => {
                return eachField.InternalName === "RUC_Branch1Country";
              }).length > 0 && (
                <CountryDropDown
                  title={"Country"}
                  dropdownOptions={country}
                  internalName={"RUC_Branch1Country"}
                  cntTyp={contentTypeField}
                  drpvalue={RUC_Branch1Country}
                  setFormDataCb={updateFields}
                  isMulti={false}
                  register={register}
                  errors={errors}
                  control={control}
                  formDisable={formDisable}
                  //IsBranchofStudyField={true}
                  // index={index}
                />
              )}
              {contentTypeField?.filter((eachField: any) => {
                return eachField.InternalName === "RUC_Branch1Continent";
              }).length > 0 && (
                <Dropdown
                  title={"Continent"}
                  dropdownOptions={continent}
                  internalName={"RUC_Branch1Continent"}
                  cntTyp={contentTypeField}
                  setFormDataCb={updateFields}
                  drpvalue={RUC_Branch1Continent}
                  isMulti={false}
                  register={register}
                  errors={errors}
                  control={control}
                  formDisable={formDisable}
                  //IsBranchofStudyField={true}
                  // index={index}
                />
              )}
              {contentTypeField?.filter((eachField: any) => {
                return eachField.InternalName === "RUC_Branch1From";
              }).length > 0 && (
                <DatePickerComp
                  title={"From"}
                  cntTyp={contentTypeField}
                  _value={RUC_Branch1From}
                  _onChange={updateFields}
                  internalName={"RUC_Branch1From"}
                  register={register}
                  errors={errors}
                  control={control}
                  formDisable={formDisable}
                  //IsBranchofStudyField={true}
                  // index={index}
                />
              )}
              {contentTypeField?.filter((eachField: any) => {
                return eachField.InternalName === "RUC_Branch1To";
              }).length > 0 && (
                <DatePickerComp
                  title={"To"}
                  cntTyp={contentTypeField}
                  _value={RUC_Branch1To}
                  _onChange={updateFields}
                  internalName={"RUC_Branch1To"}
                  register={register}
                  errors={errors}
                  control={control}
                  fromDate={RUC_Branch1From}
                  formDisable={formDisable}
                  //IsBranchofStudyField={true}
                  //index={index}
                />
              )}
              {contentTypeField?.filter((eachField: any) => {
                return eachField.InternalName === "RUC_Branch1Degree";
              }).length > 0 && (
                <InputBox
                  fieldName={"RUC_Branch1Degree"}
                  title={"Degree"}
                  cntTyp={contentTypeField}
                  internalName={"RUC_Branch1Degree"}
                  value={RUC_Branch1Degree}
                  onChange={updateFields}
                  mandatory={true}
                  errors={errors}
                  register={register}
                  formDisable={formDisable}
                  //IsBranchofStudyField={true}
                  // index={index+1}
                  // _setValue={_setValue}
                />
              )}

              {contentTypeField?.filter((eachField: any) => {
                return eachField.InternalName === "RUC_Branch1DegreeOther";
              }).length > 0 && (
                <InputBox
                  fieldName={"degreeOther"}
                  title={"Degree: Other"}
                  cntTyp={contentTypeField}
                  internalName={"RUC_Branch1DegreeOther"}
                  onChange={updateFields}
                  mandatory={false}
                  value={RUC_Branch1DegreeOther}
                  errors={errors}
                  register={register}
                  formDisable={formDisable}
                  //IsBranchofStudyField={true}
                  // index={index+1}
                  // _setValue={_setValue}
                />
              )}
              {contentTypeField?.filter((eachField: any) => {
                return eachField.InternalName === "RUC_Branch1TitleofBA_MA";
              }).length > 0 && (
                <InputBox
                  fieldName={"titleBAMA"}
                  title={"Title of Degree"}
                  cntTyp={contentTypeField}
                  internalName={"RUC_Branch1TitleofBA_MA"}
                  errors={errors}
                  mandatory={true}
                  onChange={updateFields}
                  value={RUC_Branch1TitleofBA_MA}
                  register={register}
                  formDisable={formDisable}
                  //IsBranchofStudyField={true}
                  // index={index+1}
                  // _setValue={_setValue}
                />
              )}
            </div>
          </div>
        </>
        <div className={`mb-3 ${commonStyles.checkBoxContainer}`}>
          <CheckBox
            title="Add a Branch of Study - 2"
            checked={br2checked}
            value={"Branch2"}
            updatefields={undefined}
            internalName={"RUC_Branch2Checkbox"}
            handleChange={(e: any) => handlebranch2Change(e, "branch2")}
            formDisable={formDisable}
            // ariallabel={`${
            //   index === 0
            //     ? "You have to fill at least one Branh of study."
            //     : "Your values will be removed."
            // }`}
          />
        </div>
        {br2checked && (
          <>
            <>
              <div className={commonStyles.formSection}>
                <div className={commonStyles.headingContainer}>
                  <h2 className={commonStyles.heading}>Branch of Study - 2</h2>
                </div>
                <div className={commonStyles.gridContainer}>
                  {contentTypeField?.filter((eachField: any) => {
                    return eachField.InternalName === "RUC_Branch2";
                  }).length > 0 && (
                    <Dropdown
                      title={"Branch"}
                      internalName={"RUC_Branch2"}
                      cntTyp={contentTypeField}
                      dropdownOptions={branchOptions}
                      drpvalue={RUC_Branch2}
                      setFormDataCb={updateFields}
                      isMulti={false}
                      register={register}
                      errors={errors}
                      control={control}
                      formDisable={formDisable}
                      setValue={_setValue}
                      //IsBranchofStudyField={true}
                      //index={index}
                    />
                  )}
                  {contentTypeField?.filter((eachField: any) => {
                    return eachField.InternalName === "RUC_Branch2Other";
                  }).length > 0 &&
                    branch2Other && (
                      <InputBox
                        fieldName={"branchOther"}
                        title={"Branch: Other"}
                        cntTyp={contentTypeField}
                        internalName={"RUC_Branch2Other"}
                        errors={errors}
                        mandatory={true}
                        onChange={updateFields}
                        value={RUC_Branch2Other}
                        register={register}
                        formDisable={formDisable}
                        //IsBranchofStudyField={true}
                        // index={index+1}
                        // _setValue={_setValue}
                      />
                    )}
                </div>
              </div>
              <div className={commonStyles.formSection}>
                <div className={commonStyles.headingContainer}>
                  <h2 className={commonStyles.heading}>
                    City and Period of Study
                  </h2>
                </div>
                <div className={commonStyles.gridContainer}>
                  {contentTypeField?.filter((eachField: any) => {
                    return eachField.InternalName === "RUC_Branch2University";
                  }).length > 0 && (
                    <InputBox
                      fieldName={"univeristy"}
                      title={"University"}
                      cntTyp={contentTypeField}
                      internalName={"RUC_Branch2University"}
                      mandatory={true}
                      onChange={updateFields}
                      errors={errors}
                      value={RUC_Branch2University}
                      register={register}
                      formDisable={formDisable}
                      //IsBranchofStudyField={true}
                      // index={index+1}
                      // _setValue={_setValue}
                    />
                  )}
                  {contentTypeField?.filter((eachField: any) => {
                    return eachField.InternalName === "RUC_Branch2City";
                  }).length > 0 && (
                    <InputBox
                      fieldName={"cityName"}
                      title={"City"}
                      cntTyp={contentTypeField}
                      internalName={"RUC_Branch2City"}
                      value={RUC_Branch2City}
                      onChange={updateFields}
                      mandatory={true}
                      errors={errors}
                      register={register}
                      formDisable={formDisable}
                      //IsBranchofStudyField={true}
                      // index={index+1}
                      // _setValue={_setValue}
                    />
                  )}
                  {contentTypeField?.filter((eachField: any) => {
                    return eachField.InternalName === "RUC_Branch2Country";
                  }).length > 0 && (
                    <CountryDropDown
                      title={"Country"}
                      dropdownOptions={country}
                      internalName={"RUC_Branch2Country"}
                      cntTyp={contentTypeField}
                      drpvalue={RUC_Branch2Country}
                      setFormDataCb={updateFields}
                      isMulti={false}
                      register={register}
                      errors={errors}
                      control={control}
                      formDisable={formDisable}
                      //IsBranchofStudyField={true}
                      // index={index}
                    />
                  )}
                  {contentTypeField?.filter((eachField: any) => {
                    return eachField.InternalName === "RUC_Branch2Continent";
                  }).length > 0 && (
                    <Dropdown
                      title={"Continent"}
                      dropdownOptions={continent}
                      internalName={"RUC_Branch2Continent"}
                      cntTyp={contentTypeField}
                      setFormDataCb={updateFields}
                      drpvalue={RUC_Branch2Continent}
                      isMulti={false}
                      register={register}
                      errors={errors}
                      control={control}
                      formDisable={formDisable}
                      //IsBranchofStudyField={true}
                      // index={index}
                    />
                  )}
                  {contentTypeField?.filter((eachField: any) => {
                    return eachField.InternalName === "RUC_Branch2From";
                  }).length > 0 && (
                    <DatePickerComp
                      title={"From"}
                      cntTyp={contentTypeField}
                      _value={RUC_Branch2From}
                      _onChange={updateFields}
                      internalName={"RUC_Branch2From"}
                      register={register}
                      errors={errors}
                      control={control}
                      formDisable={formDisable}
                      
                      //IsBranchofStudyField={true}
                      // index={index}
                    />
                  )}
                  {contentTypeField?.filter((eachField: any) => {
                    return eachField.InternalName === "RUC_Branch2To";
                  }).length > 0 && (
                    <DatePickerComp
                      title={"To"}
                      cntTyp={contentTypeField}
                      _value={RUC_Branch2To}
                      _onChange={updateFields}
                      internalName={"RUC_Branch2To"}
                      register={register}
                      errors={errors}
                      control={control}
                      fromDate={RUC_Branch2From}
                      formDisable={formDisable}
                      //IsBranchofStudyField={true}
                      //index={index}
                    />
                  )}
                  {contentTypeField?.filter((eachField: any) => {
                    return eachField.InternalName === "RUC_Branch2Degree";
                  }).length > 0 && (
                    <InputBox
                      fieldName={"RUC_Branch2Degree"}
                      title={"Degree"}
                      cntTyp={contentTypeField}
                      internalName={"RUC_Branch2Degree"}
                      value={RUC_Branch2Degree}
                      onChange={updateFields}
                      mandatory={true}
                      errors={errors}
                      register={register}
                      formDisable={formDisable}
                      //IsBranchofStudyField={true}
                      // index={index+1}
                      // _setValue={_setValue}
                    />
                  )}

                  {contentTypeField?.filter((eachField: any) => {
                    return eachField.InternalName === "RUC_Branch2DegreeOther";
                  }).length > 0 && (
                    <InputBox
                      fieldName={"degreeOther"}
                      title={"Degree: Other"}
                      cntTyp={contentTypeField}
                      internalName={"RUC_Branch2DegreeOther"}
                      onChange={updateFields}
                      mandatory={false}
                      value={RUC_Branch2DegreeOther}
                      errors={errors}
                      register={register}
                      formDisable={formDisable}
                      //IsBranchofStudyField={true}
                      // index={index+1}
                      // _setValue={_setValue}
                    />
                  )}
                  {contentTypeField?.filter((eachField: any) => {
                    return eachField.InternalName === "RUC_Branch2TitleofBA_MA";
                  }).length > 0 && (
                    <InputBox
                      fieldName={"titleBAMA"}
                      title={"Title of Degree"}
                      cntTyp={contentTypeField}
                      internalName={"RUC_Branch2TitleofBA_MA"}
                      errors={errors}
                      mandatory={true}
                      onChange={updateFields}
                      value={RUC_Branch2TitleofBA_MA}
                      register={register}
                      formDisable={formDisable}
                      //IsBranchofStudyField={true}
                      // index={index+1}
                      // _setValue={_setValue}
                    />
                  )}
                </div>
              </div>
            </>
            <div className={`mb-3 ${commonStyles.checkBoxContainer}`}>
              <CheckBox
                title="Add a Branch of Study - 3"
                checked={br3checked}
                value={"Branch3"}
                updatefields={undefined}
                internalName={"RUC_Branch3Checkbox"}
                handleChange={(e: any) => handlebranch3Change(e, "branch3")}
                formDisable={formDisable}
                // ariallabel={`${
                //   index === 0
                //     ? "You have to fill at least one Branh of study."
                //     : "Your values will be removed."
                // }`}
              />
            </div>
          </>
        )}
        {br3checked && (
          <>
            <div className={commonStyles.formSection}>
              <div className={commonStyles.headingContainer}>
                <h2 className={commonStyles.heading}>Branch of Study - 3</h2>
              </div>
              <div className={commonStyles.gridContainer}>
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch3";
                }).length > 0 && (
                  <Dropdown
                    title={"Branch"}
                    internalName={"RUC_Branch3"}
                    cntTyp={contentTypeField}
                    dropdownOptions={branchOptions}
                    drpvalue={RUC_Branch3}
                    setFormDataCb={updateFields}
                    isMulti={false}
                    register={register}
                    errors={errors}
                    control={control}
                    formDisable={formDisable}
                    setValue={_setValue}
                    //IsBranchofStudyField={true}
                    //index={index}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch3Other";
                }).length > 0 &&
                  branch3Other && (
                    <InputBox
                      fieldName={"branchOther"}
                      title={"Branch: Other"}
                      cntTyp={contentTypeField}
                      internalName={"RUC_Branch3Other"}
                      errors={errors}
                      mandatory={true}
                      onChange={updateFields}
                      value={RUC_Branch3Other}
                      register={register}
                      formDisable={formDisable}
                      //IsBranchofStudyField={true}
                      // index={index+1}
                      // _setValue={_setValue}
                    />
                  )}
              </div>
            </div>
            <div className={commonStyles.formSection}>
              <div className={commonStyles.headingContainer}>
                <h2 className={commonStyles.heading}>
                  City and Period of Study
                </h2>
              </div>
              <div className={commonStyles.gridContainer}>
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch3University";
                }).length > 0 && (
                  <InputBox
                    fieldName={"univeristy"}
                    title={"University"}
                    cntTyp={contentTypeField}
                    internalName={"RUC_Branch3University"}
                    mandatory={true}
                    onChange={updateFields}
                    errors={errors}
                    value={RUC_Branch3University}
                    register={register}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index+1}
                    // _setValue={_setValue}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch3City";
                }).length > 0 && (
                  <InputBox
                    fieldName={"cityName"}
                    title={"City"}
                    cntTyp={contentTypeField}
                    internalName={"RUC_Branch3City"}
                    value={RUC_Branch3City}
                    onChange={updateFields}
                    mandatory={true}
                    errors={errors}
                    register={register}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index+1}
                    // _setValue={_setValue}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch3Country";
                }).length > 0 && (
                  <CountryDropDown
                    title={"Country"}
                    dropdownOptions={country}
                    internalName={"RUC_Branch3Country"}
                    cntTyp={contentTypeField}
                    drpvalue={RUC_Branch3Country}
                    setFormDataCb={updateFields}
                    isMulti={false}
                    register={register}
                    errors={errors}
                    control={control}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch3Continent";
                }).length > 0 && (
                  <Dropdown
                    title={"Continent"}
                    dropdownOptions={continent}
                    internalName={"RUC_Branch3Continent"}
                    cntTyp={contentTypeField}
                    setFormDataCb={updateFields}
                    drpvalue={RUC_Branch3Continent}
                    isMulti={false}
                    register={register}
                    errors={errors}
                    control={control}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch3From";
                }).length > 0 && (
                  <DatePickerComp
                    title={"From"}
                    cntTyp={contentTypeField}
                    _value={RUC_Branch3From}
                    _onChange={updateFields}
                    internalName={"RUC_Branch3From"}
                    register={register}
                    errors={errors}
                    control={control}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch3To";
                }).length > 0 && (
                  <DatePickerComp
                    title={"To"}
                    cntTyp={contentTypeField}
                    _value={RUC_Branch3To}
                    _onChange={updateFields}
                    internalName={"RUC_Branch3To"}
                    register={register}
                    errors={errors}
                    control={control}
                    fromDate={RUC_Branch3From}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    //index={index}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch3Degree";
                }).length > 0 && (
                  <InputBox
                    fieldName={"RUC_Branch3Degree"}
                    title={"Degree"}
                    cntTyp={contentTypeField}
                    internalName={"RUC_Branch3Degree"}
                    value={RUC_Branch3Degree}
                    onChange={updateFields}
                    mandatory={true}
                    errors={errors}
                    register={register}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index+1}
                    // _setValue={_setValue}
                  />
                )}

                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch3DegreeOther";
                }).length > 0 && (
                  <InputBox
                    fieldName={"degreeOther"}
                    title={"Degree: Other"}
                    cntTyp={contentTypeField}
                    internalName={"RUC_Branch3DegreeOther"}
                    onChange={updateFields}
                    mandatory={false}
                    value={RUC_Branch3DegreeOther}
                    errors={errors}
                    register={register}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index+1}
                    // _setValue={_setValue}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch3TitleofBA_MA";
                }).length > 0 && (
                  <InputBox
                    fieldName={"titleBAMA"}
                    title={"Title of Degree"}
                    cntTyp={contentTypeField}
                    internalName={"RUC_Branch3TitleofBA_MA"}
                    errors={errors}
                    mandatory={true}
                    onChange={updateFields}
                    value={RUC_Branch3TitleofBA_MA}
                    register={register}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index+1}
                    // _setValue={_setValue}
                  />
                )}
              </div>
            </div>
            <div className={`mb-3 ${commonStyles.checkBoxContainer}`}>
              <CheckBox
                title="Add a Branch of Study - 4"
                checked={br4checked}
                value={"Branch4"}
                updatefields={undefined}
                internalName={"RUC_Branch4Checkbox"}
                handleChange={(e: any) => handlebranch4Change(e, "branch4")}
                formDisable={formDisable}
                // ariallabel={`${
                //   index === 0
                //     ? "You have to fill at least one Branh of study."
                //     : "Your values will be removed."
                // }`}
              />
            </div>
          </>
        )}
        {br4checked && (
          <>
            <div className={commonStyles.formSection}>
              <div className={commonStyles.headingContainer}>
                <h2 className={commonStyles.heading}>Branch of Study - 4</h2>
              </div>
              <div className={commonStyles.gridContainer}>
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch4";
                }).length > 0 && (
                  <Dropdown
                    title={"Branch"}
                    internalName={"RUC_Branch4"}
                    cntTyp={contentTypeField}
                    dropdownOptions={branchOptions}
                    drpvalue={RUC_Branch4}
                    setFormDataCb={updateFields}
                    isMulti={false}
                    register={register}
                    errors={errors}
                    control={control}
                    formDisable={formDisable}
                    setValue={_setValue}
                    //IsBranchofStudyField={true}
                    //index={index}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch4Other";
                }).length > 0 &&
                  branch4Other && (
                    <InputBox
                      fieldName={"branchOther"}
                      title={"Branch: Other"}
                      cntTyp={contentTypeField}
                      internalName={"RUC_Branch4Other"}
                      errors={errors}
                      mandatory={true}
                      onChange={updateFields}
                      value={RUC_Branch4Other}
                      register={register}
                      formDisable={formDisable}
                      //IsBranchofStudyField={true}
                      // index={index+1}
                      // _setValue={_setValue}
                    />
                  )}
              </div>
            </div>
            <div className={commonStyles.formSection}>
              <div className={commonStyles.headingContainer}>
                <h2 className={commonStyles.heading}>
                  City and Period of Study
                </h2>
              </div>
              <div className={commonStyles.gridContainer}>
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch4University";
                }).length > 0 && (
                  <InputBox
                    fieldName={"univeristy"}
                    title={"University"}
                    cntTyp={contentTypeField}
                    internalName={"RUC_Branch4University"}
                    mandatory={true}
                    onChange={updateFields}
                    errors={errors}
                    value={RUC_Branch4University}
                    register={register}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index+1}
                    // _setValue={_setValue}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch4City";
                }).length > 0 && (
                  <InputBox
                    fieldName={"cityName"}
                    title={"City"}
                    cntTyp={contentTypeField}
                    internalName={"RUC_Branch4City"}
                    value={RUC_Branch4City}
                    onChange={updateFields}
                    mandatory={true}
                    errors={errors}
                    register={register}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index+1}
                    // _setValue={_setValue}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch4Country";
                }).length > 0 && (
                  <CountryDropDown
                    title={"Country"}
                    dropdownOptions={country}
                    internalName={"RUC_Branch4Country"}
                    cntTyp={contentTypeField}
                    drpvalue={RUC_Branch4Country}
                    setFormDataCb={updateFields}
                    isMulti={false}
                    register={register}
                    errors={errors}
                    control={control}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch4Continent";
                }).length > 0 && (
                  <Dropdown
                    title={"Continent"}
                    dropdownOptions={continent}
                    internalName={"RUC_Branch4Continent"}
                    cntTyp={contentTypeField}
                    setFormDataCb={updateFields}
                    drpvalue={RUC_Branch4Continent}
                    isMulti={false}
                    register={register}
                    errors={errors}
                    control={control}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch4From";
                }).length > 0 && (
                  <DatePickerComp
                    title={"From"}
                    cntTyp={contentTypeField}
                    _value={RUC_Branch4From}
                    _onChange={updateFields}
                    internalName={"RUC_Branch4From"}
                    register={register}
                    errors={errors}
                    control={control}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch4To";
                }).length > 0 && (
                  <DatePickerComp
                    title={"To"}
                    cntTyp={contentTypeField}
                    _value={RUC_Branch4To}
                    _onChange={updateFields}
                    internalName={"RUC_Branch4To"}
                    register={register}
                    errors={errors}
                    control={control}
                    fromDate={RUC_Branch4From}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    //index={index}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch4Degree";
                }).length > 0 && (
                  <InputBox
                    fieldName={"RUC_Branch4Degree"}
                    title={"Degree"}
                    cntTyp={contentTypeField}
                    internalName={"RUC_Branch4Degree"}
                    value={RUC_Branch4Degree}
                    onChange={updateFields}
                    mandatory={true}
                    errors={errors}
                    register={register}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index+1}
                    // _setValue={_setValue}
                  />
                )}

                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch4DegreeOther";
                }).length > 0 && (
                  <InputBox
                    fieldName={"degreeOther"}
                    title={"Degree: Other"}
                    cntTyp={contentTypeField}
                    internalName={"RUC_Branch4DegreeOther"}
                    onChange={updateFields}
                    mandatory={false}
                    value={RUC_Branch4DegreeOther}
                    errors={errors}
                    register={register}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index+1}
                    // _setValue={_setValue}
                  />
                )}
                {contentTypeField?.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch4TitleofBA_MA";
                }).length > 0 && (
                  <InputBox
                    fieldName={"titleBAMA"}
                    title={"Title of Degree"}
                    cntTyp={contentTypeField}
                    internalName={"RUC_Branch4TitleofBA_MA"}
                    errors={errors}
                    mandatory={true}
                    onChange={updateFields}
                    value={RUC_Branch4TitleofBA_MA}
                    register={register}
                    formDisable={formDisable}
                    //IsBranchofStudyField={true}
                    // index={index+1}
                    // _setValue={_setValue}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BranchOfStudy;
