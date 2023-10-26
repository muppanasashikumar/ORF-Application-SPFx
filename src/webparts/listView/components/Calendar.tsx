/*eslint-disable @typescript-eslint/no-explicit-any  */
/*eslint-disable @typescript-eslint/explicit-function-return-type  */
/* eslint-disable @typescript-eslint/no-floating-promises */

import React, { useState } from "react";
import PropTypes from "prop-types";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import commonStyles from './styles/Common.module.scss';
import { dateBetweenFilterFn } from "./filters";
// import { subDays } from "date-fns";

interface IProps {
  onChange: any;
  initialTableData: any;
  column: any;
  MLData: any;
  setFilterDate: any;
  currentSelectedProgramid: any;
  handleVisible: any;
  setinitialTableData: any;
  setMLData: any;
  setFilteredData: any;
  alldata: any;
}

const Calendar = ({ handleVisible, initialTableData, MLData, currentSelectedProgramid, setFilterDate, column, setinitialTableData, setMLData, setFilteredData, alldata }: IProps) => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState([
    {
      startDate: MLData[currentSelectedProgramid].startDateFilter,
      endDate: MLData[currentSelectedProgramid].endDateFilter,
      key: "selection"
    }
  ]);
  //console.log(show);



  const handleOnChange = (ranges: any) => {
    const { selection } = ranges;
    setState([selection]);
    const { id } = column;
    const updatedRows = dateBetweenFilterFn(alldata, id, ranges);
    
    if (MLData[currentSelectedProgramid].statusFilter.length > 0) {
      let _filteredTabledata: any = [...updatedRows];
      let _filteredarr: any = _filteredTabledata.filter((item: any) => {
        return MLData[currentSelectedProgramid].statusFilter.some((f: string) => {
          return f === item.Status
        })
      });

      if (MLData[currentSelectedProgramid].statusFilter.indexOf('Draft') > -1) {
        alldata.map((each: any) => {
            if (each.AppliedDate == '') {
              _filteredarr.push(each)
            }
        });
        setinitialTableData(_filteredarr.sort((a: any, b: any) => {
          return gettime(b.filterdate) - gettime(a.filterdate);
        }))
    }
    else{
      setinitialTableData(_filteredarr.sort((a: any, b: any) => {
        return gettime(b.filterdate) - gettime(a.filterdate);
      }));
    }
      
      
    } else {
      alldata.map((each:any)=>{
        if(each.AppliedDate == ''){
          updatedRows.push(each)
        }
      });
      setinitialTableData(updatedRows.sort((a: any, b: any) => {
        return gettime(b.filterdate) - gettime(a.filterdate);;
      }));
    }

    setFilterDate(ranges);
    //_mldata[currentSelectedProgramid].statusFilter = [..._filter];
    MLData[currentSelectedProgramid].startDateFilter = selection.startDate;
    MLData[currentSelectedProgramid].endDateFilter = selection.endDate;
    setMLData(MLData);
    //handleVisible();
  };

  const gettime=(date:string)=>{
    return date != '' ? new Date(date).getTime() : 0;
}

  const onClickClear = () => {
  //   let ranges: any = {
  //     selection: {
  //         endDate: '',
  //         key: "selection",
  //         startDate: ''
  //     }
  // }
    setState([{
      startDate: '',
      endDate: '',
      key: "selection"
    }]);
    setShow(false);
    // MLData[currentSelectedProgramid].statusFilter = [];
    MLData[currentSelectedProgramid].startDateFilter = '';
    MLData[currentSelectedProgramid].endDateFilter = '';
    setMLData(MLData);
    if (MLData[currentSelectedProgramid].statusFilter.length > 0) {
      let _filteredTabledata: any = [...alldata];
      let _filteredarr: any = _filteredTabledata.filter((item: any) => {
        return MLData[currentSelectedProgramid].statusFilter.some((f: string) => {
          return f === item.Status
        })
      });
      
      setinitialTableData(_filteredarr.sort((a: any, b: any) => {
        return gettime(b.filterdate) - gettime(a.filterdate);
      }));
    } else {
      setinitialTableData(alldata.sort((a: any, b: any) => {
        return gettime(b.filterdate) - gettime(a.filterdate);
      }));
    }
  };

  return (
    <>
      <div>
        <DateRangePicker
          onChange={handleOnChange}
          // showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          retainEndDateOnFirstSelection={true}
          months={1}
          ranges={state}
          direction="horizontal"
          rangeColors={['#e1cd72', '#fbca4c', '#B4A048']}
          inputRanges={[]}
          className={commonStyles.dateRangePicker}
        />
        <div className={`${commonStyles.buttonsPosition} d-flex gap-2`}>
          <button
            className="btn btn-transparent text-primary rounded-0 px-4 mr-2 doneBtn"
            onClick={() => handleVisible()}
          >
            Done
          </button>
          <button
            className="btn btn-transparent text-danger rounded-0 px-4 clearBtn"
            onClick={onClickClear}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
};

Calendar.propTypes = {
  onChange: PropTypes.func
};

export default Calendar;
