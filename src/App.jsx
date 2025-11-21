import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";

export default function App() {
  return (
    <div className="font-sans">
      <Header />
      <main className="pt-20">
        <Hero />
        <About />
        <Gallery />
      </main>
    </div>
  );
}
