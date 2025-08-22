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
  Building2, 
  Mail, 
  Phone, 
  MapPin,
  Star,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ADD_NEW_PROVIDER } from "@/lib/constant";

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

  // Constants
  const { 
    providerStatusOptions,
    providerVerificationStatusOptions,
    providerServicesOptions
  } = ADD_NEW_PROVIDER;

  const navigate = useNavigate();

  const [providersData, setProvidersData] = useState([]);
  const [providerChange, setProviderChange] = useState("");

  const getStatus = (status: string) => {
    const statusObj = providerStatusOptions.find((option) => option.value === status);
    return statusObj?.label || "";
  };

  const getStatusColor = (status: string) => {
    const color = status === "active" ? "success" : status === "pending" ? "warning" : "destructive";
    return color;
  };

  const getVerificationStatus = (status: string) => {
    const statusObj = providerVerificationStatusOptions.find((option) => option.value === status);
    return statusObj?.label || "";
  };

  const getServices = (services: string) => {
    const serviceObj = providerServicesOptions.find((option) => option.value === services);
    return serviceObj?.label || "";
  };

  const getVerificationStatusColor = (status: string) => {
    const color = status === "verified" ? "success" : status === "pending" ? "warning" : "destructive";
    return color;
  };

  const fetchProviders = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "PROVIDER_FETCH_ALL" })     
      });

      const data = await response.json();

      if (response.ok && data.status === "success" && data.data.length > 0) {
        setProvidersData(data.data);
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error provider save data:", error);
      toast({ title: "Something went wrong!" });
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("http://localhost:8000/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "PROVIDER_DELETE", providerId: id })     
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        toast({ title: data.message });
        fetchProviders();
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error provider save data:", error);
      toast({ title: "Something went wrong!" });
    }
  }

  const filteredProvidersData = useMemo(() => {
    if (providerChange.length < 2) return providersData;
    return providersData.filter((provider) =>
      provider.providerName.toLowerCase().includes(providerChange.toLowerCase())
    );
  }, [providerChange, providersData]);

  const handleViewPackages = (providerName: string) => {
    navigate("/admin/packages", {
      state: { search: providerName }
    });
  }

  useEffect(() => {
    fetchProviders();
    console.log(providers);
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Providers</h1>
            <p className="text-muted-foreground">Manage travel agencies and service providers</p>
          </div>
          <Link to="/admin/providers/add">
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
              Add Provider
            </Button>
          </Link>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search providers..." className="pl-10" onChange={(e) => setProviderChange(e.target.value)} />
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
          {filteredProvidersData.map((provider) => (
            <Card key={provider._id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{provider.providerName}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getStatusColor(provider.providerStatus)}>
                          {getStatus(provider.providerStatus)}
                        </Badge>
                        <Badge variant={getVerificationStatusColor(provider.providerVerificationStatus)}>
                          {getVerificationStatus(provider.providerVerificationStatus)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="ml-12" size="sm">
                        <Eye className="h-9 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Provider Details</DialogTitle>
                        <DialogDescription>
                          Complete information for selected provider
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Provider Name</label>
                            <p className="text-sm text-muted-foreground">{provider.providerName}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Status</label>
                            <p className="text-sm text-muted-foreground">{getStatus(provider.providerStatus)}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <p className="text-sm text-muted-foreground">{provider.providerEmail}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Phone Number</label>
                            <p className="text-sm text-muted-foreground">{provider.providerPhone}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Website</label>
                            <p className="text-sm text-muted-foreground">{provider.providerWebsite}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">License Number</label>
                            <p className="text-sm text-muted-foreground">{provider.providerLicense}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Year Established</label>
                            <p className="text-sm text-muted-foreground">{provider.providerEstablished}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Number of Employees</label>
                            <p className="text-sm text-muted-foreground">{provider.providerEmployees}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Services Offered</label>
                            <p className="text-sm text-muted-foreground">{getServices(provider.providerServices)}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Verification Status</label>
                            <p className="text-sm text-muted-foreground">{getVerificationStatus(provider.providerVerificationStatus)}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Rating</label>
                            <p className="text-sm text-muted-foreground">{provider.providerRating}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Address</label>
                          <p className="text-sm text-muted-foreground">{provider.providerAddress}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Description</label>
                          <p className="text-sm text-muted-foreground">{provider.providerDescription}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Admin Notes</label>
                          <p className="text-sm text-muted-foreground">{provider.providerAdminNotes}</p>
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
                      <Link to="/admin/providers/add" state={{ providerId: provider._id }}>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Provider
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(provider._id)}>
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
                    {provider.providerEmail}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {provider.providerPhone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {provider.providerAddress}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{provider.providerPackages || 0}</p>
                    <p className="text-xs text-muted-foreground">Packages</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-lg font-bold text-foreground">{provider.providerRating || '4.5'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{provider.providerReviews || 0} reviews</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewPackages(provider.providerName)}>
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