
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  testSupabaseConnection, 
  clearConnectionTestCache, 
  forceAppRefresh,
  supabase
} from "@/lib/supabase";
import { 
  CheckCircle2, 
  XCircle, 
  DatabaseIcon, 
  Loader2, 
  InfoIcon,
  RefreshCw,
  X
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DatabaseStatusSection = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    // Check immediately on component mount
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      // Force a fresh test by clearing the cache first
      clearConnectionTestCache();
      const connected = await testSupabaseConnection(true);
      setIsConnected(connected);
    } catch (error) {
      setIsConnected(false);
      console.error("Error checking connection:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleForceRefresh = () => {
    toast({
      title: "Force Refreshing Application",
      description: "Reloading to apply latest configuration...",
      duration: 3000,
    });
    
    forceAppRefresh();
  };

  // Get the current URL for Supabase dashboard link
  const getSupabaseDashboardUrl = () => {
    return `https://supabase.com/dashboard/project/yxthrrmhtjudhhxlrjig`;
  };

  return (
    <div className="py-8">
      <div className="container px-4 md:px-6">
        <Card className="border border-gray-200/80">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <DatabaseIcon className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-lg font-medium">Supabase Connection Status</h3>
                  <p className="text-sm text-gray-500">
                    {isConnected === null
                      ? "Checking database connection..."
                      : isConnected
                      ? "Connected to Supabase database"
                      : "Not connected to Supabase database"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {isConnected !== null && (
                  <div className="flex items-center gap-2">
                    {isConnected ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-green-600 font-medium">Connected</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-red-600 font-medium">Not Connected</span>
                      </>
                    )}
                  </div>
                )}
                
                <Button 
                  onClick={checkConnection} 
                  disabled={loading}
                  variant="outline"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Test Connection"
                  )}
                </Button>
              </div>
            </div>
            
            {!isConnected && showInfo && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md relative">
                <button 
                  type="button"
                  className="absolute top-2 right-2 h-6 w-6 p-0 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded-full"
                  onClick={() => setShowInfo(false)}
                  aria-label="Close info"
                >
                  <X className="h-4 w-4" />
                </button>
                <h4 className="font-medium text-blue-800 flex items-center mb-1">
                  <InfoIcon className="h-4 w-4 mr-1" />
                  Supabase Connection Information
                </h4>
                <p className="text-sm text-blue-700 mb-3">
                  Your app is now connected to Supabase project: <strong>yxthrrmhtjudhhxlrjig</strong>
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="bg-blue-100 border border-blue-300 text-blue-800 hover:bg-blue-200"
                    onClick={handleForceRefresh}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh App
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-blue-100 border border-blue-300 text-blue-800 hover:bg-blue-200"
                    onClick={() => window.open(getSupabaseDashboardUrl(), '_blank')}
                  >
                    <DatabaseIcon className="h-4 w-4 mr-2" />
                    Open Supabase Dashboard
                  </Button>
                </div>
                
                <p className="text-sm text-blue-700">
                  To create tables in your Supabase database, you can use the SQL editor in the Supabase dashboard.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseStatusSection;
