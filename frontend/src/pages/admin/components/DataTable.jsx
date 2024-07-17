import { useTranslation } from "react-i18next";
import Pagination from "../../../components/Pagination";

const DataTable = ({
  pageTitle,
  dataListName,
  searchInputPlaceholder,
  searchKeyWordOnSubmitHandler,
  searchKeywordOnChangeHandler,
  searchKeyword,
  tableHeaderTitleList,
  isLoading,
  isFetching,
  data,
  children,
  setCurrentPage,
  currentPage,
  headers,
  totalDataCount,
}) => {
  const { t } = useTranslation();
  // console.log(searchKeyword)
  return (
    <div>
      <h1 className="text-2xl font-semibold uppercase text-light-soft text-center dark:text-primary">
        {pageTitle}
      </h1>
      <div className="w-full px-4 mx-auto ">
        <div className="pt-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-xl leading-tight dark:text-dark-text">
              {dataListName} ({totalDataCount})
            </h2>
            <div className="text-end">
              <form
                onClick={searchKeyWordOnSubmitHandler}
                className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
              >
                <div className="relative ">
                  <input
                    type="text"
                    id="form-subscribe-Filter"
                    className="dark:placeholder:text-[#333] dark:bg-slate-200 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder={searchInputPlaceholder}
                    onClick={(e) => e.stopPropagation()}
                    onChange={searchKeywordOnChangeHandler}
                    value={searchKeyword}
                  />
                </div>
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  {t("filter")}
                </button>
              </form>
            </div>
          </div>
          <div className="px-4 pt-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal  ">
                <thead>
                  <tr>
                    {tableHeaderTitleList.map((title, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="dark:bg-dark-backgr dark:text-dark-text px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="dark:text-dark-text text-center py-10 w-full"
                      >
                        {t('loading')}
                      </td>
                    </tr>
                  ) : data?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="dark:text-dark-text text-center py-10 w-full"
                      >
                        No records found
                      </td>
                    </tr>
                  ) : (
                    children // MAIN CONTENT
                  )}
                </tbody>
              </table>
              {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={JSON.parse(headers?.["x-totalpagecount"])}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
