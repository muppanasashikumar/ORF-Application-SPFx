/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable no-async-promise-executor */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {initializeIcons} from 'office-ui-fabric-react';
import { Version,DisplayMode } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ListViewWebPartStrings';
import ListView from './components/ListView';
import { IListViewProps } from './components/IListViewProps';
// import spOperation from './components/SpService/Spservice';
//import graphOperation from './components/SpService/graphService';
import { SPFx, spfi } from '@pnp/sp';
import { IPropertyFieldSite, PropertyFieldSitePicker } from '@pnp/spfx-property-controls/lib/PropertyFieldSitePicker';
//import { PropertyFieldPeoplePicker, PrincipalType, IPropertyFieldGroupOrPerson } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
import "@pnp/sp/site-users/web";
import Configuration from './components/ConfigurationComp';



export interface IListViewWebPartProps {
  description: string;
  siteurl: IPropertyFieldSite[];
  masterlistID: string;
  FellowshipApproverGroupid:string;
  FellowshipAdminGroupid:string;
  detailpageURL:string;
  securityGroup:string;
  headerTitle:string;
  batchList:string;
  auditlogList:string;
}

export default class ListViewWebPart extends BaseClientSideWebPart<IListViewWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  // private spservice:any;
  //private graphservice:any;
  private _lists: IPropertyPaneDropdownOption[] = [];
  private _mldata:any=[];

  // private isGuestuser: boolean;
  // private isApprover: boolean;
  // private isAdmin: boolean;

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
    const ListViewElement: React.ReactElement<IListViewProps> = React.createElement(
      ListView,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        //siteurl: this.properties.siteurl ? this.properties.siteurl : "",
        masterlistID: this.properties.masterlistID? this.properties.masterlistID:"",
        FellowshipApproverGroupid:this.properties.FellowshipApproverGroupid ? this.properties.FellowshipApproverGroupid:"",
        FellowshipAdminGroupid: this.properties.FellowshipAdminGroupid ? this.properties.FellowshipAdminGroupid : "",
        spfxcontext: this.context,
        MLdata : this._mldata,
        detailpageURL: this.properties.detailpageURL ? this.properties.detailpageURL : "",
        securityGroup: this.properties.securityGroup ? this.properties.securityGroup :"Applicant",
        headerTitle:this.properties.headerTitle ? this.properties.headerTitle :"All  Applications",
        batchList: this.properties.batchList ? this.properties.batchList :"",
        auditlogList:this.properties.auditlogList?this.properties.auditlogList:""
      }
    );
    if (this.displayMode == DisplayMode.Edit) {
      //Modern SharePoint in Edit Mode
      element = _configurationcomponent;
    } else if (this.displayMode == DisplayMode.Read) {
      //Modern SharePoint in Read Mode
      element = ListViewElement;
    }
  
    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {

    initializeIcons();

  let baseURL:any = this.properties.siteurl ? this.properties.siteurl[0].url : this.context.pageContext.site.absoluteUrl;

    this._loadlists(baseURL).then((options: IPropertyPaneDropdownOption[]) => {
      this._lists = options;
      //this._listsAuditSiteCol=options;
      this.context.propertyPane.refresh();
    });

    let MLlistid:string=this.properties.masterlistID ? this.properties.masterlistID:"4c764f4f-3554-4c22-85dc-9864281b378e";

    await this._getMLfellowshipPrograms(baseURL,MLlistid).then((response:any)=>{
      this._mldata=response;
    })



    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }

  

  private _getMLfellowshipPrograms(base_url: string, mlListid: string): Promise<any> {
    return new Promise<any>(
      async(
        resolve: (option: IPropertyPaneDropdownOption[]) => void,
        reject: (error: any) => void
      ) => {
        //set the context of sp
        const sp = spfi(base_url).using(SPFx(this.context));

        await sp.web.lists.getById(mlListid).items().then(async(response: any) => {
          //console.log("Ml Fellowship Programs Items", response);
          if(response?.length>0){
            for(let i =0; i<response.length;i++){
              await sp.web.lists.getByTitle(response[i].RUC_ListName).items
              .filter(`Author/EMail eq '${this.context.pageContext.user.email}'`)()
              .then((_item:any)=>{
                if(_item.length>0){
                  response[i].isUserDataExist = true,
                  response[i].statusFilter =[],
                  response[i].startDateFilter = '',
                  response[i].endDateFilter = ''
                }
                else{
                  response[i].isUserDataExist = false,
                  response[i].statusFilter =[],
                  response[i].startDateFilter = '',
                  response[i].endDateFilter = ''
                }
              })
            }
          }
          
          resolve(response);
        }).catch(reject);
      }
    );
  }


  private _loadlists(base_url: string): Promise<IPropertyPaneDropdownOption[]> {
    return new Promise<IPropertyPaneDropdownOption[]>(
      (
        resolve: (option: IPropertyPaneDropdownOption[]) => void,
        reject: (error: any) => void
      ) => {
        //set the context of sp
        const sp = spfi(base_url).using(SPFx(this.context));

        sp.web.lists().then((listoptions: any) => {
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
        }).catch(reject);
      }
    );
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              throw new Error('Unknown host');
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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

    if (propertyPath === "masterlistID" && oldValue !== newValue) {
      let baseURL: any = this.properties.siteurl ? this.properties.siteurl[0].url : this.context.pageContext.site.absoluteUrl;
      this._getMLfellowshipPrograms(baseURL,newValue).then((res:any)=>{
        this._mldata=res;
        this.context.propertyPane.refresh();
      })
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Webpart Configuration"
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: "Data Source",
              isCollapsed:true,
              groupFields: [
                PropertyFieldSitePicker('siteurl', {
                  label: 'Please Choose Site Collection',
                  initialSites: this.properties.siteurl,
                  context: this.context as any,
                  deferredValidationTime: 500,
                  multiSelect: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties.siteurl,
                  key: 'sitesFieldId'
                }),

                PropertyPaneDropdown('masterlistID', {
                  label: "Please select the fellowship programs masterlist",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists
                }),

                PropertyPaneDropdown('batchList', {
                  label: "Please select the fellowship programs batches masterlist",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists
                }),
                PropertyPaneDropdown('auditlogList', {
                  label: "Please select the audit log list",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists
                })
              ]
            },
            {
              groupName: "Component Information",
              isCollapsed:true,
              groupFields: [
                PropertyPaneChoiceGroup("securityGroup", {
                  label: "Please Choose the security group",
                  options: [
                    { key: "Approver", text: "Approver" },
                    { key: "Admin", text: "Admin" },
                    { key: "Applicant", text: "Applicant",checked:true }
                  ],
                }),
                PropertyPaneTextField('headerTitle', {
                  label: "Please provide the header title"
                })
                // PropertyFieldPeoplePicker('groupID', {
                //   label: "Please provide the SharePoint Admin group name",
                //   initialData: this.properties.groupID,
                //   allowDuplicate: false,
                //   principalType: [PrincipalType.SharePoint, PrincipalType.Security],
                //   onPropertyChange: this.onPropertyPaneFieldChanged,
                //   context: this.context as any,
                //   properties: this.properties,
                //   onGetErrorMessage: null as any,
                //   deferredValidationTime: 0,
                //   key: 'adminFieldId',
                //   multiSelect:false
                // })
              ]
            }
          ]
        }
      ]
    };
  }
}
