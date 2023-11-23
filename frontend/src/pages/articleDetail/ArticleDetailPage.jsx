import { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { useQuery } from "@tanstack/react-query";
import { images, stables } from "../../constants";
import { Link, useParams } from "react-router-dom";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentContainer from "../../components/comments/CommentContainer";
import BtnSocialShare from "../../components/BtnSocialShare";
import { getSinglePost } from "../../services/index/posts";
// Body content
import parse from "html-react-parser";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Italic from "@tiptap/extension-italic";
import Text from "@tiptap/extension-text";
import { generateHTML } from "@tiptap/html";
import ArticleDetailSkeleton from "../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { useSelector } from "react-redux";

const postsData = [
  {
    _id: "1",
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "2",
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "3",
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "4",
    image: images.Post1Image,
    title: "Help children get better education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
];

const tags = [
  "Medical",
  "Lifestyle",
  "Learn",
  "Healthy",
  "Food",
  "Technology",
  "Education",
];
const ArticleDetailPage = () => {
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { data, isError, isLoading } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
  });

  // onSuccess in useQuery not working, instead of using useEffect
  useEffect(() => {
    setBreadCrumbsData([
      { name: "Home", link: "/" },
      { name: "Blog", link: "/blog" },
      { name: "Article title", link: `/blog/1` },
    ]);
    try {
      setBody(
        parse(
          generateHTML(data?.body, [Bold, Italic, Text, Paragraph, Document])
        )
      );
    } catch (error) {
      // console.log("Error converting JSON to Node");
    }
  }, [data?.body]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch this post data from database" />
      ) : (
        <section className="container mx-auto max-w-6xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <BreadCrumbs data={breadCrumbsData} />
            <img
              src={
                data?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + data.photo
                  : images.sampleImage
              }
              alt={data?.title}
              className="rounded-xl w-full"
            />
            {data?.categories.map((category) => (
              <Link
                key={category.name}
                to={`/blog?category=${category.name}`}
                className="text-primary text-sm font-roboto inline-block mt-4 md:text-base uppercase"
              >
                {category.name}
              </Link>
            ))}

            <h1 className="text-xl font-semibold font-roboto mt-4 text-light-hard md:text-[26px]">
              {data?.caption}
            </h1>
            <div className="mt-4 text-light-soft prose prose-sm sm:prose-base ">
              {body}
            </div>
            <CommentContainer
              comments={data?.comments}
              className="mt-10
          "
              logginedUserId={userState?.userInfo?._id}
              postSlug={slug}
            />
          </article>

          <div>
            <SuggestedPosts
              className="mt-8 lg:mt-0 lg:max-w-xs"
              header="Latest Article"
              posts={postsData}
              tags={tags}
            />
            <div className="mt-7">
              <h2 className="w-fit font-roboto font-medium text-light-hard mb-4 md:text-xl ">
                Share on:
              </h2>
              <BtnSocialShare
                url={encodeURI(
                  "https://www.pinterest.com/search/pins/?q=B%E1%BA%A1ch%20l%E1%BB%99c&rs=rs&eq=&etslf=5966"
                )}
                title={encodeURIComponent("Nữ diễn viên Bạch Lộc xinh đẹp")}
              />
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default ArticleDetailPage;
