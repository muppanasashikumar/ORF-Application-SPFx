/* eslint-disable no-async-promise-executor */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*eslint-disable eqeqeq  */
import { SPFx, spfi } from "@pnp/sp";
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups/web";



export default class spOperation {
    public sp:any;
    constructor(baseurl:string,spcontext:any){
        this.sp = spfi(baseurl).using(SPFx(spcontext));
    }

    public getApplicationDataVersions(listName:string,itemid:number):Promise<any>{
      
        return new Promise((resolve,reject)=>{
            this.sp.web.lists.getByTitle(listName)
             .items
             .getById(itemid)
             .versions()
             //.getAll()
             .then((pnpresults:any)=>{
                resolve(pnpresults?.filter((item:any)=> item.RUC_x005f_ApplicationStatus != "Draft"))
             })
            .catch(reject);
        })
    }

    public getcurrentuserGroups(approvergroupid:string,admingroupid:string):Promise<string>{
      
        return new Promise(async(resolve,reject)=>{
            
             this.sp.web.currentUser.groups().then((grouparr:any)=>{
                //console.log("Groups",grouparr);
                let _grouparray:any=[];
                grouparr.map((each:any)=>{
                    _grouparray.push(each.Id)
                })
                if(_grouparray.indexOf(Number(approvergroupid))>-1){
                    resolve('Approver')
                }
                if(_grouparray.indexOf(Number(admingroupid))>-1){
                    resolve('Admin')
                }
            })
            
        })
    }
}

