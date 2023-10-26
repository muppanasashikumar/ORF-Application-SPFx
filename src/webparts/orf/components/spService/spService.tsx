/* eslint-disable promise/param-names */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-const */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*eslint-disable no-var */
import { spfi, SPFx } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import "@pnp/sp/items/";
import "@pnp/sp/folders";
//import { fileFromServerRelativePath } from "@pnp/sp/files";
import { IField } from "@pnp/sp/fields/types";
import "@pnp/sp/fields";
import { IYoungFellowState } from "../IYoungFellowState";
import Swal from "sweetalert2";
//import * as moment from "moment";
//import { delay } from "lodash";
//import * as moment from "moment";
export default class spOperation {
  public sp: any;
  constructor(context: any) {
    this.sp = spfi().using(SPFx(context));
  }
  //Audit Log Functions

  public Log = async (
    programname: string,
    applicationid: string,
    status: string,
    logMessage: string,
    homepage: string,
    listid: string
  ) => {
    try {
      await this.saveLogs(
        programname,
        applicationid,
        status,
        logMessage,
        homepage,
        listid
      );
    } catch (error) {
      //Can't do anything
      console.error(error.Message);
      Swal.fire({
        title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "OK",
        confirmButtonColor: "#B4A048",
        backdrop: false,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.open(homepage, "_self");
        }
      });
    }
  };

  public Error = async (
    programname: string,
    applicationid: string,
    status: string,
    logMessage: string,
    homepage: string,
    listid: string
  ) => {
    try {
      // console.error(logMessage.Message);
      await this.saveLogs(
        programname,
        applicationid,
        status,
        logMessage,
        homepage,listid
      );
    } catch (error) {
      //Can't do anything
      console.error(error.Message);
      Swal.fire({
        title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "OK",
        confirmButtonColor: "#B4A048",
        backdrop: false,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.open(homepage, "_self");
        }
      });
    }
  };

  public saveLogs = async (
    programname: string,
    appid: string,
    status: string,
    logMessage: string,
    homepage: string,
    listid: string
  ) => {
    await this.sp.web.lists
      .getById(listid)
      .items.add({
        Title: programname,
        RUC_ApplicationId: appid,   
        RUC_FellowshipStatus: status,
        RUC_LogMessage: logMessage,
      })
      .catch((err) => {
        // console.log(err);
        Swal.fire({
          title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "OK",
          confirmButtonColor: "#B4A048",
          backdrop: false,
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.open(homepage, "_self");
          }
        });
      });
  };

  public async getField(fieldName: any, homepage: string) {
    try {
      const field: IField = await this.sp.web.fields.getByTitle(fieldName);
      const r = await field();
      return r;
    } catch {
      Swal.fire({
        title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "OK",
        backdrop: false,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */

        if (result.isConfirmed) {
          window.open(homepage, "_self");
        }
      });
    }
  }
  public callFellowShipProgramML(
    fsMLlistID: string,
    contentTypeId: string,
    programmeName: string,
    status: string,
    homepage: string,
    auditlistid: string
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.sp.web.lists
        .getById(fsMLlistID)
        .items.select("Title,RUC_ContentTypeID,RUC_EndDate,RUC_StartDate")
        .filter(`RUC_ContentTypeID eq '${contentTypeId}'`)()
        .then((listitem: any) => {
          resolve(listitem);
        })
        .catch((err: any) => {
          Swal.fire({
            title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "OK",
            backdrop: false,
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */

            if (result.isConfirmed) {
              let id: any = sessionStorage.getItem("applicationId")
                ? sessionStorage.getItem("applicationId")?.toUpperCase()
                : "NA";
              await this.Error(
                programmeName,
                id,
                status,
                `Error: ${err} `,
                homepage,
                auditlistid
              );
              window.open(homepage, "_self");
            }
          });
        });
    });
  }

  public callML(MlId: string, homepage: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.sp.web.lists
        .getById(MlId)
        .items.select("Title,ID")
        .getAll()

        .then((listitem: any) => {
          resolve(listitem);
        })
        .catch((err: any) => {
          Swal.fire({
            title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "OK",
            backdrop: false,
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              window.open(homepage, "_self");
            }
          });
        });
    });
  }
  public callCountryML(MlId: string, homepage: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.sp.web.lists
        .getById(MlId)
        .items.select("Title,ID,Code,Cd")
        .getAll()

        .then((listitem: any) => {
          resolve(listitem);
        })
        .catch((err: any) => {
          Swal.fire({
            title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "OK",
            backdrop: false,
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              window.open(homepage, "_self");
            }
          });
        });
    });
  }

  public async getContentTypeFields(
    cntypId: any,
    programmeName: string,
    status: string,
    homepage: string,
    auditlistid: string
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const contentTypeFields = await this.sp.web.contentTypes
          .getById(cntypId)
          .fields();
        const allSiteColumns = await this.sp.web.fields();
        const reusableORFSC = allSiteColumns?.filter(
          (each: any) => each.Group === "Custom Reusable SC For ORF"
        );
        // log collection of fields to console
        let newArray: any = [{}];
        reusableORFSC?.map((eachSC: any) => {
          return contentTypeFields?.filter((eachField: any) => {
            if (eachField.Id === eachSC.Id) {
              newArray.push({
                InternalName: eachSC.InternalName,
                DataType: eachSC.TypeDisplayName,
                Required: eachSC.Required,
              });
            }
          });
        });
        resolve(newArray);
      } catch {
        Swal.fire({
          title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "OK",
          confirmButtonColor: "#B4A048",
          backdrop: false,
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            let id: any = sessionStorage.getItem("applicationId")
              ? sessionStorage.getItem("applicationId")?.toUpperCase()
              : "NA";
            await this.Error(
              programmeName,
              id,
              status,
              `Error: Error getting content type fields `,
              homepage,
              auditlistid
            );
            window.open(homepage, "_self");
          }
        });
      }
    });
  }

  public getApplicationDataVersions(
    listId: string,
    applicationId: any,
    versionNo: any,
    siteName: any,
    docLibName: any,
    programmeName: string,
    homepage: string,
    auditloglist: string
  ): Promise<any> {
    let itemid: any;

    itemid = applicationId?.split("/")[1];
    return new Promise((resolve, reject) => {
      let status: string;
      this.sp.web.lists
        .getById(listId)
        .items.getById(itemid)
        .versions.getById(versionNo)()
        //.getAll()
        .then((pnpresults: any) => {
          const fileContentArray: any = [];
          if (!(pnpresults?.RUC_x005f_LetterOfNomination === null)) {
            fileContentArray.push({
              fileName: pnpresults?.RUC_x005f_LetterOfNomination,
              filepath: `https://orfonlineorg.sharepoint.com/sites/${siteName}/${docLibName}/${pnpresults?.ID}-${pnpresults?.Author.LookupValue}/${pnpresults?.RUC_x005f_LetterOfNomination}`,
            });
          }
          if (!(pnpresults?.RUC_x005f_LetterofIntent === null)) {
            fileContentArray.push({
              fileName: pnpresults?.RUC_x005f_LetterofIntent,
              filepath: `https://orfonlineorg.sharepoint.com/sites/${siteName}/${docLibName}/${pnpresults?.ID}-${pnpresults?.Author.LookupValue}/${pnpresults?.RUC_x005f_LetterofIntent}`,
            });
          }
          if (!(pnpresults?.RUC_x005f_PersonalIntroduction === null)) {
            fileContentArray.push({
              fileName: pnpresults?.RUC_x005f_PersonalIntroduction,
              filepath: `https://orfonlineorg.sharepoint.com/sites/${siteName}/${docLibName}/${pnpresults?.ID}-${pnpresults?.Author.LookupValue}/${pnpresults?.RUC_x005f_PersonalIntroduction}`,
            });
          }
          if (!(pnpresults?.RUC_x005f_YourPhotograph === null)) {
            fileContentArray.push({
              fileName: pnpresults?.RUC_x005f_YourPhotograph,
              filepath: `https://orfonlineorg.sharepoint.com/sites/${siteName}/${docLibName}/${pnpresults?.ID}-${pnpresults?.Author.LookupValue}/${pnpresults?.RUC_x005f_YourPhotograph}`,
            });
          }
          if (!(pnpresults?.RUC_x005f_CV === null)) {
            fileContentArray.push({
              fileName: pnpresults?.RUC_x005f_CV,
              filepath: `https://orfonlineorg.sharepoint.com/sites/${siteName}/${docLibName}/${pnpresults?.ID}-${pnpresults?.Author.LookupValue}/${pnpresults?.RUC_x005f_CV}`,
            });
          }
          status = pnpresults?.RUC_x005f_ApplicationStatus;
          const ItemDetails = {
            item: pnpresults,
            filesArr: fileContentArray,
          };
          // console.log(`version no ${versionNo}`,ItemDetails);
          resolve(ItemDetails);
        })
        .catch((err: any) =>
          Swal.fire({
            title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "OK",
            backdrop: false,
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              let id: any = sessionStorage.getItem("applicationId")
                ? sessionStorage.getItem("applicationId")?.toUpperCase()
                : "NA";
              await this.Error(
                programmeName,
                id,
                status,
                `Error:  ${err} `,
                homepage,
                auditloglist
              );
              window.open(homepage, "_self");
            }
          })
        );
    });
  }
  public checkNewFormOnLoad(
    listId: string,
    userName: string,
   
 programmeName: string,
 status: string,
 homepage:string,
 auditlist:string

  ) {
    return new Promise(async (resolve, reject) => {
      await this.sp.web.lists
        .getById(listId)
        .items.filter(`Author/Title eq '${userName}'`)
        .select("*,Author/Title")
        .expand("Author")
        .getAll()
        .then((res: any) => {
          //let resArr = res.length>0 ? res.filter((each:any)=>each.Author.Title === userName): res
          resolve(res.length);
          // console.log(res);
          //console.log(user)
        })
        .catch((err: any) => {
          Swal.fire({
            title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "OK",
            backdrop: false,
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              let id: any = sessionStorage.getItem("applicationId")
                  ? sessionStorage.getItem("applicationId")?.toUpperCase()
                  : "NA";
                await this.Error(
                  programmeName,
                  id,
                 status,
                  `Error: ${err} `,
                  homepage,
                  auditlist
                );
                window.open(homepage, "_self");
            }
          });
        });
    });
  }
  public async fetchItem(
    listId: any,
    user: any,
    siteName: string,
    docLibName: string,
    applicationId: string,
    userRole: string,
    programmeName: string,
    homepage: string,
    auditloglist: string
  ): Promise<any> {
    //let itemExist:any=-1;
    return new Promise(async (resolve, reject) => {
      //     }

      let desiredEntry: any;
      if (Number(applicationId) === -1) {
        Swal.fire({
          title: `<p >There is some error in completing this action for the application. Please contact the administrator.</p>`,

          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "OK",
          backdrop: false,
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.open(homepage, "_self");
          }
        });
      }

      if (Number(applicationId) === 0) {
        resolve({
          item: -1,
          filesArr: [],
        });
      }
      if (!(Number(applicationId) === 0)) {
        // if(applicationId.startsWith("RYFP")){

        // }
        let appid = applicationId?.split("/")[1];
        await this.sp.web.lists
          .getById(listId)
          .items.getById(appid)
          .select("*,Author/Title")

          .expand("Author")()
          .then((appres: any) => {
            if (appres?.Author.Title === user) {
              // console.log(appres);
              desiredEntry = appres;
            }

            //const folderUser=`${appres?.RUC_FirstName}${appres.RUC_LastName}`
            if (!(appres?.Author.Title === user)) {
              if (userRole === "Admin") {
                desiredEntry = appres;
                // alert(`logged in as ${userRole}`);
              } else if (userRole === "Approver") {
                desiredEntry = appres;
                // alert(`logged in as ${userRole}`);
              } else {
                Swal.fire({
                  title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>Application id does not belongs to you</p>`,

                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  backdrop: false,
                }).then(async (result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    window.open(homepage, "_self");
                  }
                });
              }
            }

            const fileContentArray: any = [];
            if (!(desiredEntry?.RUC_LetterOfNomination === null)) {
              // const file = await fileFromServerRelativePath(
              //   this.sp.web,
              //   `/sites/${siteName}/${docLibName}/${desiredEntry.Id}-${user}/${desiredEntry.RUC_LetterOfNomination}`
              // );
              // // const fileContent = await file.getBlob();
              // fileContentArray.push({
              //   fileName: desiredEntry.RUC_LetterOfNomination,
              //   filepath: file,
              // });
              fileContentArray.push({
                fileName: desiredEntry?.RUC_LetterOfNomination,
                filepath: `https://orfonlineorg.sharepoint.com/sites/${siteName}/${docLibName}/${desiredEntry?.Id}-${desiredEntry?.Author.Title}/${desiredEntry?.RUC_LetterOfNomination}`,
              });
            }
            if (!(desiredEntry?.RUC_YourPhotograph === null)) {
              // const file = await fileFromServerRelativePath(
              //   this.sp.web,
              //   `/sites/${siteName}/${docLibName}/${desiredEntry.Id}-${user}/${desiredEntry.RUC_YourPhotograph}`
              // );
              // const fileContent = await file.getBlob();
              // fileContentArray.push({
              //   fileName: desiredEntry.RUC_YourPhotograph,
              //   fileBlob: fileContent,
              // });
              fileContentArray.push({
                fileName: desiredEntry?.RUC_YourPhotograph,
                filepath: `https://orfonlineorg.sharepoint.com/sites/${siteName}/${docLibName}/${desiredEntry?.Id}-${desiredEntry?.Author.Title}/${desiredEntry?.RUC_YourPhotograph}`,
              });
            }
            if (!(desiredEntry?.RUC_CV === null)) {
              // const file = await fileFromServerRelativePath(
              //   this.sp.web,
              //   `/sites/${siteName}/${docLibName}/${desiredEntry.Id}-${user}/${desiredEntry.RUC_CV}`
              // );
              // const fileContent = await file.getBlob();
              // fileContentArray.push({
              //   fileName: desiredEntry.RUC_CV,
              //   fileBlob: fileContent,
              // });
              fileContentArray.push({
                fileName: desiredEntry?.RUC_CV,
                filepath: `https://orfonlineorg.sharepoint.com/sites/${siteName}/${docLibName}/${desiredEntry?.Id}-${desiredEntry?.Author.Title}/${desiredEntry?.RUC_CV}`,
              });
            }
            if (!(desiredEntry?.RUC_LetterofIntent === null)) {
              // const file = await fileFromServerRelativePath(
              //   this.sp.web,
              //   `/sites/${siteName}/${docLibName}/${desiredEntry.Id}-${user}/${desiredEntry.RUC_LetterofIntent}`
              // );
              // const fileContent = await file.getBlob();
              // fileContentArray.push({
              //   fileName: desiredEntry.RUC_LetterofIntent,
              //   fileBlob: fileContent,
              // });
              fileContentArray.push({
                fileName: desiredEntry?.RUC_LetterofIntent,
                filepath: `https://orfonlineorg.sharepoint.com/sites/${siteName}/${docLibName}/${desiredEntry?.Id}-${desiredEntry?.Author.Title}/${desiredEntry?.RUC_LetterofIntent}`,
              });
            }
            if (!(desiredEntry?.RUC_PersonalIntroduction === null)) {
              // const file = await fileFromServerRelativePath(
              //   this.sp.web,
              //   `/sites/${siteName}/${docLibName}/${desiredEntry.Id}-${user}/${desiredEntry.RUC_PersonalIntroduction}`
              // );
              // const fileContent = await file.getBlob();
              // fileContentArray.push({
              //   fileName: desiredEntry.RUC_PersonalIntroduction,
              //   fileBlob: fileContent,
              // });
              fileContentArray.push({
                fileName: desiredEntry?.RUC_PersonalIntroduction,
                filepath: `https://orfonlineorg.sharepoint.com/sites/${siteName}/${docLibName}/${desiredEntry?.Id}-${desiredEntry?.Author.Title}/${desiredEntry?.RUC_PersonalIntroduction}`,
              });
            }
            const ItemDetails = {
              item: desiredEntry,
              filesArr: fileContentArray,
            };
            //  res?.map(async (eachItem: any) => {
            //         if (eachItem.Author.Title === user) {
            //           //console.log("item exists", eachItem);
            //           //itemExist=eachItem.Id
            //           const fileContentArray = [];
            //           if (!(eachItem.RUC_LetterOfNomination === null)) {
            //             const file = await fileFromServerRelativePath(
            //               this.sp.web,
            //               `/sites/${siteName}/${docLibName}/${eachItem.Id}-${user}/${eachItem.RUC_LetterOfNomination}`
            //             );
            //             // const fileContent = await file.getBlob();
            //             fileContentArray.push({
            //               fileName: eachItem.RUC_LetterOfNomination,
            //               fileBlob: file,
            //             });
            //           }
            //           if (!(eachItem.RUC_YourPhotograph === null)) {
            //             const file = await fileFromServerRelativePath(
            //               this.sp.web,
            //               `/sites/${siteName}/${docLibName}/${eachItem.Id}-${user}/${eachItem.RUC_YourPhotograph}`
            //             );
            //             const fileContent = await file.getBlob();
            //             fileContentArray.push({
            //               fileName: eachItem.RUC_YourPhotograph,
            //               fileBlob: fileContent,
            //             });
            //           }
            //           if (!(eachItem.RUC_CV === null)) {
            //             const file = await fileFromServerRelativePath(
            //               this.sp.web,
            //               `/sites/${siteName}/${docLibName}/${eachItem.Id}-${user}/${eachItem.RUC_CV}`
            //             );
            //             const fileContent = await file.getBlob();
            //             fileContentArray.push({
            //               fileName: eachItem.RUC_CV,
            //               fileBlob: fileContent,
            //             });
            //           }
            //           if (!(eachItem.RUC_LetterofIntent === null)) {
            //             const file = await fileFromServerRelativePath(
            //               this.sp.web,
            //               `/sites/${siteName}/${docLibName}/${eachItem.Id}-${user}/${eachItem.RUC_LetterofIntent}`
            //             );
            //             const fileContent = await file.getBlob();
            //             fileContentArray.push({
            //               fileName: eachItem.RUC_LetterofIntent,
            //               fileBlob: fileContent,
            //             });
            //           }
            //           if (!(eachItem.RUC_PersonalIntroduction === null)) {
            //             const file = await fileFromServerRelativePath(
            //               this.sp.web,
            //               `/sites/${siteName}/${docLibName}/${eachItem.Id}-${user}/${eachItem.RUC_PersonalIntroduction}`
            //             );
            //             const fileContent = await file.getBlob();
            //             fileContentArray.push({
            //               fileName: eachItem.RUC_PersonalIntroduction,
            //               fileBlob: fileContent,
            //             });
            //           }
            //           const ItemDetails = {
            //             item: eachItem,
            //             filesArr: fileContentArray,
            //           };
            //           resolve(ItemDetails);

            //         }
            //       })
            desiredEntry
              ? resolve(ItemDetails)
              : resolve({
                  item: -1,
                  filesArr: [],
                });
          })
          .catch((err: any) => {
            // console.log(err);

            Swal.fire({
              title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: "OK",
              backdrop: false,
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                let id: any = sessionStorage.getItem("applicationId")
                  ? sessionStorage.getItem("applicationId")?.toUpperCase()
                  : "NA";
                await this.Error(
                  programmeName,
                  id,
                  "NA",
                  `Error: ${err} `,
                  homepage,
                  auditloglist
                );
                window.open(homepage, "_self");
              }
            });
          });
      }
    });
  }
  public fileUpload(
    file: any,
    id: any,
    user: any,
    siteName: string,
    docLibName: string,
    programmeName: string,
    status: string,
    homepage: string,auditlist:string
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (file.name) {
        // Code to execute if property exists
        await this.sp.web
          .getFolderByServerRelativePath(
            `/sites/${siteName}/${docLibName}/${id}-${user}`
          )
          .files.addUsingPath(file.name, file, { Overwrite: true })
          .then((res: any) => {
            // console.log("File Added Sussefully", res.data);
            let id: any = sessionStorage.getItem("applicationId")
              ? sessionStorage.getItem("applicationId")?.toUpperCase()
              : "";
            this.Log(
              programmeName,
              id,
              status,
              `File Added Sussefully, ${file.name}`,
              homepage,auditlist
            );
            //res contains files absolute url
            resolve(res.data);
          })
          .catch((err: any) => {
            Swal.fire({
              title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: "OK",
              backdrop: false,
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                let id: any = sessionStorage.getItem("applicationId")
                  ? sessionStorage.getItem("applicationId")?.toUpperCase()
                  : "NA";
                await this.Error(
                  programmeName,
                  id,
                  status,
                  `Error:  ${file.name} -${err} `,
                  homepage,auditlist
                );
                window.open(homepage, "_self");
              }
            });
          });
      }
      resolve();
    });
  }

  public getcurrentuserGroups(
    approvergroupid: string,
    admingroupid: string,
    programmeName: string,
    status: string,
    homepage: string,
    auditlistid: string
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this.sp.web.currentUser
        .groups()
        .then((grouparr: any) => {
          // console.log("Groups", grouparr);
          let _grouparray: any = [];
          grouparr.map((each: any) => {
            _grouparray.push(each.Id);
          });

          if (_grouparray.indexOf(Number(admingroupid)) > -1) {
            resolve("Admin");
          } else if (_grouparray.indexOf(Number(approvergroupid)) > -1) {
            resolve("Approver");
          } else {
            resolve("Guest");
          }
        })
        .catch((err: any) =>
          Swal.fire({
            title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "OK",
            backdrop: false,
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */

            if (result.isConfirmed) {
              let id: any = sessionStorage.getItem("applicationId")
                ? sessionStorage.getItem("applicationId")?.toUpperCase()
                : "NA";
              await this.Error(
                programmeName,
                id,
                status,
                `Error: ${err} `,
                homepage,
                auditlistid
              );
              window.open(homepage, "_self");
            }
          })
        );
    });
  }

  public async saveAsDraft(
    formData: IYoungFellowState,
    listId: string,
    userloggedIn: string,
    status: string,
    siteName: string,
    docLibName: any,
    formselected: string,
    appStartDate: any,
    appEndDate: any,
    userRole: string,
    programmeName: string,
    isLastStep: boolean,
    homepage: string,auditlist:string
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      //let updateItemId;
      let sharepointRes: any;
      let itemExist: boolean = false;
      // let desiredEntry: any;
      //let shouldUpdate:boolean= false;

      const fieldOfExpertise: any = [];
      !(formData.RUC_FieldofExpertise === null) &&
        formData.RUC_FieldofExpertise.map((each: any) => {
          fieldOfExpertise.push(Number(each.value));
        });
      let newObj: any;
      if (formselected === "RYFP") {
        newObj = {
          RUC_Branch2Checkbox:
            formData.RUC_Branch2Checkbox === null
              ? false
              : formData.RUC_Branch2Checkbox,
          RUC_Branch3Checkbox:
            formData.RUC_Branch3Checkbox === null
              ? false
              : formData.RUC_Branch3Checkbox,
          RUC_Branch4Checkbox:
            formData.RUC_Branch4Checkbox === null
              ? false
              : formData.RUC_Branch4Checkbox,

          RUC_BAPACheckbox:
            formData.RUC_BAPACheckbox === null
              ? false
              : formData.RUC_BAPACheckbox,
          RUC_AppliedDate:
            status === "Submitted"
              ? new Date()
              : formData.RUC_AppliedDate === ""
              ? null
              : formData.RUC_AppliedDate,
          RUC_ApplicationStatus:
            status === "Submitted" ? status : formData.RUC_ApplicationStatus,
          RUC_Salutation: !(formData.RUC_Salutation.length === 0)
            ? formData.RUC_Salutation[0].value
            : null,
          RUC_Title: formData.RUC_Title,
          RUC_LastName: formData.RUC_LastName,
          RUC_FirstName: formData.RUC_FirstName,
          RUC_DateofBirth:
            formData.RUC_DateofBirth !== ""
              ? new Date(formData.RUC_DateofBirth).toISOString()
              : null,
          RUC_NationalityId: !(formData.RUC_Nationality.length === 0)
            ? Number(formData.RUC_Nationality[0].value)
            : null,
          RUC_OtherNationalityId: !(formData.RUC_OtherNationality.length === 0)
            ? Number(formData.RUC_OtherNationality[0].value)
            : null,
          RUC_CurrentCountryofResidenceId: !(
            formData.RUC_CurrentCountryofResidence.length === 0
          )
            ? Number(formData.RUC_CurrentCountryofResidence[0].value)
            : null,

          RUC_FullnameOfYourNominator:
            formData.RUC_FullnameOfYourNominator !== ""
              ? formData.RUC_FullnameOfYourNominator
              : null,
          RUC_CompanyInstitute:
            formData.RUC_CompanyInstitute !== ""
              ? formData.RUC_CompanyInstitute
              : null,
          // RUC_Organisation_Ministry:
          //   formData.RUC_CompanyInstitute !== ""
          //     ? formData.RUC_Organisation_Ministry
          //     : null,
          RUC_LetterOfNomination:
            formData.RUC_LetterOfNomination !== ""
              ? formData.RUC_LetterOfNomination
              : null,
          RUC_PAStreet:
            formData.RUC_PAStreet !== "" ? formData.RUC_PAStreet : null,
          RUC_2ndLineOfAddress:
            formData.RUC_2ndLineOfAddress !== ""
              ? formData.RUC_2ndLineOfAddress
              : null,
          RUC_PAZipcode:
            formData.RUC_PAZipcode !== "" ? formData.RUC_PAZipcode : null,
          RUC_PACity: formData.RUC_PACity !== "" ? formData.RUC_PACity : null,
          RUC_PACountryId: !(formData.RUC_PACountry.length === 0)
            ? Number(formData.RUC_PACountry[0].value)
            : null,
          RUC_PAContinentId: !(formData.RUC_PAContinent.length === 0)
            ? Number(formData.RUC_PAContinent[0].value)
            : null,
          RUC_PAPhone:
            formData.RUC_PAPhone !== "" ? formData.RUC_PAPhone : null,
          RUC_PACellPhone:
            formData.RUC_PACellPhone !== "" ? formData.RUC_PACellPhone : null,
          RUC_PAEmail:
            formData.RUC_PAEmail !== "" ? formData.RUC_PAEmail : null,
          RUC_FieldofActivityId: !(formData.RUC_FieldofActivity.length === 0)
            ? Number(formData.RUC_FieldofActivity[0].value)
            : null,
          RUC_Employer:
            formData.RUC_Employer !== "" ? formData.RUC_Employer : null,
          RUC_Department:
            formData.RUC_Department !== "" ? formData.RUC_Department : null,
          RUC_Position:
            formData.RUC_Position !== "" ? formData.RUC_Position : null,
          RUC_BAStreet:
            formData.RUC_BAStreet !== "" ? formData.RUC_BAStreet : null,
          RUC_BAZipcode:
            formData.RUC_BAZipcode !== "" ? formData.RUC_BAZipcode : null,
          RUC_BACity: formData.RUC_BACity !== "" ? formData.RUC_BACity : null,
          RUC_BACountryId: !(formData.RUC_BACountry.length === 0)
            ? Number(formData.RUC_BACountry[0].value)
            : null,
          RUC_BAContinentId: !(formData.RUC_BAContinent.length === 0)
            ? Number(formData.RUC_BAContinent[0].value)
            : null,
          RUC_BAPhone:
            formData.RUC_BAPhone !== "" ? formData.RUC_BAPhone : null,
          RUC_BACellPhone:
            formData.RUC_BACellPhone !== "" ? formData.RUC_BACellPhone : null,
          RUC_BAEmail:
            formData.RUC_BAEmail !== "" ? formData.RUC_BAEmail : null,
          RUC_CV: formData.RUC_CV !== "" ? formData.RUC_CV : null,
          RUC_YourPhotograph:
            formData.RUC_YourPhotograph !== ""
              ? formData.RUC_YourPhotograph
              : null,
          RUC_PersonalIntroduction:
            formData.RUC_PersonalIntroduction !== ""
              ? formData.RUC_PersonalIntroduction
              : null,
          RUC_LetterofIntent:
            formData.RUC_LetterofIntent !== ""
              ? formData.RUC_LetterofIntent
              : null,

          RUC_FieldofExpertiseId: !(formData.RUC_FieldofExpertise.length === 0)
            ? fieldOfExpertise
            : [],
          RUC_OtherQualifications: formData.RUC_OtherQualifications
            ? formData.RUC_OtherQualifications
            : null,
          RUC_FurtherQualifications: formData.RUC_FurtherQualifications
            ? formData.RUC_FurtherQualifications
            : null,

          RUC_Branch1Id: !(formData.RUC_Branch1.length === 0)
            ? Number(formData.RUC_Branch1[0].value)
            : null,
          RUC_Branch1Other:
            formData.RUC_Branch1Other !== "" ? formData.RUC_Branch1Other : null,

          RUC_Branch1University:
            formData.RUC_Branch1University !== ""
              ? formData.RUC_Branch1University
              : null,
          RUC_Branch1City:
            formData.RUC_Branch1City !== "" ? formData.RUC_Branch1City : null,
          RUC_Branch1CountryId: !(formData.RUC_Branch1Country.length === 0)
            ? Number(formData.RUC_Branch1Country[0].value)
            : null,
          RUC_Branch1ContinentId: !(formData.RUC_Branch1Continent.length === 0)
            ? Number(formData.RUC_Branch1Continent[0].value)
            : null,
          RUC_Branch1Degree:
            formData.RUC_Branch1Degree !== ""
              ? formData.RUC_Branch1Degree
              : null,
          RUC_Branch1DegreeOther:
            formData.RUC_Branch1DegreeOther !== ""
              ? formData.RUC_Branch1DegreeOther
              : null,
          RUC_Branch1TitleofBA_MA:
            formData.RUC_Branch1TitleofBA_MA !== ""
              ? formData.RUC_Branch1TitleofBA_MA
              : null,
          RUC_Branch1From:
            formData.RUC_Branch1From !== ""
              ? new Date(formData.RUC_Branch1From).toISOString()
              : null,
          RUC_Branch1To:
            formData.RUC_Branch1To !== ""
              ? new Date(formData.RUC_Branch1To).toISOString()
              : null,
          RUC_Branch2Id: !(formData.RUC_Branch2.length === 0)
            ? Number(formData.RUC_Branch2[0].value)
            : null,
          RUC_Branch2Other:
            formData.RUC_Branch2Other !== "" ? formData.RUC_Branch2Other : null,

          RUC_Branch2University:
            formData.RUC_Branch2University !== ""
              ? formData.RUC_Branch2University
              : null,
          RUC_Branch2City:
            formData.RUC_Branch2City !== "" ? formData.RUC_Branch2City : null,
          RUC_Branch2CountryId: !(formData.RUC_Branch2Country.length === 0)
            ? Number(formData.RUC_Branch2Country[0].value)
            : null,
          RUC_Branch2ContinentId: !(formData.RUC_Branch2Continent.length === 0)
            ? Number(formData.RUC_Branch2Continent[0].value)
            : null,
          RUC_Branch2Degree:
            formData.RUC_Branch2Degree !== ""
              ? formData.RUC_Branch2Degree
              : null,
          RUC_Branch2DegreeOther:
            formData.RUC_Branch2DegreeOther !== ""
              ? formData.RUC_Branch2DegreeOther
              : null,
          RUC_Branch2TitleofBA_MA:
            formData.RUC_Branch2TitleofBA_MA !== ""
              ? formData.RUC_Branch2TitleofBA_MA
              : null,
          RUC_Branch2From:
            formData.RUC_Branch2From !== ""
              ? new Date(formData.RUC_Branch2From).toISOString()
              : null,
          RUC_Branch2To:
            formData.RUC_Branch2To !== ""
              ? new Date(formData.RUC_Branch2To).toISOString()
              : null,
          RUC_Branch3Id: !(formData.RUC_Branch3.length === 0)
            ? Number(formData.RUC_Branch3[0].value)
            : null,
          RUC_Branch3Other:
            formData.RUC_Branch3Other !== "" ? formData.RUC_Branch3Other : null,

          RUC_Branch3University:
            formData.RUC_Branch3University !== ""
              ? formData.RUC_Branch3University
              : null,
          RUC_Branch3City:
            formData.RUC_Branch3City !== "" ? formData.RUC_Branch3City : null,
          RUC_Branch3CountryId: !(formData.RUC_Branch3Country.length === 0)
            ? Number(formData.RUC_Branch3Country[0].value)
            : null,
          RUC_Branch3ContinentId: !(formData.RUC_Branch3Continent.length === 0)
            ? Number(formData.RUC_Branch3Continent[0].value)
            : null,
          RUC_Branch3Degree:
            formData.RUC_Branch3Degree !== ""
              ? formData.RUC_Branch3Degree
              : null,
          RUC_Branch3DegreeOther:
            formData.RUC_Branch3DegreeOther !== ""
              ? formData.RUC_Branch3DegreeOther
              : null,
          RUC_Branch3TitleofBA_MA:
            formData.RUC_Branch3TitleofBA_MA !== ""
              ? formData.RUC_Branch3TitleofBA_MA
              : null,
          RUC_Branch3From:
            formData.RUC_Branch3From !== ""
              ? new Date(formData.RUC_Branch3From).toISOString()
              : null,
          RUC_Branch3To:
            formData.RUC_Branch3To !== ""
              ? new Date(formData.RUC_Branch3To).toISOString()
              : null,
          RUC_Branch4Id: !(formData.RUC_Branch4.length === 0)
            ? Number(formData.RUC_Branch4[0].value)
            : null,
          RUC_Branch4Other:
            formData.RUC_Branch4Other !== "" ? formData.RUC_Branch4Other : null,

          RUC_Branch4University:
            formData.RUC_Branch4University !== ""
              ? formData.RUC_Branch4University
              : null,
          RUC_Branch4City:
            formData.RUC_Branch4City !== "" ? formData.RUC_Branch4City : null,
          RUC_Branch4CountryId: !(formData.RUC_Branch4Country.length === 0)
            ? Number(formData.RUC_Branch4Country[0].value)
            : null,
          RUC_Branch4ContinentId: !(formData.RUC_Branch4Continent.length === 0)
            ? Number(formData.RUC_Branch4Continent[0].value)
            : null,
          RUC_Branch4Degree:
            formData.RUC_Branch4Degree !== ""
              ? formData.RUC_Branch4Degree
              : null,
          RUC_Branch4DegreeOther:
            formData.RUC_Branch4DegreeOther !== ""
              ? formData.RUC_Branch4DegreeOther
              : null,
          RUC_Branch4TitleofBA_MA:
            formData.RUC_Branch4TitleofBA_MA !== ""
              ? formData.RUC_Branch4TitleofBA_MA
              : null,
          RUC_Branch4From:
            formData.RUC_Branch4From !== ""
              ? new Date(formData.RUC_Branch4From).toISOString()
              : null,
          RUC_Branch4To:
            formData.RUC_Branch4To !== ""
              ? new Date(formData.RUC_Branch4To).toISOString()
              : null,
        };
      }

      if (formselected === "RFFD") {
        newObj = {
          RUC_Branch2Checkbox:
            formData.RUC_Branch2Checkbox === null
              ? false
              : formData.RUC_Branch2Checkbox,
          RUC_Branch3Checkbox:
            formData.RUC_Branch3Checkbox === null
              ? false
              : formData.RUC_Branch3Checkbox,
          RUC_Branch4Checkbox:
            formData.RUC_Branch4Checkbox === null
              ? false
              : formData.RUC_Branch4Checkbox,
          RUC_BAPACheckbox:
            formData.RUC_BAPACheckbox === null
              ? false
              : formData.RUC_BAPACheckbox,
          RUC_AppliedDate:
            status === "Submitted"
              ? new Date()
              : formData.RUC_AppliedDate === ""
              ? null
              : formData.RUC_AppliedDate,
          RUC_ApplicationStatus:
            status === "Submitted" ? status : formData.RUC_ApplicationStatus,
          RUC_Salutation: !(formData.RUC_Salutation.length === 0)
            ? formData.RUC_Salutation[0].value
            : null,
          RUC_Title: formData.RUC_Title,
          RUC_LastName: formData.RUC_LastName,
          RUC_FirstName: formData.RUC_FirstName,
          RUC_DateofBirth:
            formData.RUC_DateofBirth !== ""
              ? new Date(formData.RUC_DateofBirth).toISOString()
              : null,
          RUC_NationalityId: !(formData.RUC_Nationality.length === 0)
            ? Number(formData.RUC_Nationality[0].value)
            : null,
          RUC_OtherNationalityId: !(formData.RUC_OtherNationality.length === 0)
            ? Number(formData.RUC_OtherNationality[0].value)
            : null,
          RUC_CurrentCountryofResidenceId: !(
            formData.RUC_CurrentCountryofResidence.length === 0
          )
            ? Number(formData.RUC_CurrentCountryofResidence[0].value)
            : null,

          RUC_FullnameOfYourNominator:
            formData.RUC_FullnameOfYourNominator !== ""
              ? formData.RUC_FullnameOfYourNominator
              : null,

          RUC_Organisation_Ministry:
            formData.RUC_Organisation_Ministry !== ""
              ? formData.RUC_Organisation_Ministry
              : null,
          RUC_NominatorCountryId: !(formData.RUC_NominatorCountry.length === 0)
            ? Number(formData.RUC_NominatorCountry[0].value)
            : null,

          RUC_LetterOfNomination:
            formData.RUC_LetterOfNomination !== ""
              ? formData.RUC_LetterOfNomination
              : null,
          RUC_PAStreet:
            formData.RUC_PAStreet !== "" ? formData.RUC_PAStreet : null,
          RUC_2ndLineOfAddress:
            formData.RUC_2ndLineOfAddress !== ""
              ? formData.RUC_2ndLineOfAddress
              : null,
          RUC_PAZipcode:
            formData.RUC_PAZipcode !== "" ? formData.RUC_PAZipcode : null,
          RUC_PACity: formData.RUC_PACity !== "" ? formData.RUC_PACity : null,
          RUC_PACountryId: !(formData.RUC_PACountry.length === 0)
            ? Number(formData.RUC_PACountry[0].value)
            : null,
          RUC_PAContinentId: !(formData.RUC_PAContinent.length === 0)
            ? Number(formData.RUC_PAContinent[0].value)
            : null,
          RUC_PAPhone:
            formData.RUC_PAPhone !== "" ? formData.RUC_PAPhone : null,
          RUC_PACellPhone:
            formData.RUC_PACellPhone !== "" ? formData.RUC_PACellPhone : null,
          RUC_PAEmail:
            formData.RUC_PAEmail !== "" ? formData.RUC_PAEmail : null,
          RUC_FieldofActivityId: !(formData.RUC_FieldofActivity.length === 0)
            ? Number(formData.RUC_FieldofActivity[0].value)
            : null,
          RUC_Employer:
            formData.RUC_Employer !== "" ? formData.RUC_Employer : null,
          RUC_Department:
            formData.RUC_Department !== "" ? formData.RUC_Department : null,
          RUC_Position:
            formData.RUC_Position !== "" ? formData.RUC_Position : null,
          RUC_BAStreet:
            formData.RUC_BAStreet !== "" ? formData.RUC_BAStreet : null,
          RUC_BAZipcode:
            formData.RUC_BAZipcode !== "" ? formData.RUC_BAZipcode : null,
          RUC_BACity: formData.RUC_BACity !== "" ? formData.RUC_BACity : null,
          RUC_BACountryId: !(formData.RUC_BACountry.length === 0)
            ? Number(formData.RUC_BACountry[0].value)
            : null,
          RUC_BAContinentId: !(formData.RUC_BAContinent.length === 0)
            ? Number(formData.RUC_BAContinent[0].value)
            : null,
          RUC_BAPhone:
            formData.RUC_BAPhone !== "" ? formData.RUC_BAPhone : null,
          RUC_BACellPhone:
            formData.RUC_BACellPhone !== "" ? formData.RUC_BACellPhone : null,
          RUC_BAEmail:
            formData.RUC_BAEmail !== "" ? formData.RUC_BAEmail : null,
          RUC_CV: formData.RUC_CV !== "" ? formData.RUC_CV : null,
          RUC_YourPhotograph:
            formData.RUC_YourPhotograph !== ""
              ? formData.RUC_YourPhotograph
              : null,
          RUC_PersonalIntroduction:
            formData.RUC_PersonalIntroduction !== ""
              ? formData.RUC_PersonalIntroduction
              : null,
          RUC_LetterofIntent:
            formData.RUC_LetterofIntent !== ""
              ? formData.RUC_LetterofIntent
              : null,

          RUC_FieldofExpertiseId: !(formData.RUC_FieldofExpertise.length === 0)
            ? fieldOfExpertise
            : [],
          RUC_OtherQualifications: formData.RUC_OtherQualifications
            ? formData.RUC_OtherQualifications
            : null,
          RUC_FurtherQualifications: formData.RUC_FurtherQualifications
            ? formData.RUC_FurtherQualifications
            : null,

          RUC_Branch1Id: !(formData.RUC_Branch1.length === 0)
            ? Number(formData.RUC_Branch1[0].value)
            : null,
          RUC_Branch1Other:
            formData.RUC_Branch1Other !== "" ? formData.RUC_Branch1Other : null,

          RUC_Branch1University:
            formData.RUC_Branch1University !== ""
              ? formData.RUC_Branch1University
              : null,
          RUC_Branch1City:
            formData.RUC_Branch1City !== "" ? formData.RUC_Branch1City : null,
          RUC_Branch1CountryId: !(formData.RUC_Branch1Country.length === 0)
            ? Number(formData.RUC_Branch1Country[0].value)
            : null,
          RUC_Branch1ContinentId: !(formData.RUC_Branch1Continent.length === 0)
            ? Number(formData.RUC_Branch1Continent[0].value)
            : null,
          RUC_Branch1Degree:
            formData.RUC_Branch1Degree !== ""
              ? formData.RUC_Branch1Degree
              : null,
          RUC_Branch1DegreeOther:
            formData.RUC_Branch1DegreeOther !== ""
              ? formData.RUC_Branch1DegreeOther
              : null,
          RUC_Branch1TitleofBA_MA:
            formData.RUC_Branch1TitleofBA_MA !== ""
              ? formData.RUC_Branch1TitleofBA_MA
              : null,
          RUC_Branch1From:
            formData.RUC_Branch1From !== ""
              ? new Date(formData.RUC_Branch1From).toISOString()
              : null,
          RUC_Branch1To:
            formData.RUC_Branch1To !== ""
              ? new Date(formData.RUC_Branch1To).toISOString()
              : null,
          RUC_Branch2Id: !(formData.RUC_Branch2.length === 0)
            ? Number(formData.RUC_Branch2[0].value)
            : null,
          RUC_Branch2Other:
            formData.RUC_Branch2Other !== "" ? formData.RUC_Branch2Other : null,

          RUC_Branch2University:
            formData.RUC_Branch2University !== ""
              ? formData.RUC_Branch2University
              : null,
          RUC_Branch2City:
            formData.RUC_Branch2City !== "" ? formData.RUC_Branch2City : null,
          RUC_Branch2CountryId: !(formData.RUC_Branch2Country.length === 0)
            ? Number(formData.RUC_Branch2Country[0].value)
            : null,
          RUC_Branch2ContinentId: !(formData.RUC_Branch2Continent.length === 0)
            ? Number(formData.RUC_Branch2Continent[0].value)
            : null,
          RUC_Branch2Degree:
            formData.RUC_Branch2Degree !== ""
              ? formData.RUC_Branch2Degree
              : null,
          RUC_Branch2DegreeOther:
            formData.RUC_Branch2DegreeOther !== ""
              ? formData.RUC_Branch2DegreeOther
              : null,
          RUC_Branch2TitleofBA_MA:
            formData.RUC_Branch2TitleofBA_MA !== ""
              ? formData.RUC_Branch2TitleofBA_MA
              : null,
          RUC_Branch2From:
            formData.RUC_Branch2From !== ""
              ? new Date(formData.RUC_Branch2From).toISOString()
              : null,
          RUC_Branch2To:
            formData.RUC_Branch2To !== ""
              ? new Date(formData.RUC_Branch2To).toISOString()
              : null,
          RUC_Branch3Id: !(formData.RUC_Branch3.length === 0)
            ? Number(formData.RUC_Branch3[0].value)
            : null,
          RUC_Branch3Other:
            formData.RUC_Branch3Other !== "" ? formData.RUC_Branch3Other : null,

          RUC_Branch3University:
            formData.RUC_Branch3University !== ""
              ? formData.RUC_Branch3University
              : null,
          RUC_Branch3City:
            formData.RUC_Branch3City !== "" ? formData.RUC_Branch3City : null,
          RUC_Branch3CountryId: !(formData.RUC_Branch3Country.length === 0)
            ? Number(formData.RUC_Branch3Country[0].value)
            : null,
          RUC_Branch3ContinentId: !(formData.RUC_Branch3Continent.length === 0)
            ? Number(formData.RUC_Branch3Continent[0].value)
            : null,
          RUC_Branch3Degree:
            formData.RUC_Branch3Degree !== ""
              ? formData.RUC_Branch3Degree
              : null,
          RUC_Branch3DegreeOther:
            formData.RUC_Branch3DegreeOther !== ""
              ? formData.RUC_Branch3DegreeOther
              : null,
          RUC_Branch3TitleofBA_MA:
            formData.RUC_Branch3TitleofBA_MA !== ""
              ? formData.RUC_Branch3TitleofBA_MA
              : null,
          RUC_Branch3From:
            formData.RUC_Branch3From !== ""
              ? new Date(formData.RUC_Branch3From).toISOString()
              : null,
          RUC_Branch3To:
            formData.RUC_Branch3To !== ""
              ? new Date(formData.RUC_Branch3To).toISOString()
              : null,
          RUC_Branch4Id: !(formData.RUC_Branch4.length === 0)
            ? Number(formData.RUC_Branch4[0].value)
            : null,
          RUC_Branch4Other:
            formData.RUC_Branch4Other !== "" ? formData.RUC_Branch4Other : null,

          RUC_Branch4University:
            formData.RUC_Branch4University !== ""
              ? formData.RUC_Branch4University
              : null,
          RUC_Branch4City:
            formData.RUC_Branch4City !== "" ? formData.RUC_Branch4City : null,
          RUC_Branch4CountryId: !(formData.RUC_Branch4Country.length === 0)
            ? Number(formData.RUC_Branch4Country[0].value)
            : null,
          RUC_Branch4ContinentId: !(formData.RUC_Branch4Continent.length === 0)
            ? Number(formData.RUC_Branch4Continent[0].value)
            : null,
          RUC_Branch4Degree:
            formData.RUC_Branch4Degree !== ""
              ? formData.RUC_Branch4Degree
              : null,
          RUC_Branch4DegreeOther:
            formData.RUC_Branch4DegreeOther !== ""
              ? formData.RUC_Branch4DegreeOther
              : null,
          RUC_Branch4TitleofBA_MA:
            formData.RUC_Branch4TitleofBA_MA !== ""
              ? formData.RUC_Branch4TitleofBA_MA
              : null,
          RUC_Branch4From:
            formData.RUC_Branch4From !== ""
              ? new Date(formData.RUC_Branch4From).toISOString()
              : null,
          RUC_Branch4To:
            formData.RUC_Branch4To !== ""
              ? new Date(formData.RUC_Branch4To).toISOString()
              : null,
        };
      }

      const fileArray: any = [];
      if (formData.FILE_Content_LetterofNomination[0]) {
        fileArray.push(formData.FILE_Content_LetterofNomination[0]);
      }
      if (formData.FILE_Content_LetterofIntent[0]) {
        fileArray.push(formData.FILE_Content_LetterofIntent[0]);
      }

      if (formData.FILE_Content_CV[0]) {
        fileArray.push(formData.FILE_Content_CV[0]);
      }

      if (formData.FILE_Content_PersonalIntroduction[0]) {
        fileArray.push(formData.FILE_Content_PersonalIntroduction[0]);
      }
      if (formData.FILE_Content_YourPhotograph[0]) {
        fileArray.push(formData.FILE_Content_YourPhotograph[0]);
      }
      // console.log("Save AS Draft Called", newObj);
      ///fetch item check status when appId not 0
      if (!(Number(sessionStorage.getItem("applicationId")) === 0)) {
        let sessionAppId = sessionStorage
          .getItem("applicationId")
          ?.split("/")[1];
        // console.log(sessionAppId);

        sharepointRes = await this.sp.web.lists
          .getById(listId)
          .items.getById(sessionAppId)
          .select("*,Author/Title")
          .expand("Author")()
          .catch((err: any) => {
            Swal.fire({
              title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: "OK",
              backdrop: false,
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              let id: any = sessionStorage.getItem("applicationId")
                ? sessionStorage.getItem("applicationId")?.toUpperCase()
                : "NA";
              await this.Error(
                programmeName,
                id,
                sharepointRes.RUC_ApplicationStatus,
                `Error : ${err}`,
                homepage,auditlist
              );
              if (result.isConfirmed) {
                window.open(
                  "https://orfonlineorg.sharepoint.com/sites/FellowshipProgramPortal_QA",
                  "_self"
                );
              }
            });
          });

        const user = sharepointRes.Author.Title;
        if (sharepointRes?.RUC_ApplicationStatus === "Draft") {
          itemExist = true;
          //shouldUpdate=true;
          //updateItemId = res[i];
          if (userRole === "Admin" || userRole === "Guest") {
            await this.sp.web.lists
              .getById(listId)
              .items.getById(sharepointRes.Id)
              .update(newObj)
              .then(async (itemres: any) => {
                // console.log(
                //   "Item update--- draft state ----STATUS",
                //   sharepointRes.RUC_ApplicationStatus
                // );
                await Promise.all(
                  fileArray.map((file: any) => {
                    return this.fileUpload(
                      file,
                      sharepointRes.Id,
                      user,
                      siteName,
                      docLibName,
                      programmeName,
                      formData.RUC_ApplicationStatus,
                      homepage,auditlist
                    );
                  })
                );
              })
              .then(() => {
                if (status === "Submitted") {
                  // alert("Form Submitted successfully");
                } else {
                  //alert("Form Updated successfully");
                }

                resolve(true);
              })
              .catch((err: any) => {
                // console.log(err);
                Swal.fire({
                  title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  backdrop: false,
                }).then(async (result) => {
                  /* Read more about isConfirmed, isDenied below */
                  let id: any = sessionStorage.getItem("applicationId")
                    ? sessionStorage.getItem("applicationId")?.toUpperCase()
                    : "NA";
                  await this.Error(
                    programmeName,
                    id,
                    sharepointRes.RUC_ApplicationStatus,
                    `Error : ${err}`,
                    homepage,auditlist
                  );
                  if (result.isConfirmed) {
                    window.open(homepage, "_self");
                  }
                });
                //alert("Error,Please try again");
              });
          }
        }
        if (sharepointRes?.RUC_ApplicationStatus === "Submitted") {
          itemExist = true;
          if (userRole === "Admin") {
            await this.sp.web.lists
              .getById(listId)
              .items.getById(sharepointRes.Id)
              .update(newObj)
              .then(async (itemres: any) => {
                // console.log(
                //   "Item update--- submitted state ---updated by Admin----STATUS",
                //   sharepointRes?.RUC_ApplicationStatus,
                //   sharepointRes.RUC_ApplicationStatus
                // );
                await Promise.all(
                  fileArray.map((file: any) => {
                    return this.fileUpload(
                      file,
                      sharepointRes.Id,
                      user,
                      siteName,
                      docLibName,
                      programmeName,
                      formData.RUC_ApplicationStatus,
                      homepage,auditlist
                    );
                  })
                );
              })
              .then(() => {
                resolve(true);
              })
              .catch((err: any) => {
                // console.log(err);
                Swal.fire({
                  title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  backdrop: false,
                }).then(async (result) => {
                  /* Read more about isConfirmed, isDenied below */
                  let id: any = sessionStorage.getItem("applicationId")
                    ? sessionStorage.getItem("applicationId")?.toUpperCase()
                    : "NA";
                  await this.Error(
                    programmeName,
                    id,
                    sharepointRes.RUC_ApplicationStatus,
                    `Error : ${err}`,
                    homepage,auditlist
                  );
                  if (result.isConfirmed) {
                    window.open(homepage, "_self");
                  }
                });
                //alert("Error,Please try again");
              });
          } else {
            // console.log("Already Item exits and is submitted", sharepointRes);
            Swal.fire({
              title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>This application is already submitted</p>`,

              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: "OK",
              backdrop: false,
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                window.open(homepage, "_self");
              }
            });
            isLastStep ? resolve(false) : resolve(true);
          }
        }
        if (sharepointRes?.RUC_ApplicationStatus === "Training Completed") {
          if (userRole === "Admin") {
            await this.sp.web.lists
              .getById(listId)
              .items.getById(sharepointRes.Id)
              .update(newObj)
              .then(async (itemres: any) => {
                // console.log(
                //   "Item update--- Training Completed state ---updated by Admin----STATUS",
                //   sharepointRes?.RUC_ApplicationStatus,
                //   sharepointRes.RUC_ApplicationStatus
                // );
                await Promise.all(
                  fileArray.map((file: any) => {
                    return this.fileUpload(
                      file,
                      sharepointRes.Id,
                      user,
                      siteName,
                      docLibName,
                      programmeName,
                      formData.RUC_ApplicationStatus,
                      homepage,auditlist
                    );
                  })
                );
              })
              .then(() => {
                resolve(true);
              })
              .catch((err: any) => {
                // console.log(err);
                Swal.fire({
                  title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  backdrop: false,
                }).then(async (result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    let id: any = sessionStorage.getItem("applicationId")
                      ? sessionStorage.getItem("applicationId")?.toUpperCase()
                      : "NA";
                    await this.Error(
                      programmeName,
                      id,
                      sharepointRes.RUC_ApplicationStatus,
                      `Error : ${err}`,
                      homepage,auditlist
                    );
                    window.open(homepage, "_self");
                  }
                });
                //alert("Error,Please try again");
              });
          } else {
            resolve(true);
            // console.log("Already Item exits and is submitted", sharepointRes);
          }
        }
        if (sharepointRes?.RUC_ApplicationStatus === "Rejected") {
          itemExist = true;

          if (userRole === "Admin") {
            await this.sp.web.lists
              .getById(listId)
              .items.getById(sharepointRes.Id)
              .update(newObj)
              .then(async (itemres: any) => {
                // console.log(
                //   "Item update--- Rejected state ---updated by Admin----STATUS",
                //   sharepointRes?.RUC_ApplicationStatus,
                //   sharepointRes.RUC_ApplicationStatus
                // );
                await Promise.all(
                  fileArray.map((file: any) => {
                    return this.fileUpload(
                      file,
                      sharepointRes.Id,
                      user,
                      siteName,
                      docLibName,
                      programmeName,
                      formData.RUC_ApplicationStatus,
                      homepage,auditlist
                    );
                  })
                );
              })
              .then(() => {
                resolve(true);
              })
              .catch((err: any) => {
                // console.log(err);
                Swal.fire({
                  title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  backdrop: false,
                }).then(async (result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    let id: any = sessionStorage.getItem("applicationId")
                      ? sessionStorage.getItem("applicationId")?.toUpperCase()
                      : "NA";
                    await this.Error(
                      programmeName,
                      id,
                      sharepointRes.RUC_ApplicationStatus,
                      `Error : ${err}`,
                      homepage,auditlist
                    );
                    window.open(homepage, "_self");
                  }
                });
                //alert("Error,Please try again");
              });
          } else {
            // console.log("Already Item exits and is submitted", sharepointRes);
          }
          resolve(true);
        }
        if (sharepointRes?.RUC_ApplicationStatus === "Approved") {
          itemExist = true;

          if (userRole === "Admin") {
            await this.sp.web.lists
              .getById(listId)
              .items.getById(sharepointRes.Id)
              .update(newObj)
              .then(async (itemres: any) => {
                // console.log(
                //   "Item update--- Approved state ---updated by Admin----STATUS",
                //   sharepointRes?.RUC_ApplicationStatus,
                //   sharepointRes.RUC_ApplicationStatus
                // );
                await Promise.all(
                  fileArray.map((file: any) => {
                    return this.fileUpload(
                      file,
                      sharepointRes.Id,
                      user,
                      siteName,
                      docLibName,
                      programmeName,
                      formData.RUC_ApplicationStatus,
                      homepage,auditlist
                    );
                  })
                );
              })
              .then(() => {
                resolve(true);
              })
              .catch((err: any) => {
                // console.log(err);
                Swal.fire({
                  title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  backdrop: false,
                }).then(async (result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    let id: any = sessionStorage.getItem("applicationId")
                      ? sessionStorage.getItem("applicationId")?.toUpperCase()
                      : "NA";
                    await this.Error(
                      programmeName,
                      id,
                      sharepointRes.RUC_ApplicationStatus,
                      `Error : ${err}`,
                      homepage,auditlist
                    );
                    window.open(homepage, "_self");
                  }
                });
                //alert("Error,Please try again");
              });
          } else {
            // console.log("Already Item exits and is submitted", sharepointRes);
          }
          resolve(true);
        }
        if (sharepointRes?.RUC_ApplicationStatus === "Provisionally Approved") {
          itemExist = true;

          if (userRole === "Admin") {
            await this.sp.web.lists
              .getById(listId)
              .items.getById(sharepointRes.Id)
              .update(newObj)
              .then(async (itemres: any) => {
                // console.log(
                //   "Item update--- Provisionally Approved state ---updated by Admin----STATUS",
                //   sharepointRes?.RUC_ApplicationStatus,
                //   sharepointRes.RUC_ApplicationStatus
                // );
                await Promise.all(
                  fileArray.map((file: any) => {
                    return this.fileUpload(
                      file,
                      sharepointRes.Id,
                      user,
                      siteName,
                      docLibName,
                      programmeName,
                      formData.RUC_ApplicationStatus,
                      homepage,auditlist
                    );
                  })
                );
              })
              .then(() => {
                resolve(true);
              })
              .catch((err: any) => {
                // console.log(err);
                Swal.fire({
                  title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  backdrop: false,
                }).then(async (result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    let id: any = sessionStorage.getItem("applicationId")
                      ? sessionStorage.getItem("applicationId")?.toUpperCase()
                      : "NA";
                    await this.Error(
                      programmeName,
                      id,
                      sharepointRes.RUC_ApplicationStatus,
                      `Error : ${err}`,
                      homepage,auditlist
                    );
                    window.open(homepage, "_self");
                  }
                });
                //alert("Error,Please try again");
              });
          } else {
            // console.log("Already Item exits and is submitted", sharepointRes);
          }
          resolve(true);
        }
        if (sharepointRes?.RUC_ApplicationStatus === "Provisionally Rejected") {
          itemExist = true;

          if (userRole === "Admin") {
            await this.sp.web.lists
              .getById(listId)
              .items.getById(sharepointRes.Id)
              .update(newObj)
              .then(async (itemres: any) => {
                // console.log(
                //   "Item update--- Provisionally Rejected state ---updated by Admin----STATUS",
                //   sharepointRes?.RUC_ApplicationStatus,
                //   sharepointRes.RUC_ApplicationStatus
                // );
                await Promise.all(
                  fileArray.map((file: any) => {
                    return this.fileUpload(
                      file,
                      sharepointRes.Id,
                      user,
                      siteName,
                      docLibName,
                      programmeName,
                      formData.RUC_ApplicationStatus,
                      homepage,auditlist
                    );
                  })
                );
              })
              .then(() => {
                resolve(true);
              })
              .catch((err: any) => {
                // console.log(err);
                Swal.fire({
                  title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: "OK",
                  backdrop: false,
                }).then(async (result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    let id: any = sessionStorage.getItem("applicationId")
                      ? sessionStorage.getItem("applicationId")?.toUpperCase()
                      : "NA";
                    await this.Error(
                      programmeName,
                      id,
                      sharepointRes.RUC_ApplicationStatus,
                      `Error : ${err}`,
                      homepage,auditlist
                    );
                    window.open(homepage, "_self");
                  }
                });
                //alert("Error,Please try again");
              });
          } else {
            // console.log("Already Item exits and is submitted", sharepointRes);
          }
          resolve(true);
        }
      }
      //item exits false and app id 0 create new item
      if (!itemExist && Number(sessionStorage.getItem("applicationId")) === 0) {
        if (userRole === "Admin" || userRole === "Guest") {
          await this.sp.web.lists
            .getById(listId)
            .items.add(newObj)
            .then(async (itemres: any) => {
              const updateApplicationID = await this.sp.web.lists
                .getById(listId)
                .items.getById(itemres.data.Id)
                .update({
                  ...newObj,
                  RUC_ApplicationId: `${formselected}/${itemres.data.Id}`,
                });
              // console.log("Application Id added", updateApplicationID);
              await this.sp.web.folders
                .addUsingPath(
                  `${docLibName}/${itemres.data.Id}-${userloggedIn}`
                )
                .then((docres: any) => {
                  // console.log(docres);
                })
                .catch((err: any) => {
                  Swal.fire({
                    title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: "OK",
                    backdrop: false,
                  }).then(async (result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      let id: any = sessionStorage.getItem("applicationId")
                        ? sessionStorage.getItem("applicationId")?.toUpperCase()
                        : "NA";
                      await this.Error(
                        programmeName,
                        id,
                        sharepointRes.RUC_ApplicationStatus,
                        `Error : ${err}`,
                        homepage,auditlist
                      );
                      window.open(homepage, "_self");
                    }
                  });
                  // console.log("Document folder creation error");
                });
              // alert("Form saved successfully");
              // console.log(itemres);
              // Construct URLSearchParams object instance from current URL querystring.
              var queryParams = new URLSearchParams(window.location.search);
              // Set new or modify existing parameter value.
              queryParams.set(
                "applicationId",
                `${formselected}/${itemres.data.Id}`
              );
              // Replace current querystring with the new one.
              history.replaceState(
                null,
                document.title,
                "?" + queryParams.toString()
              );
              sessionStorage.setItem(
                "applicationId",
                `${formselected}/${itemres.data.Id}`
              );
              // console.log("sessionId", sessionStorage.getItem("applicationId"));
              resolve(true);
            })
            .catch((err: any) => {
              // console.log(err);
              Swal.fire({
                title: `<p style=font-size:18px;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator. </p>`,

                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "OK",
                confirmButtonColor: "#B4A048",
                backdrop: false,
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  let id: any = sessionStorage.getItem("applicationId")
                    ? sessionStorage.getItem("applicationId")?.toUpperCase()
                    : "NA";
                  await this.Error(
                    programmeName,
                    id,
                    sharepointRes.RUC_ApplicationStatus,
                    `Error : ${err}`,
                    homepage,auditlist
                  );
                  window.open(homepage, "_self");
                }
              });
              // alert("Error,Please try again");
            });
        }
      }
    });
  }

  public getFellowshipProgramStatus(
    listid: string,
    formName: string,
    programmeName: string,
    status: string,
    homepage: string,
    auditlist: string
  ) {
    let pnparry: any = [];
    //const today = new Date().toISOString();

    return new Promise(async (resolve, reject) => {
      await this.sp.web.lists
        .getById(listid)
        .items.filter("RUC_IsVisible eq 1")
        .select(
          "RUC_FellowshipStatus,RUC_FellowShipProgram/RUC_AppSuffix,RUC_FellowShipProgram/Title,RUC_FellowshipImage"
        )
        .expand("RUC_FellowShipProgram")()
        .then((pnpresult: any) => {
          // console.log("pnpresult", pnpresult);
          // console.log("UTC todau", new Date().toISOString());
          pnpresult.map((res: any) => {
            pnparry.push({
              RUC_ApplicationStatus: res.RUC_FellowshipStatus,
              RUC_FellowshipImage: res.RUC_FellowshipImage
                ? res.RUC_FellowshipImage.Url
                : "",

              Title: res.RUC_FellowShipProgram
                ? res.RUC_FellowShipProgram.Title
                : "",
              FormCode: res.RUC_FellowShipProgram
                ? res.RUC_FellowShipProgram.RUC_AppSuffix
                : "",
            });
          });
          const form = pnparry.filter((each: any) => {
            return (
              formName.toLowerCase() ===
              each.FormCode.replace("/", "").trimEnd().toLowerCase()
            );
          });

          resolve(form);
        })
        .catch((err: any) => {
          Swal.fire({
            title: `<p >There is some error in completing this action for the application. Please contact the administrator. </p>`,

            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "OK",
            backdrop: false,
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              let id: any = sessionStorage.getItem("applicationId")
                ? sessionStorage.getItem("applicationId")?.toUpperCase()
                : "NA";
              await this.Error(
                programmeName,
                id,
                status,
                `Error: ${err} `,
                homepage,
                auditlist
              );
              window.open(homepage, "_self");
            }
          });
        });
    });
  }
}
