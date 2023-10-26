/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version, DisplayMode } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import {
  PropertyFieldSitePicker,
  IPropertyFieldSite,
} from "@pnp/spfx-property-controls/lib/PropertyFieldSitePicker";
import * as strings from "OrfWebPartStrings";
import Orf from "./components/Orf";
import { IOrfProps } from "./components/IOrfProps";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/fields";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/content-types";
import spOperation from "./components/spService/spService";
import { DataBinding } from "./components/Helper/DataBinding";
import {
  PropertyFieldPeoplePicker,
  PrincipalType,
  IPropertyFieldGroupOrPerson,
} from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import Swal from "sweetalert2";
import Configuration from "./components/common/ConfigurationComp";
//import { escape } from "@microsoft/sp-lodash-subset";

export interface IOrfWebPartProps {
  description: string;
  siteurl: IPropertyFieldSite[];
  fellowShipMLlistID: string;
  countryMlID: string;
  continentMlID: string;
  fieldOfActivityMlID: string;
  branchOfStudyMLID: string;
  fieldOfExpertise: string;
  documentLibName: string;
  YoungFellowsListId: string;
  formName: string;
  contentType: any;
  groupAdmin: IPropertyFieldGroupOrPerson[];
  groupApprover: IPropertyFieldGroupOrPerson[];
  formDetailslist: string;
  auditlogList: string;
  HomePage: string;
  MyApplication: string;
  AdminPage: string;
  ApproverPage: string;
}

export default class OrfWebPart extends BaseClientSideWebPart<IOrfWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: any = "";
  private _lists: IPropertyPaneDropdownOption[] = [];
  //private _contentTypeId: any = "";
  private _applicationID: any = "NA";
  private _formList: any = [];
  private _contentTypeFields = [];
  private spService: any;
  private _helperClass: DataBinding;
  private _allDataBinding: any;
  private _itemExistId = {
    item: -1,
    filesArr: [],
  };
  private _versionItem = {
    item: -1,
    filesArr: [],
  };

  private _currentUserRole: any = "";
  private _formModeURL: any;
  private _versionNo: any;
  private _formStatus: string;
  private _formDetails: any;
  private _author: any;

  public render(): void {
    let element: React.ReactElement = React.createElement(Configuration, {
      context: this.context,
    });

    const _configurationcomponent: React.ReactElement = React.createElement(
      Configuration,
      {
        context: this.context,
      }
    );
    const Formelement: React.ReactElement<IOrfProps> = React.createElement(
      Orf,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        spfxcontext: this.context,
        fellowShipMLlistID: this.properties.fellowShipMLlistID
          ? this.properties.fellowShipMLlistID
          : "",
        siteurl: this.properties.siteurl
          ? this.properties.siteurl[0].url
          : this.context.pageContext.web.absoluteUrl,
        siteName: this.properties.siteurl
          ? this.properties.siteurl[0].title
          : "",
        formListObj: this._formList,

        contentTypeField: this._contentTypeFields,
        allBindingData: this._allDataBinding,
        documentLibName: this.properties.documentLibName
          ? this.properties.documentLibName
          : "",
        YFlistId: this.properties.YoungFellowsListId
          ? this.properties.YoungFellowsListId
          : "",
        itemIdYoungFellow: this._itemExistId,
        versionItem: this._versionItem,
        formselected: this.properties.formName
          ? this.properties.formName
          : "RYFP",
        groupadmin: this.properties.groupAdmin
          ? this.properties.groupAdmin
          : [],
        groupapprover: this.properties.groupApprover
          ? this.properties.groupApprover
          : [],
        appId: this._applicationID,
        userRole: this._currentUserRole,
        urlFormMode: this._formModeURL,
        versionNo: this._versionNo,
        formStatus: this._formStatus,
        auditlogList: this.properties.auditlogList
          ? this.properties.auditlogList
          : "",
        author: this._author,
        formDetails: this._formDetails,
        HomePage: this.properties.HomePage,
        MyApplication: this.properties.MyApplication,
        AdminPage: this.properties.AdminPage,
        ApproverPage: this.properties.ApproverPage,
      }
    );
    if (this.displayMode == DisplayMode.Edit) {
      //Modern SharePoint in Edit Mode
      element = _configurationcomponent;
    } else if (this.displayMode == DisplayMode.Read) {
      //Modern SharePoint in Read Mode
      element = Formelement;
    }

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this.spService = new spOperation(this.context);
    this._helperClass = new DataBinding({
      context: this.context,
      countryMLId: this.properties.countryMlID,
      continentMlID: this.properties.continentMlID,
      fieldOfActivityMlId: this.properties.fieldOfActivityMlID,
      branchOfStudyMLID: this.properties.branchOfStudyMLID,
      fieldOfExpertiseMLId: this.properties.fieldOfExpertise,
      homepage: this.properties.HomePage,
      //auditid:this.properties.auditlogList
    });
    this._environmentMessage = this._getEnvironmentMessage();
    let baseURL: any = this.properties.siteurl
      ? this.properties.siteurl[0].url
      : this.context.pageContext.site.absoluteUrl;

    await this.spService
      .getFellowshipProgramStatus(
        this.properties.formDetailslist,
        this.properties.formName,
        this.properties.formName === "RYFP"
          ? "Raisina Young Fellows Programme"
          : "Raisina Forum For Future Diplomacy",
        "NA",
        this.properties.HomePage,
        this.properties.auditlogList
      )
      .then((res: any) => {
        this._formStatus = res[0].RUC_ApplicationStatus;
        this._formDetails = res[0];
        //console.log("form status", this._formStatus);
        //console.log("form Details", this._formDetails);
      });

    this.properties.groupApprover.length > 0 &&
      this.properties.groupAdmin.length > 0 &&
      (await this.spService
        .getcurrentuserGroups(
          this.properties.groupApprover[0]?.id,
          this.properties.groupAdmin[0]?.id,
          this._formDetails.Title,
          "NA",
          this.properties.HomePage,
          this.properties.auditlogList
        )
        .then(async (res: any) => {
          if (res === "Approver") {
            this._currentUserRole = res;
            //console.log("user role ", this._currentUserRole);
          }
          if (res === "Admin") {
            this._currentUserRole = res;
            //console.log("user role ", this._currentUserRole);
          }
          if (res === "Guest") {
            this._currentUserRole = res;
            //console.log("user role ", this._currentUserRole);
          }
        }));
    //checking the application id in the URL
    let querySearch = document.location.search;
    if (querySearch.length > 0) {
      if (
        window.location.href
          .toLowerCase()
          .split("?")[1]
          ?.search("applicationid") === -1
      ) {
        Swal.fire({
          title: `<p >There is some error in completing this action for the application. Please contact the administrator.</p>`,

          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "OK",
          backdrop: false,
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          // this.spService.Error(this._formDetails.Title,sessionStorage.getItem("applicationId"),"","ERROR: The application id was not found")

          if (result.isConfirmed) {
            let id: any = sessionStorage.getItem("applicationId")
              ? sessionStorage.getItem("applicationId")?.toUpperCase()
              : "NA";
            await this.spService.Error(
              this._formDetails.Title,
              id,
              "NA",
              `Error: Application ID missing`,
              this.properties.HomePage,
              this.properties.auditlogList
            );
            window.open(this.properties.HomePage, "_self");
          }
        });
      } else {
        this._applicationID = decodeURIComponent(
          window.location.href.toLowerCase()
        )
          .split("?")[1]
          ?.split("&")[0]
          .split("=")[1];
        if (
          this._applicationID.startsWith("ryfp/") ||
          this._applicationID.startsWith("rffd/")
        ) {
          //checking the formmode
          if (
            window.location.href
              .toLowerCase()
              .split("?")[1]
              ?.search("formmode") === -1
          ) {
            Swal.fire({
              title: `<p >There is some error in completing this action for the application. Please contact the administrator.</p>`,

              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: "OK",
              backdrop: false,
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              //this.spService.Error(this._formDetails.Title,sessionStorage.get("applicationId"),"","ERROR: The application formmode is incorrect")
              if (result.isConfirmed) {
                let id: any = sessionStorage.getItem("applicationId")
                  ? sessionStorage.getItem("applicationId")?.toUpperCase()
                  : "NA";
                await this.spService.Error(
                  this._formDetails.Title,
                  id,
                  "NA",
                  `Error: Form mode missing`,
                  this.properties.HomePage,
                  this.properties.auditlogList
                );
                window.open(this.properties.HomePage, "_self");
              }
            });
          } else {
            this._formModeURL = decodeURIComponent(
              window.location.href.toLowerCase()
            )
              .split("?")[1]
              ?.split("&")[1]
              .split("=")[1];

            if (
              this._formModeURL.toLowerCase() === "view" ||
              this._formModeURL.toLowerCase() === "edit"
            ) {
              sessionStorage.setItem("applicationId", this._applicationID);
              //console.log("Session", sessionStorage.getItem("applicationId"));
              await this.spService
                .callFellowShipProgramML(
                  this.properties.fellowShipMLlistID,
                  this.properties.contentType,
                  this._formDetails.Title,
                  "NA",
                  this.properties.HomePage,
                  this.properties.auditlogList
                )
                .then((arrayItem: any) => {
                  this._formList = arrayItem;
                  //console.log(this._formList);
                });
              await this._loadlists(baseURL).then(
                (options: IPropertyPaneDropdownOption[]) => {
                  this._lists = options;
                  this.context.propertyPane.refresh();
                }
              );
              await this.spService
                .getContentTypeFields(
                  this._formList[0]?.RUC_ContentTypeID,
                  this.properties.HomePage,
                  this._formDetails.Title,
                  "NA",
                  this.properties.HomePage,
                  this.properties.auditlogList
                )
                .then((res: any) => {
                  this._contentTypeFields = res;
                });
              await this._helperClass.oninit().then((res: any) => {
                this._allDataBinding = res;
                //console.log(res);
              });
              ///checking for versions
              if (
                !(
                  window.location.href
                    .toLowerCase()
                    .split("?")[1]
                    ?.search("version") === -1
                )
              ) {
                this._versionNo = decodeURIComponent(
                  window.location.href.toLowerCase()
                )
                  .split("?")[1]
                  ?.split("&")[2]
                  ?.split("=")[1];
                if (this._versionNo) {
                  this._formModeURL = "view";
                  await this.spService
                    .getApplicationDataVersions(
                      this.properties.YoungFellowsListId,
                      this._applicationID,
                      this._versionNo,
                      this.properties.siteurl[0].title,
                      this.properties.documentLibName,
                      this._formDetails.Title,
                      this.properties.HomePage,
                      this.properties.auditlogList
                    )
                    .then((res: any) => {
                      this._versionItem = res;
                      this._author = res.item.Author.LookupValue;
                      this._itemExistId = {
                        item: -1,
                        filesArr: [],
                      };
                      //console.log(`Item ----version no - ${this._versionNo}`,this._versionItem);
                    });
                }
              } else {
                await this.spService
                  .fetchItem(
                    this.properties.YoungFellowsListId,
                    this.context.pageContext.user.displayName,
                    this.properties.siteurl[0].title,
                    this.properties.documentLibName,
                    this._applicationID,
                    this._currentUserRole,
                    this._formDetails.Title,
                    this.properties.HomePage,
                    this.properties.auditlogList
                  )
                  .then((res: any) => {
                    this._itemExistId = res;
                    this._author = res.item.Author.Title;
                    // console.log("Item ----ORFWEBPART.TS", this._itemExistId);
                  });
              }

              // console.log("contentype id", this._contentTypeId);
              // console.log("App id", this._applicationID);
              // console.log("Form mode", this._formModeURL);
              // console.log("Version No", this._versionNo);
            } else {
              Swal.fire({
                title: `<p >There is some error in completing this action for the application. Please contact the administrator. </p>`,

                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "OK",
                backdrop: false,
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                //this.spService.Error(this._formDetails.Title,sessionStorage.get("applicationId"),"","ERROR: There is some error fetching application")
                if (result.isConfirmed) {
                  let id: any = sessionStorage.getItem("applicationId")
                    ? sessionStorage.getItem("applicationId")?.toUpperCase()
                    : "NA";
                  await this.spService.Error(
                    this._formDetails.Title,
                    id,
                    "NA",
                    `Error: Incorrect Form mode`,
                    this.properties.HomePage,
                    this.properties.auditlogList
                  );
                  window.open(this.properties.HomePage, "_self");
                }
              });
            }
          }
        } else if (
          this._applicationID !== "" &&
          Number(this._applicationID) === 0
        ) {
          this._author = this.context.pageContext.user.displayName;
          if (
            !(
              window.location.href
                .toLowerCase()
                .split("?")[1]
                ?.search("formmode") === -1
            )
          ) {
            this._formModeURL = decodeURIComponent(
              window.location.href.toLowerCase()
            )
              .split("?")[1]
              ?.split("&")[1]
              .split("=")[1];

            if (this._formStatus.toLowerCase() === "closed") {
              Swal.fire({
                title: `<p >The application timeframe is closed</p>`,

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
                  await this.spService.Error(
                    this._formDetails.Title,
                    id,
                    "",
                    `Error: Application timeframe is closed`,
                    this.properties.HomePage,
                    this.properties.auditlogList
                  );
                  window.open(this.properties.HomePage, "_self");
                }
              });
            } else {
              if (this._formStatus.toLowerCase() === "open") {
                if (
                  this._formModeURL.toLowerCase() === "view" ||
                  this._formModeURL.toLowerCase() === "edit"
                ) {
                  sessionStorage.setItem("applicationId", this._applicationID);
                  // console.log(
                  //   "Session",
                  //   sessionStorage.getItem("applicationId")
                  // );
                  await this.spService
                    .callFellowShipProgramML(
                      this.properties.fellowShipMLlistID,
                      this.properties.contentType,
                      this._formDetails.Title,
                  "NA",
                  this.properties.HomePage,
                  this.properties.auditlogList
                      
                    )
                    .then((arrayItem: any) => {
                      this._formList = arrayItem;
                      // console.log(this._formList);
                    });
                  await this._loadlists(baseURL).then(
                    (options: IPropertyPaneDropdownOption[]) => {
                      this._lists = options;
                      this.context.propertyPane.refresh();
                    }
                  );
                  await this.spService
                    .getContentTypeFields(
                      this._formList[0]?.RUC_ContentTypeID,
                     
                      this._formDetails.Title,
                      "NA",
                      this.properties.HomePage,
                      this.properties.auditlogList
                    )
                    .then((res: any) => {
                      this._contentTypeFields = res;
                    });
                  await this._helperClass.oninit().then((res: any) => {
                    this._allDataBinding = res;
                    // console.log(res);
                  });

                  if (this._currentUserRole === "Guest") {
                    await this.spService
                      .checkNewFormOnLoad(
                        this.properties.YoungFellowsListId,
                        this.context.pageContext.user.displayName,
                        this._formDetails.Title,
                        "NA",
                        this.properties.HomePage,
                        this.properties.auditlogList
                      )
                      .then((res: any) => {
                        if (res === 0) {
                          this._itemExistId = {
                            item: -1,
                            filesArr: [],
                          };
                        } else {
                          Swal.fire({
                            title: `<p >There is already an application in-progess for your selected fellowship program. </p>`,

                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: "OK",
                            backdrop: false,
                          }).then(async (result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                              let id: any = sessionStorage.getItem(
                                "applicationId"
                              )
                                ? sessionStorage
                                    .getItem("applicationId")
                                    ?.toUpperCase()
                                : "NA";
                              await this.spService.Error(
                                this._formDetails.Title,
                                id,
                                "",
                                `Error: There is already an application in-progess for your selected fellowship program.`,
                                this.properties.HomePage,
                                this.properties.auditlogList
                              );
                              window.open(
                                this.properties.MyApplication,
                                "_self"
                              );
                            }
                          });
                        }
                      });
                  } else {
                    this._itemExistId = {
                      item: -1,
                      filesArr: [],
                    };
                  }

                  // console.log("App id", this._applicationID);
                  // console.log("Form mode", this._formModeURL);
                  // console.log("Version No", this._versionNo);
                } else {
                  Swal.fire({
                    title: `<p >There is some error in completing this action for the application. Please contact the administrator.</p>`,

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
                      await this.spService.Error(
                        id,
                        this._applicationID,
                        "NA",
                        `Error: Form mode missing`,
                        this.properties.HomePage,
                        this.properties.auditlogList
                      );
                      window.open(this.properties.HomePage, "_self");
                    }
                  });
                }
              }
            }
          } else {
            //formmode missing
            Swal.fire({
              title: `<p >There is some error in completing this action for the application. Please contact the administrator.  </p>`,

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
                await this.spService.Error(
                  this._formDetails.Title,
                  id,
                  "NA",
                  `Error: Form mode missing`,
                  this.properties.HomePage,
                  this.properties.auditlogList
                );
                window.open(this.properties.HomePage, "_self");
              }
            });
          }
        } else {
          Swal.fire({
            title: `<p >There is some error in completing this action for the application. Please contact the administrator.</p>`,

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
              await this.spService.Error(
                this._formDetails.Title,
                id,
                "NA",
                `Error: Application ID missing`,
                this.properties.HomePage,
                this.properties.auditlogList
              );
              window.open(this.properties.HomePage, "_self");
            }
          });
        }
      }
    } else {
      Swal.fire({
        title: `<p >There is some error in completing this action for the application. Please contact the administrator.</p>`,

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
          await this.spService.Error(
            this._formDetails.Title,
            id,
            "NA",
            `Error: No Query Parameter passed`,
            this.properties.HomePage,
            this.properties.auditlogList
          );
          window.open(this.properties.HomePage, "_self");
        }
      });
    }

    return super.onInit();
  }
  private _loadlists(base_url: string): Promise<IPropertyPaneDropdownOption[]> {
    return new Promise<IPropertyPaneDropdownOption[]>(
      (
        resolve: (option: IPropertyPaneDropdownOption[]) => void,
        reject: (error: any) => void
      ) => {
        //set the context of sp
        const sp = spfi(base_url).using(SPFx(this.context));

        sp.web
          .lists()
          .then((listoptions: any) => {
            let lists: any = [];
            listoptions.forEach((list: any) => {
              if (!list.Hidden) {
                lists.push({
                  key: list.Id,
                  text: list.Title,
                });
              }
            });
            resolve(lists);
          })
          .catch((err) => reject(err));
      }
    );
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app
        .getContext()
        .then((context) => {
          let environmentMessage: string = "";
          switch (context.app.host.name) {
            case "Office": // running in Office
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case "Outlook": // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case "Teams": // running in Teams
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              throw new Error("Unknown host");
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }
  protected onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): void {
    if (propertyPath === "siteurl" && oldValue !== newValue) {
      this._lists = [];
      this._loadlists(newValue[0].url).then(
        (listoptions_returned: IPropertyPaneDropdownOption[]) => {
          this._lists = listoptions_returned;
          this.context.propertyPane.refresh();
        }
      );
    }
  }
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "ORF Form Webpart Properties",
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: "Data Source",
              isCollapsed: true,
              groupFields: [
                PropertyFieldSitePicker("siteurl", {
                  label: "Please Choose Site Collection",
                  initialSites: this.properties.siteurl,
                  context: this.context as any,
                  deferredValidationTime: 500,
                  multiSelect: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties.siteurl,
                  key: "sitesFieldId",
                }),
                PropertyPaneChoiceGroup("formName", {
                  label: "Please Choose Design Type for entity",
                  options: [
                    { key: "RFFD", text: "RFFD" },
                    { key: "RYFP", text: "RYFP" },
                  ],
                }),
                PropertyPaneDropdown("formDetailslist", {
                  label: "Please select the Fellowship Programs details list",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists,
                }),

                PropertyPaneDropdown("fellowShipMLlistID", {
                  label: "Please select the Fellowship Program Master list",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists,
                }),
                PropertyPaneDropdown("countryMlID", {
                  label: "Please select the country Master list",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists,
                }),
                PropertyPaneDropdown("continentMlID", {
                  label: "Please select the Continent Master list",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists,
                }),
                PropertyPaneDropdown("fieldOfActivityMlID", {
                  label: "Please select the fieldOfActivity Master list",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists,
                }),
                PropertyPaneDropdown("branchOfStudyMLID", {
                  label: "Please select the Branch of study Master list",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists,
                }),
                PropertyPaneDropdown("fieldOfExpertise", {
                  label: "Please select the field of expertise Master list",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists,
                }),
                PropertyPaneTextField("documentLibName", {
                  label:
                    "Please select the Document Library, name should be same as displayed in URL",
                }),
                PropertyPaneTextField("contentType", {
                  label: "Please provide Content Type ID",
                }),
                PropertyPaneDropdown("YoungFellowsListId", {
                  label: "Please select the list for storing applications",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists,
                }),
                PropertyPaneDropdown("auditlogList", {
                  label: "Please select the audit log list",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists,
                }),
              ],
            },
            {
              groupName: "Group Information",
              isCollapsed: true,
              groupFields: [
                PropertyFieldPeoplePicker("groupAdmin", {
                  label: "Please provide the SharePoint Admin group name",
                  initialData: this.properties.groupAdmin,
                  allowDuplicate: false,
                  principalType: [
                    PrincipalType.SharePoint,
                    PrincipalType.Security,
                  ],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context as any,
                  properties: this.properties,
                  onGetErrorMessage: null as any,
                  deferredValidationTime: 0,
                  key: "adminFieldId",
                  multiSelect: false,
                }),
                PropertyFieldPeoplePicker("groupApprover", {
                  label: "Please provide the SharePoint Approver group name",
                  initialData: this.properties.groupApprover,
                  allowDuplicate: false,
                  principalType: [
                    PrincipalType.SharePoint,
                    PrincipalType.Security,
                  ],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context as any,
                  properties: this.properties,
                  onGetErrorMessage: null as any,
                  deferredValidationTime: 0,
                  key: "approverFieldId",
                  multiSelect: false,
                }),
              ],
            },
            {
              groupName: "Redirect URL",
              isCollapsed: true,
              groupFields: [
                PropertyPaneTextField("HomePage", {
                  label: "Please provide home page URL",
                }),
                PropertyPaneTextField("MyApplication", {
                  label: "Please provide MyApplication page URL",
                }),
                PropertyPaneTextField("AdminPage", {
                  label: "Please provide Admin page URL",
                }),
                PropertyPaneTextField("ApproverPage", {
                  label: "Please provide Approver page URL",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
