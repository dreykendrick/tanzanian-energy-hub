import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HardHat, Factory, Gem, Truck, Landmark, Tractor, CheckCircle } from "lucide-react";

const Industries = () => {
  const industries = [
    {
      icon: <HardHat className="h-14 w-14 text-primary" />,
      title: "Construction",
      description: "Powering Tanzania's infrastructure development with reliable diesel supply for excavators, bulldozers, cranes, and generators.",
      solutions: [
        "On-site fuel delivery to remote construction sites",
        "Flexible delivery schedules aligned with project phases",
        "Bulk pricing for large projects",
        "Emergency fuel supply during critical deadlines",
        "Dedicated account management"
      ],
      clients: "Road construction companies, building contractors, infrastructure developers"
    },
    {
      icon: <Factory className="h-14 w-14 text-primary" />,
      title: "Manufacturing",
      description: "Ensuring uninterrupted production with reliable fuel supply for backup generators and industrial equipment.",
      solutions: [
        "Scheduled fuel deliveries to maintain optimal inventory",
        "24/7 emergency supply during power outages",
        "On-site storage tank installation and management",
        "Industrial lubricants for machinery",
        "Fuel management reporting"
      ],
      clients: "Food processing, textiles, plastics, metals, chemicals manufacturers"
    },
    {
      icon: <Gem className="h-14 w-14 text-primary" />,
      title: "Mining",
      description: "Supporting Tanzania's mining sector with high-volume fuel supply for heavy equipment and remote operations.",
      solutions: [
        "Large-volume diesel supply (50,000+ liters)",
        "Delivery to remote mining sites nationwide",
        "Specialized lubricants for mining equipment",
        "Long-term supply contracts with fixed pricing",
        "Dedicated logistics coordination"
      ],
      clients: "Gold, diamonds, tanzanite, coal, iron ore operations"
    },
    {
      icon: <Truck className="h-14 w-14 text-primary" />,
      title: "Transport & Logistics",
      description: "Keeping Tanzania's transport sector moving with bulk fuel supply for truck fleets, buses, and logistics operations.",
      solutions: [
        "Fuel cards for cashless transactions",
        "Multiple refueling locations across Tanzania",
        "Fleet fuel management and reporting",
        "Competitive bulk pricing",
        "Monthly billing with flexible payment terms"
      ],
      clients: "Trucking companies, courier services, bus operators, taxi fleets"
    },
    {
      icon: <Landmark className="h-14 w-14 text-primary" />,
      title: "Government & Institutions",
      description: "Trusted fuel supplier for government departments, parastatals, and public institutions across Tanzania.",
      solutions: [
        "Tender participation and contract fulfillment",
        "Transparent pricing and invoicing",
        "Reliable supply chain management",
        "Fuel for vehicle fleets and generators",
        "Compliance with public procurement regulations"
      ],
      clients: "Ministries, local government authorities, public universities, hospitals"
    },
    {
      icon: <Tractor className="h-14 w-14 text-primary" />,
      title: "Agriculture",
      description: "Supporting Tanzania's agricultural sector with reliable fuel for farming equipment, irrigation systems, and agro-processing.",
      solutions: [
        "Seasonal fuel supply planning",
        "Delivery to rural farming locations",
        "Diesel for tractors and harvesters",
        "Fuel for irrigation pumps",
        "Agricultural lubricants and oils"
      ],
      clients: "Large-scale farms, agro-processing plants, irrigation projects"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-energy-blue text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-6 animate-fade-in-up">Industries We Serve</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Powering diverse sectors across Tanzania with specialized fuel solutions
          </p>
        </div>
      </section>

      {/* Industries Detail */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-12">
            {industries.map((industry, index) => (
              <Card key={index} className="shadow-xl hover-lift border-l-4 border-l-accent">
                <CardHeader>
                  <div className="mb-4">{industry.icon}</div>
                  <CardTitle className="text-3xl mb-3">{industry.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{industry.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-primary">How We Support {industry.title}:</h4>
                    <ul className="space-y-2">
                      {industry.solutions.map((solution, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-primary">Clients Include:</h4>
                    <p className="text-muted-foreground">{industry.clients}</p>
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

export default Industries;
