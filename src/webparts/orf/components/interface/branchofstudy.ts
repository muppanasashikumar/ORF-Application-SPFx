
import { IDatePicker, IDropdownOption
 } from "office-ui-fabric-react";

export interface IBranchofStudy{
  branch: string;
  otherBranch:string;
  branchUniversity:string;
  branchCity:string;
  branchCountry:IDropdownOption;
  branchContinent: IDropdownOption; 
  branchFrom: IDatePicker;
  branchTo: IDatePicker;
  branchDegree: IDropdownOption;
  branchDegreeOther: string;
  branchTitleBA_MA: string;

}