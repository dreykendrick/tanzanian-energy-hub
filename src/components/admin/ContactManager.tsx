import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ContactInfo {
  id: string;
  email: string;
  phone: string;
  address: string;
}

export const ContactManager = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    const { data, error } = await supabase
      .from("contact_info")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching contact info:", error);
      return;
    }
    
    if (data) {
      setContactInfo(data);
      setFormData({
        email: data.email,
        phone: data.phone,
        address: data.address,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contactInfo) {
      const { error } = await supabase
        .from("contact_info")
        .update(formData)
        .eq("id", contactInfo.id);

      if (error) {
        toast({ title: "Error updating contact info", variant: "destructive" });
        return;
      }
      toast({ title: "Contact info updated successfully" });
      fetchContactInfo();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>
          <Button type="submit">Update Contact Info</Button>
        </form>
      </CardContent>
    </Card>
  );
};
