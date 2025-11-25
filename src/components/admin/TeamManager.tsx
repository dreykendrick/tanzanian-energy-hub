import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  avatar_url?: string;
  is_active: boolean;
}

export const TeamManager = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    avatar_url: "",
    is_active: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      toast({ title: "Error fetching team", variant: "destructive" });
      return;
    }
    setTeam(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("team_members")
        .update(formData)
        .eq("id", editingId);

      if (error) {
        toast({ title: "Error updating team member", variant: "destructive" });
        return;
      }
      toast({ title: "Team member updated successfully" });
    } else {
      const { error } = await supabase.from("team_members").insert([formData]);

      if (error) {
        toast({ title: "Error creating team member", variant: "destructive" });
        return;
      }
      toast({ title: "Team member created successfully" });
    }

    setFormData({ name: "", role: "", bio: "", avatar_url: "", is_active: true });
    setIsEditing(false);
    setEditingId(null);
    fetchTeam();
  };

  const handleEdit = (item: TeamMember) => {
    setFormData({
      name: item.name,
      role: item.role,
      bio: item.bio || "",
      avatar_url: item.avatar_url || "",
      is_active: item.is_active,
    });
    setEditingId(item.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    const { error } = await supabase.from("team_members").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting team member", variant: "destructive" });
      return;
    }
    toast({ title: "Team member deleted successfully" });
    fetchTeam();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Manage Team Members</CardTitle>
          <Button
            onClick={() => {
              setIsEditing(true);
              setEditingId(null);
              setFormData({ name: "", role: "", bio: "", avatar_url: "", is_active: true });
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Team Member
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-4 p-4 border rounded-lg">
            <div>
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Role</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label>Avatar URL</Label>
              <Input
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                placeholder="https://..."
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
          {team.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.role}</p>
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
