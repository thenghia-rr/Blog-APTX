import MainLayout from "../../components/MainLayout";
import BtnScrollToTop from "../../components/BtnScrollToTop";
import ContactPage from "./ContactPage";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <div className="2xl:container 2xl:mx-auto lg:py-12 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-6/12 flex flex-col justify-start lg:mt-20 ">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 dark:text-primary">
              {t('aboutMe')}
            </h1>
            <div className="w-[25px] h-1 bg-black rounded-2xl mb-10 dark:bg-primary"></div>
            <p className="font-medium text-2xl leading-9 text-gray-600 dark:text-dark-soft">
              {t('myName')}{" "}
              <span className="font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Đặng Thế Nghĩa
              </span>
              <br />{t('iAm')}{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Backend Developer{" "}
              </span>
              {t('myDesc')}
            </p>
            <a
              href="#contact-section"
              className="mt-10 text-center w-full lg:w-fit sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out dark:shadow-[-10px_-10px_30px_4px_rgba(255,255,255,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
            >
              {t('contactWithMe')}
            </a>
          </div>
          <div className="w-full rounded-full lg:w-5/12 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] dark:shadow-[-10px_-10px_30px_4px_rgba(255,255,255,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
            <img
              className="max-w-full max-h-full "
              src="/images/thenghia1_circle.png"
              alt="Thế Nghĩa"
            />
          </div>
        </div>

        <div className="mt-14">
          <ContactPage />
        </div>

        {/* <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 dark:text-dark-text">
              Our Story
            </h1>
            <p className="font-normal text-base leading-6 text-gray-600 dark:text-dark-soft">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum.In the first place we have granted to
              God, and by this our present charter confirmed for us and our
              heirs forever that the English Church shall be free, and shall
              have her rights entire, and her liberties inviolate; and we will
              that it be thus observed; which is apparent from
            </p>
          </div>
          <div className="w-full lg:w-8/12 lg:pt-8">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden"
                  src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png"
                  alt="Alexa featured Img"
                />
                <img
                  className="md:hidden block"
                  src="https://i.ibb.co/zHjXqg4/Rectangle-118.png"
                  alt="Alexa featured Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4 dark:text-dark-text">
                  Alexa
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden"
                  src="https://i.ibb.co/fGmxhVy/Rectangle-119.png"
                  alt="Olivia featured Img"
                />
                <img
                  className="md:hidden block"
                  src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png"
                  alt="Olivia featured Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4 dark:text-dark-text">
                  Olivia
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden"
                  src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png"
                  alt="Liam featued Img"
                />
                <img
                  className="md:hidden block"
                  src="https://i.ibb.co/C5MMBcs/Rectangle-120.png"
                  alt="Liam featued Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4 dark:text-dark-text">
                  Liam
                </p>
              </div>
              <div className="p-4 pb-6 flex justify-center flex-col items-center">
                <img
                  className="md:block hidden"
                  src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png"
                  alt="Elijah featured img"
                />
                <img
                  className="md:hidden block"
                  src="https://i.ibb.co/ThZBWxH/Rectangle-121.png"
                  alt="Elijah featured img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4 dark:text-dark-text">
                  Elijah
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <BtnScrollToTop />
    </MainLayout>
  );
};

export default AboutPage;
