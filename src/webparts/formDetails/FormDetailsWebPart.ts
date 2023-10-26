/*eslint-disable @typescript-eslint/no-explicit-any  */
/*eslint-disable @typescript-eslint/no-floating-promises  */
/*eslint-disable prefer-const  */
/*eslint-disable no-async-promise-executor  */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration, IPropertyPaneDropdownOption, PropertyPaneDropdown, PropertyPaneTextField,
  //PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'FormDetailsWebPartStrings';
import FormDetails from './components/FormDetails';
import { IFormDetailsProps } from './components/IFormDetailsProps';
import {IPropertyFieldSite, PropertyFieldSitePicker } from '@pnp/spfx-property-controls';
import { SPFx, spfi } from '@pnp/sp';

export interface IFormDetailsWebPartProps {
  description: string;
  siteurl: IPropertyFieldSite[];
  fellowshipMLid: string;
  _contentTypeid:string;
  formurl:string;
}

export default class FormDetailsWebPart extends BaseClientSideWebPart<IFormDetailsWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _lists: IPropertyPaneDropdownOption[] = [];
  private _mldata:any=[];

  public render(): void {
    const element: React.ReactElement<IFormDetailsProps> = React.createElement(
      FormDetails,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        spfxcontext: this.context,
        MLdata: this._mldata ? this._mldata : [],
        baseurl:this.properties.siteurl ? this.properties.siteurl[0].url : this.context.pageContext.web.absoluteUrl,
        _contentTypeid:this.properties._contentTypeid ? this.properties._contentTypeid:"",
        formurl: this.properties.formurl?this.properties.formurl:""
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {

    let baseURL: any = this.properties.siteurl ? this.properties.siteurl[0].url : this.context.pageContext.site.absoluteUrl;

    this._loadlists(baseURL).then((options: IPropertyPaneDropdownOption[]) => {
      this._lists = options;
      //this._listsAuditSiteCol=options;
      this.context.propertyPane.refresh();
    });

    let MLlistid:string=this.properties.fellowshipMLid ? this.properties.fellowshipMLid:"09b7280c-526f-4cf7-9fc9-2d91ec47b70f";

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

        await sp.web.lists.getById(mlListid).items().then((response: any) => {
          //console.log("Ml Fellowship Programs Items", response);
          resolve(response);
        })
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
        });
      }
    );
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

    if (propertyPath === "fellowshipMLid" && oldValue !== newValue) {
      let baseURL: any = this.properties.siteurl ? this.properties.siteurl[0].url : this.context.pageContext.site.absoluteUrl;
      this._getMLfellowshipPrograms(baseURL,newValue).then((res:any)=>{
        this._mldata=res;
        this.context.propertyPane.refresh();
      })
    }
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Webpart Configuration"
          },
          displayGroupsAsAccordion:true,
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
                PropertyPaneDropdown('fellowshipMLid', {
                  label: "Please select the fellowship programs masterlist",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists
                })
              ]
            },
            {
              groupName: "Component Information",
              isCollapsed:true,
              groupFields: [
                PropertyPaneTextField("_contentTypeid",{
                  label:"Please provide the content type ID"
                }),
                PropertyPaneTextField("formurl",{
                  label:"Please provide the application form URL"
                })
              ]
            },
          ]
        }
      ]
    };
  }
}
