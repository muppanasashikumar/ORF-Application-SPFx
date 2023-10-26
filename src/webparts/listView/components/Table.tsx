/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as React from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
import tableStyles from './styles/Table.module.scss';
import commonStyles from './styles/Common.module.scss';
import { Filter, DefaultColumnFilter } from "./filters";
// import { subDays } from "date-fns";

export interface ITablewithoutPagination {
  data: any,
  columns: any,
  siteUrl: string;
  setMLData: any;
  currentSelectedProgramid: number;
  MLData: any;
  setinitialTableData: any;
  allData: any;
  isVisible: any;
  setIsVisible: any;
  currentuserrole: string;
}

const TableWithoutPagination = ({ data, columns, siteUrl, currentSelectedProgramid, setMLData, MLData, setinitialTableData, allData, isVisible, setIsVisible, currentuserrole }: ITablewithoutPagination) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,

    setGlobalFilter,
  } = useTable({ columns, data, defaultColumn: { Filter: DefaultColumnFilter } }, useGlobalFilter, useFilters, useSortBy)

  const { globalFilter } = state;

  const clearFilter = () => {
    // let ranges: any = {
    //   selection: {
    //     endDate: '',
    //     key: "selection",
    //     startDate: ''
    //   }
    // }
    MLData[currentSelectedProgramid].statusFilter = [];
    MLData[currentSelectedProgramid].startDateFilter = '';
    MLData[currentSelectedProgramid].endDateFilter = '';
    setMLData(MLData);
    setinitialTableData(allData.sort((a: any, b: any) => {
      return gettime(b.filterdate) - gettime(a.filterdate);
    }));
  }

  const gettime = (date: string) => {
    return date != '' ? new Date(date).getTime() : 0;
  }

  return (
    <>
      {/* {console.log("data in table component is", data)} */}
      <div className="d-flex justify-content-between">
        {currentuserrole != "Guest" &&
          <div className={`${commonStyles.searchContainer} mb-3`}>
            <div className={`input-group ${commonStyles.searchGroup}`}>
              <input
                className={`form-control ${commonStyles.search}`}
                placeholder="Search"
                type="text"
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
              <span className={`input-group-text ${commonStyles.searchButtonContainer}`}>
                <button className={`btn p-0 ${commonStyles.searchButton}`}>
                  <img src={require("../assets/search.svg")} alt="" />
                </button>
              </span>
            </div>
          </div>}
        {currentuserrole != "Guest" && (MLData[currentSelectedProgramid].statusFilter.length > 0 ||
          MLData[currentSelectedProgramid].startDateFilter !== '' ||
          MLData[currentSelectedProgramid].endDateFilter !== '') &&
          <button onClick={clearFilter}
            className={`d-flex align-items-center gap-2 ${commonStyles.clearFilters}`}>
            <img className={commonStyles.icons} src={require("../assets/clearFilter.svg")} alt="" />Clear Filters
          </button>}
      </div>
      {/* // apply the table props */}
      <div className="table-responsive">
        <table className={`text-center mb-3 ${tableStyles.table} ${tableStyles.tableBorder}`} {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr className={tableStyles.tableBorder} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className={tableStyles.tableHeading}
                  >
                    {column.render('Header')}
                    {/* <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span> */}
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {
            data.length > 0 ? (
              <tbody {...getTableBodyProps()}>
                {rows.length > 0 ?
                  rows.map(row => {
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <td
                              className={`${tableStyles.tableData} ${tableStyles.tableBorder}`}
                              {...cell.getCellProps()}
                            >
                              <span className={tableStyles.truncate}>{cell.render('Cell')}</span>
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })
                  :
                  <tr>
                    <td colSpan={5} className="py-3">
                    There is no application found for the fellowship program.
                    </td>
                  </tr>
                }
              </tbody>
            ) : (<tbody  {...getTableBodyProps()}>
              <tr>
                <td colSpan={5} className="py-3">
                There is no application found for the fellowship program.
                </td>
              </tr>
            </tbody>)
          }
        </table>
      </div>

    </>
  )

}

export default TableWithoutPagination;