import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  details?: string;
  is_active: boolean;
}

export const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    details: "",
    is_active: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      toast({ title: "Error fetching services", variant: "destructive" });
      return;
    }
    setServices(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("services")
        .update(formData)
        .eq("id", editingId);

      if (error) {
        toast({ title: "Error updating service", variant: "destructive" });
        return;
      }
      toast({ title: "Service updated successfully" });
    } else {
      const { error } = await supabase.from("services").insert([formData]);

      if (error) {
        toast({ title: "Error creating service", variant: "destructive" });
        return;
      }
      toast({ title: "Service created successfully" });
    }

    setFormData({ title: "", description: "", icon: "", details: "", is_active: true });
    setIsEditing(false);
    setEditingId(null);
    fetchServices();
  };

  const handleEdit = (item: Service) => {
    setFormData({
      title: item.title,
      description: item.description,
      icon: item.icon || "",
      details: item.details || "",
      is_active: item.is_active,
    });
    setEditingId(item.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting service", variant: "destructive" });
      return;
    }
    toast({ title: "Service deleted successfully" });
    fetchServices();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Manage Services</CardTitle>
          <Button
            onClick={() => {
              setIsEditing(true);
              setEditingId(null);
              setFormData({ title: "", description: "", icon: "", details: "", is_active: true });
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-4 p-4 border rounded-lg">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>
            <div>
              <Label>Icon (Lucide icon name)</Label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., Truck, Fuel, etc."
              />
            </div>
            <div>
              <Label>Details</Label>
              <Textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                rows={4}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
              />
              <Label>Active</Label>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Update" : "Create"}</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {services.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                <span className="text-xs text-muted-foreground">
                  {item.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
