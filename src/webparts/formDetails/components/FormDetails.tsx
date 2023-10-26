import * as React from 'react';
//import styles from './FormDetails.module.scss';
import { IFormDetailsProps } from './IFormDetailsProps';
import { IFormDetailsState } from './IFormDetailsState';
// import spOperation from '../components/Service/spService';
import VersionContainer from './VersionContainer';
// import TableWithoutPagination from './Table';
// import { columns } from './TableColumn';
// import * as moment from "moment";
//import { escape } from '@microsoft/sp-lodash-subset';
// import styles from "./FormDetails.module.scss";
import "../../../common/fonts/fonts.scss";

export default class FormDetails extends React.Component<IFormDetailsProps, IFormDetailsState, {}> {

  // public _objspservice:spOperation;

  // constructor(props:IFormDetailsProps){
  //   super(props);
  //   this._objspservice=new spOperation(props.spfxcontext);
  //   this.state={
  //     alldata:[],
  //     tabledata:[],
  //     versiondata:[]
  //   }
  // }

  //  public componentDidMount() {
  //     let appid:string="";
  //     let contentTypeID:string="";
  //     if(window.location.href.indexOf("?")>-1) { 
  //       let queryparameter = window.location.href.split("?");
  //       contentTypeID = queryparameter[1].split("&")[0].split("=")[1];
  //       appid = queryparameter[1].split("&")[1].split("=")[1]
  //     }

  //     if(appid && contentTypeID){

  //       let listname:string=this.props.MLdata?.filter((item:any) => item.RUC_ContentTypeID == contentTypeID)[0].RUC_ListName;

  //       this._objspservice.getApplicationDataVersions(listname,appid).then((res:any)=>{
  //         let _tabledata:any=[];
  //         res.map((each:any)=>{
  //           _tabledata.push({
  //             Version: each.VersionLabel,
  //             CreatedDate: moment(moment(each.Created).toLocaleString()).format("DD.MM.YYYY hh:mm:ss")
  //           })
  //         })
  //         this.setState({
  //           alldata: res,
  //           versiondata: res.filter((item:any)=>item.IsCurrentVersion === true),
  //           tabledata:_tabledata
  //         })
  //       })
  //     }

  //   }

  // public _onrowclick=(e:any,row:any,col:any)=>{
  //   console.log("Row Clicked",row.original);
  //   this.setState({
  //     versiondata: this.state.alldata.filter((item:any)=>item.VersionLabel === row.original.Version)
  //   })
  // }

  public render(): React.ReactElement<IFormDetailsProps> {

    return (
      // <div className={styles.formDetailContainer}>
      //   <div className={styles.auditHistory}>
      //     <div className={styles.auditHistoryHeader}>
      //       <h1>Audit History</h1>
      //     </div>
      //     <div className={styles.auditHistoryBody}>
            <VersionContainer MLdata={this.props.MLdata}
              baseurl={this.props.baseurl}
              spcontext={this.props.spfxcontext}
              contentTypeID={this.props._contentTypeid}
              formurl={this.props.formurl} />
      //     </div>
      //   </div>
      // </div>
    );
  }
}
