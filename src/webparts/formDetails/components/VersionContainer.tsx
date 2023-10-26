/*eslint-disable @typescript-eslint/no-explicit-any  */
/*eslint-disable @typescript-eslint/explicit-function-return-type  */
/*eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-key */
import React from "react";
import spOperation from "./Service/spService";
import moment from "moment";
import TableWithoutPagination from "./Table";
//import { columns } from "./TableColumn";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import styles from "./FormDetails.module.scss";
import "../../../common/fonts/fonts.scss";

export interface IVersioncontainer {
    baseurl: string;
    spcontext: WebPartContext;
    MLdata: any;
    contentTypeID:string;
    formurl:string;
}


const VersionContainer = (props: IVersioncontainer) => {

    const [alldata, setAllData] = React.useState([]);
    const [tabledata, settabledata] = React.useState([]);
    const [applicationID,setapplicationID] = React.useState("");

    const _objspservice: spOperation = new spOperation(props.baseurl, props.spcontext);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Acted On',
                columnId: 1,
                accessor: 'ActedOn',
            },
            {
                Header: 'Action Taken By',
                columnId: 2,
                accessor: 'ActionTakenBy',
            },
            {
                Header: 'Status',
                columnId: 3,
                accessor: 'Status',
            },
            {
                Header: 'Actions',
                columnId: 4,
                accessor: (originalRow: any, rowIndex: any) => {
                    return (<>
                    <img src={require("../assets/view.svg")} className='mx-2'  alt="View" title='View' onClick={() => onclickView(originalRow, rowIndex)} />
                           
                    </>
                    )
                },
                disableFilters: true,
            }
        ], [alldata,tabledata,applicationID])

    React.useEffect(() => {

        //get the content type id and the app id
        let appid: string = "";
        let contentTypeID: string = props.contentTypeID;
        if (window.location.href.indexOf("?") > -1) {
            let queryparameter = decodeURIComponent(window.location.href.toLowerCase()).split("?");
            //contentTypeID = queryparameter[1].split("&")[0].split("=")[1];
            appid = decodeURIComponent(queryparameter[1]).split("&")[0].split("=")[1]
        }

        


        if (appid && (decodeURIComponent(appid).indexOf("ryfp/")>-1 || decodeURIComponent(appid).indexOf("rffd/")>-1)  && contentTypeID) {
            setapplicationID(appid);
            let listname: string = props.MLdata?.filter((item: any) => item.RUC_ContentTypeID == contentTypeID)[0].RUC_ListName;
            let itemid:number=Number(decodeURIComponent(appid).split("/")[1]);
            _objspservice.getApplicationDataVersions(listname,itemid).then(async(res: any) => {
                //console.log("Version data without draft",res);
                
                setAllData(res);
            })
        }
    }, [])

    React.useEffect(() => {
        let _tabledata: any = [];

        

        //if alldata exists
        if(alldata.length > 0){
             alldata.map((each: any) => {
                let _status:string="";

                if(each.RUC_x005f_ApplicationStatus == "Provisionally Approved" || each.RUC_x005f_ApplicationStatus == "Provisionally Rejected"){
                    _status= "Submitted";
                }
                else{
                    _status=each.RUC_x005f_ApplicationStatus;
                }
                _tabledata.push({
                    ActedOn: moment(new Date(each.Modified).toString()).format("DD-MMM-YYYY hh:mm A"),
                    ActionTakenBy: each.Editor?.LookupValue,
                    Status: props.spcontext.pageContext.user.isExternalGuestUser ? _status :each.RUC_x005f_ApplicationStatus,
                    Actions: "",
                    VersionID: each.VersionId
                })
            })
        _tabledata.length>0 && settabledata(_tabledata.sort((a:any,b:any)=>b.ActedOn - a.ActedOn));
    }
    }, [alldata])

    const onclickView = (originalRow: any, rowIndex: any) => {
        //("View is clicked");
        //console.log("Original row", originalRow);
        //console.log("Row Index", rowIndex)
        props.formurl && applicationID && window.open(props.formurl + `?applicationId=${applicationID}&FormMode=View&Version=${originalRow.VersionID}`)
    }

    return (
        <>
        {tabledata.length>0 &&
            <div className={styles.formDetailContainer}>
        <div className={styles.auditHistory}>
          <div className={styles.auditHistoryHeader}>
            <h1>Audit History</h1>
          </div>
          <div className={`${styles.auditHistoryBody} table-responsive`}>
          <TableWithoutPagination
                data={tabledata}
                columns={columns}
                // _onRowClick={_onrowclick}
            />
          </div>
        </div>
      </div>}
      </>
    )

}

export default VersionContainer;