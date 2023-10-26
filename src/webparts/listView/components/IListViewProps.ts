/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IListViewProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  masterlistID:string;
  // isGuestUser: boolean;
  // isApprover: boolean;
  // isAdmin: boolean;
  FellowshipApproverGroupid:string;
  FellowshipAdminGroupid:string;
  spfxcontext: WebPartContext;
  MLdata:any;
  detailpageURL:string;
  securityGroup:string;
  headerTitle:string;
  batchList:string;
  auditlogList:string;
}
