import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Truck, Award, MapPin, DollarSign, Fuel, Flame, Package, Handshake, HardHat, Factory, Gem, TruckIcon, Landmark, Tractor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Home = () => {
  const highlights = [
    {
      icon: <Truck className="h-12 w-12 text-accent" />,
      title: "Fast Delivery",
      description: "Same-day and next-day delivery across major cities"
    },
    {
      icon: <Award className="h-12 w-12 text-accent" />,
      title: "Guaranteed Quality",
      description: "ISO-certified fuel meeting international standards"
    },
    {
      icon: <MapPin className="h-12 w-12 text-accent" />,
      title: "Nationwide Coverage",
      description: "Delivery to all regions of Tanzania"
    },
    {
      icon: <DollarSign className="h-12 w-12 text-accent" />,
      title: "Competitive Pricing",
      description: "Best bulk rates with flexible payment terms"
    }
  ];

  const services = [
    {
      icon: <Fuel className="h-10 w-10 text-accent" />,
      title: "Diesel Bulk Supply",
      description: "High-quality diesel for construction, mining, and industrial operations. Minimum order 5,000 liters."
    },
    {
      icon: <Flame className="h-10 w-10 text-accent" />,
      title: "Petrol Bulk Supply",
      description: "Premium petrol for transport fleets and commercial vehicles. Flexible delivery schedules."
    },
    {
      icon: <Truck className="h-10 w-10 text-accent" />,
      title: "Fuel Logistics",
      description: "End-to-end fuel logistics with GPS-tracked tankers and real-time delivery monitoring."
    },
    {
      icon: <Package className="h-10 w-10 text-accent" />,
      title: "Industrial Lubricants",
      description: "Complete range of industrial lubricants and engine oils for heavy machinery."
    },
    {
      icon: <Factory className="h-10 w-10 text-accent" />,
      title: "Fuel Storage Solutions",
      description: "Installation and maintenance of on-site fuel storage tanks with safety compliance."
    },
    {
      icon: <Handshake className="h-10 w-10 text-accent" />,
      title: "Contract Supply",
      description: "Long-term fuel supply contracts with guaranteed pricing and priority delivery."
    }
  ];

  const industries = [
    { icon: <HardHat className="h-12 w-12" />, title: "Construction" },
    { icon: <Factory className="h-12 w-12" />, title: "Manufacturing" },
    { icon: <Gem className="h-12 w-12" />, title: "Mining" },
    { icon: <TruckIcon className="h-12 w-12" />, title: "Logistics" },
    { icon: <Landmark className="h-12 w-12" />, title: "Government" },
    { icon: <Tractor className="h-12 w-12" />, title: "Agriculture" }
  ];

  const testimonials = [
    {
      quote: "Tanzania Energies has been our reliable fuel partner for 3 years. Their delivery is always on time, and the quality is exceptional. Highly recommended for any industrial operation.",
      author: "John Mwamba",
      role: "Operations Director, BuildTech Construction"
    },
    {
      quote: "Switching to Tanzania Energies reduced our fuel costs by 15% while improving delivery reliability. Their customer service team is responsive and professional.",
      author: "Sarah Kimaro",
      role: "Fleet Manager, TransLogistics Ltd"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Highlights */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose Tanzania Energies?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center hover-lift shadow-lg border-l-4 border-l-accent">
                <CardHeader>
                  <div className="flex justify-center mb-4">{highlight.icon}</div>
                  <CardTitle className="text-xl">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fuel Prices */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-foreground">Today's Fuel Prices</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <Card className="bg-gradient-to-br from-primary to-energy-blue text-primary-foreground min-w-[280px] shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg opacity-90">Diesel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-black text-accent mb-2">2,850</div>
                <p className="text-sm opacity-80">TZS/Liter</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary to-energy-blue text-primary-foreground min-w-[280px] shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg opacity-90">Petrol</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-black text-accent mb-2">3,050</div>
                <p className="text-sm opacity-80">TZS/Liter</p>
              </CardContent>
            </Card>
          </div>
          <p className="mt-8 text-muted-foreground">*Prices updated daily. Bulk discounts available.</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover-scale shadow-lg border-l-4 border-l-accent">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Industries We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="text-center hover-lift shadow-md">
                <CardContent className="pt-8 pb-6">
                  <div className="flex justify-center mb-4 text-primary">{industry.icon}</div>
                  <h3 className="font-semibold">{industry.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">What Our Clients Say</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg border-l-4 border-l-accent">
                <CardContent className="pt-8">
                  <p className="text-lg italic mb-6 leading-relaxed text-muted-foreground">"{testimonial.quote}"</p>
                  <div className="font-semibold text-foreground">
                    - {testimonial.author}
                    <span className="block text-sm font-normal text-muted-foreground mt-1">{testimonial.role}</span>
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

export default Home;
