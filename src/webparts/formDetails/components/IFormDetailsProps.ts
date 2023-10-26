/*eslint-disable @typescript-eslint/no-explicit-any  */
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFormDetailsProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spfxcontext: WebPartContext;
  _contentTypeid:string;
  MLdata:any;
  baseurl:any;
  formurl:string;
}
