import MainLayout from "../../components/MainLayout";
import BtnScrollToTop from "../../components/BtnScrollToTop";
import ContactPage from "./ContactPage";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useEffect } from "react";

const AboutPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <motion.div
        className="2xl:container 2xl:mx-auto lg:py-12 lg:px-20 md:py-12 md:px-6 py-9 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="flex flex-col md:flex-row justify-between gap-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full lg:w-6/12 flex flex-col justify-start lg:mt-20 ">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 dark:text-primary">
              {t("aboutMe")}
            </h1>
            <div className="w-[25px] h-1 bg-black rounded-2xl mb-10 dark:bg-primary"></div>
            <p className="font-medium text-2xl leading-9 text-gray-600 dark:text-dark-soft">
              {t("myName")}{" "}
              <span className="font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Đặng Thế Nghĩa
              </span>
              <br />
              {t("iAm")}{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Backend Developer{" "}
              </span>
              {t("myDesc")}
            </p>
            <a
              href="#contact-section"
              className="mt-10 text-center w-full lg:w-fit sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl hover:from-red-500 hover:to-yellow-400 transition-all duration-300 ease-in-out dark:shadow-[-10px_-10px_30px_4px_rgba(255,255,255,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]  "
            >
              {t("contactWithMe")}
            </a>
          </div>
          <div className="overflow-hidden w-full rounded-full lg:w-5/12 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] dark:shadow-[-10px_-10px_30px_4px_rgba(255,255,255,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
            <img
              className="max-w-full max-h-full hover:scale-105 transition-all duration-300 ease-in-out"
              src="/images/thenghia1_circle.png"
              alt="Thế Nghĩa"
            />
          </div>
        </motion.div>

        {/* IDOLS AND INSPIRATION */}
        <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 dark:text-dark-text">
              {t("myIdolAndInspiration")}
            </h1>
            <p className="font-normal text-base leading-6 text-gray-600 dark:text-dark-soft">
              {t("myIdolAndInspirationDesc")}
            </p>
          </div>
          <div className="w-full lg:w-8/12 lg:pt-8 ">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md dark:border-glow">
              {[
                {
                  src: "https://i.pinimg.com/564x/d3/66/b5/d366b54659af1ef9fa72606d14d16500.jpg",
                  alt: "CR7 Img",
                  name: "CR7",
                },
                {
                  src: "https://i.pinimg.com/736x/b1/6f/86/b16f8650307994a99b74d53e388219f5.jpg",
                  alt: "Lisa Img",
                  name: "Lisa",
                },
                {
                  src: "https://i.pinimg.com/564x/bf/43/d3/bf43d30de840015d5db21ddcbc4818ad.jpg",
                  alt: "Ishikawa img",
                  name: "Ishikawa",
                },
                {
                  src: "https://i.pinimg.com/564x/d5/6a/70/d56a700e7d92671fbc7998e6da9f0316.jpg",
                  alt: "Lu yu xiao Img",
                  name: "Lu Yu Xiao",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 pb-6 flex flex-col items-center justify-between h-full overflow-hidden"
                >
                  <img
                    className="md:block hidden h-[200px] rounded-md hover:scale-105 transition-all duration-300"
                    src={item.src}
                    alt={item.alt}
                  />
                  <img
                    className="md:hidden block h-[200px] rounded-md hover:scale-105 transition-all duration-300"
                    src={item.src}
                    alt={item.alt}
                  />
                  <p className="font-medium text-xl leading-5 text-gray-800 mt-4 dark:text-dark-text">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Contact session */}
        <div className="mt-14">
          <ContactPage />
        </div>
      </motion.div>
      <BtnScrollToTop />
    </MainLayout>
  );
};

export default AboutPage;
