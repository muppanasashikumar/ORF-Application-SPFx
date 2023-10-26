/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import TableWithoutPagination from "./Table";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import paginationStyles from './styles/Pagination.module.scss';
import commonStyles from './styles/Common.module.scss';


export interface ITableWithPagination {
  data: any,
  columns: any,
  siteUrl: string;
  pageSize: number;
  currentSelectedProgramid: number;
  setMLData: any;
  MLData:any;
  setinitialTableData: any;
  allData: any;
  isVisible:any;
  setIsVisible: any;
  currentuserrole:string
}

const TableWithPagination = ({ data, columns, pageSize, siteUrl, currentSelectedProgramid, setMLData,MLData,setinitialTableData,allData,isVisible,setIsVisible,currentuserrole }: ITableWithPagination) => {
  const [currentpage, setCurrentpage] = React.useState(0);
  //const [updatedData,setupdatedData] = React.useState(data);
  const [pageLength,setPageLength] = React.useState(pageSize);
  const indexoflastItem = (currentpage + 1) * pageLength;
  const indexoffirstItem = currentpage * pageLength;
  const currentData = data.slice(indexoffirstItem, indexoflastItem);
  const totalPages = Math.ceil(data.length / pageLength);
 // const pageCount = currentData.length;
  //console.log(currentData);
  // for (let i = 1; i <= totalPages; i++) {
  //   pageCount[i] = i;
  // }

  // React.useEffect(()=>{
  //   console.log("data new");
  //   setupdatedData(data)
  // },[data])

  React.useEffect(() => {
    if(pageLength === 20 || pageLength === 50) {
      setCurrentpage(0);
    }
  },[pageLength])

  const handlePageClick = (e: any, index: number) => {
    e.preventDefault();
    setCurrentpage(index);
  };
  const handlePreviousClick = () => {
    setCurrentpage(currentpage - 1);
  }
  // const handleFirstClick = () => {
  //   setCurrentpage(1);
  // }
  const handleNextClick = () => {
    setCurrentpage(currentpage + 1)
  }
  // const handleLastClick = () => {
  //   setCurrentpage(totalPages)
  // }
  return (
    <>

      <TableWithoutPagination
        data={currentData}
        columns={columns}
        //_onRowClick={_onRowClick}
        siteUrl={siteUrl}
        currentSelectedProgramid={currentSelectedProgramid}
        setMLData={setMLData}
        MLData={MLData}
        setinitialTableData={setinitialTableData}
        allData={allData}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        currentuserrole={currentuserrole}
      />

      {data.length > 0 && <div className={`d-flex justify-content-between ${paginationStyles.footerContainer}`}>
        <select
        className={commonStyles.numberOfRowsSelector}
          value={pageLength}
          onChange={(e) => setPageLength(Number(e.target.value))}
        >
          {[10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize !== 9 ? `Show ${pageSize}` : `Show all`}
            </option>
          ))}
        </select>
        {/* <select className={commonStyles.numberOfRowsSelector} name="" id="">
          <option value="">Show 5</option>
          <option value="">Show 10</option>
          <option value="">Show 15</option>
        </select> */}
        <Pagination className={paginationStyles.paginationContainer} aria-label="Page navigation example" style={{ paddingLeft: "20px" }}>
          {/* <PaginationItem className={paginationStyles.paginationLinkContainer} >
            <PaginationLink className={paginationStyles.link} onClick={handleFirstClick} first href="#" />
          </PaginationItem> */}
          <PaginationItem className={paginationStyles.paginationLinkContainer} disabled={currentpage <= 0}>
            <PaginationLink className={paginationStyles.link} onClick={handlePreviousClick} previous href="#" />
          </PaginationItem>
          {[...Array(totalPages)].map(
            (page: number, i: number) =>
            (
              <PaginationItem className={paginationStyles.paginationLinkContainer} active={i === currentpage} key={i}>
                <PaginationLink
                  className={paginationStyles.link}
                  onClick={(e: any) => handlePageClick(e, i)}
                  href="#"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )

          )}
          <PaginationItem className={paginationStyles.paginationLinkContainer} disabled={currentpage === (totalPages - 1)}>
            <PaginationLink className={paginationStyles.link} onClick={handleNextClick}  next href="#" />
          </PaginationItem>
          {/* <PaginationItem className={paginationStyles.paginationLinkContainer}>
            <PaginationLink className={paginationStyles.link} onClick={handleLastClick} last href="#" />
          </PaginationItem> */}
        </Pagination>
      </div>}

      {/* <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize !== 15 ? `Show ${pageSize}` : `Show all`}
            </option>
          ))}
        </select> */}
    </>
  );
}
export default TableWithPagination;