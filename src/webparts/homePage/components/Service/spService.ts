/* eslint-disable no-async-promise-executor */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SPFx, spfi } from "@pnp/sp";
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups/web";
import * as moment from "moment";



export default class spOperation {
    public sp:any;
    constructor(_baseurl:any,spcontext:any){
        this.sp = spfi(_baseurl).using(SPFx(spcontext));
    }

public getFellowshipPrograms(listid:string) {
 let pnparry:any=[];
 //const today = new Date().toISOString();

        return new Promise(async(resolve,reject)=>{

            await 
            this.sp.web.lists.getById(listid)
            .items
            .filter("RUC_IsVisible eq 1")
            .select("RUC_FellowshipStatus,RUC_FellowShipProgram/Title,RUC_FellowShipProgram/RUC_EndDate,RUC_FellowShipProgram/RUC_ListName,RUC_FellowShipProgram/RUC_StartDate,RUC_FellowShipProgram/RUC_ContentTypeID,RUC_FellowShipProgram/RUC_FormURL,RUC_FellowshipInformation_x0020_,RUC_Eligibility,RUC_FellowshipImage")
            .expand("RUC_FellowShipProgram")()
            .then((pnpresult:any)=>{
               //console.log("pnpresult" ,pnpresult);
               //console.log("UTC todau" ,new Date().toISOString());
               pnpresult.map((res: any)=>{

                pnparry.push({
                RUC_ApplicationStatus: res.RUC_FellowshipStatus,
                RUC_FellowshipImage: res.RUC_FellowshipImage ? res.RUC_FellowshipImage.Url : "",
                RUC_EndDate: res.RUC_FellowShipProgram ? res.RUC_FellowShipProgram.RUC_EndDate===null?"": moment(res.RUC_FellowShipProgram.RUC_EndDate).format("DD-MMM-YYYY"):"",
                RUC_FellowshipInformation: res.RUC_FellowshipInformation_x0020_?res.RUC_FellowshipInformation_x0020_:"",
                RUC_Eligibility: res.RUC_Eligibility?res.RUC_Eligibility:"",    
                Title: res.RUC_FellowShipProgram ?  res.RUC_FellowShipProgram.Title : "",
                RUC_RedirectURL:res.RUC_FellowShipProgram ?  res.RUC_FellowShipProgram.RUC_FormURL : "",
                RUC_ListName: res.RUC_FellowShipProgram? res.RUC_FellowShipProgram.RUC_ListName : "",
                isButtonVisible: true,
                ButtonTitle:"Apply Now"
               });

            });
           //console.log("pnp array",pnparry);
            resolve(pnparry);
        })
            .catch(reject);
        });
        
   }

   public getCurrentuserApplication(listname: string,currentusermail:string): Promise<number> {

    return new Promise(async (resolve, reject) => {

        await
            this.sp.web.lists.getByTitle(listname)
                .items
                .filter(`Author/EMail eq '${currentusermail}'`)()
                .then((pnpresult: any) => {
                    //console.log("pnp array", pnpresult);

                    if(pnpresult.length >0){

                        let _numberofRejectedApplication: number =0;
                        // If data for the current user exists, then check the number of rejected application.
                        pnpresult.map((each:any)=>{
                            if(each.RUC_ApplicationStatus === "Rejected"){
                                _numberofRejectedApplication++;
                            }
                        })
                        // If the number of rejected application is equal to the number of application ie all then retuen false else true

                        if(_numberofRejectedApplication === pnpresult.length){
                            resolve(-1);
                        }
                        else{
                            //Applicant has applications but one application is not in rejected status
                            resolve(0);
                        }
                    }
                    else{
                        //Applicant does not have any application
                        resolve(-2)
                    }
                })
                .catch(reject);
    });

}

public getcurrentuserGroups(applicantGroupID:string):Promise<boolean>{
      
    return new Promise(async(resolve,reject)=>{
         this.sp.web.currentUser.groups().then((grouparr:any)=>{
            //("Groups",grouparr);
            let _grouparray:any=[];
            grouparr.map((each:any)=>{
                _grouparray.push(each.Id)
            })
            if(_grouparray.indexOf(Number(applicantGroupID))>-1){
                resolve(true)
            }
            else{
                resolve(false)
            }
        })
        
    })
}
}

