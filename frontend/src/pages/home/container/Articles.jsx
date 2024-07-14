import ArticleCard from "../../../components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Articles = () => {
  const { t } = useTranslation();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts("", 1, 6),
    queryKey: ["posts"],
    onErorr: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <section className="flex flex-col container mx-auto px-5 py-10 2xl:max-w-[1400px]">
      <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {isLoading ? (
          [...Array(3)].map((item, index) => (
            <ArticleCardSkeleton
              key={index}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] 2xl:w-[calc(25%-22px)] "
            />
          ))
        ) : isError ? (
          <ErrorMessage message="Couldn't fetch the posts data from database" />
        ) : (
          data?.data.map((post) => (
            <ArticleCard
              key={post._id}
              post={post}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] "
            />
          ))
        )}
      </div>
      <Link
        to="/blog"
        onClick={() => window.scrollTo(0, 0)}
        className="flex items-center mx-auto gap-x-2 border-2 border-primary py-2 px-4 rounded-lg text-primary font-bold text-base transition-all duration-300 hover:bg-primary hover:text-white"
      >
        <span>{t("moreArticles")}</span>
        <FaArrowRight />
      </Link>
    </section>
  );
};

export default Articles;
