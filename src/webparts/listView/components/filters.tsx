/*eslint-disable @typescript-eslint/no-explicit-any  */
/*eslint-disable @typescript-eslint/explicit-function-return-type  */ 
import * as React from "react";
import commonStyles from './styles/Common.module.scss';
import moment from "moment";

export const Filter = ({ column }: any) => {
    return (
        <div style={{ marginTop: 5 }}>
            {column.canFilter && column.render("Filter")}
        </div>
    );
};

export const DefaultColumnFilter = ({ column }: any) => {
    const { filterValue, setFilter, preFilteredRows: { length } } = column;
    return (
        <input
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`buscar (${length}) ...`}
        ></input>
    );
};



export function dateBetweenFilterFn(rows: any, id: any, filterValues: any) {
    const sd = filterValues.selection.startDate ? filterValues.selection.startDate : undefined;
    const ed = filterValues.selection.endDate ? filterValues.selection.endDate : undefined;
    if (ed || sd) {
        const newRows =  rows.filter((r: any) => {
            // format data
            var dateAndHour = r["AppliedDate"].split(" ");
            var [day, month, year] = dateAndHour[0].split("-");
            var date = [day, month, year].join("/");
            //var hour = dateAndHour[1];
            // var formattedData = date + " " + hour;

            const cellDate = moment(date).format('DD-MMM-YYYY');

            if (ed && sd) {
                return cellDate >= sd && cellDate <= ed;
            } else if (sd) {
                return cellDate >= sd;
            } else {
                return cellDate <= ed!;
            }
        });
        return newRows;
    } else {
        return rows;
    }
}

export function DateRangeColumnFilter({column,MLData,currentSelectedProgramid}:any) {
    const { filterValue = [], preFilteredRows, setFilter, id } = column;
    const [minimum, maximum] = React.useMemo(() => {
        let min = preFilteredRows.length
            ? new Date(preFilteredRows[0].values[id])
            : new Date(0);
        let max = preFilteredRows.length
            ? new Date(preFilteredRows[0].values[id])
            : new Date(0);

        preFilteredRows.forEach((row: any) => {
            const rowDate = new Date(row.values[id]);

            min = rowDate <= min ? rowDate : min;
            max = rowDate >= max ? rowDate : max;
        });
        //console.log(minimum, maximum);
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <div className='d-flex flex-column gap-2 justify-content-center align-items-center'>
            <div className='d-flex gap-2 align-items-center'>
            <label htmlFor="fromDate" className={commonStyles.dateRangeLabel}>Start Date</label>
            <input
                //min={min.toISOString().slice(0, 10)}
                onChange={(e) => {
                    const val = e.target.value;
                    let _mldata: any = [...MLData];
                    _mldata[currentSelectedProgramid].startDateFilter = val;
                   // console.log('ML data Start Date range',_mldata);
                    setFilter((old = []) => [val ? val : undefined, old[1]]);
                }}
                id="fromDate"
                type="date"
                value={filterValue[0] || ""}
            />
            </div>
            <div className='d-flex gap-2 align-items-center'>
            <label htmlFor="endDate" className={commonStyles.dateRangeLabel}>End Date</label>
            <input
                //max={max.toISOString().slice(0, 10)}
                onChange={(e) => {
                    const val = e.target.value;
                    let _mldata: any = [...MLData];
                    _mldata[currentSelectedProgramid].endDateFilter = val;
                    //console.log('ML data End Date range',_mldata);
                    setFilter((old = []) => [
                        old[0],
                        val ? val : undefined
                    ]);
                }}
                id="endDate"
                type="date"
                value={filterValue[1] || ""}
            />
            </div>
        </div>
    );
}
