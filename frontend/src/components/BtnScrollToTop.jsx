import { useEffect, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

const BtnScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    window.scrollY > 300 ? setVisible(true) : setVisible(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    //--------- Show dimensions of btnScrollTop by JS 
    // const btnScrollTop = document.querySelector(".btnScrollTop");
    // const dimension = btnScrollTop.getBoundingClientRect()
    // console.log(dimension)
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);


  return (
    <div className="fixed bottom-5 right-5">
      <button
        type="button"
        onClick={handleScrollToTop}
        className={`btnScrollTop p-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-700 transition-opacity ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <FaArrowAltCircleUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default BtnScrollToTop;
