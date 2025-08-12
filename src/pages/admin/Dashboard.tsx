import { useEffect, useMemo, useState } from 'react';

import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Package, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  DollarSign,
  InfinityIcon,
  Star
} from "lucide-react";

import { toast } from "@/hooks/use-toast";

import { DASHBOARD } from "@/lib/constant";

const stats = [
  {
    title: "Total Providers",
    value: "42",
    change: "+12%",
    changeType: "positive" as const,
    icon: Building2,
  },
  {
    title: "Active Packages",
    value: "156",
    change: "+8%",
    changeType: "positive" as const,
    icon: Package,
  },
  {
    title: "New Inquiries",
    value: "23",
    change: "+23%",
    changeType: "positive" as const,
    icon: MessageSquare,
  },
  {
    title: "Revenue (Month)",
    value: "$45,280",
    change: "+15%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
];

const recentActivity = [
  {
    id: 1,
    type: "inquiry",
    message: "New inquiry for Umrah Package - Deluxe",
    provider: "Al-Haramain Travel",
    time: "2 minutes ago",
    status: "pending",
  },
  {
    id: 2,
    type: "package",
    message: "Package updated: Hajj 2024 Premium",
    provider: "Makkah Tours",
    time: "1 hour ago",
    status: "updated",
  },
  {
    id: 3,
    type: "provider",
    message: "New provider registration",
    provider: "Sacred Journey Travel",
    time: "3 hours ago",
    status: "pending",
  },
];

const Dashboard = () => {

  // Constants
  const { 
    stats
  } = DASHBOARD;

  const [activityData, setActivityData] = useState([]);
  const [inquiriesData, setInquiriesData] = useState([]);
  const [statsData, setStatsData] = useState([]);

  const groupByKey = (arr, key) => {
    return Object.values(
      arr.reduce((acc, obj) => {
        const val = obj[key];
        if (!acc[val]) acc[val] = [];
        acc[val].push(obj);
        return acc;
      }, {})
    );
  }

  const timeAgo = (dateString) => {
    const now: any = new Date();
    const past: any = new Date(dateString);
    const seconds = Math.floor((now - past) / 1000);

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  const changer =(curr, last) => {
    if (last === 0) {
      if (curr === 0) {
        return 0;
      } else {
        return 100; // First-time data
      }
    } else {
      return (((curr - last) / last) * 100).toFixed(2);
    }
  }

  const fetchDashboard = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "DASHBOARD_FETCH" })     
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        const arr = [];
        for (let i = 0; i < stats.length; i++) {
          arr.push({
            title: stats[i].title,
            icon: stats[i].icon,
            value: data.data[stats[i].curr],
            change: changer(data.data[stats[i].curr], data.data[stats[i].last]),
          });
        }
        setStatsData(arr);
        setActivityData(data.data.activity);
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error dashboard save data:", error);
      toast({ title: "Something went wrong!" });
    }
  }

  const fetchInquiries = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "INQUIRY_FETCH_ALL" })     
      });

      const data = await response.json();

      if (response.ok && data.status === "success" && data.data.length > 0) {
        const d2: Array<any> = groupByKey(data.data, "inquiryPackage");
        d2.sort((a, b) => b.length - a.length);
        const arr = [];
        for (let i = 0; i < d2.length; i++) {
          arr.push({
            name: d2[i][0].inquiryPackage,
            provider: d2[i][0].inquiryProvider,
            inquiries: d2[i].length,
            rating: d2[i][0].inquiryRatingProvider
          });
        }
        setInquiriesData(arr);
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error provider save data:", error);
      toast({ title: "Something went wrong!" });
    }
  }

  useEffect(() => {
    fetchDashboard();
    fetchInquiries();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your Hajj & Umrah booking platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {
            statsData.map((stat) => (
              <Card key={stat.title} className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-success font-medium">{stat.change}</span>% from last month
                  </p>
                </CardContent>
              </Card>
            ))
          }
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activityData.map((activity, index) => (
                <div key={`${index}_idx`} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="p-2 rounded-full bg-primary/10">
                    {activity.type === "inquiry" && <MessageSquare className="h-4 w-4 text-primary" />}
                    {activity.type === "package" && <Package className="h-4 w-4 text-primary" />}
                    {activity.type === "provider" && <Building2 className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.name}</p>
                    <p className="text-xs text-muted-foreground">{timeAgo(activity.time)}</p>
                  </div>
                  <Badge variant={activity.status === "pending" ? "warning" : "secondary"}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Performing Packages */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Top Performing Packages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {inquiriesData.map((pkg, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{pkg.name}</p>
                    <p className="text-xs text-muted-foreground">{pkg.provider}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{pkg.inquiries} inquiries</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span className="text-xs text-muted-foreground">{pkg.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;