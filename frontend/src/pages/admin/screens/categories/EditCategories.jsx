import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  getSingleCategory,
  updateCategory,
} from "../../../../services/index/postCategories";
import { useTranslation } from "react-i18next";

const EditCategories = () => {
  const { t } = useTranslation();
  const [categoryTitle, setCategoryTitle] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const { slug } = useParams();

  // Use queryClient get get Single Category
  const { isError, isLoading } = useQuery({
    queryFn: () => getSingleCategory({ slug }),
    queryKey: ["categories", slug],
    onSuccess: (data) => {
      setCategoryTitle(data?.title);
    },
    refetchOnWindowFocus: false,
  });

  // useMutation for update Category
  const { mutate: mutateUpdateCategory, isLoading: isLoadingUpdateCategory } =
    useMutation({
      mutationFn: ({ token, title, slug }) => {
        return updateCategory({
          token,
          title,
          slug,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["categories", slug]);
        toast.success("Category updated successfully");
        navigate(`/admin/categories/manage`, {
          replace: true,
        });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  // Main Function handle update Category
  const handleUpdateCategory = () => {
    if (!categoryTitle) return;
    mutateUpdateCategory({
      token: userState.userInfo.token,
      title: categoryTitle,
      slug,
    });
  };

  return (
    <div className="col-span-4 py-12">
      <h4 className="text-lg leading-tight dark:text-dark-text">
        {t("editCategory")}
      </h4>
      <div className="d-form-control w-full mt-6">
        <input
          value={categoryTitle}
          className="dark:text-dark-text d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
          onChange={(e) => setCategoryTitle(e.target.value)}
          placeholder={t("categoryName")}
        />
        <button
          disabled={isLoadingUpdateCategory || isError || isLoading}
          type="button"
          onClick={handleUpdateCategory}
          className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {t("update")}
        </button>
      </div>
    </div>
  );
};

export default EditCategories;
