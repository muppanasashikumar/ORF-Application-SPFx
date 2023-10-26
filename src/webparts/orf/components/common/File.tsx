/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import styles from "../styles/Common.module.scss";
import styles1 from "../styles/UploadDocuments.module.scss";
import { Tooltip } from "@mui/material";
import { Controller } from "react-hook-form";
// import { FilePondInitialFile } from "filepond";
// import { ActualFileObject } from "filepond";
// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize
);
interface IInputProps {
  title: string;
  mandatory?: boolean;
  content?: string;
  cntTyp?: any;
  register?: any;
  internalName: string;
  filecontentstatename: string;
  errors?: any;
  fileName?: string;
  updateFields?: any;
  control?: any;
  fileContent?: any;
  acceptedFileType: any;
  fileStyles: any;
  formDisable?:boolean
}

export default function File({
  title,
  content,
  register,
  filecontentstatename,
  mandatory = false,
  cntTyp,
  internalName,
  fileName,
  updateFields,
  errors,
  control,
  fileContent,
  acceptedFileType,
  fileStyles,
  formDisable
}: IInputProps) {
  //const [photos, setPhotos] = useState([]);
  //const filesState:any=[];
  // const [isfileError, setIsFileError] = React.useState(false);
  const _ref = React.createRef();
  let obj: { [key: string]: any } = {};
  let objFilecontent: { [key: string]: any } = {};
  //let filecontentobj: { [key: string]: any } = {};
  const field = cntTyp?.filter((eachField: any) => {
    return eachField.InternalName === internalName;
  });
  const isRequired = field[0] ? field[0].Required : false;

  // const filepondref:any = React.createRef();

  const handleUpdateFiles = (_files: any, onChange: any) => {
    const fileslist = _files.map((fileItem: any) => fileItem.file);
    if (fileslist.length > 0) {
      obj[internalName] = fileslist[0].name;
      objFilecontent[filecontentstatename] = fileslist;
      updateFields(obj);
      updateFields(objFilecontent);
      onChange(fileslist[0].name);
    }
    if (fileslist.length === 0) {
      obj[internalName] = "";
      objFilecontent[filecontentstatename] = [];
      updateFields(obj);
      updateFields(objFilecontent);
      onChange("");
    }
  };

  const onremove = (onChange: any) => {
    obj[internalName] = "";
    objFilecontent[filecontentstatename] = [];
    updateFields(obj);
    updateFields(objFilecontent);
    onChange("");
  };

  const customStyles = {
    bgcolor: "white",
    color: "#606060",
    boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.10)",
    textAlign: "center",
    fontSize: "12px",
    border: "2px solid #FAC600",
    padding: "10px",

    "&.MuiTooltip-tooltipPlacementTop": {
      marginLeft: "-10.25px",
    },

    "& .MuiTooltip-arrow": {
      bgcolor: "transparent",
      color: "#FAC600",
      border: "none",
    },
  };

  return (
    <div className={styles.input}>
      <div className="d-flex gap-2">
        <label
          htmlFor={title}
          className={`${
            fileStyles === ""
              ? `${styles1.label} ${
                  isRequired === true ? styles1.mandatoryFields : ""
                }`
              : fileStyles
          }`}
        >
          {title}
        </label>
        {content && (
          <Tooltip
            title={content}
            placement="top"
            arrow
            describeChild
            componentsProps={{
              tooltip: {
                sx: customStyles,
              },
            }}
          >
            <div className={styles.infoToolTipContainer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <circle cx="10" cy="10" r="10" fill="#FBCA4C" />
              </svg>
              <p className={styles.infoToolTip}>i</p>
            </div>
          </Tooltip>
        )}
      </div>
      {/*<form onSubmit={handleSubmit}>*/}
      <Controller
        name={internalName}
        control={control}
        render={({ field: { onChange } }) => (
          <FilePond
            //ref={(ref)=> filepondref}
            disabled={formDisable?formDisable:false}
            ref={_ref as any}
            name={internalName}
            files={fileContent}
            // oninit={()=> {filepondref.current.addfiles(fileContent)}}
            allowMultiple={false}
            allowFileEncode
            onremovefile={() => onremove(onChange)}
            onupdatefiles={(_file) => handleUpdateFiles(_file, onChange)}
            allowImagePreview={true}
            // instantUpload={true}
            acceptedFileTypes={acceptedFileType}
            allowFileTypeValidation={true}
            minFileSize={"10KB"}
            maxFileSize={"4MB"}
            labelFileAdded="File added successfully."
            labelButtonAbortItemLoad="Abort"
            labelFileProcessing="Uploading.."
            labelFileTypeNotAllowed="Invalid file type"
            labelButtonRemoveItem="Remove"
            labelFileProcessingComplete="Upload completed..."
            dropValidation={true}
            checkValidity={true}
            credits={false}
            server={{
              load: (source, load) => {
                fetch(source)
                  .then((res) => {
                    // console.log(res);
                    return res.blob();
                  })
                  .then((blob) => {
                    // console.log(blob);
                    return load(blob);
                  });
              },
            }}
          ></FilePond>
        )}
        rules={{ required: isRequired }}
      />
      {errors[internalName]?.type === "required" ? (
        <span style={{ color: "red", fontSize: "12px" }}>
          {title} is a mandatory field
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}
