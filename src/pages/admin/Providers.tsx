import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Building2, 
  Mail, 
  Phone, 
  MapPin,
  Star,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const providers = [
  {
    id: 1,
    name: "Al-Haramain Travel Agency",
    email: "info@alharamain.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    packages: 12,
    rating: 4.8,
    reviews: 156,
    verified: true,
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Makkah Tours & Travel",
    email: "contact@makkahtours.com",
    phone: "+1 (555) 987-6543",
    location: "Los Angeles, USA",
    packages: 8,
    rating: 4.9,
    reviews: 89,
    verified: true,
    status: "active",
    joinDate: "2023-03-22",
  },
  {
    id: 3,
    name: "Sacred Journey Travel",
    email: "hello@sacredjourney.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, USA",
    packages: 15,
    rating: 4.6,
    reviews: 203,
    verified: false,
    status: "pending",
    joinDate: "2024-01-10",
  },
];

const Providers = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Providers</h1>
            <p className="text-muted-foreground">Manage travel agencies and service providers</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover">
            <Plus className="h-4 w-4 mr-2" />
            Add Provider
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search providers..." className="pl-10" />
              </div>
              <Button variant="outline" size="default">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <Card key={provider.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={provider.verified ? "success" : "warning"}>
                          {provider.verified ? "Verified" : "Pending"}
                        </Badge>
                        <Badge variant={provider.status === "active" ? "success" : "secondary"}>
                          {provider.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Provider
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {provider.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {provider.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {provider.location}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{provider.packages}</p>
                    <p className="text-xs text-muted-foreground">Packages</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-lg font-bold text-foreground">{provider.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{provider.reviews} reviews</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Packages
                  </Button>
                  <Button variant="default" size="sm" className="flex-1">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Providers;