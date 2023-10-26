/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*eslint-disable @typescript-eslint/explicit-function-return-type */
import {  spfi,SPFx } from "@pnp/sp";
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/items/get-all";
import Swal from "sweetalert2";



export default class spOperation {
    public sp:any;
    constructor(context:any){
        this.sp = spfi().using(SPFx(context));
    }

    public getFellowshipPrograms():Promise<any>{
        //let pnparr:any=[];

        return new Promise((resolve,reject)=>{
            this.sp.web.lists.getById('09b7280c-526f-4cf7-9fc9-2d91ec47b70f').items().then((response:any)=>{
                //console.log("Ml Fellowship Programs Items",response);
                resolve(response);
            })
            
        })
    }

    public getFellowshipBatches(list:string){
        let pnparr:any=[];
        return new Promise(async(resolve,reject)=>{
            await this.sp.web.lists.getById(list).items().then(async(res:any)=>{
                await res.sort((a:any,b:any)=>b.Id-a.Id).map((each:any)=>{
                    each.Title !='' &&
                    pnparr.push({
                        [each.ID]: each.Title
                        
                    })
                })
                resolve(pnparr);
            }).catch(reject)
        })
        
    }

    public getcurrentuserGroups(approvergroupid:string):Promise<boolean>{
      
        return new Promise(async(resolve,reject)=>{
             this.sp.web.currentUser.groups().then((grouparr:any)=>{
                //console.log("Groups",grouparr);
                let _grouparray:any=[];
                grouparr.map((each:any)=>{
                    _grouparray.push(each.Id)
                })
                if(_grouparray.indexOf(Number(approvergroupid))>-1){
                    resolve(true)
                }else{
                    resolve(false)
                }
            })
            
        })
    }


    public getGuestApplicationData(currentuserEmail:string,listName:string):Promise<any>{
      
        return new Promise(async(resolve,reject)=>{
            await this.sp.web.lists.getByTitle(listName)
             .items
             .orderBy("ID",false)
             .filter(`Author/EMail eq '${currentuserEmail}'`)
             .select("RUC_AppliedDate,ID,RUC_ApplicationStatus,RUC_ApplicationId")
             .getAll()
             .then((pnpresults:any)=>{
                //console.log("Guest Data",pnpresults);
                resolve(pnpresults)
             })
            
        })
    }

    

    public getAllApplicationData(listName:string):Promise<any>{
      
        return new Promise(async(resolve,reject)=>{
            await this.sp.web.lists.getByTitle(listName)
             .items
             .orderBy("ID",false)
             .select("RUC_AppliedDate,ID,RUC_ApplicationId,RUC_ApplicationStatus,RUC_FirstName,RUC_LastName,Author/EMail")
             .expand("Author")
             .getAll()
             .then((pnpresults:any)=>{
                //console.log("All Data",pnpresults);
                resolve(pnpresults);
             })
            
        })
    }

    public checkapplicationstatus(auditlistid:string,programname:string,appid:string,prevstatus:string,itemid:any,listname:string,statusToCheck:string):Promise<boolean>{
        return new Promise(async(resolve,reject)=>{
            await this.sp.web.lists.getByTitle(listname).items.getById(itemid)().then((res:any)=>{
                //console.log("Checkapp status",res);

                if(res.RUC_ApplicationStatus == "Submitted" || res.RUC_ApplicationStatus == "Provisionally Approved" || res.RUC_ApplicationStatus == "Provisionally Rejected"){
                    if(res.RUC_ApplicationStatus == statusToCheck){
                        this.Error(auditlistid,programname,appid,statusToCheck,`ERROR: The application with reference no. ${appid} was already updated to the desired status`)
                        resolve(false);
                    }
                    else{
                        resolve(true);
                    }
                }
                else{
                    this.Error(auditlistid,programname,appid,prevstatus,`ERROR: Action not permitted. The application with reference no. ${appid} is not permitted to update to the desired status`)
                    resolve(false)
                }
            })
        })
        
    }

    public updateApplicationStatus(auditlistid:string,programname:string,appid:string,prevstatus:string,itemid:any,listname:string,updateStatus:string):Promise<boolean>{
        return new Promise((resolve,reject)=>{
            this.sp.web.lists.getByTitle(listname).items.getById(itemid).update({
                RUC_ApplicationStatus:updateStatus
            }).then((arr:any)=>{
               // console.log("update data",arr)
                if(arr){
                    resolve(true)
                }
                else{
                    resolve(false)
                }
            })
            .catch((err:any)=>{
                //console.log(err);
                this.Error(auditlistid,programname,appid,prevstatus,err.message);
                Swal.fire({
                    icon: 'warning',
                    title: `There is some error in completing this action for the application with reference no. <span style=font-weight:900>${appid}</span>. Please contact the administrator.`
                });
            })
            
        })
        
    }

    public checkapplicationstatusforFinalSubmit(itemid:any,listname:string):Promise<string>{
        return new Promise(async(resolve,reject)=>{
            await this.sp.web.lists.getByTitle(listname).items.getById(itemid)().then((res:any)=>{
                //console.log("Checkapp status",res);
                resolve(res.RUC_ApplicationStatus)
            })
        })
        
    }

    public updateApplicationStatusforFinalSubmit(auditlistid:string,programname:string,appid:string,prevstatus:string,itemid:any,listname:string,currentstatus:string):Promise<boolean>{


        return new Promise((resolve,reject)=>{
            this.sp.web.lists.getByTitle(listname).items.getById(itemid).update({
                RUC_ApplicationStatus:currentstatus
            }).then((arr:any)=>{
                //console.log("update data",arr)
                if(arr){
                    resolve(true)
                }
                else{
                    resolve(false)
                }
            })
            .catch((err:any)=>{
                //console.log(err);
                this.Error(auditlistid,programname,appid,prevstatus,err.message);
                Swal.fire({
                    icon: 'warning',
                    title: `There is some error in completing this action for the application with reference no. <span style=font-weight:900>${appid}</span>. Please contact the administrator.`
                });
            })
            
        })
        
    }

    public checkapplicationstatusforTrainingCompleted(auditlistid:string,programname:string,appid:string,prevstatus:string,itemid:any,listname:string,statusToCheck:string):Promise<boolean>{
        return new Promise(async(resolve,reject)=>{
            await this.sp.web.lists.getByTitle(listname).items.getById(itemid)().then((res:any)=>{
                console.log("Checkapp status",res);

                if(res.RUC_ApplicationStatus == "Approved" || res.RUC_ApplicationStatus == "Rejected"){
                    if(res.RUC_ApplicationStatus == statusToCheck){
                        this.Error(auditlistid,programname,appid,statusToCheck,`ERROR: The application with reference no. ${appid} was already updated to the desired status`)
                        resolve(false);
                    }
                    else{
                        resolve(true);
                    }
                }
                else{
                    this.Error(auditlistid,programname,appid,prevstatus,`ERROR: Action not permitted. The application with reference no. ${appid} is not permitted to be updated to the desired status`)
                    resolve(false)
                }
            })
        })
        
    }

    public updateApplicationStatusforTrainingCompleted(auditlistid:string,programname:string,appid:string,prevstatus:string,itemid:any,listname:string,currentstatus:string,batchid:number):Promise<boolean>{


        return new Promise((resolve,reject)=>{
            this.sp.web.lists.getByTitle(listname).items.getById(itemid).update({
                RUC_ApplicationStatus:currentstatus,
                RUC_BatchId: batchid
            }).then((arr:any)=>{
                //console.log("update data",arr)
                if(arr){
                   
                    resolve(true)
                }
                else{

                    resolve(false)
                }
            })
            .catch((err:any)=>{
                //console.log(err);
                this.Error(auditlistid,programname,appid,prevstatus,err.message);
                Swal.fire({
                    icon: 'warning',
                    title: `There is some error in completing this action for the application with reference no. <span style=font-weight:900>${appid}</span>. Please contact the administrator.`
                });
            })
            
        })
        
    }

    //Audit Log Functions

    public Log = async (auditlistid:string,programname:string,applicationid:string,status:string,logMessage: string) => {
        try {
            this.saveLogs(auditlistid,programname,applicationid,status,logMessage);
        } catch (error) {
            //Can't do anything
            console.error(error.Message);
        }
    }

    public Error = async (auditlistid:string,programname:string,applicationid:string,status:string,logMessage: string) => {
        try {
            // console.error(logMessage.Message);
            this.saveLogs(auditlistid,programname,applicationid,status,logMessage);
        } catch (error) {
            //Can't do anything
            console.error(error.Message);
        }
    }

    private saveLogs = async (auditlistid:string,programname:string,appid:string,status:string,logMessage:string) => {
        this.sp.web.lists.getById(auditlistid).items.add({
            Title:programname,
            RUC_ApplicationId: appid,
            RUC_FellowshipStatus: status,
            RUC_LogMessage: logMessage
        });
    }
}