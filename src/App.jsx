import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Book from "./components/Book";

export default function App() {
  return (
    <div className="font-sans">
      <Header />
      <main className="pt-20">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Book />
      </main>
    </div>
    
  );
}
