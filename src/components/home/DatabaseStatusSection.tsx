
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { testSupabaseConnection, clearConnectionTestCache, supabase } from "@/lib/supabase";
import { 
  CheckCircle2, 
  XCircle, 
  DatabaseIcon, 
  Loader2, 
  ExternalLink, 
  Table, 
  RefreshCcw,
  FileText
} from "lucide-react";

const DatabaseStatusSection = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [tableCount, setTableCount] = useState<number | null>(null);
  const [yachtCount, setYachtCount] = useState<number | null>(null);

  const checkConnection = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const connected = await testSupabaseConnection(true);
      setIsConnected(connected);
      
      if (connected) {
        // Get count of yachts
        const { count, error } = await supabase
          .from('yacht_listings')
          .select('*', { count: 'exact', head: true });
          
        if (!error && count !== null) {
          setYachtCount(count);
        }
        
        // Get table list to count tables
        const { data: tables } = await supabase
          .from('pg_tables')
          .select('schemaname, tablename')
          .eq('schemaname', 'public');
          
        if (tables) {
          setTableCount(tables.length);
        }
      }
    } catch (error) {
      setIsConnected(false);
      console.error("Error checking connection:", error);
    } finally {
      setLoading(false);
    }
  };

  const openSupabaseDashboard = () => {
    window.open("https://supabase.com/dashboard/project/yxthrrmhtjudhhxlrjig", "_blank");
  };
  
  const viewSqlScripts = () => {
    window.open("https://github.com/your-repo/your-project/tree/main/src/sql", "_blank");
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="py-8">
      <div className="container px-4 md:px-6">
        <Card className="border border-gray-200/80">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <DatabaseIcon className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-lg font-medium">Database Status</h3>
                  <p className="text-sm text-gray-500">
                    {isConnected === null
                      ? "Checking connection..."
                      : isConnected
                      ? "Connected to Supabase database"
                      : "Not connected to Supabase database"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    SQL Scripts stored in <code className="bg-gray-100 px-1 rounded">src/sql/</code> directory
                  </p>
                </div>
              </div>
              
              {isConnected && (
                <div className="flex items-center gap-4">
                  {tableCount !== null && (
                    <div className="flex items-center">
                      <Table className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm text-gray-600">{tableCount} Tables</span>
                    </div>
                  )}
                  {yachtCount !== null && (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">{yachtCount} Yachts</span>
                    </div>
                  )}
                </div>
              )}
              
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
                
                <div className="flex gap-2">
                  <Button 
                    onClick={checkConnection} 
                    disabled={loading}
                    variant="outline"
                    size="sm"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Test Connection
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={openSupabaseDashboard} 
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  
                  <Button 
                    onClick={viewSqlScripts} 
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    SQL Scripts
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseStatusSection;
