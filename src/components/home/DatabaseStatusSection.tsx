
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { testSupabaseConnection } from "@/lib/supabase";
import { CheckCircle2, XCircle, DatabaseIcon, Loader2, AlertTriangle } from "lucide-react";

const DatabaseStatusSection = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Check if using demo credentials
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    setIsDemo(!supabaseUrl || supabaseUrl === 'https://supabase-demo.example.com');
  }, []);

  const checkConnection = async () => {
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
                      "Demo mode - environment variables not set" : 
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
                    <span className="text-amber-600 font-medium">Demo Mode</span>
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
            
            {isDemo && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <h4 className="font-medium text-amber-800 mb-1">Setup Required</h4>
                <p className="text-sm text-amber-700">
                  Please set the following environment variables:
                </p>
                <ul className="text-sm text-amber-700 list-disc list-inside mt-1">
                  <li>VITE_SUPABASE_URL - Your Supabase project URL</li>
                  <li>VITE_SUPABASE_ANON_KEY - Your Supabase anonymous key</li>
                </ul>
                <p className="text-sm text-amber-700 mt-2">
                  Create a new .env file in your project root with these variables.
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
