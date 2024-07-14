import { Link } from "react-router-dom";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../../../../services/index/postCategories";
import DataTable from "../../components/DataTable";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const { t } = useTranslation();
  const [categoryTitle, setCategoryTitle] = useState("");
  // Mutate: Create a new category
  const { mutate: mutateCreateCategory, isLoading: isLoadingCreateCategory } =
    useMutation({
      mutationFn: ({ token, title }) => {
        return createCategory({
          token,
          title,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
        toast.success("Category is created");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  // Custom hook: useDataTable
  const {
    userState,
    currentPage,
    searchKeyWord,
    data: categoriesData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeyWordHandler,
    submitSearchHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllCategories(searchKeyWord, currentPage),
    dataQueryKey: "categories",
    deleteDataMessage: "Category is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteCategory({
        slug,
        token,
      });
    },
  });

  // Handle Submit add new category
  const handleCreateCategory = () => {
    mutateCreateCategory({
      token: userState?.userInfo?.token,
      title: categoryTitle,
    });
  };

  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-4 py-12">
        <h4 className="text-lg leading-tight dark:text-dark-text">
          {t("addCategory")}
        </h4>
        <div className="d-form-control w-full mt-6">
          <input
            value={categoryTitle}
            className="dark:text-dark-text d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
            onChange={(e) => setCategoryTitle(e.target.value)}
            placeholder={t("categoryName")}
          />
          <button
            disabled={isLoadingCreateCategory}
            type="button"
            onClick={handleCreateCategory}
            className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {t("add")}
          </button>
        </div>
      </div>
      <div className="col-span-8">
        <DataTable
          pageTitle={t("manageCategories")}
          dataListName={t("categories")}
          searchInputPlaceholder={t("categoryName")}
          searchKeyWordOnSubmitHandler={submitSearchHandler}
          searchKeywordOnChangeHandler={searchKeyWordHandler}
          searchKeyword={searchKeyWord}
          tableHeaderTitleList={[
            `${t("title")}`,
            `${t("createdAt")}`,
            `${t("actions")}`,
          ]}
          isLoading={isLoading}
          isFetching={isFetching}
          data={categoriesData?.data}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          headers={categoriesData?.headers}
          userState={userState}
          totalDataCount={categoriesData?.totalCategoriesCount}
        >
          {categoriesData?.data?.map((category) => (
            <tr key={category._id}>
              {/* TITLE COLUMN */}
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-dark-backgr ">
                <div className="flex items-center ">
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap dark:text-dark-text">
                      {category?.title}
                    </p>
                  </div>
                </div>
              </td>

              {/* CREATED AT COLUMN */}
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 dark:bg-dark-backgr">
                <p className="text-gray-900 whitespace-no-wrap dark:text-dark-text">
                  {new Date(category?.updatedAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-4 dark:bg-dark-backgr">
                <button
                  disabled={isLoadingDeleteData}
                  type="button"
                  className="text-red-500 hover:text-rose-900 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={() => {
                    deleteDataHandler({
                      slug: category?._id,
                      token: userState.userInfo.token,
                    });
                  }}
                >
                  {t("delete")}
                </button>
                <Link
                  to={`/admin/categories/manage/edit/${category?._id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  {t("edit")}
                </Link>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default Categories;
