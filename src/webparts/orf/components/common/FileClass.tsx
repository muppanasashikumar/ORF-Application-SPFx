/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import { FilePond, registerPlugin } from "react-filepond";
//import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
//import FilePondPluginImagePreview from "filepond-plugin-image-preview";
//import FilePondPluginPdfPreview from "filepond-plugin-pdf-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
//import "filepond-plugin-pdf-preview/dist/filepond-plugin-pdf-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import styles from "../styles/Common.module.scss";
import styles1 from "../styles/UploadDocuments.module.scss";
// import buttonStyles from '../styles/Button.module.scss';
import { Tooltip } from "@mui/material";
import { Controller } from "react-hook-form";
// import { spfi,SPFx } from "@pnp/sp";
// import "@pnp/sp/webs";
// import "@pnp/sp/files";
// import "@pnp/sp/folders";

interface IInputProps {
  siteurl: string;
  doclibname: string;
  author: string;
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
  fileStyles?: any;
  _formDisable?: boolean;
  _wpcontext: any;
}

interface IState {
  filecontent: any;
  fileURL: any;
  createdFilePath: any;
}

export default class FileClass extends React.Component<
  IInputProps,
  IState,
  {}
> {
  private obj: { [key: string]: any } = {};
  // public sp: any;
  private objFilecontent: { [key: string]: any } = {};
  private _fileondref: any = null;
  private field: any;
  private isRequired: any;
  private id: any;

  constructor(props: IInputProps) {
    super(props);
    if (!(Number(sessionStorage.getItem("applicationId")) === 0)) {
      this.id = sessionStorage.getItem("applicationId")?.split("/")[1];
    }
    this.state = {
      filecontent: this.props.fileContent,
      fileURL: [],
      createdFilePath: this.props.fileContent.length>0 && this.props.fileContent[0].source
        ? this.props.fileContent[0].source
        : this.props.fileContent[0]?.name?`${this.props.siteurl}/${this.props.doclibname}/${this.id}-${this.props.author}/${this.props.fileContent[0]?.name}`:"",
    };
//console.log(this.state.createdFilePath)
    this.field = this.props.cntTyp?.filter((eachField: any) => {
      return eachField.InternalName === this.props.internalName;
    });
    this.isRequired = this.field[0] ? this.field[0].Required : false;
    // this.sp = spfi().using(SPFx(this.props._wpcontext));
    this._fileondref = React.createRef();
    registerPlugin(
      //FilePondPluginImageExifOrientation,
      //FilePondPluginImagePreview,

      FilePondPluginFileValidateType,
      FilePondPluginFileEncode,
      FilePondPluginFileValidateSize
      //FilePondPluginPdfPreview,
    );
    this.handleUpdateFiles = this.handleUpdateFiles.bind(this);
    //this.onremove=this.onremove.bind(this)
  }

  private handleUpdateFiles = (_files: any, onChange: any) => {
    const fileslist = _files.map((fileItem: any) => fileItem.file);
    if (fileslist.length > 0) {
      this.obj[this.props.internalName] = fileslist[0].name;
      this.objFilecontent[this.props.filecontentstatename] = fileslist;
      this.props.updateFields(this.obj);
      this.props.updateFields(this.objFilecontent);
      onChange(fileslist[0].name);
      this.setState({
        filecontent: fileslist,
      });
    }
    if (fileslist.length === 0) {
      this.obj[this.props.internalName] = "";
      this.objFilecontent[this.props.filecontentstatename] = [];
      this.props.updateFields(this.obj);
      this.props.updateFields(this.objFilecontent);
      onChange("");
      this.setState({
        filecontent: [],
      });
    }
  };

  // private onremove = (onChange: any) => {
  //   this.obj[this.props.internalName] = "";
  //   this.objFilecontent[this.props.filecontentstatename] = [];
  //   this.props.updateFields(this.obj);
  //   this.props.updateFields(this.objFilecontent);
  //   onChange("");
  //   this.setState({
  //     filecontent:[]
  //   })
  // };

  public render() {
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
            htmlFor={this.props.title}
            className={`${
              this.props.fileStyles === ""
                ? `${styles1.label} ${
                    this.isRequired === true ? styles1.mandatoryFields : ""
                  }`
                : this.props.fileStyles
            }`}
          >
            {this.props.title}
          </label>
          {this.props.content && (
            <Tooltip
              title={this.props.content}
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

        {
          <>
            <div
              className={
                this.props._formDisable
                  ? "d-flex gap-4  d-none"
                  : "d-flex gap-4"
              }
            >
              <Controller
                name={this.props.internalName}
                control={this.props.control}
                render={({ field: { onChange } }) => (
                  <FilePond
                    ref={...this._fileondref}
                    id={this.props.internalName}
                    name={this.props.internalName}
                    files={this.state.filecontent}
                    // oninit={()=> {filepondref.current.addfiles(fileContent)}}

                    allowMultiple={false}
                    allowFileEncode
                    // onactivatefile={() => {
                    //   this.state.fileURL !== "" &&
                    //     window.open(this.state.fileURL, "_blank");
                    // }}
                    // allowBrowse={this.props._formDisable ? false : true}
                    // allowDrop={this.props._formDisable ? false : true}
                    // allowPaste={this.props._formDisable ? false : true}
                    // allowReplace={this.props._formDisable ? false : true}
                    // allowRevert={this.props._formDisable ? false : true}
                    // allowProcess={this.props._formDisable ? false : true}
                    disabled={
                      this.props._formDisable ? this.props._formDisable : false
                    }
                    //onremovefile={() => this.onremove(onChange)}
                    onupdatefiles={(_file) =>
                      this.handleUpdateFiles(_file, onChange)
                    }
                    //allowImagePreview={true}
                    //imagePreviewMaxHeight={200}
                    instantUpload={true}
                    acceptedFileTypes={this.props.acceptedFileType}
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
                      load: async (source, load) => {
                        fetch(source)
                          .then(async (res) => {
                            // console.log(res);
                            const blob = await res.blob();
                            const url = res.url;
                            return [blob, url];
                          })
                          .then((blob: any) => {
                            // console.log(blob);
                            let fileOfBlob = new File(
                              [blob[0]],
                              `${this.props.fileName}`,
                              { type: blob[0].type }
                            );

                            // console.log(fileOfBlob);
                            this.setState({
                              filecontent: [fileOfBlob],
                              fileURL: blob[1],
                            });
                            return load(blob);
                          });
                      },
                    }}
                  ></FilePond>
                )}
                rules={{ required: this.isRequired }}
              />
            </div>

            { this.state.createdFilePath !=="" && <button
              className={styles.previewButton}
              onClick={(e) => {
                e.preventDefault();
                //console.log();
                window.open(
                  this.state.createdFilePath.length > 0
                    ? this.state.createdFilePath
                    : "",
                  "_blank"
                );
              }}
            >
              <div className="d-flex gap-2 justify-content-center align-items-center">
                {this.props.internalName === "RUC_YourPhotograph" ? (
                  <img
                    className={styles.previewFileType}
                    src={require("../../assets/photo.svg")}
                    alt=""
                  />
                ) : (
                  <img
                    className={styles.previewFileType}
                    src={require("../../assets/pdf.svg")}
                    alt=""
                  />
                )}
                <span className={styles.previewFileName}>
                  {this.state.createdFilePath !=="" && decodeURIComponent(this.state.createdFilePath.split("/")[7])}
                
                </span>
              </div>
            </button>}
          </>
        }

        {this.props.errors[this.props.internalName]?.type === "required" ? (
          <span style={{ color: "red", fontSize: "12px" }}>
            {this.props.title} is a mandatory field
          </span>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
