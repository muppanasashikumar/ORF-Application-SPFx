/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFilePickerResult } from "@pnp/spfx-property-controls";
import { IDropdownOption, IDatePicker } from "office-ui-fabric-react";

export interface IFutureOfDiplomacy {
    salutation: IDropdownOption;
    title: string;
    firstName: string;
    lastName: string;
    dateofBirth: IDatePicker;
    nationality: IDropdownOption;
    otherNationality: IDropdownOption;
    currentCountryofResidence: IDropdownOption;
    fullnameNominator: string;
    organizationMinistry: string;
    nominatorCountry: IDropdownOption;
    letterofNomination: IFilePickerResult;
    PAstreet: string;
    secondLineAddress: string;
    PAzipcode:string;
    PAcity:string;
    PAcountry: IDropdownOption;
    PAcontinent: IDropdownOption;
    PAphone:string;
    PAcellphone:string;
    PAemail:string;
    fieldofActivity: IDropdownOption;
    employer:string;
    department:string;
    position:string;
    BAstreet: string;
    BAzipcode:string;
    BAcity:string;
    BAcountry: IDropdownOption;
    BAcontinent: IDropdownOption;
    BAphone:string;
    BAcellphone:string;
    BAemail:string;
    branchOfStudy: any;
    fieldofExpertise: IDropdownOption;
    otherQualification: string;
    furtherQualification: string;
    photograph: IFilePickerResult;
    cv: IFilePickerResult;
    letterofIntent: IFilePickerResult;
    personalIntroduction: IFilePickerResult;
}