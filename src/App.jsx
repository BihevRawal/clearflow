import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Book from "./components/Book";
import Footer from "./components/Footer";
import Offer from "./Offer";


export default function App() {
  return (
    <div className="font-sans">
      <Header />
      <Offer/>
      <main className="pt-24 space-y-24 bg-slate-50">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Book />
        <Footer />
      </main>
    </div>
    
  );
}
