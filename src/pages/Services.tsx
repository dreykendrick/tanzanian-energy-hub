import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Fuel, Flame, Truck, Package, Factory, Handshake, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Fuel className="h-14 w-14 text-accent" />,
      title: "Diesel Bulk Supply",
      description: "Premium diesel fuel for industrial, construction, mining, and power generation operations. Our diesel meets EN 590 standards and is suitable for all modern diesel engines.",
      benefits: [
        "High cetane number for optimal engine performance",
        "Low sulfur content (less than 50 ppm)",
        "Minimum order: 5,000 liters",
        "Bulk discounts available from 20,000 liters",
        "24/7 emergency delivery available"
      ],
      idealFor: "Construction companies, mining operations, manufacturing plants, generators, heavy machinery, transport fleets"
    },
    {
      icon: <Flame className="h-14 w-14 text-accent" />,
      title: "Petrol Bulk Supply",
      description: "High-octane petrol for commercial vehicle fleets, government institutions, and businesses with multiple vehicles. Available in regular and premium grades.",
      benefits: [
        "RON 91 and RON 95 available",
        "Clean burning formulation",
        "Minimum order: 3,000 liters",
        "Scheduled deliveries to fit your operations",
        "Fleet fueling programs available"
      ],
      idealFor: "Transport companies, taxi fleets, car rental agencies, government departments, corporate fleets"
    },
    {
      icon: <Truck className="h-14 w-14 text-accent" />,
      title: "Fuel Logistics & Delivery",
      description: "Complete fuel logistics solutions with GPS-tracked tankers, real-time delivery monitoring, and flexible scheduling to ensure your operations never stop.",
      benefits: [
        "GPS tracking on all deliveries",
        "Real-time SMS and email notifications",
        "Scheduled or on-demand delivery",
        "Multiple delivery points supported",
        "Emergency fuel delivery within 4 hours"
      ],
      idealFor: "All regions of Tanzania including Dar es Salaam, Mwanza, Arusha, Dodoma, Mbeya, Tanga, Morogoro"
    },
    {
      icon: <Package className="h-14 w-14 text-accent" />,
      title: "Industrial Lubricants",
      description: "Comprehensive range of industrial lubricants, engine oils, hydraulic fluids, and greases for heavy machinery and equipment.",
      benefits: [
        "Engine oils (10W-40, 15W-40, 20W-50)",
        "Hydraulic oils",
        "Gear oils",
        "Industrial greases",
        "Transmission fluids"
      ],
      idealFor: "Mining equipment, construction machinery, manufacturing plants, agricultural equipment"
    },
    {
      icon: <Factory className="h-14 w-14 text-accent" />,
      title: "Fuel Storage Solutions",
      description: "Professional installation and maintenance of on-site fuel storage tanks, ensuring your business has reliable fuel reserves with full safety compliance.",
      benefits: [
        "Storage tank installation (5,000L - 50,000L)",
        "Dispensing pump installation",
        "Safety equipment and spill containment",
        "Regular maintenance and inspection",
        "EWURA compliance certification"
      ],
      idealFor: "Businesses needing to reduce downtime, control fuel costs, and maintain secure fuel supply"
    },
    {
      icon: <Handshake className="h-14 w-14 text-accent" />,
      title: "Contract Supply",
      description: "Long-term fuel supply agreements with guaranteed pricing, priority delivery, and dedicated account management for your peace of mind.",
      benefits: [
        "Fixed pricing for budget certainty",
        "Priority delivery scheduling",
        "Dedicated account manager",
        "Flexible contract terms",
        "Volume-based discounts"
      ],
      idealFor: "Large operations requiring consistent, long-term fuel supply partnerships"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-energy-blue text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-6 animate-fade-in-up">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Comprehensive fuel solutions tailored to meet your business needs
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-12">
            {services.map((service, index) => (
              <Card key={index} className="shadow-xl hover-lift border-l-4 border-l-accent">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-3xl mb-3">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-primary">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">Ideal For:</h4>
                    <p className="text-muted-foreground">{service.idealFor}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
