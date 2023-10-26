/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-async-promise-executor */
import '@pnp/graph/users';
import '@pnp/graph/groups';
import {graph } from "@pnp/graph";

export default class graphOperation {
    constructor(context:any){
        graph.setup({
            spfxContext:context
        })
    }

    public getCurrentUserGroups(currentusermail:string,approvergroupid?:string,admingroupid?:string):Promise<any>{
        let _isapprover:boolean=false;

        return new Promise(async(resolve,reject)=>{

            await graph.users.getById(currentusermail).getMemberGroups()
            .then((grouparr:any)=>{
                //console.log("Group Array",grouparr);
                if(grouparr.indexOf(approvergroupid)>-1){
                    _isapprover=true
                }
                else{
                    _isapprover=false
                }
            })
            resolve(_isapprover)
        })
    }

   
}