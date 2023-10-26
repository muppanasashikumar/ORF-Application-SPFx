/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
// import File from "../common/File";
import commonStyles from "../styles/Common.module.scss";
import Heading from "../common/Heading";
import FileClass from "../common/FileClass";

type UploadDocumentsData = {
  RUC_YourPhotograph: string;
  RUC_CV: string;
  RUC_LetterofIntent: string;
  RUC_PersonalIntroduction: string;
  FILE_Content_YourPhotograph: any;
  FILE_Content_CV: any;
  FILE_Content_LetterofIntent: any;
  FILE_Content_PersonalIntroduction: any;
  RUC_ApplicationStatus:any
}

type UploadDocumentsDataProps = UploadDocumentsData & {
  updateFields: (fields: Partial<UploadDocumentsData>) => void;
  allDataBinding: any;
  contentTypeField: any;
  register: any;
  errors: any;
  control:any;
  formDisable?:boolean;
  userRole:string;
  wpContext:any;
  siteurl:string;
  doclibname:string;
  author:string
}

const UploadDocuments = ({
  RUC_YourPhotograph,
  RUC_CV,
  RUC_LetterofIntent,
  RUC_PersonalIntroduction,
  allDataBinding,
  FILE_Content_YourPhotograph,
  FILE_Content_CV,
  FILE_Content_LetterofIntent,
  FILE_Content_PersonalIntroduction,
  RUC_ApplicationStatus,
  contentTypeField,
  register,
  errors,
  control,
  updateFields,
  formDisable,
  userRole,
  wpContext,
  siteurl,
  doclibname,
  author,
}: UploadDocumentsDataProps) => {
  return (
    <>
      <div className={commonStyles.mainSection}>
        <Heading number={3} heading={"Upload Documents"} appStatus={RUC_ApplicationStatus} _userRole={userRole}/>
        <div className={commonStyles.formSection}>
          <div className="d-flex justify-content-end">
            <span className={commonStyles.mandatoryField}>Mandatory Fields</span>
          </div>
          <div className={commonStyles.gridContainer}>
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_YourPhotograph";
            }).length > 0 && (
                <FileClass
                  title={"Your Photograph"}
                  content={
                  "Please attach a photograph of minimum size of 4 mb. It should be a headshot."
                  }
                  mandatory={true}
                  internalName={"RUC_YourPhotograph"}

                  cntTyp={contentTypeField}
                  acceptedFileType={['image/jpeg', 'image/png','application/octet-stream']}
                  filecontentstatename={"FILE_Content_YourPhotograph"}
                  control={control}
                  errors={errors}
                  fileContent={FILE_Content_YourPhotograph}
                  updateFields={updateFields}
                  register={register}
                  fileName={RUC_YourPhotograph}
                  fileStyles={''}
                  _formDisable={formDisable}
                  _wpcontext={wpContext}
                  siteurl={siteurl}
                  doclibname={doclibname}
                  author={author}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_CV";
            }).length > 0 && (
                <FileClass
                  title={"CV"}
                 content={"(Supported format is pdf only.)"}
                  mandatory={true}
                  internalName={"RUC_CV"}
                  cntTyp={contentTypeField}
                  acceptedFileType={['application/pdf','application/octet-stream']}
                  filecontentstatename={"FILE_Content_CV"}
                  control={control}
                  errors={errors}
                  fileContent={FILE_Content_CV}
                  updateFields={updateFields}
                  register={register}
                  fileName={RUC_CV}
                  fileStyles={''}
                  _formDisable={formDisable}
                  _wpcontext={wpContext}
                  siteurl={siteurl}
                  doclibname={doclibname}
                  author={author}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_LetterofIntent";
            }).length > 0 && (
                <FileClass
                  title={"Letter of Intent"}
                  content={
                    "The letter of intent should outline your motivation for applying, how you can contribute to programme, and why the programme would be beneficial for you. (Supported format is pdf only.)"
                  }
                  mandatory={true}
                  internalName={"RUC_LetterofIntent"}
                  cntTyp={contentTypeField}
                  acceptedFileType={['application/pdf','application/octet-stream']}
                  filecontentstatename={"FILE_Content_LetterofIntent"}
                  control={control}
                  errors={errors}
                  fileContent={FILE_Content_LetterofIntent}
                  updateFields={updateFields}
                  register={register}
                  fileName={RUC_LetterofIntent}
                  fileStyles={''}
                  _formDisable={formDisable}
                  _wpcontext={wpContext}
                  siteurl={siteurl}
                  doclibname={doclibname}
                  author={author}
                />
              )}
            {contentTypeField?.filter((eachField: any) => {
              return eachField.InternalName === "RUC_PersonalIntroduction";
            }).length > 0 && (
                <FileClass
                  title={"Personal Introduction"}
                  content={"Please provide a brief 100-150 word personal introduction that gives an overview of your personal goals, ambitions and any other relevant background that you may want to highlight. (Supported format is pdf only.)"
                  }
                  mandatory={true}
                  internalName={"RUC_PersonalIntroduction"}
                  cntTyp={contentTypeField}
                  acceptedFileType={['application/pdf','application/octet-stream']}
                  filecontentstatename={"FILE_Content_PersonalIntroduction"}
                  control={control}
                  errors={errors}
                  fileContent={FILE_Content_PersonalIntroduction}
                  updateFields={updateFields}
                  register={register}
                  fileName={RUC_PersonalIntroduction}
                  fileStyles={''}
                  _formDisable={formDisable}
                  _wpcontext={wpContext}
                  siteurl={siteurl}
                  doclibname={doclibname}
                  author={author}
                />
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadDocuments;
