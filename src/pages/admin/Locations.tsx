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
  MapPin, 
  Globe,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const locations = [
  {
    id: 1,
    name: "Makkah",
    type: "city",
    country: "Saudi Arabia",
    latitude: 21.4225,
    longitude: 39.8262,
    isHajjLocation: true,
    isUmrahLocation: true,
    packages: 45,
    providers: 12,
  },
  {
    id: 2,
    name: "Madinah",
    type: "city",
    country: "Saudi Arabia",
    latitude: 24.4669,
    longitude: 39.6142,
    isHajjLocation: true,
    isUmrahLocation: true,
    packages: 38,
    providers: 10,
  },
  {
    id: 3,
    name: "New York",
    type: "city",
    country: "United States",
    latitude: 40.7128,
    longitude: -74.0060,
    isHajjLocation: false,
    isUmrahLocation: false,
    packages: 0,
    providers: 8,
  },
  {
    id: 4,
    name: "London",
    type: "city",
    country: "United Kingdom",
    latitude: 51.5074,
    longitude: -0.1278,
    isHajjLocation: false,
    isUmrahLocation: false,
    packages: 0,
    providers: 5,
  },
];

const Locations = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Locations</h1>
            <p className="text-muted-foreground">Manage geographical locations and coordinates</p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover">
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search locations..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="default">
                  <Filter className="h-4 w-4 mr-2" />
                  Type
                </Button>
                <Button variant="outline" size="default">
                  <Filter className="h-4 w-4 mr-2" />
                  Country
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Locations Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>All Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Coordinates</TableHead>
                  <TableHead>Hajj/Umrah</TableHead>
                  <TableHead>Packages</TableHead>
                  <TableHead>Providers</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{location.name}</p>
                          <p className="text-sm text-muted-foreground">{location.country}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {location.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {location.isHajjLocation && (
                          <Badge variant="success" className="text-xs">Hajj</Badge>
                        )}
                        {location.isUmrahLocation && (
                          <Badge variant="accent" className="text-xs">Umrah</Badge>
                        )}
                        {!location.isHajjLocation && !location.isUmrahLocation && (
                          <Badge variant="secondary" className="text-xs">Departure</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{location.packages}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{location.providers}</span>
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
                            View on Map
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Location
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

export default Locations;