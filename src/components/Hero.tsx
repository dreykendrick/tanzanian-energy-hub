import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import heroTankers from "@/assets/hero-tankers.jpg";
import heroStorage from "@/assets/hero-storage.jpg";
import heroPumps from "@/assets/hero-pumps.jpg";

export const Hero = () => {
  const images = [heroTankers, heroStorage, heroPumps];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image Slideshow Background */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Industrial fuel operations ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-primary/70" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 leading-tight">
          Powering Tanzania's Industries<br />
          <span className="text-accent">With Reliable Fuel Supply</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground mb-8 max-w-3xl mx-auto font-light">
          Bulk diesel & petrol delivery for industries, fleets, and enterprises across Tanzania.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/quote">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              Request a Quote
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImageIndex
                ? "bg-accent w-8"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
