/*eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable prefer-const */
/*eslint-disable @typescript-eslint/no-floating-promises  */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import {  spfi,SPFx } from "@pnp/sp";
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';


import * as strings from 'OurTeamWebPartStrings';
import OurTeam from './components/OurTeam';
import { IOurTeamProps } from './components/IOurTeamProps';
import { IPropertyFieldSite, PropertyFieldSitePicker } from '@pnp/spfx-property-controls';

export interface IOurTeamWebPartProps {
  description: string;
  siteurl:IPropertyFieldSite[];
  listID:string;
}

export default class OurTeamWebPart extends BaseClientSideWebPart<IOurTeamWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _lists:IPropertyPaneDropdownOption[]=[]

  public render(): void {
    const element: React.ReactElement<IOurTeamProps> = React.createElement(
      OurTeam,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        listid: this.properties.listID ? this.properties.listID :"",
        baseurl: this.properties.siteurl? this.properties.siteurl[0].url: this.context.pageContext.web.absoluteUrl,
        spcontext: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {

    let baseURL:any = this.properties.siteurl ? this.properties.siteurl[0].url : this.context.pageContext.site.absoluteUrl;
    this._loadlists(baseURL).then((options: IPropertyPaneDropdownOption[]) => {
      this._lists = options;
      //this._listsAuditSiteCol=options;
      this.context.propertyPane.refresh();
    });

    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
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
                PropertyPaneDropdown("listID", {
                  label: "Please select the list",
                  ariaLabel: "Please select list/repositories",
                  options: this._lists,
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
