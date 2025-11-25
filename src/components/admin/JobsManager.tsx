import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus } from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements?: string;
  is_active: boolean;
}

export const JobsManager = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    description: "",
    requirements: "",
    is_active: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from("job_listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error fetching jobs", variant: "destructive" });
      return;
    }
    setJobs(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("job_listings")
        .update(formData)
        .eq("id", editingId);

      if (error) {
        toast({ title: "Error updating job", variant: "destructive" });
        return;
      }
      toast({ title: "Job updated successfully" });
    } else {
      const { error } = await supabase.from("job_listings").insert([formData]);

      if (error) {
        toast({ title: "Error creating job", variant: "destructive" });
        return;
      }
      toast({ title: "Job created successfully" });
    }

    setFormData({ title: "", department: "", location: "", description: "", requirements: "", is_active: true });
    setIsEditing(false);
    setEditingId(null);
    fetchJobs();
  };

  const handleEdit = (item: Job) => {
    setFormData({
      title: item.title,
      department: item.department,
      location: item.location,
      description: item.description,
      requirements: item.requirements || "",
      is_active: item.is_active,
    });
    setEditingId(item.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    const { error } = await supabase.from("job_listings").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting job", variant: "destructive" });
      return;
    }
    toast({ title: "Job deleted successfully" });
    fetchJobs();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Manage Job Listings</CardTitle>
          <Button
            onClick={() => {
              setIsEditing(true);
              setEditingId(null);
              setFormData({ title: "", department: "", location: "", description: "", requirements: "", is_active: true });
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Job
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-4 p-4 border rounded-lg">
            <div>
              <Label>Job Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Department</Label>
              <Input
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
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
          {jobs.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.department} - {item.location}</p>
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
