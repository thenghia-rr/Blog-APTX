import { useTranslation } from "react-i18next";
import { locales } from "../i18n/i18n";
import { MdKeyboardArrowDown } from "react-icons/md";

const ToggleLanguage = ({ toggleDropdownHandler, item, dropdown }) => {
  const { i18n } = useTranslation();
  const currentLanguage = locales[i18n.language];

  // Handle when change language
  const toggleLanguageHandler = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <button
          className="px-3 py-2 flex items-center gap-x-1 hover:text-blue-500 transition-all duration-300"
          onClick={toggleDropdownHandler}
        >
          <span>{currentLanguage}</span>
          {item.toggleIcons && <MdKeyboardArrowDown />}
        </button>
        <div
          className={`${
            dropdown ? "block" : "hidden"
          } lg:hidden transition-all duration-500 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max lg:bg-white lg:rounded-lg`}
        >
          <ul className="flex flex-col shadow-lg rounded-lg overflow-hidden">
            {item.items.map((langItem) => (
              <button
                key={langItem.lang}
                onClick={() => toggleLanguageHandler(langItem.lang)}
                type="button"
                className="hover:text-blue-500 hover:bg-light-hard hover:lg:text-white text-white lg:text-light-soft px-4 py-2  transition-all duration-300"
              >
                {langItem.title}
              </button>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ToggleLanguage;
