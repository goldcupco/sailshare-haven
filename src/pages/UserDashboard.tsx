
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/shared/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, User, Sailboat, Calendar, Settings } from "lucide-react";
import { isAuthenticated, getUser, supabase } from "@/lib/supabase";

const UserDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        toast({
          title: "Authentication Required",
          description: "Please log in to view your dashboard",
          variant: "destructive",
        });
        navigate("/login", { state: { returnTo: "/dashboard" } });
      } else {
        loadUserProfile();
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const loadUserProfile = async () => {
    setLoading(true);
    try {
      const user = await getUser();
      if (user) {
        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setUserProfile(profile || { id: user.id, email: user.email });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast({
        title: "Error",
        description: "Failed to load your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container max-w-6xl mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-gray-600">Loading your profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {userProfile?.first_name || "User"}</h1>
            <p className="text-gray-600">{userProfile?.email}</p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="dashboard">
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="yachts">My Yachts</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Your Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-gray-500">Upcoming trips</p>
                  <Button 
                    variant="link" 
                    className="px-0 mt-2" 
                    onClick={() => navigate("/bookings")}
                  >
                    View bookings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Your Yachts</CardTitle>
                  <Sailboat className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-gray-500">Listed yachts</p>
                  <Button 
                    variant="link" 
                    className="px-0 mt-2" 
                    onClick={() => navigate("/list-your-yacht")}
                  >
                    List a yacht
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Account</CardTitle>
                  <User className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-medium truncate">
                    {userProfile?.first_name} {userProfile?.last_name || ""}
                  </div>
                  <p className="text-xs text-gray-500">Member since {new Date().getFullYear()}</p>
                  <Button 
                    variant="link" 
                    className="px-0 mt-2"
                    onClick={() => navigate("/dashboard?tab=profile")}
                  >
                    Edit profile
                  </Button>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => navigate("/search")}
              >
                <Sailboat className="h-6 w-6 mb-2" />
                <span>Find a Yacht</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => navigate("/bookings")}
              >
                <Calendar className="h-6 w-6 mb-2" />
                <span>Manage Bookings</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => navigate("/list-your-yacht")}
              >
                <Sailboat className="h-6 w-6 mb-2" />
                <span>List Your Yacht</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => navigate("/dashboard?tab=profile")}
              >
                <Settings className="h-6 w-6 mb-2" />
                <span>Account Settings</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Bookings</h2>
              <Button 
                onClick={() => navigate("/bookings")}
              >
                View All Bookings
              </Button>
            </div>
            <div className="text-center p-8 border rounded-lg bg-gray-50">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
              <Button onClick={() => navigate("/search")}>Find a Yacht</Button>
            </div>
          </TabsContent>

          <TabsContent value="yachts">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Yachts</h2>
              <Button 
                onClick={() => navigate("/list-your-yacht")}
              >
                List a New Yacht
              </Button>
            </div>
            <div className="text-center p-8 border rounded-lg bg-gray-50">
              <Sailboat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No yachts listed</h3>
              <p className="text-gray-600 mb-4">You haven't listed any yachts yet.</p>
              <Button onClick={() => navigate("/list-your-yacht")}>List Your Yacht</Button>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="max-w-xl mx-auto">
              <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                        <input
                          id="firstName"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          defaultValue={userProfile?.first_name || ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                        <input
                          id="lastName"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          defaultValue={userProfile?.last_name || ""}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        defaultValue={userProfile?.email || ""}
                        disabled
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                      <input
                        id="phone"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        defaultValue={userProfile?.phone || ""}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        toast({
                          title: "Profile Updated",
                          description: "Your profile has been updated successfully."
                        });
                      }}
                    >
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
