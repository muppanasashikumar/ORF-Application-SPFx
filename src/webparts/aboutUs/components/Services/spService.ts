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

    public getAboutUsDescription(listid: string) {

        return new Promise(async (resolve, reject) => {

            await
                this.sp.web.lists.getById(listid)
                    .items()
                    .then((pnpresult: any) => {
                       //console.log("pnp array", pnpresult);
                        resolve(pnpresult);
                    })
                    .catch(reject);
        });

    }
}

