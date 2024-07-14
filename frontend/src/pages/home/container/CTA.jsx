import { useTranslation } from "react-i18next";
import { images } from "../../../constants";

const CTA = () => {
  const { t } = useTranslation();

  return (
    <>
      <svg
        className="w-full h-auto max-h-40 translate-y-[1px]"
        preserveAspectRatio="none"
        width="2160"
        height="263"
        viewBox="0 0 2160 263"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Wave"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
          fill="#0D2436"
        />
      </svg>

      <section className="relative bg-light-hard px-5">
        <div className="container grid grid-cols-12 mx-auto py-10 md:pb-20 lg:place-items-center 2xl:max-w-[1400px]">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="text-white font-roboto font-bold text-2xl md:text-4xl md:text-center md:leading-normal lg:text-left">
              {t("CTATitle")}
            </h2>
            <div className="w-full max-w-[494px] mt-12 space-y-3 md:space-y-0 md:flex md:items-center mx-auto md:space-x-2 lg:mx-0 ">
              <input
                type="email"
                className="px-4 py-3 rounded-lg w-full placeholder:text-light-light outline-none"
                placeholder={t("yourEmail")}
              />
              <button className="px-4 py-3 rounded-lg w-full bg-primary text-white font-bold md:w-fit md:whitespace-nowrap">
                {t("getStarted")}
              </button>
            </div>
            <p className="text-light-light text-sm leading-7 mt-6 md:text-center md:text-base lg:text-left">
              {t("CTADesc")}
            </p>
          </div>

          <div className="col-span-12 hidden mb-[70px] md:block md:order-first lg:col-span-6 lg:order-last">
            <div className="w-3/4 mx-auto relative">
              <div className="w-1/2 h-1/2 bg-[#FC5A5A] rounded-lg absolute top-[10%] -right-[8%]"></div>
              <div className="w-1/2 h-1/2 bg-white rounded-lg opacity-[.06] absolute -bottom-[10%] -left-[8%]"></div>
              <div className="w-full rounded-xl bg-white p-3 z-[1] relative">
                <img
                  src={images.CTAImage}
                  alt="Call to action"
                  className="w-full object-cover object-center h-auto md:h-52 lg:h48 xl:h-60"
                />
                <div className="p-5">
                  <h2 className="font-roboto font-bold text-xl text-light-soft md:text-2xl lg:text-[28px]">
                    {t("CTABoxTitle")}
                  </h2>
                  <p className="text-light-light mt-3 text-sm md:text-lg">
                    {t("CTABoxDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default CTA;
