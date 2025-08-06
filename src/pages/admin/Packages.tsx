import { useEffect, useMemo, useState } from 'react';
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
  IndianRupee,
  Users,
  Edit,
  Trash2,
  Eye,
  Copy
} from "lucide-react";
import { Link } from "react-router-dom";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "@/hooks/use-toast";

// File imports
import { CREATE_PACKAGE } from "@/lib/constant";
import { set } from 'date-fns';

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

  // Constants
  const { 
    packageRoomTypeOptions,
    packageTypeOptions,
    packageCurrencyOptions,
    packageCategoryOptions
  } = CREATE_PACKAGE;

  const [packagesData, setPackagesData] = useState([]);
  const [packageChange, setPackageChange] = useState("");

  const getRoomType = (status: string) => {
    const obj = packageRoomTypeOptions.find((option) => option.value === status);
    return obj?.label || "";
  };

  const getCurrency = (status: string) => {
    const obj = packageCurrencyOptions.find((option) => option.value === status);
    return obj?.label || "";
  };

  const getType = (status: string) => {
    const obj = packageTypeOptions.find((option) => option.value === status);
    return obj?.label || "";
  };

  const getCategory = (status: string) => {
    const obj = packageCategoryOptions.find((option) => option.value === status);
    return obj?.label || "";
  };

  const fetchPackages = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "PACKAGE_FETCH_ALL" })     
      });

      const data = await response.json();

      if (response.ok && data.status === "success" && data.data.length > 0) {
        setPackagesData(data.data);
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error package save data:", error);
      toast({ title: "Something went wrong!" });
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("http://localhost:8000/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "PACKAGE_DELETE", packageId: id })     
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        toast({ title: data.message });
        fetchPackages();
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error package save data:", error);
      toast({ title: "Something went wrong!" });
    }
  }

  const handleDuplicatePackage = async (pkg) => {
    pkg._id ? delete pkg._id : null;
    const payload = {
      type: "PACKAGE_CREATE",
      ...pkg
    };
    try {
      const response = await fetch("http://localhost:8000/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload })
      });

      const data = await response.json();

      if (response.ok) {
        toast({ title: data.message });
        fetchPackages();
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error package save data:", error);
      toast({ title: "Something went wrong!" });
    }
  };
  
  const filteredPackagesData = useMemo(() => {
    if (packageChange.length < 2) return packagesData;
    return packagesData.filter((pkg) =>
      pkg.packageTitle.toLowerCase().includes(packageChange.toLowerCase())
    );
  }, [packageChange, packagesData]);

  useEffect(() => {
    fetchPackages();
    console.log(packages);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Packages</h1>
            <p className="text-muted-foreground">Manage Hajj and Umrah travel packages</p>
          </div>
          <Link to="/admin/packages/create">
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
              Create Package
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search packages..." className="pl-10" onChange={(e) => setPackageChange(e.target.value)} />
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
                {filteredPackagesData.map((pkg) => (
                  <TableRow key={pkg._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{pkg.packageTitle}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {pkg.packageLocations}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            {pkg.packageFeatured && (
                              <Badge variant="warning" className="mt-1">Featured</Badge>
                            )}
                            {pkg.packageActive && (
                              <Badge variant="secondary" className="mt-1">Active</Badge>
                            )}
                            {pkg.packageInstantBooking && (
                              <Badge variant="default" className="mt-1">Instant Booking</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{pkg.packageProvider}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={pkg.packageType === "both" ? "primary" : "secondary"}>
                        {getType(pkg.packageType).toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {pkg.packageDuration} days
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <IndianRupee className="h-3 w-3" />
                        {pkg.packagePriceFrom.toLocaleString()} - {pkg.packagePriceTo.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-3 w-3" />
                          {pkg.packageMinimumBooking}/{pkg.packageCapacity}
                        </div>
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(Number(pkg.packageMinimumBooking) / Number(pkg.packageCapacity)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        pkg.isDraft === false ? "success" : 
                        pkg.isDraft === true ? "warning" : "secondary"
                      }>
                        {pkg.isDraft ? "Draft" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex items-end flex-col">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" className="ml-12" size="sm">
                            <Eye className="h-9 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Package Details</DialogTitle>
                            <DialogDescription>
                              Complete information for selected package
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Package Title</label>
                                <p className="text-sm text-muted-foreground">{pkg.packageTitle}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Provider</label>
                                <p className="text-sm text-muted-foreground">{pkg.packageProvider}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Package Type</label>
                                <p className="text-sm text-muted-foreground">{getType(pkg.packageType)}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Duration (Days)</label>
                                <p className="text-sm text-muted-foreground">{pkg.packageDuration}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Locations Covered</label>
                                <p className="text-sm text-muted-foreground">{pkg.packageLocations}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Makkah Hotel</label>
                                <p className="text-sm text-muted-foreground">{pkg.packageMakkahHotel}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Madinah Hotel</label>
                                <p className="text-sm text-muted-foreground">{pkg.packageMadinahHotel}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Room Type</label>
                                <p className="text-sm text-muted-foreground">{getRoomType(pkg.packageRoomType)}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Price Range</label>
                                <p className="text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1 text-sm">
                                    <IndianRupee className="h-3 w-3" />
                                    {pkg.packagePriceFrom.toLocaleString()} - {pkg.packagePriceTo.toLocaleString()}
                                  </div>
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Total Capacity</label>
                                <p className="text-sm text-muted-foreground">{pkg.packageCapacity}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Minimum Booking</label>
                                <p className="text-sm text-muted-foreground">{pkg.packageMinimumBooking}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Tags</label>
                                <p className="text-sm text-muted-foreground">{pkg.packageTags}</p>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Package Category</label>
                              <p className="text-sm text-muted-foreground">{getCategory(pkg.packageCategory)}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Package Description</label>
                              <p className="text-sm text-muted-foreground">{pkg.packageDescription}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Departure Information</label>
                              <p className="text-sm text-muted-foreground">{pkg.packageDepartureDescription}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Inclusions</label>
                              <p className="text-sm text-muted-foreground">{pkg.packageInclusions}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Exclusions</label>
                              <p className="text-sm text-muted-foreground">{pkg.packageExclusions}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link to="/admin/packages/create" state={{ packageId: pkg._id }}>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Package
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem onClick={() => handleDuplicatePackage(pkg)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(pkg._id)}>
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