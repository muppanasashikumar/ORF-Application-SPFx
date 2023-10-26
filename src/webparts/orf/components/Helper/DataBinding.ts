/* eslint-disable prefer-const */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebPartContext } from "@microsoft/sp-webpart-base";
import spOperation from "../spService/spService";
export interface IHelperProps {
  context: WebPartContext,
  countryMLId: string,
  continentMlID: string
  fieldOfActivityMlId:string
  branchOfStudyMLID:string
  fieldOfExpertiseMLId:string
  homepage:string
  //auditid:string
}

export interface IDataRequired{
salutation:any,
country:any,
continent:any,
fieldOfActivity:any
branchofstudy:any;
fieldOfExpertise:any;
countryCode:any
}
export class DataBinding {
private spService: any;
 private _countryID:string;
 private _continentID:string;
 private _fieldOfactivityId:string;
 private _branchOfStudyID:string;
 private _fieldOfExpertiseMLId:string;
 private _homepage:string;
 //private _auditList:string

  constructor(props: IHelperProps) {
    this.spService = new spOperation(props.context);
    this._countryID=props.countryMLId
    this._continentID=props.continentMlID
    this._fieldOfactivityId=props.fieldOfActivityMlId
    this._branchOfStudyID=props.branchOfStudyMLID
    this._fieldOfExpertiseMLId=props.fieldOfExpertiseMLId
    this._homepage=props.homepage
   // this._auditList=props.auditid
  }
  public  oninit() : Promise<any> {
    return new Promise(async (resolve, reject) => {
    let allBindingData:IDataRequired={
        salutation:[],
        country:[],
        continent:[],
        fieldOfActivity:[],
        branchofstudy:[],
        fieldOfExpertise:[],
        countryCode:[],


    }
    let salutationField = await this.spService.getField("RUC_Salutation", this._homepage);
    salutationField.Choices.map((eachChoices: any) => {
     allBindingData.salutation.push({
        value: eachChoices,
        label: eachChoices,
      });
    });
    let countryField = await this.spService.callML(this._countryID, this._homepage)
    countryField.map(async (each:any)=>{
        await allBindingData.country.push({value:each.ID,
            label:each.Title})
    })
    let countryCodeField = await this.spService.callCountryML(this._countryID, this._homepage)
    countryCodeField.map(async (each:any)=>{
        await allBindingData.countryCode.push({value:each.ID,
            label:each.Title, code:each.Cd})
    })
    let continentField = await this.spService.callML(this._continentID, this._homepage)
    continentField.map(async (each:any)=>{
        await allBindingData.continent.push({value:each.ID,
            label:each.Title})
    })
    let fieldOfActivity = await this.spService.callML(this._fieldOfactivityId, this._homepage)
    fieldOfActivity.map(async (each:any)=>{
        await allBindingData.fieldOfActivity.push({value:each.ID,
            label:each.Title})
    })
    let branchofstudy = await this.spService.callML(this._branchOfStudyID, this._homepage)
    branchofstudy.map(async (each:any)=>{
        await allBindingData.branchofstudy.push({value:each.ID,
            label:each.Title})
    })
    let fieldofexpertise = await this.spService.callML(this._fieldOfExpertiseMLId, this._homepage)
    fieldofexpertise.map(async (each:any)=>{
        await allBindingData.fieldOfExpertise.push({value:each.ID,
            label:each.Title})
    })
  
   
    resolve(allBindingData) 
  })}
}
