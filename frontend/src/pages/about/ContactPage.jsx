import { useTranslation } from "react-i18next";
import { FaFacebookF, FaInstagram, FaTiktok, FaGithub } from "react-icons/fa";
import { toast } from "react-hot-toast";

const ContactPage = () => {
  const { t } = useTranslation();

  const handleContact = (e) => {
    e.preventDefault();
    toast.success(t("sendSuccess"));
    setTimeout(() => {
      alert(t("contactRespone"));
    }, 2000);
  };

  return (
    <div
      id="contact-section"
      className="rounded-xl relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-8 dark:shadow-[-10px_-10px_30px_4px_rgba(255,255,255,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
      style={{ backgroundImage: `url('/images/openai_png.png')` }}
    >
      <div className="rounded-xl absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 flex flex-col items-center md:w-[650px] lg:w-[700px]">
        <h1 className="text-4xl font-bold mb-8 pt-2 text-primary">
          {t("contactWithMe")}
        </h1>
        <div className="bg-white p-10 rounded-lg shadow-lg w-full dark:bg-dark-backgr">
          <form className="flex flex-col gap-6" onSubmit={handleContact}>
            <input
              type="text"
              placeholder={t("yourName")}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-200 dark:text-light-hard"
            />
            <input
              type="email"
              placeholder={t("yourEmail")}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-200 dark:text-light-hard"
            />
            <textarea
              placeholder={t("yourMessage")}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-slate-200 dark:text-light-hard"
              rows="6"
            ></textarea>
            <button
              type="submit"
              className="font-bold p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {t("send")}
            </button>
          </form>
        </div>
        <div className="flex gap-6 mt-8">
          <a
            href="https://facebook.com/thenghia.rr"
            className="flex items-center justify-center rounded-full w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 text-white text-3xl hover:scale-110 transform transition-transform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com/thenghia_rr"
            className="flex items-center justify-center rounded-full w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-700 text-white text-3xl hover:scale-110 transform transition-transform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://tiktok.com/@thenghia_rr"
            className="flex items-center justify-center rounded-full w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 text-white text-3xl hover:scale-110 transform transition-transform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok />
          </a>
          <a
            href="https://github.com/thenghia-rr"
            className="flex items-center justify-center rounded-full w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-800 text-white text-3xl hover:scale-110 transform transition-transform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
