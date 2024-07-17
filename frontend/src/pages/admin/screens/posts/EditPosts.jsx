import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  deletePostImage,
  getSinglePost,
  updatePost,
} from "../../../../services/index/posts";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import { HiOutlineCamera } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Editor from "../../../../components/editor/Editor";
import MultiSelectTagDropdown from "../../components/selectDropdown/MultiSelectTagDropdown";
import {
  categoryToOption,
  filterCategories,
} from "../../../../utils/multiSelectTagUtils";
import { getAllCategoriesNoFilter } from "../../../../services/index/postCategories";
import CreatableSelect from "react-select/creatable";
import unidecode from "unidecode";
import BtnScrollToTop from "../../../../components/BtnScrollToTop";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import MainLayout from "../../../../components/MainLayout";

const promiseOptions = async (inputValue) => {
  const { data: categoriesData } = await getAllCategoriesNoFilter();
  return filterCategories(inputValue, categoriesData);
};

const EditPosts = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [categories, setCategories] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(null);
  const [postSlug, setPostSlug] = useState(slug);
  const [caption, setCaption] = useState("");

  // Get single post
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setInitialPhoto(data?.photo);
      setCategories(data.categories?.map((item) => item._id));
      setTitle(data?.title);
      setCaption(data?.caption);
      setTags(data?.tags);
    },
    refetchOnWindowFocus: false,
  });

  // Update detail post
  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updatePost({
        updatedData,
        slug,
        token,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("Post is updated successfully");
      navigate(-1)
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // Mutate Delete post image
  const { mutate: mutateDeleteImage, isLoading: isLoadingDeleteImage } =
    useMutation({
      mutationFn: ({ slug, token }) => {
        return deletePostImage({ slug, token });
      },
      onSuccess: () => {
        setInitialPhoto(null);
        setPhoto(null);
        queryClient.invalidateQueries(["blog", slug]);
        toast.success("Image deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    // Thêm ảnh vào FormData nếu có thay đổi
    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      // Xử lý khi không thay đổi ảnh nhưng vẫn cần gửi thông tin về ảnh lên server
      const urlToObject = async (url) => {
        let res = await fetch(url);
        let blob = await res.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(data?.photo);

      updatedData.append("postPicture", picture);
    }

    // Thêm dữ liệu văn bản (JSON) vào FormData
    updatedData.append(
      "document",
      JSON.stringify({
        // Các trường thông tin cần cập nhật
        title,
        caption,
        slug: postSlug,
        body,
        tags,
        categories,
      })
    );

    // Gọi hàm mutateUpdatePostDetail để gửi dữ liệu lên server
    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState?.userInfo?.token,
    });

  };

  // Main func to delete post image
  const handleDeleteImage = () => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      // const formData = new FormData();
      // formData.append("postPicture", undefined);

      mutateDeleteImage({
        slug,
        token: userState?.userInfo?.token,
      });
    }
  };

  // Auto scroll to top when user click update post or delete img
  useEffect(() => {
    if (isLoadingUpdatePostDetail || isLoadingDeleteImage) {
      window.scrollTo(0, 0);
    }
  }, [isLoadingUpdatePostDetail, isLoadingDeleteImage]);

  // Set theme when component mounts
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      document.documentElement.classList.add(currentTheme);
    }
  }, []);

  let isPostDataUpdated = !isLoading && !isError;

  return (
    <MainLayout>
      <div className="w-full">
        {isLoading ? (
          <ArticleDetailSkeleton />
        ) : isError ? (
          <ErrorMessage message="Couldn't fetch this post data from database" />
        ) : (
          <section className="dark:bg-dark-header dark:text-dark-text container mx-auto max-w-6xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
            {(isLoadingUpdatePostDetail || isLoadingDeleteImage) && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-50 z-[9999] flex justify-start items-center flex-col mt-7">
                <LoadingSpinner />
              </div>
            )}
            <article className="flex-1 ">
              <button
                onClick={() => navigate(-1)}
                className="w-fit bg-primary text-sm text-white rounded-lg px-3 py-1 mb-3 font-semibold"
              >
                {t("back")}
              </button>
              <label htmlFor="postPicture" className="w-full cursor-pointer">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={data?.title}
                    className="w-full object-cover object-center rounded-xl max-h-[520px]"
                  />
                ) : initialPhoto ? (
                  <img
                    src={data?.photo}
                    alt={data?.title}
                    className="w-full object-cover object-center rounded-xl max-h-[550px]"
                  />
                ) : (
                  <div className="w-full min-h-[200px] bg-blue-400/50 rounded-lg flex justify-center items-center">
                    <HiOutlineCamera className="w-7 h-auto text-primary" />
                  </div>
                )}
              </label>
              <input
                type="file"
                className="sr-only"
                id="postPicture"
                onChange={handleFileChange}
              />
              <button
                onClick={handleDeleteImage}
                className="w-fit bg-red-500 text-sm text-white rounded-lg px-2 py-1 mt-5 font-semibold"
              >
                {t("deleteImg")}
              </button>
              {/* Show categories of post */}
              <div className="mt-4 flex items-center gap-2">
                <p className="font-bold text-primary mt-4">{`${t(
                  "categories"
                )}:`}</p>
                {data?.categories && data.categories.length > 0 ? (
                  data?.categories?.map((category) => (
                    <Link
                      key={category.name}
                      to={`/blog?category=${category.title}`}
                      className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold italic text-primary text-sm font-roboto inline-block mt-4 mr-2 md:text-base"
                    >
                      {category.title}
                    </Link>
                  ))
                ) : (
                  <span className="text-red-500 mt-4">{t("noCategory")}</span>
                )}
              </div>
              {/* Post title */}
              <div className="d-form-control w-full">
                <label htmlFor="title" className="d-label mt-4">
                  <span className="d-label-text text-base text-light-soft dark:text-dark-text">
                    {t("postTitle")}
                  </span>
                </label>
                <input
                  id="title"
                  value={title}
                  placeholder="title..."
                  type="text"
                  className="dark:text-dark-soft d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-semibold font-roboto  text-light-hard"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              {/* Post Caption  */}
              <div className="d-form-control w-full">
                <label htmlFor="caption" className="d-label mt-4">
                  <span className="d-label-text text-base text-light-soft dark:text-dark-text">
                    {t("postCaption")}
                  </span>
                </label>
                <input
                  id="caption"
                  value={caption}
                  placeholder="caption..."
                  type="text"
                  className="dark:text-dark-soft d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-semibold font-roboto  text-light-hard"
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              {/* Post Slug */}
              <div className="d-form-control w-full">
                <label htmlFor="slug" className="d-label mt-4">
                  <span className="d-label-text text-base text-light-soft dark:text-dark-text">
                    {t("postSlug")}
                  </span>
                </label>
                <input
                  id="slug"
                  value={postSlug}
                  placeholder="post slug..."
                  type="text"
                  className="dark:text-dark-soft d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-semibold font-roboto  text-light-hard"
                  onChange={(e) =>
                    setPostSlug(
                      unidecode(
                        e.target.value.replace(/\s+/g, "-").toLowerCase()
                      )
                    )
                  }
                />
              </div>

              {/* Post Categories */}
              <div className="mb-5 mt-2">
                <label className="d-label ">
                  <span className="d-label-text text-base text-light-soft dark:text-dark-text">
                    {t("categories")}
                  </span>
                </label>
                {isPostDataUpdated && (
                  <MultiSelectTagDropdown
                    defaultValue={data?.categories?.map(categoryToOption)}
                    loadOptions={promiseOptions}
                    onChange={(newValue) =>
                      setCategories(newValue.map((item) => item.value))
                    }
                  />
                )}
              </div>
              {/* Post Tags */}
              <div className="mb-5 mt-2">
                <label className="d-label ">
                  <span className="d-label-text text-base text-light-soft dark:text-dark-text">
                    {t("tags")}
                  </span>
                </label>
                {isPostDataUpdated && (
                  <CreatableSelect
                    defaultValue={data?.tags?.map((tag) => ({
                      value: tag,
                      label: tag,
                    }))}
                    isMulti
                    onChange={(newValue) =>
                      setTags(newValue.map((item) => item.value))
                    }
                    className="relative z-20"
                  />
                )}
              </div>

              <div className="editor-container mt-4 text-light-soft prose prose-sm sm:prose-base">
                {isPostDataUpdated && (
                  <Editor
                    content={data?.body}
                    editable={true}
                    onDataChange={(data) => setBody(data)}
                  />
                )}
              </div>
              <button
                disabled={isLoadingUpdatePostDetail}
                onClick={handleUpdatePost}
                type="button"
                className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {t("update")}
              </button>
            </article>
          </section>
        )}
        <BtnScrollToTop />
      </div>
    </MainLayout>
  );
};

export default EditPosts;
