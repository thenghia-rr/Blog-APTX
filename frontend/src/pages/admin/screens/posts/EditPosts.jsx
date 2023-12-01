import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSinglePost, updatePost } from "../../../../services/index/posts";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import parseJsonToHtml from "../../../../utils/parseJsonToHtml";
import { stables } from "../../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const EditPosts = () => {
  const { slug } = useParams();
  const userState = useSelector(state => state.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
  });

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
      toast.success("Post is updated successfully");
      queryClient.invalidateQueries(["blog", slug]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setInitialPhoto(data?.photo);
      setBody(parseJsonToHtml(data?.body));
    }
  }, [data, isError, isLoading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const hanleUpdatePost = async () => {
    let updatedData = new FormData();

    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        let res = await fetch(url);
        let blob = await res.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(
        stables.UPLOAD_FOLDER_BASE_URL + data?.photo
      );

      updatedData.append("postPicture", picture);
    }
    updatedData.append("document", JSON.stringify({}));

    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      setInitialPhoto(null);
      setPhoto(null);
      toast.success('Image deleted successfully')
    }
  };
  return (
    <div>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch this post data from database" />
      ) : (
        <section className="container mx-auto max-w-6xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
          <button
              onClick={() => navigate('/admin/posts/manage')}
              className="w-fit bg-primary text-sm text-white rounded-lg px-3 py-1 mb-3 font-semibold"
            >
              Back
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
                  src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
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
              Detete image
            </button>
            <div className="mt-4 flex gap-2">
              {data?.categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/blog?category=${category.name}`}
                  className="text-primary text-sm font-roboto inline-block md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="text-xl font-semibold font-roboto mt-4 text-light-hard md:text-[26px]">
              {data?.title}
            </h1>
            <div className="mt-4 text-light-soft prose prose-sm sm:prose-base ">
              {body}
            </div>
            <button
              disabled={isLoadingUpdatePostDetail}
              onClick={hanleUpdatePost}
              type="button"
              className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Update Post
            </button>
          </article>
        </section>
      )}
    </div>
  );
};

export default EditPosts;
