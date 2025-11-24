import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-energy-blue to-primary">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse-glow" 
             style={{ top: '20%', left: '10%' }} />
        <div className="absolute w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse-glow" 
             style={{ bottom: '20%', right: '10%', animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 leading-tight">
          Powering Tanzania's Industries<br />
          <span className="text-accent">With Reliable Fuel Supply</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto font-light">
          Bulk diesel & petrol delivery for industries, fleets, and enterprises across Tanzania.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/quote">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              Request a Quote
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-8 py-6 text-lg rounded-full">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
