import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchBlog = ({ className, onSearchKeyword }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchKeyword) {
      onSearchKeyword({ searchKeyword });
    }
    navigate(`/blog?page=1&search=${searchKeyword}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-y-2.5 relative ${className}`}
    >
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
        <input
          type="text"
          spellCheck
          className="placeholder:font-bold font-semibold text-light-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 md:py-4 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
          placeholder="Search acticle..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="md:absolute w-full md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2 text-white bg-primary rounded-lg py-3 px-5 font-bold hover:bg-light-hard transition-all duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBlog;
