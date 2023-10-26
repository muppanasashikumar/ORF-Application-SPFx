/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IHomePageProps {
  description: string;
  mainTitle:string;
  maindescription:string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spcontext: WebPartContext;
  listid: string;
  applicationformURL: string;
  baseurl: any;
  detailpageurl:string;
  //_baseurl: string;
  groupApplicant: any;
}
