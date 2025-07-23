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
  Package, 
  MapPin, 
  Calendar,
  DollarSign,
  Users,
  Edit,
  Trash2,
  Eye,
  Copy
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const packages = [
  {
    id: 1,
    title: "Umrah Deluxe Package 2024",
    provider: "Al-Haramain Travel",
    type: "umrah",
    duration: 14,
    price: { from: 3500, to: 4200 },
    currency: "USD",
    location: "Makkah & Madinah",
    capacity: 50,
    booked: 32,
    status: "active",
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Hajj Premium Experience 2024",
    provider: "Makkah Tours",
    type: "hajj",
    duration: 21,
    price: { from: 8500, to: 12000 },
    currency: "USD",
    location: "Makkah, Madinah, Mina",
    capacity: 100,
    booked: 67,
    status: "active",
    featured: true,
    createdAt: "2024-02-01",
  },
  {
    id: 3,
    title: "Budget Umrah Package",
    provider: "Sacred Journey",
    type: "umrah",
    duration: 10,
    price: { from: 2200, to: 2800 },
    currency: "USD",
    location: "Makkah & Madinah",
    capacity: 30,
    booked: 18,
    status: "draft",
    featured: false,
    createdAt: "2024-01-28",
  },
];

const Packages = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Packages</h1>
            <p className="text-muted-foreground">Manage Hajj and Umrah travel packages</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover">
            <Plus className="h-4 w-4 mr-2" />
            Create Package
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search packages..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="default">
                  <Filter className="h-4 w-4 mr-2" />
                  Type
                </Button>
                <Button variant="outline" size="default">
                  <Filter className="h-4 w-4 mr-2" />
                  Status
                </Button>
                <Button variant="outline" size="default">
                  <Filter className="h-4 w-4 mr-2" />
                  Provider
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Packages Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>All Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Package</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price Range</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{pkg.title}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {pkg.location}
                          </div>
                          {pkg.featured && (
                            <Badge variant="accent" className="mt-1">Featured</Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{pkg.provider}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={pkg.type === "hajj" ? "primary" : "secondary"}>
                        {pkg.type.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {pkg.duration} days
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <DollarSign className="h-3 w-3" />
                        {pkg.price.from.toLocaleString()} - {pkg.price.to.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-3 w-3" />
                          {pkg.booked}/{pkg.capacity}
                        </div>
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(pkg.booked / pkg.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        pkg.status === "active" ? "success" : 
                        pkg.status === "draft" ? "warning" : "secondary"
                      }>
                        {pkg.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
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
                            Edit Package
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Packages;