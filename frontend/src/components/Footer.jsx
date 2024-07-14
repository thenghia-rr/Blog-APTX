import {
  AiFillHeart,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { images } from "../constants";
import { FaFacebook } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const {t} = useTranslation()
  return (
    <section className="bg-light-hard">
      <footer className="container mx-auto grid grid-cols-10 px-5 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10 2xl:max-w-[1400px]">
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-light-light font-bold md:text-lg">{t("products")}</h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">Landing Page</a>
            </li>
            <li>
              <a href="/">{t("features")}</a>
            </li>
            <li>
              <a href="/">{t("documentation")}</a>
            </li>
            <li>
              <a href="/">{t("referralProgram")}</a>
            </li>
            <li>
              <a href="/">{t("pricing")}</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-light-light font-bold md:text-lg">{t('services')}</h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">{t("documentation")}</a>
            </li>
            <li>
              <a href="/">{t("design")}</a>
            </li>
            <li>
              <a href="/">{t("themes")}</a>
            </li>
            <li>
              <a href="/">{t("illustrations")}</a>
            </li>
            <li>
              <a href="/">UI Kit</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-light-light font-bold md:text-lg">{t('company')}</h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">{t("about")}</a>
            </li>
            <li>
              <a href="/">{t("about")}</a>
            </li>
            <li>
              <a href="/">{t("privacyPolicy")}</a>
            </li>
            <li>
              <a href="/">{t("careers")}</a>
            </li>
          </ul>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="text-light-light font-bold md:text-lg">{t("more")}</h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/">{t("documentation")}</a>
            </li>
            <li>
              <a href="/">{t("license")}</a>
            </li>
            <li>
              <a href="/">Changelog</a>
            </li>
          </ul>
        </div>

        <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2">
          <img
            src={images.LogoAPTX}
            alt="logo"
            className=" mx-auto md:mx-0 h-[24px] md:h-[30px] 2xl:h-[34px] brightness-200 contrast-200"
          />
          <p className="text-sm text-light-light text-center mt-4 md:text-left md:text-base lg:text-sm">
          {t("footerDesc")}
          </p>
          <ul className="flex justify-center items-center mt-5 space-x-4 text-gray-300 md:justify-start">
            <li>
              <a href="/">
                <FaFacebook className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillYoutube className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiFillInstagram className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <AiOutlineTwitter className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="/">
                <BsTelegram className="w-6 h-auto" />
              </a>
            </li>
          </ul>
        </div>

        <div className="hidden lg:block md:flex flex-col justify-center items-center space-y-4 md:col-span-12 lg:col-span-10 mx-auto">
          <div className="bg-primary w-fit text-white p-3 rounded-full mx-auto">
            <AiFillHeart className="w-7 h-auto" />
          </div>
          <p className="font-bold italic text-light-light">
          {t("footerCopyright")}
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
