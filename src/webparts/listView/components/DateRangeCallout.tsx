/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable  @typescript-eslint/no-use-before-define */
import * as React from 'react';
// import { mergeStyleSets, FontWeights } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import tabStyles from "./styles/Tab.module.scss";
import commonStyles from "./styles/Common.module.scss";
import Calendar from './Calendar';
import { IconButton } from 'office-ui-fabric-react';
// import { subDays } from 'date-fns';
interface IProps {
  currentSelectedProgramid: any;
  setFilterDate: any;
  MLData: any;
  initialTableData: any;
  setinitialTableData: any;
  column: any;
  setMLData: any;
  setFilteredData: any;
  alldata: any;
  isVisible: any;
  handleVisible: any;
}

export const CalloutComponent = ({ initialTableData, currentSelectedProgramid, setFilterDate, MLData, column, setinitialTableData, setMLData, setFilteredData, alldata, isVisible, handleVisible }: IProps) => {

  const buttonId = useId('callout-button');
  //console.log('Callout component called');
  return (
    <>
      <span
        id={buttonId}
        onClick={() => handleVisible()}
        className={`position-absolute ${tabStyles.customRightPos} ${commonStyles.cursorPointer}`}>
        {/* <img src={require('../assets/filter.svg')} alt='Filter Icon' /> */}
        <IconButton className={commonStyles.filterIcon}
        iconProps={{ iconName: `${MLData[currentSelectedProgramid].startDateFilter !== ''
           || MLData[currentSelectedProgramid].endDateFilter !== '' 
           ? 'FilterSolid' : 'Filter'}`, 
           "styles": { "root": { color: "#b4a048" } } }} />
      </span>
      {isVisible && (
        <Calendar
          handleVisible={handleVisible}
          MLData={MLData}
          alldata={alldata}
          initialTableData={initialTableData}
          setFilteredData={setFilteredData}
          setFilterDate={setFilterDate}
          currentSelectedProgramid={currentSelectedProgramid}
          column={column}
          setinitialTableData={setinitialTableData}
          setMLData={setMLData}
        />
      )}
    </>
  );
};
