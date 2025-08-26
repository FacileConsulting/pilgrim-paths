import { useEffect, useState } from "react";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Building2, Save } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// File imports
import { ADD_NEW_PROVIDER, BASE_URL } from "@/lib/constant";

const AddProvider = () => {

  // Constants
  const { 
    placeholder,
    providerStatusOptions,
    providerEmployeesOptions,
    providerServicesOptions,
    providerVerificationStatusOptions
   } = ADD_NEW_PROVIDER;
  const { 
    name,
    description,
    email,
    phone,
    website,
    address,
    license,
    established,
    notes,
    rating
  } = placeholder;

  const location = useLocation();
  const navigate = useNavigate();
  const providerId = location?.state?.providerId ?? undefined;

  type ProviderStatus = typeof providerStatusOptions[number]["value"]; // "pending" | "active" | "suspended"
  type ProviderEmployees = typeof providerEmployeesOptions[number]["value"];
  type ProviderServices = typeof providerServicesOptions[number]["value"];
  type ProviderVerificationStatus = typeof providerVerificationStatusOptions[number]["value"];
  
  const [providerStatus, setProviderStatus] = useState<ProviderStatus>("pending");
  const [providerEmployees, setProviderEmployees] = useState<ProviderEmployees>("1-10");
  const [providerServices, setProviderServices] = useState<ProviderServices>("hajj");
  const [providerVerificationStatus, setProviderVerificationStatus] = useState<ProviderVerificationStatus>("pending");
  const [inputData, setInputData] = useState<any>({
    providerName: "",
    providerDescription: "",
    providerEmail: "",
    providerPhone: "",
    providerWebsite: "",
    providerAddress: "",
    providerLicense: "",
    providerEstablished: "",
    providerAdminNotes: "",
    providerRating: ""
  });

  const handleInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.currentTarget;
    setInputData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCancel = () => {
    setInputData({
      providerName: "",
      providerDescription: "",
      providerEmail: "",
      providerPhone: "",
      providerWebsite: "",
      providerAddress: "",
      providerLicense: "",
      providerEstablished: "",
      providerAdminNotes: "",
      providerRating: ""
    });
    setProviderStatus("pending");
    setProviderEmployees("1-10");
    setProviderServices("hajj");
    setProviderVerificationStatus("pending");
  };

  const validation = () => {
    let isValid = true;
    const {
      providerName,
      providerEmail,
      providerPhone,
      providerLicense,
      providerEstablished,
      providerRating
    } = inputData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const licenseRegex = /^\d+$/;
    const establishedRegex = /^\d{4}$/;
    const ratingRegex = /^(?:[1-4](?:\.[0-9])|5\.0)$/;

    if (!providerRating || !ratingRegex.test(providerRating)) {
      toast({ title: 'Please enter a valid rating' });
      isValid = false;
    }

    if (!providerEstablished || !establishedRegex.test(providerEstablished)) {
      toast({ title: 'Please enter a valid year' });
      isValid = false;
    }

    if (!providerLicense || !licenseRegex.test(providerLicense)) {
      toast({ title: 'Please enter a valid license' });
      isValid = false;
    }

    if (!providerPhone || !phoneRegex.test(providerPhone)) {
      toast({ title: 'Please enter a valid phone number' });
      isValid = false;
    }

    if (!providerEmail || !emailRegex.test(providerEmail)) {
      toast({ title: 'Please enter a valid email' });
      isValid = false;
    }

    if (!providerName) {
      toast({ title: 'Please enter provider name' });
      isValid = false;
    }

    return isValid;
  }

  const handleSaveProvider = async (isDraft: boolean = false) => {
    if (!validation()) return;
    const payload: any = {
      type: providerId ? "PROVIDER_UPDATE" : "PROVIDER_CREATE",
      providerId: providerId || undefined,
      isDraft,
      providerStatus,
      providerEmployees,
      providerServices,
      providerVerificationStatus,
      ...inputData
    };
    try {
      const response = await fetch(`${BASE_URL}/api/providers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload })
      });

      const data = await response.json();

      if (response.ok) {
        toast({ title: data.message });
        handleCancel();        
        navigate("/admin/providers");
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error provider save data:", error);
      toast({ title: "Something went wrong!" });
    }
  };

  const fetchProvider = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/providers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "PROVIDER_FETCH", providerId })
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setProviderStatus(data.data.providerStatus);
        setProviderEmployees(data.data.providerEmployees);
        setProviderServices(data.data.providerServices);
        setProviderVerificationStatus(data.data.providerVerificationStatus);
        delete data.data.providerStatus;
        delete data.data.providerEmployees;
        delete data.data.providerServices;
        delete data.data.providerVerificationStatus;
        delete data.data.isDraft;
        delete data.data._id;
        setInputData(data.data);
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error provider save data:", error);
      toast({ title: "Something went wrong!" });
    }
  };

  useEffect(() => {
    if (providerId) {
      fetchProvider();
    }
  }, [providerId]);

  console.log(inputData , providerStatus);
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/providers">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Providers
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{providerId ? "Edit Provider" : "Add New Provider"}</h1>
            <p className="text-muted-foreground">
              {providerId ? "Edit travel agency or service provider" : "Create a new travel agency or service provider"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Provider Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Provider Name *</Label>
                    <Input 
                      id="providerName" 
                      placeholder={name} 
                      value={inputData.providerName}
                      onInput={handleInput} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={providerStatus} onValueChange={(val) => setProviderStatus(val as ProviderStatus)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          providerStatusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="providerDescription" 
                    placeholder={description} 
                    value={inputData.providerDescription}
                    onInput={handleInput}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="providerEmail" 
                      type="email" 
                      placeholder={email}
                      value={inputData.providerEmail}
                      onInput={handleInput}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="providerPhone" 
                      placeholder={phone}
                      value={inputData.providerPhone}
                      onInput={handleInput}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="providerWebsite"
                    placeholder={website}
                    value={inputData.providerWebsite}
                    onInput={handleInput}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="providerAddress" 
                    placeholder={address} 
                    value={inputData.providerAddress}
                    onInput={handleInput}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>                    
                    <Input 
                      id="providerLicense"
                      placeholder={license}
                      value={inputData.providerLicense}
                      onInput={handleInput}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="established">Year Established</Label>                   
                    <Input 
                      id="providerEstablished"
                      type="number"
                      placeholder={established}
                      value={inputData.providerEstablished}
                      onInput={handleInput}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employees">Number of Employees</Label>
                    <Select value={providerEmployees} onValueChange={(val) => setProviderEmployees(val as ProviderEmployees)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          providerEmployeesOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="services">Services Offered</Label>
                    <Select value={providerServices} onValueChange={(val) => setProviderServices(val as ProviderServices)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select services" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          providerServicesOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={() => handleSaveProvider(false)}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Provider
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleSaveProvider(true)}>
                  Save as Draft
                </Button>
                <Link to="/admin/providers" className="block">
                  <Button variant="ghost" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Verification Status</Label>
                  <Select value={providerVerificationStatus} onValueChange={(val) => setProviderVerificationStatus(val as ProviderVerificationStatus)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pending verification" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          providerVerificationStatusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input 
                    id="providerRating"
                    placeholder={rating}
                    value={inputData.providerRating}
                    onInput={handleInput}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Admin Notes</Label>
                  <Textarea 
                    id="providerAdminNotes" 
                    placeholder={notes} 
                    value={inputData.providerAdminNotes}
                    onInput={handleInput}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProvider;