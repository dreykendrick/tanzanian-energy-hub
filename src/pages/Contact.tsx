import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-energy-blue text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-6 animate-fade-in-up">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Get in touch with our team for fuel supply inquiries and support
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">Get In Touch</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you need bulk fuel delivery, have questions about our services, or want to discuss a long-term partnership, our team is here to help.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="hover-lift">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <p className="text-muted-foreground">+255 123 456 789</p>
                        <p className="text-muted-foreground">+255 987 654 321</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground">info@tanzaniaenergies.co.tz</p>
                        <p className="text-muted-foreground">sales@tanzaniaenergies.co.tz</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Head Office</h3>
                        <p className="text-muted-foreground">
                          Pugu Road, Industrial Area<br />
                          Dar es Salaam, Tanzania
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 7:00 AM - 6:00 PM<br />
                          Saturday: 8:00 AM - 2:00 PM<br />
                          Emergency Hotline: 24/7
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
