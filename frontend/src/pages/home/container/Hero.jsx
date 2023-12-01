import { images } from "../../../constants";
import { FiSearch } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row 2xl:max-w-[1400px]">
      <div className="mt-10 lg:h-1/2">
        <h1 className="font-roboto text-3xl text-center font-bold text-light-soft md:text-5xl lg:text-4xl lg:text-left lg:max-w-[540px] xl:text-5xl xl:leading-[60px]">
          Read the most interesting articles
        </h1>
        <p className="text-light-light mt-4 text-center md:text-xl lg:text-base lg:text-left xl:text-xl xl:leading-[30px]">
        Welcome to my blog! This is a space where I share thoughts, experiences, and diverse knowledge. Let`s explore the world through my perspective together!
        </p>
        <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
            <input
              type="text"
              spellCheck
              className="placeholder:font-bold font-semibold text-light-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 md:py-4 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
              placeholder="Search acticle..."
            />
          </div>
          <button className="md:absolute w-full md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2 text-white bg-primary rounded-lg py-3 px-5 font-bold hover:bg-light-hard transition-all duration-300">
            Search
          </button>
        </div>
        <div className="flex flex-col lg:flex-row mt-4 lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
          <span className="text-light-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">Popular Tags:</span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold italic">Design</li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold italic">User Experience</li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold italic">User Interfaces</li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:h-1/2 flex-shrink-0">
        <img className="w-full max-xl:max-w-[500px]" src={images.HeroImage} alt="Hero Image" />
      </div>
    </section>
  );
};

export default Hero;
