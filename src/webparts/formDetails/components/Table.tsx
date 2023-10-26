/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as React from "react";
import { useTable,useSortBy  } from "react-table";
import tableStyles from './styles/Table.module.scss';
// import commonStyles from './styles/Common.module.scss';

export interface ITablewithoutPagination{
    data:any,
    columns:any
}

const TableWithoutPagination = ({data, columns}: ITablewithoutPagination) =>{
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    }= useTable({columns, data},useSortBy)

    return(
      //console.log("data in table component is", data),
        // apply the table props
        <table className={`text-center mb-3 ${tableStyles.table} ${tableStyles.tableBorder}`} {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr className={tableStyles.tableBorder} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className={tableStyles.tableHeading}
                  // style={{
                  //   borderBottom: 'solid 3px red',
                  //   background: 'aliceblue',
                  //   color: 'black',
                  //   fontWeight: 'bold',
                  // }}
                >
                  {column.render('Header')}
                  {/* <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} >
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`${tableStyles.tableData} ${tableStyles.tableBorder}`}
                      // style={{
                      //   padding: '10px',
                      //   border: 'solid 1px gray',
                      //   background: 'papayawhip',
                      // }}
                      
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>

            )
          })}
        </tbody>
      </table>
    )
}

export default TableWithoutPagination;