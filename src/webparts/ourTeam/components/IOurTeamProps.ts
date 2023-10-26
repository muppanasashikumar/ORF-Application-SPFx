/*eslint-disable @typescript-eslint/no-explicit-any  */
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IOurTeamProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  listid:string;
  baseurl: any;
  spcontext: WebPartContext
}
