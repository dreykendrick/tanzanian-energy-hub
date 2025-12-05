import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Tanzania Energy</h3>
            <p className="text-sm opacity-80 mb-4">
              Leading bulk fuel supplier powering Tanzania's industrial growth since 2015.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-accent mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/services" className="opacity-80 hover:opacity-100 transition-opacity">Services</Link></li>
              <li><Link to="/industries" className="opacity-80 hover:opacity-100 transition-opacity">Industries</Link></li>
              <li><Link to="/quote" className="opacity-80 hover:opacity-100 transition-opacity">Get Quote</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-accent mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Diesel Bulk Supply</li>
              <li>Petrol Bulk Supply</li>
              <li>Fuel Logistics</li>
              <li>Industrial Lubricants</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-accent mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="opacity-80">+255 123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="opacity-80">info@tanzaniaenergies.co.tz</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent mt-1" />
                <span className="opacity-80">Dar es Salaam, Tanzania</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm opacity-70">
          <p>&copy; {new Date().getFullYear()} Tanzania Energy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
