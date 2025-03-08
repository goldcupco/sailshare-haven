
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { testSupabaseConnection } from "@/lib/supabase";
import { CheckCircle2, XCircle, DatabaseIcon, Loader2, AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DatabaseStatusSection = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    // Check if environment variables are present
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    const hasEnvVars = !!(supabaseUrl && supabaseAnonKey);
    setIsDemo(!hasEnvVars);
    
    console.log("Environment variables check:", { 
      hasUrl: !!supabaseUrl, 
      hasKey: !!supabaseAnonKey,
      isDemoMode: !hasEnvVars
    });
  }, []);

  const checkConnection = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const connected = await testSupabaseConnection();
      setIsConnected(connected);
    } catch (error) {
      setIsConnected(false);
      console.error("Error checking connection:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing Application",
      description: "Reloading to apply environment variables...",
      duration: 2000,
    });
    
    // Force a hard refresh to ensure the browser fetches new env values
    setTimeout(() => {
      window.location.reload();
    }, 1000);
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
                    {isDemo ? 
                      "Environment variables not detected" : 
                      isConnected === null
                        ? "Check your database connection"
                        : isConnected
                        ? "Connected to Supabase database"
                        : "Not connected to Supabase database"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {isDemo ? (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <span className="text-amber-600 font-medium">Config Needed</span>
                  </div>
                ) : isConnected !== null && (
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
            
            {isDemo && showWarning && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md relative">
                <button 
                  type="button"
                  className="absolute top-2 right-2 h-6 w-6 p-0 flex items-center justify-center text-amber-600 hover:bg-amber-100 rounded-full"
                  onClick={() => setShowWarning(false)}
                  aria-label="Close warning"
                >
                  <XCircle className="h-4 w-4" />
                </button>
                <h4 className="font-medium text-amber-800 mb-1">Environment Variables Not Detected</h4>
                <p className="text-sm text-amber-700 mb-3">
                  If you've already created an .env file, you need to restart your development server.
                </p>
                <div className="mb-3">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="bg-amber-100 border border-amber-300 text-amber-800 hover:bg-amber-200"
                    onClick={handleRefresh}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Application
                  </Button>
                </div>
                <p className="text-sm text-amber-700">
                  Your .env file should be in the project root with these variables:
                </p>
                <ul className="text-sm text-amber-700 list-disc list-inside mt-1">
                  <li>VITE_SUPABASE_URL - Your Supabase project URL</li>
                  <li>VITE_SUPABASE_ANON_KEY - Your Supabase anonymous key</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseStatusSection;
