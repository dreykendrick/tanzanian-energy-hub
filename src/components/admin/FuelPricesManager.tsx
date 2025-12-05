import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Fuel } from "lucide-react";
import { format } from "date-fns";

interface FuelPrice {
  id: string;
  fuel_type: string;
  price_per_liter: number;
  region: string;
  effective_date: string;
  source: string;
  created_at: string;
  updated_at: string;
}

export const FuelPricesManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newPrice, setNewPrice] = useState({
    fuel_type: "",
    price_per_liter: "",
    region: "Dar es Salaam",
    effective_date: format(new Date(), "yyyy-MM-dd"),
  });

  const { data: fuelPrices = [], isLoading } = useQuery({
    queryKey: ["admin-fuel-prices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fuel_prices")
        .select("*")
        .order("fuel_type", { ascending: true });
      if (error) throw error;
      return data as FuelPrice[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async (price: typeof newPrice) => {
      const { error } = await supabase.from("fuel_prices").insert({
        fuel_type: price.fuel_type,
        price_per_liter: parseFloat(price.price_per_liter),
        region: price.region,
        effective_date: price.effective_date,
        source: "manual",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-fuel-prices"] });
      queryClient.invalidateQueries({ queryKey: ["fuel-prices"] });
      setNewPrice({
        fuel_type: "",
        price_per_liter: "",
        region: "Dar es Salaam",
        effective_date: format(new Date(), "yyyy-MM-dd"),
      });
      toast({ title: "Fuel price added successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error adding fuel price", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, price_per_liter, effective_date }: { id: string; price_per_liter: number; effective_date: string }) => {
      const { error } = await supabase
        .from("fuel_prices")
        .update({ price_per_liter, effective_date, source: "manual" })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-fuel-prices"] });
      queryClient.invalidateQueries({ queryKey: ["fuel-prices"] });
      toast({ title: "Fuel price updated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error updating fuel price", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("fuel_prices").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-fuel-prices"] });
      queryClient.invalidateQueries({ queryKey: ["fuel-prices"] });
      toast({ title: "Fuel price deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error deleting fuel price", description: error.message, variant: "destructive" });
    },
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrice.fuel_type || !newPrice.price_per_liter) return;
    addMutation.mutate(newPrice);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fuel className="h-5 w-5" />
            Add Fuel Price
          </CardTitle>
          <CardDescription>Add a new fuel type or update existing prices below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label>Fuel Type</Label>
              <Input
                placeholder="e.g., Diesel"
                value={newPrice.fuel_type}
                onChange={(e) => setNewPrice({ ...newPrice, fuel_type: e.target.value })}
              />
            </div>
            <div>
              <Label>Price (TZS/Liter)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="e.g., 3231.00"
                value={newPrice.price_per_liter}
                onChange={(e) => setNewPrice({ ...newPrice, price_per_liter: e.target.value })}
              />
            </div>
            <div>
              <Label>Region</Label>
              <Input
                placeholder="e.g., Dar es Salaam"
                value={newPrice.region}
                onChange={(e) => setNewPrice({ ...newPrice, region: e.target.value })}
              />
            </div>
            <div>
              <Label>Effective Date</Label>
              <Input
                type="date"
                value={newPrice.effective_date}
                onChange={(e) => setNewPrice({ ...newPrice, effective_date: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" disabled={addMutation.isPending}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Fuel Prices</CardTitle>
          <CardDescription>Update prices to reflect the latest EWURA rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fuelPrices.length === 0 ? (
              <p className="text-muted-foreground">No fuel prices added yet.</p>
            ) : (
              fuelPrices.map((price) => (
                <div key={price.id} className="flex flex-wrap items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1 min-w-[120px]">
                    <p className="font-semibold text-lg">{price.fuel_type}</p>
                    <p className="text-sm text-muted-foreground">{price.region}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Price:</Label>
                    <Input
                      type="number"
                      step="0.01"
                      className="w-32"
                      defaultValue={price.price_per_liter}
                      onBlur={(e) => {
                        const newValue = parseFloat(e.target.value);
                        if (newValue !== price.price_per_liter) {
                          updateMutation.mutate({
                            id: price.id,
                            price_per_liter: newValue,
                            effective_date: price.effective_date,
                          });
                        }
                      }}
                    />
                    <span className="text-sm text-muted-foreground">TZS/L</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Date:</Label>
                    <Input
                      type="date"
                      className="w-40"
                      defaultValue={price.effective_date}
                      onBlur={(e) => {
                        if (e.target.value !== price.effective_date) {
                          updateMutation.mutate({
                            id: price.id,
                            price_per_liter: price.price_per_liter,
                            effective_date: e.target.value,
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Source: {price.source}
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteMutation.mutate(price.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
