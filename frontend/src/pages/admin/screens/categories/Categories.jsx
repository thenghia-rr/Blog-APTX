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

const Categories = () => {
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
      onSuccess: (data) => {
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
        <h4 className="text-lg leading-tight">Add Category</h4>
        <div className="d-form-control w-full mt-6">
          <input
            value={categoryTitle}
            className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
            onChange={(e) => setCategoryTitle(e.target.value)}
            placeholder="Categories Title"
          />
          <button
            disabled={isLoadingCreateCategory}
            type="button"
            onClick={handleCreateCategory}
            className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="col-span-8">
        <DataTable
          pageTitle="Manage Categories"
          dataListName="Categories"
          searchInputPlaceholder="Categories title..."
          searchKeyWordOnSubmitHandler={submitSearchHandler}
          searchKeywordOnChangeHandler={searchKeyWordHandler}
          searchKeyword={searchKeyWord}
          tableHeaderTitleList={["Title", "Created At", "Actions"]}
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
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {category?.title}
                    </p>
                  </div>
                </div>
              </td>

              {/* CREATED AT COLUMN */}
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-no-wrap">
                  {new Date(category?.updatedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-4">
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
                  Detete
                </button>
                <Link
                  to={`/admin/categories/manage/edit/${category?._id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
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
