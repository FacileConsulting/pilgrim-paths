import { useEffect, useMemo, useState } from 'react';
import { Bell, LucideRefreshCcw, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// File imports
import { BASE_URL } from "@/lib/constant";

export const Header = () => {

  const [counter, setCounter] = useState(0);

  const refreshNotification = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "SETTINGS_FETCH" })
      });

      const data = await response.json();

      if (response.ok) {
        if (
          data.data.inquiryNotification ||
          data.data.packageNotification ||
          data.data.providerNotification
        ) {
          setCounter(data.data.notificationCounter);
        } else {
          setCounter(0);
        }
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error package save data:", error);
      toast({ title: "Something went wrong!" });
    }
  }

  useEffect(() => {
    refreshNotification();
  }, []);

  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search packages, providers..."
            className="pl-10 bg-background"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {/* <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            4
          </Badge> */}
          {
            counter ?
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {counter}
            </Badge> : null
          }
        </Button>
        
        <Button variant="ghost" size="sm">
          <User className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Admin</span>
        </Button>
      </div>
    </header>
  );
};