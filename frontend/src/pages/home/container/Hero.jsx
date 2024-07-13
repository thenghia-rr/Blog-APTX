import SearchBlog from "../../../components/SearchBlog";
import { images } from "../../../constants";

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row 2xl:max-w-[1400px] ">
      <div className="mt-10 lg:h-1/2">
        <h1 className="font-roboto text-3xl text-center font-bold text-light-soft md:text-5xl lg:text-4xl lg:text-left lg:max-w-[540px] xl:text-5xl xl:leading-[60px] dark:text-primary dark:opacity-95">
          Read the most interesting articles
        </h1>
        <p className="text-light-light mt-4 text-center md:text-xl lg:text-base lg:text-left xl:text-xl xl:leading-[30px] dark:text-dark-soft">
        Welcome to my blog! This is a space where I share thoughts, experiences, and diverse knowledge. Let`s explore the world through my perspective together!
        </p>
        <SearchBlog className="mt-10 lg:mt-6 xl:mt-10 "/>
        <div className="flex flex-col lg:flex-row mt-4 lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
          <span className="text-light-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base dark:text-dark-soft">Popular Tags:</span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold italic">Design</li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold italic">User Experience</li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold italic">User Interfaces</li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:h-1/2 flex-shrink-0">
        <img className="w-full max-xl:max-w-[500px] " src={images.HeroImage} alt="Hero Image" />
      </div>
    </section>
  );
};

export default Hero;
