import AllFeatures from "./AllFeatures2";
import { Footer } from "./Footer";
import HeroSection2 from "./HeroSection2";
import MainFeatures from "./MainFeatures2";
import Testimonials from "./Testimonials2";
import TrustedCompanies from "./TrustedCompanies2";


export const LandingPage2 = () => {
  return (
    <>
      <HeroSection2
        title="Nextbase Demo Landing Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at"
        image="/mockups/office.jpeg"
      />
      <TrustedCompanies />
      <AllFeatures />
      <MainFeatures />
      <Testimonials />
      <Footer />
    </>
  );
};
