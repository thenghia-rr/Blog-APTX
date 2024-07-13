import { useEffect, useState } from 'react';

const ToggleTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      document.documentElement.setAttribute("class", currentTheme);
      setTheme(currentTheme);
    }

    const switchTheme = () => {
      if (theme === "light") {
        document.documentElement.setAttribute("class", "dark");
        localStorage.setItem("theme", "dark");
        setTheme("dark");
      } else {
        document.documentElement.setAttribute("class", "light");
        localStorage.setItem("theme", "light");
        setTheme("light");
      }
    };

    const toggleSwitch = document.querySelector('.toggle-switch');
    toggleSwitch.addEventListener("click", switchTheme);

    // Cleanup event listener on component unmount
    return () => {
      toggleSwitch.removeEventListener("click", switchTheme);
    };
  }, [theme]);

  return (
    <>
      <div className="toggle-switch cursor-pointer flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full lg:mt-0 mt-4">
        {theme === "light" ? (
          <svg
            className="sun-icon w-6 h-6 text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8-9h1m-16 0H3m15.364 6.364l-.707.707m-11.314 0l-.707-.707m0-11.314l-.707-.707m11.314 0l.707-.707M12 5a7 7 0 000 14a7 7 0 000-14z" />
          </svg>
        ) : (
          <svg
            className="moon-icon w-6 h-6 text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 001.35 13.9A7.002 7.002 0 0021 12.79z" />
          </svg>
        )}
      </div>
    </>
  );
};

export default ToggleTheme;
