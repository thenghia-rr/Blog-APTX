import BtnScrollToTop from "../../components/BtnScrollToTop";
import MainLayout from "../../components/MainLayout";
import Articles from "./container/Articles";
import CTA from "./container/CTA";
import Hero from "./container/Hero";

const HomePage = () => {
  return (
    <>
      <MainLayout>
        <Hero />
        <Articles />
        <CTA />
        <BtnScrollToTop />
      </MainLayout>
    </>
  );
};

export default HomePage;
