/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IOrfProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  spfxcontext:WebPartContext;
  fellowShipMLlistID:string;
  siteurl:any;
  siteName:any;
  formListObj:any;
  
  contentTypeField:any;
  allBindingData:any;
  documentLibName:string;
  YFlistId:string;
  itemIdYoungFellow:any;
  versionItem:any;
  formselected:string;
  groupadmin:any;
  groupapprover: any;
  appId:any;
  userRole:string;
  urlFormMode:string;
  versionNo:string;
  formStatus:string;
  auditlogList:string;
  author:string;
  formDetails:any;
  HomePage:string;
  MyApplication:string;
  AdminPage:string;
  ApproverPage:string

 
  
}
