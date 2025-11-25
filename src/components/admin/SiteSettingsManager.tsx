import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface SiteSettings {
  id: string;
  logo_url?: string;
  company_name: string;
}

export const SiteSettingsManager = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [formData, setFormData] = useState({
    logo_url: "",
    company_name: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching settings:", error);
      return;
    }
    
    if (data) {
      setSettings(data);
      setFormData({
        logo_url: data.logo_url || "",
        company_name: data.company_name,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (settings) {
      const { error } = await supabase
        .from("site_settings")
        .update(formData)
        .eq("id", settings.id);

      if (error) {
        toast({ title: "Error updating site settings", variant: "destructive" });
        return;
      }
      toast({ title: "Site settings updated successfully" });
      fetchSettings();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Company Name</Label>
            <Input
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Logo URL</Label>
            <Input
              value={formData.logo_url}
              onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
              placeholder="https://..."
            />
            {formData.logo_url && (
              <img src={formData.logo_url} alt="Logo preview" className="mt-2 h-16 object-contain" />
            )}
          </div>
          <Button type="submit">Update Settings</Button>
        </form>
      </CardContent>
    </Card>
  );
};
