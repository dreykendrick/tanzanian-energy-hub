import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Award, Users, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Shield className="h-10 w-10 text-accent" />,
      title: "Reliability",
      description: "We deliver on time, every time, ensuring your operations never stop."
    },
    {
      icon: <Award className="h-10 w-10 text-accent" />,
      title: "Quality",
      description: "ISO-certified fuel that meets international standards."
    },
    {
      icon: <Users className="h-10 w-10 text-accent" />,
      title: "Safety",
      description: "Rigorous safety protocols in storage, handling, and delivery."
    },
    {
      icon: <Heart className="h-10 w-10 text-accent" />,
      title: "Integrity",
      description: "Transparent pricing and honest business practices."
    }
  ];

  const timeline = [
    { year: "2015", title: "Foundation", description: "Tanzania Energies established with a single depot in Dar es Salaam, serving 15 clients." },
    { year: "2017", title: "Expansion", description: "Opened regional depots in Mwanza and Arusha. Fleet expanded to 25 tankers." },
    { year: "2019", title: "ISO Certification", description: "Achieved ISO 9001:2015 certification for quality management systems." },
    { year: "2021", title: "Digital Transformation", description: "Launched client portal and GPS fleet tracking system." },
    { year: "2024", title: "Market Leader", description: "Serving 500+ clients nationwide with 50+ tankers and 8 regional depots." }
  ];

  const team = [
    { name: "Dr. Joseph Moshi", role: "Chief Executive Officer", experience: "20+ years in energy sector" },
    { name: "Grace Ndumbaro", role: "Chief Operating Officer", experience: "Expert in logistics & supply chain" },
    { name: "Emmanuel Kikwete", role: "Chief Financial Officer", experience: "CPA with 15+ years experience" },
    { name: "Amina Hassan", role: "Head of Sales", experience: "Driving business growth nationwide" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-energy-blue text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-6 animate-fade-in-up">About Tanzania Energies</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Leading bulk fuel supplier dedicated to powering Tanzania's industrial growth since 2015.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To provide reliable, high-quality fuel solutions that power Tanzania's economic development while maintaining the highest standards of safety and environmental responsibility.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be East Africa's most trusted energy partner, recognized for excellence in service delivery and innovation in fuel logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover-lift shadow-lg">
                <CardHeader>
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Our Journey</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {timeline.map((item, index) => (
              <Card key={index} className="shadow-lg hover-lift border-l-4 border-l-accent">
                <CardContent className="pt-6">
                  <div className="text-3xl font-black text-accent mb-2">{item.year}</div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover-scale shadow-lg">
                <CardContent className="pt-8">
                  <div className="w-24 h-24 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.experience}</p>
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

export default About;
