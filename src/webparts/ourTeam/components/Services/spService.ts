/* eslint-disable no-async-promise-executor */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SPFx, spfi } from "@pnp/sp";
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';



export default class spOperation {
    public sp: any;
    constructor(_baseurl: any, spcontext: any) {
        this.sp = spfi(_baseurl).using(SPFx(spcontext));
    }

    public getOurTeamInfo(listid: string) {
        let pnparr:any=[];
        return new Promise(async (resolve, reject) => {

            await
                this.sp.web.lists.getById(listid)
                    .items
                    .orderBy("RUC_Order",true)
                    .filter("RUC_IsVisible eq 1")()
                    .then((pnpresult: any) => {
                        // console.log("pnp array", pnpresult);
                        pnpresult.map((each:any)=>{
                            pnparr.push({
                                Name: each.RUC_FullName ? each.RUC_FullName :"",
                                Designation: each.RUC_Designation ? each.RUC_Designation : "",
                                Image: each.RUC_ProfileImage ? each.RUC_ProfileImage.Url : "",
                                Email: each.RUC_Email ? each.RUC_Email : ""
                            })
                        })
                        resolve(pnparr);
                    })
                    .catch(reject);
        });

    }
}

