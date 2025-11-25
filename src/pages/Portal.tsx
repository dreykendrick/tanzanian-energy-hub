import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, FileText, TrendingUp, Truck, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { isAdmin } from "@/lib/supabase";
import { NewsManager } from "@/components/admin/NewsManager";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { TeamManager } from "@/components/admin/TeamManager";
import { JobsManager } from "@/components/admin/JobsManager";
import { ContactManager } from "@/components/admin/ContactManager";
import { SiteSettingsManager } from "@/components/admin/SiteSettingsManager";

const Portal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      if (session) {
        checkAdminStatus(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (session) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdminUser(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    const adminStatus = await isAdmin(userId);
    setIsAdminUser(adminStatus);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/portal`,
          },
        });

        if (error) throw error;
        toast({ title: "Account created! Please check your email to verify." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        toast({ title: "Logged in successfully!" });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out successfully" });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent-blue pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-md">
            <Card className="shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-black text-primary">
                  {isSignUp ? "Create Account" : "Client Portal"}
                </CardTitle>
                <CardDescription>
                  {isSignUp
                    ? "Sign up to access your dashboard"
                    : "Access your fuel management dashboard"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="w-full"
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp
                      ? "Already have an account? Sign In"
                      : "Don't have an account? Sign Up"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-primary mb-2">
                {isAdminUser ? "Admin Dashboard" : "Welcome Back!"}
              </h1>
              <p className="text-muted-foreground">
                {isAdminUser
                  ? "Manage site content and user data"
                  : "Manage your fuel operations and view insights"}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          {isAdminUser ? (
            // Admin Panel
            <Tabs defaultValue="news" className="space-y-4">
              <TabsList>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="news">
                <NewsManager />
              </TabsContent>

              <TabsContent value="services">
                <ServicesManager />
              </TabsContent>

              <TabsContent value="team">
                <TeamManager />
              </TabsContent>

              <TabsContent value="jobs">
                <JobsManager />
              </TabsContent>

              <TabsContent value="contact">
                <ContactManager />
              </TabsContent>

              <TabsContent value="settings">
                <SiteSettingsManager />
              </TabsContent>
            </Tabs>
          ) : (
            // Regular User Dashboard
            <>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
                <Truck className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-accent">247</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fuel Volume</CardTitle>
                <BarChart3 className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-accent">1.2M</div>
                <p className="text-xs text-muted-foreground">Liters this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
                <FileText className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-accent">TZS 45M</div>
                <p className="text-xs text-muted-foreground">Due in 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
                <TrendingUp className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-accent">8.5%</div>
                <p className="text-xs text-muted-foreground">vs retail prices</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="deliveries" className="space-y-4">
            <TabsList>
              <TabsTrigger value="deliveries">Recent Deliveries</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="deliveries" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Fuel Deliveries</CardTitle>
                  <CardDescription>Your latest fuel orders and delivery status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: "Nov 24, 2025", type: "Diesel", volume: "15,000L", status: "Delivered" },
                      { date: "Nov 22, 2025", type: "Petrol", volume: "8,000L", status: "Delivered" },
                      { date: "Nov 20, 2025", type: "Diesel", volume: "20,000L", status: "Delivered" },
                      { date: "Nov 18, 2025", type: "Diesel", volume: "12,000L", status: "Delivered" },
                    ].map((delivery, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div>
                          <p className="font-semibold text-primary">{delivery.type} - {delivery.volume}</p>
                          <p className="text-sm text-muted-foreground">{delivery.date}</p>
                        </div>
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                          {delivery.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoices" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Invoices & Payments</CardTitle>
                  <CardDescription>View and download your invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { invoice: "INV-2025-1124", amount: "TZS 42,750,000", status: "Paid", date: "Nov 24, 2025" },
                      { invoice: "INV-2025-1122", amount: "TZS 24,400,000", status: "Paid", date: "Nov 22, 2025" },
                      { invoice: "INV-2025-1120", amount: "TZS 57,000,000", status: "Pending", date: "Nov 20, 2025" },
                    ].map((invoice, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div>
                          <p className="font-semibold text-primary">{invoice.invoice}</p>
                          <p className="text-sm text-muted-foreground">{invoice.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{invoice.amount}</p>
                          <span className={`text-sm ${invoice.status === 'Paid' ? 'text-green-600' : 'text-orange-600'}`}>
                            {invoice.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fuel Consumption Reports</CardTitle>
                  <CardDescription>Monthly fuel usage analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">November 2025</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Diesel Consumed</p>
                          <p className="text-xl font-bold text-primary">847,000L</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Petrol Consumed</p>
                          <p className="text-xl font-bold text-primary">353,000L</p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Download Full Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Portal;
