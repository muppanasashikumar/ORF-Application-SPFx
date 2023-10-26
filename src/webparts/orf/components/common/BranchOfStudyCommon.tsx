/*eslint-disable @typescript-eslint/no-explicit-any  */
/*eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import commonStyles from "../styles/Common.module.scss";
import InputBox from "../common/InputBox";
import Dropdown from "../common/Dropdown";
import DatePickerComp from "../common/DatePickerComp";

interface IProps {
    contentTypeField: any;
    country: any;
    branch: any;
    continent: any;
    degree: any;
    RUC_Branch1: any;
    RUC_Branch1Other: any;
    RUC_Branch1University: any;
    RUC_Branch1City: any;
    RUC_Branch1Country: any;
    RUC_Branch1Continent: any;
    RUC_Branch1Degree: any;
    RUC_Branch1DegreeOther: any;
    RUC_Branch1TitleofBA_MA: any;
    RUC_Branch1From: any;
    RUC_Branch1To: any;
    register: any;
    errors: any;
    control: any;
    updateFields: any;
}

const BranchOfStudyCommon = ({ 
    contentTypeField, 
    country, 
    branch, 
    continent, 
    degree,
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
    register,
    errors,
    control,
    updateFields,
}: IProps) => {
    return (
        <>
            <div className={commonStyles.formSection}>
                <div className={commonStyles.headingContainer}>
                    <h2 className={commonStyles.heading}>Branch of Study 1</h2>
                </div>
                <div className={commonStyles.gridContainer}>
                    {contentTypeField.filter((eachField: any) => {
                        return eachField.InternalName === "RUC_Branch1";
                    }).length > 0 && (
                            <Dropdown
                                title={"Branch"}
                                internalName={"RUC_Branch1"}
                                cntTyp={contentTypeField}
                                dropdownOptions={branch}
                                drpvalue={RUC_Branch1}
                                setFormDataCb={updateFields}
                                isMulti={false}
                                register={register}
                                errors={errors}
                                control={control}
                            />
                        )}
                    {contentTypeField.filter((eachField: any) => {
                        return eachField.InternalName === "RUC_Branch1Other";
                    }).length > 0 && (
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
                            />
                        )}
                </div>
            </div>
            <div className={commonStyles.formSection}>
                <div className={commonStyles.headingContainer}>
                    <h2 className={commonStyles.heading}>City and Period of Study</h2>
                </div>
                <div className={commonStyles.gridContainer}>
                    {contentTypeField.filter((eachField: any) => {
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
                            />
                        )}
                    {contentTypeField.filter((eachField: any) => {
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
                            />
                        )}
                    {contentTypeField.filter((eachField: any) => {
                        return eachField.InternalName === "RUC_Branch1Country";
                    }).length > 0 && (
                            <Dropdown
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
                            />
                        )}
                    {contentTypeField.filter((eachField: any) => {
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
                            />
                        )}

                    <DatePickerComp
                        title={"From"}
                        cntTyp={contentTypeField}
                        _value={RUC_Branch1From}
                        _onChange={updateFields}
                        internalName={"RUC_Branch1From"}
                        register={register}
                        errors={errors}
                        control={control}
                    />
                    <DatePickerComp
                        title={"to"}
                        cntTyp={contentTypeField}
                        _value={RUC_Branch1To}
                        _onChange={updateFields}
                        internalName={"RUC_Branch1To"}
                        register={register}
                        errors={errors}
                        control={control}
                    />
                    {contentTypeField.filter((eachField: any) => {
                        return eachField.InternalName === "RUC_Branch1Degree";
                    }).length > 0 && (
                            <Dropdown
                                title={"Degree"}
                                dropdownOptions={degree}
                                internalName={"RUC_Branch1Degree"}
                                cntTyp={contentTypeField}
                                drpvalue={RUC_Branch1Degree}
                                setFormDataCb={updateFields}
                                isMulti={false}
                                register={register}
                                errors={errors}
                                control={control}
                            />
                        )}

                    {contentTypeField.filter((eachField: any) => {
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
                            />
                        )}
                    {contentTypeField.filter((eachField: any) => {
                        return eachField.InternalName === "RUC_Branch1TitleofBA_MA";
                    }).length > 0 && (
                            <InputBox
                                fieldName={"titleBAMA"}
                                title={"Title of BA/MA"}
                                cntTyp={contentTypeField}
                                internalName={"RUC_Branch1TitleofBA_MA"}
                                errors={errors}
                                mandatory={true}
                                onChange={updateFields}
                                value={RUC_Branch1TitleofBA_MA}
                                register={register}
                            />
                        )}

                </div>


                {/* {
            checked && (
              <div className={commonStyles.gridContainer}>
                {contentTypeField.filter((eachField: any) => {
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
                    />
                  )}
                {contentTypeField.filter((eachField: any) => {
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
                    />
                  )}
                {contentTypeField.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch1Country";
                }).length > 0 && (
                    <Dropdown
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
                    />
                  )}
                {contentTypeField.filter((eachField: any) => {
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
                    />
                  )}

                <DatePickerComp
                  title={"From"}
                  cntTyp={contentTypeField}
                  _value={RUC_Branch1From}
                  _onChange={updateFields}
                  internalName={"RUC_Branch1From"}
                  register={register}
                  errors={errors}
                  control={control}
                />
                <DatePickerComp
                  title={"to"}
                  cntTyp={contentTypeField}
                  _value={RUC_Branch1To}
                  _onChange={updateFields}
                  internalName={"RUC_Branch1To"}
                  register={register}
                  errors={errors}
                  control={control}
                />
                {contentTypeField.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch1Degree";
                }).length > 0 && (
                    <Dropdown
                      title={"Degree"}
                      dropdownOptions={degree}
                      internalName={"RUC_Branch1Degree"}
                      cntTyp={contentTypeField}
                      drpvalue={RUC_Branch1Degree}
                      setFormDataCb={updateFields}
                      isMulti={false}
                      register={register}
                      errors={errors}
                      control={control}
                    />
                  )}

                {contentTypeField.filter((eachField: any) => {
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
                    />
                  )}
                {contentTypeField.filter((eachField: any) => {
                  return eachField.InternalName === "RUC_Branch1TitleofBA_MA";
                }).length > 0 && (
                    <InputBox
                      fieldName={"titleBAMA"}
                      title={"Title of BA/MA"}
                      cntTyp={contentTypeField}
                      internalName={"RUC_Branch1TitleofBA_MA"}
                      errors={errors}
                      mandatory={true}
                      onChange={updateFields}
                      value={RUC_Branch1TitleofBA_MA}
                      register={register}
                    />
                  )}
                <CheckBox
                  title="Add a Branch of Study"
                  checked={checked}
                  updatefields={undefined}
                  internalName={""}
                  handleChange={handleChange}
                />
              </div>
            )
          } */}
            </div>
        </>
    )
}

export default BranchOfStudyCommon