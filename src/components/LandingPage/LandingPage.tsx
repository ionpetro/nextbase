import AllFeatures from './AllFeatures';
import Footer from './Footer';
import HeroSection from './HeroSection';
import MainFeatures from './MainFeatures';
import Testimonials from './Testimonials';
import TrustedCompanies from './TrustedCompanies';

export const LandingPage = () => {
  return (
    <>
      <HeroSection
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
