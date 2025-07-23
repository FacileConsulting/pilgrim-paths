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
  Calendar,
  Star
} from "lucide-react";

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
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your Hajj & Umrah booking platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
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
                  <span className="text-success font-medium">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
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
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="p-2 rounded-full bg-primary/10">
                    {activity.type === "inquiry" && <MessageSquare className="h-4 w-4 text-primary" />}
                    {activity.type === "package" && <Package className="h-4 w-4 text-primary" />}
                    {activity.type === "provider" && <Building2 className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.provider}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
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
              {[
                { name: "Umrah Deluxe Package", provider: "Al-Haramain Travel", inquiries: 45, rating: 4.8 },
                { name: "Hajj Premium 2024", provider: "Makkah Tours", inquiries: 38, rating: 4.9 },
                { name: "Umrah Budget Package", provider: "Sacred Journey", inquiries: 32, rating: 4.6 },
              ].map((pkg, index) => (
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