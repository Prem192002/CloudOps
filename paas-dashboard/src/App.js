import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import DeploySection from './DeploySection';
import Footer from './Footer';


function App() {
  return (
    <div className="flex flex-col min-h-screen" role="main">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <DeploySection />
      <Footer />
    </div>
  );
}

export default App;