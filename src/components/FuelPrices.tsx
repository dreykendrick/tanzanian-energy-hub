import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Fuel, Flame, Droplet } from "lucide-react";

interface FuelPrice {
  id: string;
  fuel_type: string;
  price_per_liter: number;
  region: string;
  effective_date: string;
  source: string;
}

const getFuelIcon = (fuelType: string) => {
  const type = fuelType.toLowerCase();
  if (type.includes("diesel")) return <Fuel className="h-8 w-8" />;
  if (type.includes("petrol")) return <Flame className="h-8 w-8" />;
  return <Droplet className="h-8 w-8" />;
};

export const FuelPrices = () => {
  const { data: fuelPrices = [], isLoading } = useQuery({
    queryKey: ["fuel-prices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fuel_prices")
        .select("*")
        .order("fuel_type", { ascending: true });
      if (error) throw error;
      return data as FuelPrice[];
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-foreground">Today's Fuel Prices</h2>
          <p className="text-muted-foreground">Loading prices...</p>
        </div>
      </section>
    );
  }

  const latestDate = fuelPrices.length > 0 
    ? Math.max(...fuelPrices.map(p => new Date(p.effective_date).getTime()))
    : null;

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-foreground">Today's Fuel Prices</h2>
        {latestDate && (
          <p className="text-muted-foreground mb-8">
            Last updated: {format(new Date(latestDate), "MMMM d, yyyy")}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-8">
          {fuelPrices.map((price) => (
            <Card 
              key={price.id} 
              className="bg-gradient-to-br from-primary to-energy-blue text-primary-foreground min-w-[280px] shadow-xl hover-lift"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-center gap-2 opacity-90">
                  {getFuelIcon(price.fuel_type)}
                  <CardTitle className="text-lg">{price.fuel_type}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-black text-accent mb-2">
                  {price.price_per_liter.toLocaleString("en-TZ", { maximumFractionDigits: 0 })}
                </div>
                <p className="text-sm opacity-80">TZS/Liter</p>
                <p className="text-xs opacity-60 mt-2">{price.region}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-muted-foreground">
          *Prices based on EWURA regulated rates. Bulk discounts available.
        </p>
      </div>
    </section>
  );
};
