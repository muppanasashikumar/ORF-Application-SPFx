/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import * as React from 'react';
//import styles from './ListView.module.scss';
import { IListViewProps } from './IListViewProps';
//import { escape } from '@microsoft/sp-lodash-subset';
//import spOperation from './SpService/Spservice';
import { IListViewState } from './IListViewState';
//import ReactTable from "react-table";
// import TableWithPagination from "../components/TablewithPagination";
// import {columns} from './TableColumn';
import "../../../common/fonts/fonts.scss";
// import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { columnsApprovers } from './TableColumnForApprovers';
import ListViewContainer from './ListviewContainer';
import "../../../common/styles/bootstrap.css";
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import listViewStyles from "./ListView.module.scss";

export default class ListView extends React.Component<IListViewProps, IListViewState, {}> {

  // public _objspservice:spOperation;

  // constructor(props:IListViewProps){
  //   super(props);
  //   this._objspservice=new spOperation(this.props.spfxcontext);
  //   this.state = {
  //     currentuserRole:"",
  //     alldata: [],
  //     initialTableData:[]
  //   }
  // }

  // public componentDidMount(){

  //   console.log("GROUP",this.props.groupadmin)
  //   if(this.props.spfxcontext.pageContext.user.isExternalGuestUser){
  //     this._objspservice.getGuestApplicationData(this.props.spfxcontext.pageContext.user.email,this.props.MLdata[0].RUC_ListName).then((response:any)=>{

  //       this._dataforApplicant(response).then((_initialtabledata:any)=>{
  //         this.setState({currentuserRole:"Guest",alldata:response,initialTableData:_initialtabledata})
  //       })

  //     })
  //   }
  //   else{
  //     this.props.groupapprover.length >0 && this.props.groupadmin.length >0 &&
  //      this._objspservice.getcurrentuserGroups(this.props.groupapprover[0]?.id,this.props.groupadmin[0]?.id).then(async(res:any)=>{
  //        await this._objspservice.getAllApplicationData(this.props.MLdata[0].RUC_ListName).then((response:any)=>{

  //       if(res == "Approver"){
  //         this._dataforApprovers(response?.filter((item:any)=>item.RUC_ApplicationStatus !== "Draft")).then((_initialtabledata:any)=>{
  //           this.setState({currentuserRole:res,alldata:response,initialTableData:_initialtabledata});
  //         })
  //       }
  //       if(res == "Admin"){
  //         this._dataforAdmin(response).then((_initialtabledata:any)=>{
  //           this.setState({currentuserRole:res,alldata:response,initialTableData:_initialtabledata});
  //         })
  //       }
  //       })
  //       console.log("res",res)

  //     });
  //   }
  // }

  // private _dataforApplicant(alldata:any): Promise<any>{
  //   let _data:any=[];

  //   return new Promise(async(resolve,reject)=>{
  //     await alldata?.map((each:any)=>{
  //       //If the status is DRAFT, then actions will be view and edit
  //       if(each.RUC_ApplicationStatus == "Draft"){
  //         _data.push({
  //           AppliedDate: "",
  //           ApplicationID: each.ID,
  //           Status: each.RUC_ApplicationStatus,
  //           Actions: ["View", "Edit"]
  //         })
  //       }
  //       //If the status is provisionally approved or rejected, then status will be submitted and action will be view
  //       else if(each.RUC_ApplicationStatus == "Provisionally Approved" || each.RUC_ApplicationStatus == "Provisionally Rejected"){
  //         _data.push({
  //           AppliedDate: each.Modified,
  //           ApplicationID: each.ID,
  //           Status: "Submitted",
  //           Actions: ["View"]
  //         })
  //       }
  //       else{
  //         _data.push({
  //           AppliedDate: each.Modified,
  //           ApplicationID: each.ID,
  //           Status: each.RUC_ApplicationStatus,
  //           Actions: ["View"]
  //         })
  //       }
  //     })
  //     resolve(_data)
  //   })
  // }

  // private _dataforApprovers(alldata:any): Promise<any>{
  //   let _data:any=[];
  //   return new Promise((resolve,reject)=>{
  //     alldata?.map((each:any)=>{
  //         // If Status is Submitted, view, approve,reject
  //         if(each.RUC_ApplicationStatus =="Submitted"){
  //           _data.push({
  //             AppliedDate: each.Modified,
  //             FullName: each.RUC_FirstName + " " + each.RUC_LastName,
  //             ApplicationID: each.ID,
  //             Status: each.RUC_ApplicationStatus,
  //             Actions: ["View", "Approve", "Reject"]
  //           })
  //         }
  //         else if(each.RUC_ApplicationStatus == "Provisionally Approved"){
  //             _data.push({
  //               AppliedDate: each.Modified,
  //               FullName: each.RUC_FirstName + " " + each.RUC_LastName,
  //               ApplicationID: each.ID,
  //               Status: each.RUC_ApplicationStatus,
  //               Actions: ["View", "Reject", "Final Submit"]
  //             })
  //         }
  //         else if(each.RUC_ApplicationStatus == "Provisionally Rejected"){
  //           _data.push({
  //             AppliedDate: each.Modified,
  //             FullName: each.RUC_FirstName + " " + each.RUC_LastName,
  //             ApplicationID: each.ID,
  //             Status: each.RUC_ApplicationStatus,
  //             Actions: ["View", "Approve", "Final Submit"]
  //           })
  //         }
  //         else{
  //           _data.push({
  //             AppliedDate: each.Modified,
  //             FullName: each.RUC_FirstName + " " + each.RUC_LastName,
  //             ApplicationID: each.ID,
  //             Status: each.RUC_ApplicationStatus,
  //             Actions: ["View", "Notify"]
  //           })
  //         }
  //     })
  //     resolve(_data)
  //   })
  // }

  // private _dataforAdmin(alldata:any): Promise<any>{
  //   let _data:any=[];
  //   return new Promise((resolve,reject)=>{
  //     alldata?.map((each:any)=>{
  //       _data.push({
  //             AppliedDate: each.Modified,
  //             FullName: each.RUC_FirstName + " " + each.RUC_LastName,
  //             ApplicationID: each.ID,
  //             Status: each.RUC_ApplicationStatus,
  //             Actions: ["View", "Edit"]
  //       })
  //     })
  //     resolve(_data)
  //   })
  // }
  public render(): React.ReactElement<IListViewProps> {


    return (
      // <div className='d-flex flex-column p-5 gap-2'>
      //   {this.state.initialTableData.length>0 &&
      //     <TableWithPagination
      //     data={this.state.initialTableData}
      //     columns={this.state.currentuserRole == "Guest" ? columns : columnsApprovers}
      //     //_onRowClick={onRowclick}
      //     siteUrl={""}
      //     pageSize={1}
      //   />}
      // </div>
      <>
        <div className={`d-flex justify-content-between align-items-center ${listViewStyles.sectionHeader}`} >
                <div className={`d-flex justify-content-between align-items-center`}>
                    <h2 className={listViewStyles.sectionTitle}>{this.props.headerTitle}</h2>
                </div>
        </div>
        <div className={listViewStyles.background}>
          <ListViewContainer
            MLdata={this.props.MLdata}
            securityGroup={this.props.securityGroup}
            spfxcontext={this.props.spfxcontext} 
            batchlist={this.props.batchList}
            auditlist={this.props.auditlogList}/>
        </div>
      </>






    );
  }
}
