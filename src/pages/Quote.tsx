import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const Quote = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    fuelType: "",
    quantity: "",
    deliveryLocation: "",
    additionalInfo: ""
  });

  const [estimate, setEstimate] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate estimate
    const pricePerLiter = formData.fuelType === "diesel" ? 2850 : 3050;
    const quantity = parseInt(formData.quantity) || 0;
    const total = pricePerLiter * quantity;
    
    setEstimate(total);
    toast.success("Quote request submitted! Our team will contact you shortly.");
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
          <h1 className="text-5xl font-black mb-6 animate-fade-in-up">Request a Quote</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Get an instant estimate for your fuel needs
          </p>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-2xl">
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Fuel Quote Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    required
                    value={formData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => handleChange("contactPerson", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type *</Label>
                    <Select onValueChange={(value) => handleChange("fuelType", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="petrol">Petrol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (Liters) *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1000"
                      required
                      value={formData.quantity}
                      onChange={(e) => handleChange("quantity", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryLocation">Delivery Location *</Label>
                  <Input
                    id="deliveryLocation"
                    required
                    placeholder="City/Region"
                    value={formData.deliveryLocation}
                    onChange={(e) => handleChange("deliveryLocation", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Delivery schedule, special requirements, etc."
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={(e) => handleChange("additionalInfo", e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6">
                  Get Quote
                </Button>
              </form>

              {estimate !== null && (
                <Card className="mt-8 bg-muted">
                  <CardContent className="pt-6 text-center">
                    <h4 className="text-lg font-semibold mb-2 text-primary">Estimated Cost</h4>
                    <div className="text-5xl font-black text-accent mb-2">
                      {estimate.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      TZS (excluding delivery fees)
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                      *Final price may vary based on delivery location and current market rates.
                      Our sales team will provide a detailed quote.
                    </p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Quote;
