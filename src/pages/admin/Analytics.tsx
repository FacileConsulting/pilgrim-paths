import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign,
  Package,
  MessageSquare,
  Building2,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

const Analytics = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$124,580",
      change: "+18.2%",
      changeType: "positive" as const,
      icon: DollarSign,
      period: "This Month"
    },
    {
      title: "Package Views",
      value: "8,924",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Activity,
      period: "Last 30 Days"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.8%",
      changeType: "negative" as const,
      icon: TrendingUp,
      period: "This Quarter"
    },
    {
      title: "Avg. Package Value",
      value: "$4,250",
      change: "+8.1%",
      changeType: "positive" as const,
      icon: Package,
      period: "This Month"
    },
  ];

  const topPackages = [
    { name: "Umrah Deluxe Package", inquiries: 145, revenue: "$18,250", conversion: "4.2%" },
    { name: "Hajj Premium 2024", inquiries: 98, revenue: "$24,500", conversion: "6.1%" },
    { name: "Budget Umrah Package", inquiries: 87, revenue: "$8,700", conversion: "2.8%" },
    { name: "Family Hajj Package", inquiries: 64, revenue: "$19,200", conversion: "5.3%" },
  ];

  const topProviders = [
    { name: "Al-Haramain Travel", packages: 12, inquiries: 234, revenue: "$45,600", rating: 4.8 },
    { name: "Makkah Tours", packages: 8, inquiries: 189, revenue: "$38,200", rating: 4.9 },
    { name: "Sacred Journey", packages: 15, inquiries: 156, revenue: "$31,800", rating: 4.6 },
    { name: "Holy Land Travel", packages: 6, inquiries: 92, revenue: "$22,400", rating: 4.7 },
  ];

  const monthlyData = [
    { month: "Jan", inquiries: 145, bookings: 23, revenue: 28500 },
    { month: "Feb", inquiries: 189, bookings: 31, revenue: 35200 },
    { month: "Mar", inquiries: 234, bookings: 45, revenue: 42800 },
    { month: "Apr", inquiries: 198, bookings: 38, revenue: 39600 },
    { month: "May", inquiries: 267, bookings: 52, revenue: 48900 },
    { month: "Jun", inquiries: 312, bookings: 67, revenue: 56700 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Platform performance and business insights</p>
        </div>

        {/* Key Metrics */}
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
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {stat.changeType === "positive" ? (
                    <TrendingUp className="h-3 w-3 text-success" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-destructive" />
                  )}
                  <span className={stat.changeType === "positive" ? "text-success" : "text-destructive"}>
                    {stat.change}
                  </span>
                  <span>from last {stat.period.toLowerCase()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Performance Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Monthly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium w-8">{month.month}</div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>{month.inquiries} inquiries</span>
                        <span>{month.bookings} bookings</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">${month.revenue.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Inquiries by Region
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { region: "North America", percentage: 45, inquiries: 425, color: "bg-primary" },
                  { region: "Europe", percentage: 25, inquiries: 236, color: "bg-accent" },
                  { region: "Asia", percentage: 20, inquiries: 189, color: "bg-success" },
                  { region: "Others", percentage: 10, inquiries: 94, color: "bg-secondary" },
                ].map((region) => (
                  <div key={region.region} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${region.color}`} />
                      <span className="text-sm font-medium">{region.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{region.inquiries}</span>
                      <span className="text-sm font-medium">{region.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Packages */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Top Performing Packages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPackages.map((pkg, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">{pkg.name}</p>
                      <p className="text-xs text-muted-foreground">{pkg.inquiries} inquiries</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{pkg.revenue}</p>
                      <p className="text-xs text-muted-foreground">{pkg.conversion} conversion</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Providers */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Top Providers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProviders.map((provider, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">{provider.name}</p>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>{provider.packages} packages</span>
                        <span>•</span>
                        <span>{provider.inquiries} inquiries</span>
                        <span>•</span>
                        <span>⭐ {provider.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{provider.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Summary */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activity Summary (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">67</div>
                <p className="text-sm text-muted-foreground">New Inquiries</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">23</div>
                <p className="text-sm text-muted-foreground">Packages Created</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">4</div>
                <p className="text-sm text-muted-foreground">New Providers</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">156</div>
                <p className="text-sm text-muted-foreground">Page Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Analytics;