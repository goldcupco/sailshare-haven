
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/shared/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Calendar, CheckCircle, XCircle, Clock, MessageSquare } from "lucide-react";
import { getUserBookings, getOwnerBookings, cancelBooking, updateBookingStatus } from "@/lib/booking-services";
import { isAuthenticated } from "@/lib/supabase";
import { format, parseISO } from "date-fns";

const ManageBookings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [ownerBookings, setOwnerBookings] = useState<any[]>([]);
  const [userRole, setUserRole] = useState<"guest" | "owner" | "both">("guest");

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        toast({
          title: "Authentication Required",
          description: "Please log in to view your bookings",
          variant: "destructive",
        });
        navigate("/login", { state: { returnTo: "/bookings" } });
      } else {
        loadBookings();
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      // Load user bookings (as a guest)
      const userBookingsData = await getUserBookings();
      setUserBookings(userBookingsData || []);

      // Load owner bookings (as a yacht owner)
      const ownerBookingsData = await getOwnerBookings();
      setOwnerBookings(ownerBookingsData || []);

      // Determine user role
      if (userBookingsData?.length > 0 && ownerBookingsData?.length > 0) {
        setUserRole("both");
      } else if (ownerBookingsData?.length > 0) {
        setUserRole("owner");
      } else {
        setUserRole("guest");
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load bookings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId);
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been successfully cancelled.",
      });
      loadBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      await updateBookingStatus(bookingId, status);
      toast({
        title: "Status Updated",
        description: `Booking has been ${status}.`,
      });
      loadBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
      toast({
        title: "Error",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600 bg-yellow-50">Pending</Badge>;
      case "confirmed":
        return <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">Confirmed</Badge>;
      case "completed":
        return <Badge variant="outline" className="text-blue-600 border-blue-600 bg-blue-50">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="text-red-600 border-red-600 bg-red-50">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), "MMM d, yyyy");
    } catch (e) {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container max-w-6xl mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-gray-600">Loading your bookings...</p>
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
        <h1 className="text-3xl font-bold mb-8">Manage Your Bookings</h1>

        <Tabs defaultValue={userRole === "owner" ? "owner" : "guest"}>
          <TabsList className="mb-8">
            {(userRole === "guest" || userRole === "both") && (
              <TabsTrigger value="guest">Your Bookings</TabsTrigger>
            )}
            {(userRole === "owner" || userRole === "both") && (
              <TabsTrigger value="owner">Owner Dashboard</TabsTrigger>
            )}
          </TabsList>

          {(userRole === "guest" || userRole === "both") && (
            <TabsContent value="guest">
              <h2 className="text-xl font-semibold mb-4">Your Yacht Bookings</h2>
              
              {userBookings.length === 0 ? (
                <div className="text-center p-8 border rounded-lg bg-gray-50">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                  <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
                  <Button onClick={() => navigate("/search")}>Find a Yacht</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{booking.yacht_listings?.name || "Yacht Booking"}</CardTitle>
                            <CardDescription>{booking.yacht_listings?.location || "Location unavailable"}</CardDescription>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span>
                              {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{booking.guest_count} guests</span>
                          </div>
                          <p className="font-medium mt-4">Total: ${booking.total_price}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-3 border-t">
                        {booking.status === "pending" && (
                          <Button 
                            variant="destructive" 
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                        )}
                        <Button variant="outline" className="ml-auto">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Owner
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          )}

          {(userRole === "owner" || userRole === "both") && (
            <TabsContent value="owner">
              <h2 className="text-xl font-semibold mb-4">Your Yacht Rental Requests</h2>
              
              {ownerBookings.length === 0 ? (
                <div className="text-center p-8 border rounded-lg bg-gray-50">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No booking requests</h3>
                  <p className="text-gray-600 mb-4">You haven't received any booking requests yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ownerBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>Booking Request</CardTitle>
                            <CardDescription>
                              From: {booking.profiles?.first_name} {booking.profiles?.last_name}
                            </CardDescription>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span>
                              {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{booking.guest_count} guests</span>
                          </div>
                          {booking.special_requests && (
                            <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                              <p className="font-medium mb-1">Special requests:</p>
                              <p className="text-gray-600">{booking.special_requests}</p>
                            </div>
                          )}
                          <p className="font-medium mt-4">Payment: ${booking.total_price}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-3 border-t">
                        {booking.status === "pending" && (
                          <div className="flex space-x-2 w-full">
                            <Button
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => handleUpdateStatus(booking.id, "confirmed")}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Accept
                            </Button>
                            <Button
                              variant="destructive"
                              className="flex-1"
                              onClick={() => handleUpdateStatus(booking.id, "cancelled")}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Decline
                            </Button>
                          </div>
                        )}
                        {booking.status === "confirmed" && (
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleUpdateStatus(booking.id, "completed")}
                          >
                            Mark as Completed
                          </Button>
                        )}
                        {(booking.status === "cancelled" || booking.status === "completed") && (
                          <Button
                            variant="outline"
                            className="w-full"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact Guest
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ManageBookings;
