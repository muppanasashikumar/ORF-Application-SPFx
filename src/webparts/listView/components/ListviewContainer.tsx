/*eslint-disable @typescript-eslint/no-explicit-any  */
/*eslint-disable @typescript-eslint/no-floating-promises  */
/*eslint-disable @typescript-eslint/explicit-function-return-type */
/*eslint-disable @typescript-eslint/no-use-before-define */
/*eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-async-promise-executor */
import * as React from 'react';
import spOperation from './SpService/Spservice';
import TableWithPagination from "../components/TablewithPagination";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as moment from 'moment-timezone'
// import { columns } from './TableColumn';
// import { columnsApprovers } from './TableColumnForApprovers';
import "../../../common/styles/bootstrap.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import tabStyles from "./styles/Tab.module.scss";
import { IHttpClientOptions, HttpClientResponse, HttpClient } from '@microsoft/sp-http';
import commonStyles from "./styles/Common.module.scss";
import {
    ComboBox,
    IComboBoxOption,
    SelectableOptionMenuItemType,
    //Toggle,
    IComboBox,
    IComboBoxStyles,
    // Dropdown,
    //IStackTokens,
    //Stack,
} from '@fluentui/react';
import {
    // SelectColumnFilter,
    //DateRangeColumnFilter,
    dateBetweenFilterFn
} from "./filters";
import { CalloutComponent } from './DateRangeCallout';
import Swal from 'sweetalert2';

export interface IListViewContainer {
    spfxcontext: WebPartContext;
    securityGroup: string;
    MLdata: any;
    batchlist: string;
    auditlist:string;
}

const INITIAL_OPTIONS: IComboBoxOption[] = [
    { key: 'Header1', text: 'Application Status', itemType: SelectableOptionMenuItemType.Header },
    { key: 'Draft', text: 'Draft' },
    { key: 'Submitted', text: 'Submitted' },
    { key: 'Provisionally Approved', text: 'Provisionally Approved' },
    { key: 'Provisionally Rejected', text: 'Provisionally Rejected' },
    { key: 'Approved', text: 'Approved' },
    { key: 'Rejected', text: 'Rejected' }
];

const ListViewContainer = (props: IListViewContainer) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [currentuserRole, setcurrentuserRole] = React.useState("");
    const [alldata, setalldata] = React.useState([]);
    const [MLData, setMLData] = React.useState([] as any);
    const [currentSelectedProgramid, setCurrentselectedid] = React.useState(0)
    const [initialTableData, setinitialTableData] = React.useState([] as any);
    const [filteredData, setFilteredData] = React.useState([] as any);
    const [batches, setbatches] = React.useState([]);
    //const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
    const [options, setOptions] = React.useState(INITIAL_OPTIONS);
    const _objspservice: spOperation = new spOperation(props.spfxcontext);
    //console.log('filteredData', filteredData);

    const handleVisible = () => {
        setIsVisible(!isVisible);
    }

    //let newKey = 1;

    const setFilterDate = (ranges: any) => {
        let _mlData = MLData;
        _mlData[currentSelectedProgramid].startDateFilter = ranges.selection.startDate;
        _mlData[currentSelectedProgramid].endDateFilter = ranges.selection.endDate;
        setMLData(_mlData);
    }

    const comboBoxStyles: Partial<IComboBoxStyles> = { root: { width: '100%', background: 'transparent' } };

    const columnsApplicant = React.useMemo(
        () => [
            {
                Header: 'Applied Date',
                columnId: 1,
                accessor: 'AppliedDate',
                disableFilters: true
            },
            {
                Header: 'Application ID',
                columnId: 2,
                accessor: 'ApplicationID',
                disableFilters: true,
            },
            {
                Header: 'Status',
                columnId: 3,
                accessor: 'Status',
                disableFilters: true,
            },
            {
                Header: 'Actions',
                columnId: 4,
                accessor: (originalRow: any, rowIndex: any) => {
                    return (<>
                        {originalRow.Actions.map((each: any) => (
                            <>
                                {each == "View" && <img className='mx-2' src={require("../assets/view.svg")} alt="View" title='View' onClick={() => onclickView(originalRow, rowIndex)} />}
                                {each == "Edit" && <img className='mx-2' src={require("../assets/edit.svg")} alt="Edit" title='Edit' onClick={() => onclickEdit(originalRow)} />}
                            </>
                        ))}
                    </>
                    )
                },
                disableFilters: true,
            }
        ], [alldata, initialTableData, MLData, isVisible])

    const columnsApprovers = React.useMemo(
        () => [
            {
                Header: ({ column }: any) => {
                    return (
                        <div className="d-flex justify-content-center align-items-center position-relative">
                            <span>Applied Date</span>
                            <CalloutComponent
                                setinitialTableData={setinitialTableData}
                                initialTableData={initialTableData}
                                setFilteredData={setFilteredData}
                                column={column}
                                MLData={MLData}
                                setMLData={setMLData}
                                setFilterDate={setFilterDate}
                                currentSelectedProgramid={currentSelectedProgramid}
                                alldata={alldata}
                                isVisible={isVisible}
                                handleVisible={handleVisible} />
                        </div>)
                },
                columnId: 1,
                accessor: 'AppliedDate',
                filter: dateBetweenFilterFn,
                disableFilters: true,
            },
            {
                Header: 'Full Name',
                columnId: 2,
                accessor: 'FullName',
                disableFilters: true,
            },
            {
                Header: 'Application ID',
                columnId: 3,
                accessor: 'ApplicationID',
                disableFilters: true,
            },
            {
                Header: () => {
                    return (
                        <div className="d-flex justify-content-center position-relative">
                            <span>Status</span>
                            <div style={{ width: '15px', height: '16px' }} className={`position-absolute ${tabStyles.customRightPos}`}>
                                <ComboBox
                                    multiSelect
                                    allowFreeform={true}
                                    selectedKey={MLData[currentSelectedProgramid].statusFilter}
                                    options={options}
                                    onChange={onChange}
                                    styles={comboBoxStyles}
                                    iconButtonProps={{ "iconProps": { "iconName": `${MLData[currentSelectedProgramid].statusFilter.length > 0 ? 'FilterSolid' : 'Filter'}`, "styles": { "root": { color: "#b4a048" } } } }}
                                />
                            </div>

                        </div>)
                },
                columnId: 4,
                accessor: 'Status',
                disableFilters: true,
            },
            {
                Header: 'Actions',
                columnId: 5,
                accessor: (originalRow: any, rowIndex: any) => {
                    return (<>
                        {
                            originalRow.Actions.map((each: any) => (
                                <>
                                    {each == "View" && <img className='mx-2' src={require("../assets/view.svg")} alt="View Button" title='View' onClick={() => onclickView(originalRow, rowIndex)} />}
                                    {each == "Edit" && <img className='mx-2' src={require("../assets/edit.svg")} alt="Edit Button" title='Edit' onClick={() => onclickEdit(originalRow)} />}
                                    {each == "Approve" && <img className='mx-2' src={require("../assets/approve.svg")} title='Approve' onClick={() => onclickApprove(originalRow, rowIndex)} />}
                                    {each == "Reject" && <img className='mx-2' src={require("../assets/reject.svg")} title='Reject' onClick={() => onclickReject(originalRow, rowIndex)} />}
                                    {each == "Final Submit" && <img className='mx-2' src={require("../assets/finalSubmit.svg")} title='Final Submission' onClick={() => onclickFinalSubmit(originalRow, rowIndex)} />}
                                    {each == "Notify" && <img className='mx-2' src={require("../assets/notify.svg")} title='Notify' onClick={() => onclickNotify(originalRow)} />}
                                    {each == "TrainingCompleted" && <img className='mx-2' src={require("../assets/TrainingCompleted.svg")} title='Training Completed' onClick={() => onclickTrainingCompleted(originalRow, rowIndex, batches)} />}
                                </>
                            ))
                        }
                    </>
                    )
                },
                disableFilters: true,
            }
        ], [alldata, initialTableData, MLData, isVisible, batches])

    React.useEffect(() => {
        setMLData(props.MLdata);

        _objspservice.getFellowshipBatches(props.batchlist).then(async (_batches: any) => {

            let obj: any = []
            if (_batches.length > 0) {
                for (let i = 0; i < _batches.length; i++) {
                    var o = _batches[i];
                    for (var key in o) {
                        if (typeof o[key] != 'function') {
                            obj[key] = o[key];
                        }
                    }
                }
                setbatches(obj);
                //console.log(batches)
            }
        })

        
        //check which list has data for the user, and set the current index to that value

        if (props.securityGroup == "Applicant") {
            setcurrentuserRole("Guest");
            _setcurrentIndex().then(async (retvalue: number) => {

                retvalue !== 0 && setCurrentselectedid(retvalue);
                await _objspservice.getGuestApplicationData(props.spfxcontext.pageContext.user.email, props.MLdata[retvalue].RUC_ListName).then((response: any) => {

                    _dataforApplicant(response).then((_initialtabledata: any) => {
                        setalldata(_initialtabledata);
                        setinitialTableData(_initialtabledata);
                    });

                })
            })
        }
        else {
            //props.groupID.length > 0 && 
            //_objspservice.getcurrentuserGroups(props.groupID[0]?.id).then(async (res: any) => {
            _objspservice.getAllApplicationData(props.MLdata[0].RUC_ListName).then((response: any) => {

                if (props.securityGroup == "Approver") {
                    _dataforApprovers(response?.filter((item: any) => item.RUC_ApplicationStatus !== "Draft")).then((_initialtabledata: any) => {
                        setcurrentuserRole(props.securityGroup);
                        setalldata(_initialtabledata);
                        const uniqueoptions: any = [{ key: 'Header1', text: 'Application Status', itemType: SelectableOptionMenuItemType.Header }];
                        _initialtabledata?.map((item: any) => item.Status)
                            .filter((value: any, index: any, self: any) => self.indexOf(value) === index)?.map((each: any) => {
                                uniqueoptions.push({
                                    key: each, text: each
                                })
                            });
                        uniqueoptions.length > 1 && setOptions(uniqueoptions);
                        setinitialTableData(_initialtabledata.sort((a:any,b:any)=>{
                            return gettime(b.filterdate) - gettime(a.filterdate);
                        }));
                    })
                }
                if (props.securityGroup == "Admin") {
                    _dataforAdmin(response).then((_initialtabledata: any) => {
                        setcurrentuserRole(props.securityGroup);
                        setalldata(_initialtabledata);
                        // setinitialTableData(_initialtabledata);
                        const uniqueoptions: any = [{ key: 'Header1', text: 'Application Status', itemType: SelectableOptionMenuItemType.Header }];
                        _initialtabledata?.map((item: any) => item.Status)
                            .filter((value: any, index: any, self: any) => self.indexOf(value) === index)?.map((each: any) => {
                                uniqueoptions.push({
                                    key: each, text: each
                                })
                            });
                        uniqueoptions.length > 1 && setOptions(uniqueoptions);

                        setinitialTableData(_initialtabledata.sort((a:any,b:any)=>{
                            return gettime(b.filterdate) - gettime(a.filterdate);
                        }));
                    })
                }
            })

            //});
        }
    }, [])

    const gettime=(date:string)=>{
        return date != '' ? moment(date).format("hh:mm:ss") as any : 0;
    }

    const _setcurrentIndex=():Promise<number> =>{
        let retvalue: number = 0;
        return new Promise((resolve, reject) => {
            for (let _i = 0; _i < props.MLdata.length; _i++) {
                if (props.MLdata[_i].isUserDataExist) {
                    retvalue = _i;
                    break;
                }
            }
            resolve(retvalue)
        })
    }

    const _dataforApplicant = (alldata: any) => {
        let _data: any = [];

        return new Promise(async (resolve, reject) => {
            await alldata?.map((each: any) => {
                //If the status is DRAFT, then actions will be view and edit
                if (each.RUC_ApplicationStatus === "Draft") {
                    _data.push({
                        AppliedDate: "",
                        ApplicationID: each.RUC_ApplicationId,
                        Status: each.RUC_ApplicationStatus,
                        Actions: ["View", "Edit"],
                        AuthorEmail: each.Author?.EMail,
                        ActualAppId: each.ID
                    })
                }
                //If the status is provisionally approved or rejected, then status will be submitted and action will be view
                else if (each.RUC_ApplicationStatus === "Provisionally Approved" || each.RUC_ApplicationStatus === "Provisionally Rejected") {
                    _data.push({
                        AppliedDate: (moment(each.RUC_AppliedDate)).format("DD-MMM-YYYY"),
                        ApplicationID: each.RUC_ApplicationId,
                        Status: "Submitted",
                        Actions: ["View"],
                        AuthorEmail: each.Author?.EMail,
                        ActualAppId: each.ID
                    })
                }
                else {
                    _data.push({
                        AppliedDate: (moment(each.RUC_AppliedDate)).format("DD-MMM-YYYY"),
                        ApplicationID: each.RUC_ApplicationId,
                        Status: each.RUC_ApplicationStatus,
                        Actions: ["View"],
                        AuthorEmail: each.Author?.EMail,
                        ActualAppId: each.ID
                    })
                }
            })

            resolve(_data.sort((a: any, b: any) => b.ActualAppId - a.ActualAppId))
        })
    }

    const _dataforApprovers = (alldata: any) => {
        let _data: any = [];
        return new Promise((resolve, reject) => {
            alldata?.map((each: any) => {
                // If Status is Submitted, view, approve,reject
                if (each.RUC_ApplicationStatus === "Submitted") {
                    _data.push({
                        AppliedDate: (moment(each.RUC_AppliedDate)).format("DD-MMM-YYYY"),
                        FullName: (each.RUC_FirstName ? each.RUC_FirstName : "") + " " + (each.RUC_LastName ? each.RUC_LastName : ""),
                        ApplicationID: each.RUC_ApplicationId,
                        Status: each.RUC_ApplicationStatus,
                        Actions: ["View", "Approve", "Reject"],
                        AuthorEmail: each.Author?.EMail,
                        ActualAppId: each.ID,
                        filterdate: each.RUC_AppliedDate ? each.RUC_AppliedDate:""
                    })
                }
                else if (each.RUC_ApplicationStatus === "Provisionally Approved") {
                    _data.push({
                        AppliedDate: (moment(each.RUC_AppliedDate)).format("DD-MMM-YYYY"),
                        FullName: (each.RUC_FirstName ? each.RUC_FirstName : "") + " " + (each.RUC_LastName ? each.RUC_LastName : ""),
                        ApplicationID: each.RUC_ApplicationId,
                        Status: each.RUC_ApplicationStatus,
                        Actions: ["View", "Reject", "Final Submit"],
                        AuthorEmail: each.Author?.EMail,
                        ActualAppId: each.ID,
                        filterdate: each.RUC_AppliedDate ? each.RUC_AppliedDate:""
                    })
                }
                else if (each.RUC_ApplicationStatus === "Provisionally Rejected") {
                    _data.push({
                        AppliedDate: (moment(each.RUC_AppliedDate)).format("DD-MMM-YYYY"),
                        FullName: (each.RUC_FirstName ? each.RUC_FirstName : "") + " " + (each.RUC_LastName ? each.RUC_LastName : ""),
                        ApplicationID: each.RUC_ApplicationId,
                        Status: each.RUC_ApplicationStatus,
                        Actions: ["View", "Approve", "Final Submit"],
                        AuthorEmail: each.Author?.EMail,
                        ActualAppId: each.ID,
                        filterdate: each.RUC_AppliedDate ? each.RUC_AppliedDate:""
                    })
                }
                else {
                    _data.push({
                        AppliedDate: (moment(each.RUC_AppliedDate)).format("DD-MMM-YYYY"),
                        FullName: (each.RUC_FirstName ? each.RUC_FirstName : "") + " " + (each.RUC_LastName ? each.RUC_LastName : ""),
                        ApplicationID: each.RUC_ApplicationId,
                        Status: each.RUC_ApplicationStatus,
                        Actions: ["View", "Notify"],
                        AuthorEmail: each.Author?.EMail,
                        ActualAppId: each.ID,
                        filterdate: each.RUC_AppliedDate ? each.RUC_AppliedDate:""
                    })
                }
            })
            resolve(_data.sort((a: any, b: any) => b.ActualAppId - a.ActualAppId))
        })
    }

    const _dataforAdmin = (alldata: any) => {
        let _data: any = [];
        return new Promise((resolve, reject) => {
            alldata?.map((each: any) => {
                if (each.RUC_ApplicationStatus === "Approved") {
                    _data.push({
                        AppliedDate: (moment(each.RUC_AppliedDate)).format("DD-MMM-YYYY"),
                        FullName: (each.RUC_FirstName ? each.RUC_FirstName : "") + " " + (each.RUC_LastName ? each.RUC_LastName : ""),
                        ApplicationID: each.RUC_ApplicationId,
                        Status: each.RUC_ApplicationStatus,
                        Actions: ["View", "Edit", "TrainingCompleted"],
                        AuthorEmail: each.Author?.EMail,
                        ActualAppId: each.ID,
                        filterdate: each.RUC_AppliedDate ? each.RUC_AppliedDate:""
                    })
                }
                else {
                    _data.push({
                        AppliedDate: each.RUC_ApplicationStatus === "Draft" ? "" : (moment(each.RUC_AppliedDate)).format("DD-MMM-YYYY"),
                        FullName: (each.RUC_FirstName ? each.RUC_FirstName : "") + " " + (each.RUC_LastName ? each.RUC_LastName : ""),
                        ApplicationID: each.RUC_ApplicationId,
                        Status: each.RUC_ApplicationStatus,
                        Actions: ["View", "Edit"],
                        AuthorEmail: each.Author?.EMail,
                        ActualAppId: each.ID,
                        filterdate: each.RUC_AppliedDate ? each.RUC_AppliedDate:""
                    })
                }

            })
            resolve(_data.sort((a: any, b: any) => b.ActualAppId - a.ActualAppId))
        })
    }

    const onclickView = (originalRow: any, rowIndex: any) => {
        //("View is clicked");
        window.open(MLData[currentSelectedProgramid].RUC_FormURL + `?applicationId=${originalRow.ApplicationID}&FormMode=View`)
    }

    const onclickEdit = (originalRow: any) => {
        //console.log("Edit is clicked")
        window.open(MLData[currentSelectedProgramid].RUC_FormURL + `?applicationId=${originalRow.ApplicationID}&FormMode=Edit`)
    }

    const onclickApprove = async (originalrow: any, rowind: any) => {
        Swal.fire({
            title: `<p style=font-size:18px;>The status of application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span> will be <span style=font-weight:900>provisionally approved</span>. Do you want to proceed ?</p>`,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            backdrop: false,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await _objspservice.checkapplicationstatus(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,originalrow.Status,originalrow.ActualAppId, MLData[currentSelectedProgramid].RUC_ListName, "Provisionally Approved").then((ret: boolean) => {
                    //True means we have to update 
                    //false means its already provisionally approved
                    if (ret) {
                        _objspservice.updateApplicationStatus(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,originalrow.Status,originalrow.ActualAppId, MLData[currentSelectedProgramid].RUC_ListName, "Provisionally Approved").then((isSuccess: boolean) => {
                            if (isSuccess) {
                                let _updatedtabledata: any = [...initialTableData];
                                _updatedtabledata[rowind].Actions = ["View", "Reject", "Final Submit"];
                                _updatedtabledata[rowind].Status = "Provisionally Approved";
                                setinitialTableData(_updatedtabledata);

                                Swal.fire({
                                    icon: 'success',
                                    title: `The application with reference no. ${originalrow.ApplicationID} is provisionally approved`,
                                    backdrop: false
                                });
                                _objspservice.Log(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,"Provisionally Approved",`The application with reference no. ${originalrow.ApplicationID} is provisionally approved`);
                            }
                            else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: `There is some error in completing this action for the application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span>. Please contact the administrator.`,
                                    backdrop: false,
                                });
                                
                            }
                        })
                    }
                    else {
                        //console.log("Already updated");
                        Swal.fire({
                            icon: 'warning',
                            title: `There is some error in completing this action for the application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span>. Please contact the administrator.`,
                            backdrop: false,
                        });
                        
                    }
                })

            }
        })

    }

    const onclickReject = async (originalrow: any, rowind: any) => {
        //console.log("Reject is clicked")
        Swal.fire({
            title: `<p style=font-size:18px;>The status of application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span> will be <span style=font-weight:900>provisionally rejected</span>. Do you want to proceed?</p>`,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            backdrop: false,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await _objspservice.checkapplicationstatus(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,originalrow.Status,originalrow.ActualAppId, MLData[currentSelectedProgramid].RUC_ListName, "Provisionally Rejected").then((ret: boolean) => {
                    //True means we have to update 
                    //false means its already provisionally approved
                    if (ret) {
                        _objspservice.updateApplicationStatus(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,originalrow.Status,originalrow.ActualAppId, MLData[currentSelectedProgramid].RUC_ListName, "Provisionally Rejected").then((isSuccess: boolean) => {
                            if (isSuccess) {
                                let _updatedtabledata: any = [...initialTableData];
                                _updatedtabledata[rowind].Actions = ["View", "Approve", "Final Submit"];
                                _updatedtabledata[rowind].Status = "Provisionally Rejected";
                                setinitialTableData(_updatedtabledata);

                                Swal.fire({
                                    icon: 'success',
                                    title: `The application with reference no. ${originalrow.ApplicationID} is provisionally rejected`,
                                    backdrop: false,
                                });
                                _objspservice.Log(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,"Provisionally Rejected",`The application with reference no. ${originalrow.ApplicationID} is provisionally rejected`);
                            }
                            else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: `There is some error in completing this action for the application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span>. Please contact the administrator.`,
                                    backdrop: false,
                                });
                                
                            }
                        })
                    }
                    else {
                        //console.log("Already updated");
                        Swal.fire({
                            icon: 'warning',
                            title: `There is some error in completing this action for the application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span>. Please contact the administrator.`,
                            backdrop: false,
                        });
                        
                    }
                })

            }
        })

    }
    const onclickFinalSubmit = async (originalrow: any, rowind: any) => {
        //console.log("FinalSubmit is clicked");

        await _objspservice.checkapplicationstatusforFinalSubmit(originalrow.ActualAppId, MLData[currentSelectedProgramid].RUC_ListName).then((retstatus: string) => {

            if (retstatus != "Approved" && retstatus != "Rejected") {

                let updatestatus: string = "";

                if (retstatus == "Provisionally Approved") {
                    updatestatus = "Approved"
                }
                else if (retstatus == "Provisionally Rejected") {
                    updatestatus = "Rejected"
                }

                Swal.fire({
                    title: `<p style=fontSize:18px>The status of application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span> will be <span style=font-weight:900>${updatestatus.toLowerCase()}</span>. Do you want to proceed?</p>`,
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    backdrop: false,
                }).then(async (result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        _objspservice.updateApplicationStatusforFinalSubmit(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,originalrow.Status,originalrow.ActualAppId, MLData[currentSelectedProgramid].RUC_ListName, updatestatus).then((isSuccess: boolean) => {
                            if (isSuccess) {
                                let _updatedtabledata: any = [...initialTableData];
                                _updatedtabledata[rowind].Actions = ["View", "Notify"];
                                _updatedtabledata[rowind].Status = updatestatus;
                                setinitialTableData(_updatedtabledata);

                                Swal.fire({
                                    icon: 'success',
                                    title: `The application with reference no. ${originalrow.ApplicationID} is ${updatestatus.toLowerCase()}`,
                                    backdrop: false,
                                });
                                _objspservice.Log(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,updatestatus,`The application status is successfully updated to ${updatestatus}`);
                            }
                            else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: `There is some error in completing this action for the application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span>. Please contact the administrator.`,
                                    backdrop: false,
                                });
                                _objspservice.Error(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,originalrow.Status,`ERROR: The application with reference no. ${originalrow.ApplicationID} was already updated to the desired status`);
                            }
                        })

                    }
                })

            }
            else {
                Swal.fire({
                    icon: 'warning',
                    title: `There is some error in completing this action for the application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span>. Please contact the administrator.`,
                    backdrop: false,
                });
                _objspservice.Error(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,originalrow.Status,`ERROR: Action not permitted. The application with reference no. ${originalrow.ApplicationID} is not permitted to be updated to the desired status`)
            }
        })

    }
    const onclickNotify = (originalrow: any) => {
        //console.log("Notify is clicked");
        Swal.fire({
            title: `This action will send out the notification on status of the application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span> to the applicant. Do you want to proceed?`,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            backdrop: false,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let emailadress: string = originalrow.AuthorEmail;
                let applicantname: string = originalrow.FullName;
                let fellowshipname: string = MLData[currentSelectedProgramid].Title;
                let applicationid: string = originalrow.ApplicationID;
                let applicationStatus: string = originalrow.Status;

                const postURL = "https://prod-21.centralindia.logic.azure.com:443/workflows/11638b8bc3a0486dbe83907e7b14cb36/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=eJl9m6-B_fz5UdbW3g-ErJ39QOBglMDiyQ-mVWY6_w4";

                const body: string = JSON.stringify({
                    "emailaddress": emailadress,
                    "applicantName": applicantname,
                    "fellowshipProgram": fellowshipname,
                    "applicationID": applicationid.toString(),
                    "status": applicationStatus
                });

                const requestHeaders: Headers = new Headers();
                requestHeaders.append('Content-type', 'application/json');

                const httpClientOptions: IHttpClientOptions = {
                    body: body,
                    headers: requestHeaders
                };

                //console.log("HEADER", requestHeaders.get("Content-type"))

                return props.spfxcontext.httpClient.post(
                    postURL,
                    HttpClient.configurations.v1,
                    httpClientOptions)
                    .then((response: HttpClientResponse): Promise<HttpClientResponse> => {
                        return new Promise((resolve, reject) => {

                            //console.log("Email sent.", response.status);
                            if (response.status == 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Success',
                                    text: `Notification Sent`,
                                    backdrop: false,
                                });
                                _objspservice.Log(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,originalrow.Status,"Notification was sent successfully");
                            }
                            
                            else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: `There is some error in completing this action for the application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span>. Please contact the administrator.`,
                                    backdrop: false,
                                });
                                _objspservice.Error(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,originalrow.Status,`Error: Error in sending email notification: ${response.statusText}`);
                            }
                            resolve(response.json());
                        })

                    });
            }
        })




    }

    const onclickTrainingCompleted = async (originalrow: any, rowind: number, _batches: any) => {
        Swal.fire({
            title: `<p style=font-size:18px>The status of application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span> will be <span style=font-weight:900>training completed</span>. Do you want to proceed ?</p>`,
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            input: 'select',
            inputOptions: _batches,
            inputPlaceholder: 'Select a batch',
            backdrop: false,

        }).then(async (result:any) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed && result.value != '') {
                await _objspservice.checkapplicationstatusforTrainingCompleted(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,originalrow.Status,originalrow.ActualAppId, MLData[currentSelectedProgramid].RUC_ListName, "Training Completed").then((ret: boolean) => {
                    //True means we have to update 
                    //false means its already updated
                    if (ret) {
                        _objspservice.updateApplicationStatusforTrainingCompleted(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,originalrow.Status,originalrow.ActualAppId, MLData[currentSelectedProgramid].RUC_ListName, "Training Completed", Number(result.value)).then((isSuccess: boolean) => {
                            if (isSuccess) {
                                let _updatedtabledata: any = [...initialTableData];
                                _updatedtabledata[rowind].Actions = ["View", "Edit"];
                                _updatedtabledata[rowind].Status = "Training Completed";
                                setinitialTableData(_updatedtabledata);

                                Swal.fire({
                                    icon: 'success',
                                    title: `The status of application with reference no. ${originalrow.ApplicationID} is updated to training completed`,
                                    backdrop: false,
                                })
                                _objspservice.Log(props.auditlist,MLData[currentSelectedProgramid].Title,originalrow.ApplicationID,"Training Completed",`The status of application with reference no. ${originalrow.ApplicationID} is updated to training completed`)
                            }
                            else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: `There is some error in completing this action for the application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span>. Please contact the administrator.`,
                                    backdrop: false,
                                });
                                
                            }
                        })
                    }
                    else {
                        //console.log("Already updated");
                        Swal.fire({
                            icon: 'warning',
                            title: `There is some error in completing this action for the application with reference no. <span style=font-weight:900>${originalrow.ApplicationID}</span>. Please contact the administrator.`,
                            backdrop: false,
                        });
                        
                    }
                })

            }
            else if (result.value == '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Please select a batch before you proceed',
                    backdrop: false,
                })
            }
        })
    }

    const _setTableData = (index: number) => {
        setCurrentselectedid(index);
        let ranges: any = {
            selection: {
                endDate: MLData[index].endDateFilter,
                key: "selection",
                startDate: MLData[index].startDateFilter
            }
        }
        if (currentuserRole == "Guest") {
            _objspservice.getGuestApplicationData(props.spfxcontext.pageContext.user.email, MLData[index].RUC_ListName).then((response: any) => {

                _dataforApplicant(response).then((_initialtabledata: any) => {

                    setinitialTableData(_initialtabledata);
                    setalldata(_initialtabledata);
                })

            })
        }
        else {
            _objspservice.getAllApplicationData(MLData[index].RUC_ListName).then((response: any) => {

                if (currentuserRole == "Approver") {
                    _dataforApprovers(response?.filter((item: any) => item.RUC_ApplicationStatus !== "Draft"))?.then(async (_initialtabledata: any) => {

                        setalldata(_initialtabledata);

                        const uniqueoptions: any = [{ key: 'Header1', text: 'Application Status', itemType: SelectableOptionMenuItemType.Header }];
                        _initialtabledata?.map((item: any) => item.Status)
                            .filter((value: any, index: any, self: any) => self.indexOf(value) === index)?.map((each: any) => {
                                uniqueoptions.push({
                                    key: each, text: each
                                })
                            });
                        uniqueoptions.length > 1 && setOptions(uniqueoptions);

                        //check for status filter
                        _filterTabledatabyStatus(_initialtabledata, index).then((filteredarr: any) => {

                            const updatedRows = dateBetweenFilterFn(filteredarr, "AppliedDate", ranges);
                            //console.log("UPDATED ROWS IN SET TABLE DATE FN", updatedRows);

                            //If Draft is present in status filter then push 
                            if (MLData[index].statusFilter.length > 0) {
                                if (MLData[index].statusFilter.indexOf('Draft') > -1) {
                                    _initialtabledata.map((each: any) => {
                                        if (each.AppliedDate == '') {
                                            updatedRows.push(each)
                                        }
                                    });
                                    setinitialTableData(updatedRows.sort((a:any,b:any)=>{
                                        return gettime(b.filterdate) - gettime(a.filterdate);
                                    }))
                                }

                                else {
                                    setinitialTableData(updatedRows.sort((a:any,b:any)=>{
                                        return gettime(b.filterdate) - gettime(a.filterdate);
                                    }))
                                }
                            } else {
                                setinitialTableData(updatedRows.sort((a:any,b:any)=>{
                                    return gettime(b.filterdate) - gettime(a.filterdate);
                                }))
                            }
                        })
                    })
                }
                if (currentuserRole == "Admin") {
                    _dataforAdmin(response).then(async (_initialtabledata: any) => {
                        setalldata(_initialtabledata);

                        const uniqueoptions: any = [{ key: 'Header1', text: 'Application Status', itemType: SelectableOptionMenuItemType.Header }];
                        _initialtabledata?.map((item: any) => item.Status)
                            .filter((value: any, index: any, self: any) => self.indexOf(value) === index)?.map((each: any) => {
                                uniqueoptions.push({
                                    key: each, text: each
                                })
                            });
                        uniqueoptions.length > 1 && setOptions(uniqueoptions);

                        //check for status filter
                        _filterTabledatabyStatus(_initialtabledata, index).then((filteredarr: any) => {

                            if (MLData[index].startDateFilter == '' && MLData[index].endDateFilter == '') {
                                setinitialTableData(filteredarr.sort((a:any,b:any)=>{
                                    return gettime(b.filterdate) - gettime(a.filterdate);
                                }))
                            }
                            else {
                                const updatedRows = dateBetweenFilterFn(filteredarr, "AppliedDate", ranges);
                                //console.log("UPDATED ROWS IN SET TABLE DATE FN", updatedRows);
    
                                if (MLData[index].statusFilter.indexOf('Draft') > -1) {
                                    _initialtabledata.map((each: any) => {
                                        if (each.AppliedDate == '') {
                                            updatedRows.push(each)
                                        }
                                    });
                                    setinitialTableData(updatedRows.sort((a: any, b: any) => {
                                        return gettime(b.filterdate) - gettime(a.filterdate);
                                    }))
                                }
                                else {
                                    setinitialTableData(updatedRows.sort((a: any, b: any) => {
                                        return gettime(b.filterdate) - gettime(a.filterdate);
                                    }))
                                }
                            }
                        })
                    })
                }
            })
        }
    }

    const onChange = React.useCallback(
        (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {
            let selected = option?.selected;
            let ranges: any = {
                selection: {
                    endDate: MLData[currentSelectedProgramid].endDateFilter,
                    key: "selection",
                    startDate: MLData[currentSelectedProgramid].startDateFilter
                }
            }


            if (options) {
                // setSelectedKeys(prevSelectedKeys =>
                //     selected ? [...prevSelectedKeys, option!.key as string] : prevSelectedKeys.filter(k => k !== option!.key),
                // );
                const _mldata: any = [...MLData];
                if (selected) {
                    _mldata[currentSelectedProgramid].statusFilter.push(option?.key);
                    //console.log("ML data updated with status filter", _mldata);
                    setMLData(_mldata);
                    _filterTabledatabyStatus(alldata, currentSelectedProgramid).then(async (filteredarr: any) => {
                        if (_mldata[currentSelectedProgramid].startDateFilter == '' && _mldata[currentSelectedProgramid].endDateFilter == '') {
                            setinitialTableData(filteredarr.sort((a:any,b:any)=>{
                                return gettime(b.filterdate) - gettime(a.filterdate);
                            }))
                        }
                        else {
                            const updatedRows = dateBetweenFilterFn(filteredarr, "AppliedDate", ranges);
                            //console.log("UPDATED ROWS IN SET TABLE DATE FN", updatedRows);

                            if (_mldata[currentSelectedProgramid].statusFilter.indexOf('Draft') > -1) {
                                alldata.map((each: any) => {
                                    if (each.AppliedDate == '') {
                                        updatedRows.push(each)
                                    }
                                });
                                setinitialTableData(updatedRows.sort((a: any, b: any) => {
                                    return gettime(b.filterdate) - gettime(a.filterdate);
                                }))
                            }
                            else {
                                if(_mldata[currentSelectedProgramid].statusFilter.length==0){
                                    alldata.map((each: any) => {
                                        if (each.AppliedDate == '') {
                                            updatedRows.push(each)
                                        }
                                    });
                                    setinitialTableData(updatedRows.sort((a: any, b: any) => {
                                        return gettime(b.filterdate) - gettime(a.filterdate);
                                    }))
                                }
                                else{
                                    setinitialTableData(updatedRows.sort((a: any, b: any) => {
                                        return gettime(b.filterdate) - gettime(a.filterdate);
                                    }))
                                }
                                
                            }
                        }
                        
                    })
                }
                else {
                    const _filter: any = _mldata[currentSelectedProgramid].statusFilter.filter((k: any) => { return k !== option?.key });
                    _mldata[currentSelectedProgramid].statusFilter = [..._filter];
                    //console.log("ML data updated with status filter", _mldata);
                    setMLData(_mldata);
                    _filterTabledatabyStatus(alldata, currentSelectedProgramid).then(async (filteredarr: any) => {

                        if (_mldata[currentSelectedProgramid].startDateFilter == '' && _mldata[currentSelectedProgramid].endDateFilter == '') {
                            setinitialTableData(filteredarr.sort((a:any,b:any)=>{
                                return gettime(b.filterdate) - gettime(a.filterdate);
                            }))
                        }
                        else {
                            const updatedRows = dateBetweenFilterFn(filteredarr, "AppliedDate", ranges);
                            //console.log("UPDATED ROWS IN SET TABLE DATE FN", updatedRows);

                            if (_mldata[currentSelectedProgramid].statusFilter.indexOf('Draft') > -1) {
                                alldata.map((each: any) => {
                                    if (each.AppliedDate == '') {
                                        updatedRows.push(each)
                                    }
                                });
                                setinitialTableData(updatedRows.sort((a: any, b: any) => {
                                    return gettime(b.filterdate) - gettime(a.filterdate);
                                }))
                            }
                            else {
                                if(_mldata[currentSelectedProgramid].statusFilter.length==0){
                                    alldata.map((each: any) => {
                                        if (each.AppliedDate == '') {
                                            updatedRows.push(each)
                                        }
                                    });
                                    setinitialTableData(updatedRows.sort((a: any, b: any) => {
                                        return gettime(b.filterdate) - gettime(a.filterdate);
                                    }))
                                }
                                else{
                                    setinitialTableData(updatedRows.sort((a: any, b: any) => {
                                        return gettime(b.filterdate) - gettime(a.filterdate);
                                    }))
                                }
                                
                            }
                        }
                    })
                }

            }
        },
        [MLData, initialTableData],
    );


    const _filterTabledatabyStatus = (_data: any, _index: number) => {
        //console.log("All Data in filter func", _data)
        return new Promise((resolve, reject) => {
            if (MLData[_index].statusFilter.length > 0) {
                let _filteredTabledata: any = [..._data];
                let _filteredarr: any = _filteredTabledata.filter((item: any) => {
                    return MLData[_index].statusFilter.some((f: string) => {
                        return f === item.Status
                    })
                })
                resolve(_filteredarr);
            }
            else {
                resolve(_data)
            }
        })
    }


    return (
        <div className={`d-flex flex-column gap-2 ${commonStyles.listViewContainer}`}>
            <div className='my-5'>

                <Tabs className={`${tabStyles.tabs}`}>
                    <TabList className={`d-flex gap-4 mb-3 text-center ${tabStyles.tabContainer}`}>
                        {currentuserRole !== "" && (currentuserRole === "Guest" ?
                            MLData?.filter((item: any) => item.isUserDataExist === true)?.map((item: any, index: number) => {
                                return (
                                    <Tab onClick={() => _setTableData(index)} className={`${tabStyles.tabTitle}`}>{item.Title}</Tab>
                                )
                            })
                            :
                            MLData?.map((item: any, index: number) => {
                                return (
                                    <Tab onClick={() => _setTableData(index)} className={`${tabStyles.tabTitle}`}>{item.Title}</Tab>
                                )
                            }))
                        }
                    </TabList>
                    {currentuserRole !== "" && 
                    currentuserRole === "Guest" ?
                        MLData?.map((item: any) => {
                            return (
                                <TabPanel>
                                    {
                                        <TableWithPagination
                                            data={initialTableData}
                                            columns={currentuserRole == "Guest" ? columnsApplicant : columnsApprovers}
                                            // columns={currentuserRole == "Guest" ? columns : columnsApprovers}
                                            //_onRowClick={onRowclick}
                                            siteUrl={""}
                                            pageSize={10}
                                            currentSelectedProgramid={currentSelectedProgramid}
                                            setMLData={setMLData}
                                            MLData={MLData}
                                            setinitialTableData={setinitialTableData}
                                            allData={alldata}
                                            isVisible={isVisible}
                                            setIsVisible={setIsVisible}
                                            currentuserrole={currentuserRole}
                                        />
                                    }
                                </TabPanel>
                            )
                        })
                        :
                        MLData?.map((item: any) => {
                            return (
                                    <TabPanel>
                                    {
                                        <TableWithPagination
                                            data={initialTableData}
                                            columns={currentuserRole === "Guest" ? columnsApplicant : columnsApprovers}
                                            // columns={currentuserRole == "Guest" ? columns : columnsApprovers}
                                            //_onRowClick={onRowclick}
                                            siteUrl={""}
                                            pageSize={10}
                                            currentSelectedProgramid={currentSelectedProgramid}
                                            setMLData={setMLData}
                                            MLData={MLData}
                                            setinitialTableData={setinitialTableData}
                                            allData={alldata}
                                            isVisible={isVisible}
                                            setIsVisible={setIsVisible}
                                            currentuserrole={currentuserRole}
                                        />}
                                </TabPanel>
                            )
                        })
                    }
                </Tabs>


            </div>


        </div>
    )
}


export default ListViewContainer;