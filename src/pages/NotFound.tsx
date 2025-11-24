import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-muted">
        <div className="text-center px-6">
          <AlertCircle className="h-20 w-20 text-accent mx-auto mb-6" />
          <h1 className="text-6xl font-black mb-4 text-foreground">404</h1>
          <p className="text-2xl mb-8 text-muted-foreground">Oops! Page not found</p>
          <Link to="/">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
