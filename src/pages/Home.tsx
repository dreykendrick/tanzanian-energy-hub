import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Truck, Award, MapPin, DollarSign, Fuel, Flame, Package, Handshake, HardHat, Factory, Gem, TruckIcon, Landmark, Tractor, Users, Briefcase, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Home = () => {
  // Fetch dynamic data
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const { data: teamMembers = [] } = useQuery({
    queryKey: ['team_members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const { data: news = [] } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_date', { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    }
  });

  const { data: jobs = [] } = useQuery({
    queryKey: ['job_listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    }
  });

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
      quote: "Tanzania Energy has been our reliable fuel partner for 3 years. Their delivery is always on time, and the quality is exceptional. Highly recommended for any industrial operation.",
      author: "John Mwamba",
      role: "Operations Director, BuildTech Construction"
    },
    {
      quote: "Switching to Tanzania Energy reduced our fuel costs by 15% while improving delivery reliability. Their customer service team is responsive and professional.",
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
            Why Choose Tanzania Energy?
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
            {services.map((service) => (
              <Card key={service.id} className="hover-scale shadow-lg border-l-4 border-l-accent">
                <CardHeader>
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

      {/* Meet Our Team */}
      {teamMembers.length > 0 && (
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="hover-lift shadow-lg text-center">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center mb-4">
                      <Avatar className="h-24 w-24 border-4 border-accent">
                        <AvatarImage src={member.avatar_url || undefined} alt={member.name} />
                        <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-accent font-semibold">{member.role}</CardDescription>
                  </CardHeader>
                  {member.bio && (
                    <CardContent>
                      <p className="text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News & Updates */}
      {news.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {news.map((article) => (
                <Card key={article.id} className="hover-scale shadow-lg border-t-4 border-t-accent">
                  <CardHeader>
                    {article.published_date && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(article.published_date), 'MMM dd, yyyy')}
                      </div>
                    )}
                    <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{article.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join Our Team */}
      {jobs.length > 0 && (
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <Briefcase className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-4 text-foreground">Join Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Be part of Tanzania's leading fuel supply company. We're always looking for talented individuals to join our growing team.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {jobs.map((job) => (
                <Card key={job.id} className="hover-lift shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="font-semibold">Department:</span> {job.department}
                    </p>
                    <p className="text-muted-foreground line-clamp-2 mb-4">{job.description}</p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/contact">Apply Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button size="lg" asChild>
                <Link to="/contact">View All Positions</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

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
