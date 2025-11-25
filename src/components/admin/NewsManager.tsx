import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus } from "lucide-react";

interface News {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
  published_date: string;
}

export const NewsManager = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    is_published: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("published_date", { ascending: false });

    if (error) {
      toast({ title: "Error fetching news", variant: "destructive" });
      return;
    }
    setNews(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("news")
        .update(formData)
        .eq("id", editingId);

      if (error) {
        toast({ title: "Error updating news", variant: "destructive" });
        return;
      }
      toast({ title: "News updated successfully" });
    } else {
      const { error } = await supabase.from("news").insert([formData]);

      if (error) {
        toast({ title: "Error creating news", variant: "destructive" });
        return;
      }
      toast({ title: "News created successfully" });
    }

    setFormData({ title: "", content: "", is_published: false });
    setIsEditing(false);
    setEditingId(null);
    fetchNews();
  };

  const handleEdit = (item: News) => {
    setFormData({
      title: item.title,
      content: item.content,
      is_published: item.is_published,
    });
    setEditingId(item.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;

    const { error } = await supabase.from("news").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting news", variant: "destructive" });
      return;
    }
    toast({ title: "News deleted successfully" });
    fetchNews();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Manage News Updates</CardTitle>
          <Button
            onClick={() => {
              setIsEditing(true);
              setEditingId(null);
              setFormData({ title: "", content: "", is_published: false });
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add News
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
              <Label>Content</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) =>
                  setFormData({ ...formData, is_published: e.target.checked })
                }
              />
              <Label>Published</Label>
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
          {news.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                <span className="text-xs text-muted-foreground">
                  {item.is_published ? "Published" : "Draft"}
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
