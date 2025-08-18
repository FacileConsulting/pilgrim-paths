import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Package, Save, Calendar, MapPin, DollarSign, Plane } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// File imports
import { CREATE_PACKAGE } from "@/lib/constant";


const CreatePackage = () => {
  
  // Constants
  const { 
    placeholder,
    packageTypeOptions,
    packageRoomTypeOptions,
    packageCategoryOptions,
    packageCurrencyOptions
    } = CREATE_PACKAGE;
  const { 
    title,
    packageDescription,
    duration,
    departureDescription,
    locations,
    makkahHotel,
    madinahHotel,
    priceFrom,
    priceTo,
    capacity,
    minimumBooking,
    inclusions,
    exclusions, 
    tags
  } = placeholder;

  const location = useLocation();
  const navigate = useNavigate();
  const packageId = location?.state?.packageId ?? undefined;

  type PackageType = typeof packageTypeOptions[number]["value"]; 
  type PackageRoomType = typeof packageRoomTypeOptions[number]["value"];
  type PackageCategory = typeof packageCategoryOptions[number]["value"];
  type PackageCurrency = typeof packageCurrencyOptions[number]["value"];

  const [packageType, setPackageType] = useState<PackageType>("hajj");
  const [packageRoomType, setPackageRoomType] = useState<PackageRoomType>("single");
  const [packageCategory, setPackageCategory] = useState<PackageCategory>("economy");
  const [packageCurrency, setPackageCurrency] = useState<PackageCurrency>("inr");
  const [providers, setProviders] = useState<any>([]);
  const [packageProvider, setPackageProvider] = useState("");
  const [inputData, setInputData] = useState<any>({
    packageTitle: "",
    packageDescription: "",
    packageDuration: "",
    packageStartDate: "",
    packageEndDate: "",
    packageDepartureDescription: "",
    packageLocations: "",
    packageMakkahHotel: "",
    packageMadinahHotel: "",
    packagePriceFrom: "",
    packagePriceTo: "",
    packageCapacity: "",
    packageMinimumBooking: "",
    packageInclusions: "",
    packageExclusions: "",
    packageFeatured: false,
    packageActive: true,
    packageInstantBooking: false,
    packageTags: "",
  });

  const handleInput = (
    e
  ) => {
    const { id, value } = e.currentTarget;
    setInputData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCancel = () => {
    setInputData({
      packageTitle: "",
      packageDescription: "",
      packageDuration: "",
      packageStartDate: "",
      packageEndDate: "",
      packageDepartureDescription: "",
      packageLocations: "",
      packageMakkahHotel: "",
      packageMadinahHotel: "",
      packagePriceFrom: "",
      packagePriceTo: "",
      packageCapacity: "",
      packageMinimumBooking: "",
      packageInclusions: "",
      packageExclusions: "",
      packageFeatured: false,
      packageActive: true,
      packageInstantBooking: false,
      packageTags: "",
    });
    setPackageType("hajj");
    setPackageProvider("");
    setPackageRoomType("single");
    setPackageCategory("economy");
    setPackageCurrency("inr");
  };

  const validation = () => {
    let isValid = true;
    const {
      packageTitle,
      packageDuration,
      packageLocations,
      packagePriceFrom,
      packagePriceTo,
      packageCapacity,
      packageMinimumBooking
    } = inputData;

    const numberRegex = /^\d+$/;

    if (packageMinimumBooking && packageCapacity && Number(packageMinimumBooking) > Number(packageCapacity)) {
      toast({ title: 'Capacity should be greater than minimum booking' });
      isValid = false;
    }

    if (!packageMinimumBooking || !numberRegex.test(packageMinimumBooking)) {
      toast({ title: 'Please enter a valid booking number' });
      isValid = false;
    }

    if (!packageCapacity || !numberRegex.test(packageCapacity)) {
      toast({ title: 'Please enter a valid capacity' });
      isValid = false;
    }

    if (packagePriceTo && packagePriceFrom && Number(packagePriceTo) < Number(packagePriceFrom)) {
      toast({ title: 'Please enter a valid price range' });
      isValid = false;
    }

    if (!packagePriceTo || !numberRegex.test(packagePriceTo)) {
      toast({ title: 'Please enter a valid price' });
      isValid = false;
    }

    if (!packagePriceFrom || !numberRegex.test(packagePriceFrom)) {
      toast({ title: 'Please enter a valid price' });
      isValid = false;
    }

    if (!packageLocations) {
      toast({ title: 'Please enter locations' });
      isValid = false;
    }

    if (!packageDuration || !numberRegex.test(packageDuration)) {
      toast({ title: 'Please enter a valid duration' });
      isValid = false;
    }

    if (!packageProvider) {
      toast({ title: 'Please select provider' });
      isValid = false;
    }

    if (!packageTitle) {
      toast({ title: 'Please enter package name' });
      isValid = false;
    }

    return isValid;
  }

  const handleSavePackage = async (isDraft: boolean = false) => {
    if (!validation()) return;
    const payload: any = {
      type: packageId ? "PACKAGE_UPDATE" : "PACKAGE_CREATE",
      packageId: packageId || undefined,
      isDraft,
      packageType,
      packageProvider,
      packageRoomType,
      packageCategory,
      packageCurrency,
      ...inputData
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
        handleCancel();
        navigate("/admin/packages");
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error package save data:", error);
      toast({ title: "Something went wrong!" });
    }
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
        const filtered = data.data.map((provider: any) => provider.providerName);
        const providersOptions = filtered.map((provider: any) => ({ label: provider, value: provider }));
        setProviders(providersOptions);
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error provider save data:", error);
      toast({ title: "Something went wrong!" });
    }
  }

  const fetchPackage = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "PACKAGE_FETCH", packageId })
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setPackageType(data.data.packageType);
        setPackageProvider(data.data.packageProvider);
        setPackageRoomType(data.data.packageRoomType);
        setPackageCategory(data.data.packageCategory);
        setPackageCurrency(data.data.packageCurrency);
        delete data.data.packageType;
        delete data.data.packageProvider;
        delete data.data.packageRoomType;
        delete data.data.packageCategory;
        delete data.data.packageCurrency;
        
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
    fetchProviders();
  }, []);

  useEffect(() => {
    if (packageId) {
      fetchPackage();
    }
  }, [packageId]); 

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/packages">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Packages
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Package</h1>
            <p className="text-muted-foreground">Create a new Hajj or Umrah travel package</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Package Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Package Title *</Label>
                  <Input 
                    id="packageTitle" 
                    placeholder={title} 
                    value={inputData.packageTitle}
                    onInput={handleInput} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Package Type *</Label>
                    <Select value={packageType} onValueChange={(val) => setPackageType(val as PackageType)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          packageTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider">Provider *</Label>                    
                    <Select value={packageProvider} onValueChange={(val) => setPackageProvider(val as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          providers.map((option) => (
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
                  <Label htmlFor="description">Package Description</Label>
                  <Textarea 
                    id="packageDescription" 
                    placeholder={packageDescription} 
                    value={inputData.packageDescription}
                    onInput={handleInput}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Duration & Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (Days) *</Label>
                    <Input 
                      id="packageDuration" 
                      placeholder={duration} 
                      value={inputData.packageDuration}
                      onInput={handleInput} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input 
                      type="date"
                      id="packageStartDate"
                      value={inputData.packageStartDate}
                      onInput={handleInput} />
                    {/* <Input id="start-date" type="date" onChange={(e) => handleChange(e)}/> */}
                    {/* <Input id="start-date" type="date" onChange={(e) => setInputData({ ...inputData, packageStartDate: e.target.value })}/> */}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input 
                      type="date"
                      id="packageEndDate"
                      value={inputData.packageEndDate}
                      onInput={handleInput} />
                    {/* <Input id="end-date" type="date" /> */}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="packageDepartureDescription">Departure Information</Label>                  
                  <Textarea 
                    id="packageDepartureDescription" 
                    placeholder={departureDescription} 
                    value={inputData.packageDepartureDescription}
                    onInput={handleInput}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Locations & Accommodation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="packageLocations">Locations Covered *</Label>
                  <Input 
                    id="packageLocations" 
                    placeholder={locations} 
                    value={inputData.packageLocations}
                    onInput={handleInput} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="packageMakkahHotel">Makkah Hotel</Label>                    
                    <Input 
                      id="packageMakkahHotel" 
                      placeholder={makkahHotel} 
                      value={inputData.packageMakkahHotel}
                      onInput={handleInput} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="packageMadinahHotel">Madinah Hotel</Label>                   
                    <Input 
                      id="packageMadinahHotel" 
                      placeholder={madinahHotel} 
                      value={inputData.packageMadinahHotel}
                      onInput={handleInput} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="room-type">Room Type</Label>
                  <Select value={packageRoomType} onValueChange={(val) => setPackageRoomType(val as PackageRoomType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        packageRoomTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing & Capacity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price-from">Price From *</Label>                                    
                    <Input 
                      id="packagePriceFrom" 
                      placeholder={priceFrom} 
                      value={inputData.packagePriceFrom}
                      onInput={handleInput} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price-to">Price To *</Label>                                                        
                    <Input 
                      id="packagePriceTo" 
                      placeholder={priceTo} 
                      value={inputData.packagePriceTo}
                      onInput={handleInput} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={packageCurrency} onValueChange={(val) => setPackageCurrency(val as PackageCurrency)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          packageCurrencyOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Total Capacity *</Label>                                                                          
                    <Input 
                      id="packageCapacity" 
                      placeholder={capacity} 
                      value={inputData.packageCapacity}
                      onInput={handleInput} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-booking">Minimum Booking</Label>                     
                    <Input 
                      id="packageMinimumBooking" 
                      placeholder={minimumBooking} 
                      value={inputData.packageMinimumBooking}
                      onInput={handleInput} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Included Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="included">What's Included</Label>
                  <Textarea 
                    id="packageInclusions" 
                    placeholder={inclusions} 
                    value={inputData.packageInclusions}
                    onInput={handleInput}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excluded">What's Not Included</Label>                  
                  <Textarea 
                    id="packageExclusions" 
                    placeholder={exclusions} 
                    value={inputData.packageExclusions}
                    onInput={handleInput}
                    rows={3}
                  />
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
                <Button className="w-full" onClick={() => handleSavePackage(false)}>
                  <Save className="h-4 w-4 mr-2" />
                  Create Package
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleSavePackage(true)}>
                  Save as Draft
                </Button>
                <Link to="/admin/packages" className="block">
                  <Button variant="ghost" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Package Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Package</Label>
                  <Switch 
                    id="packageFeatured" 
                    checked={inputData.packageFeatured}
                    onCheckedChange={(checked) => setInputData((prev) => ({ ...prev, packageFeatured: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="active">Active Status</Label>
                  <Switch 
                    id="packageActive" 
                    checked={inputData.packageActive}                    
                    onCheckedChange={(checked) => setInputData((prev) => ({ ...prev, packageActive: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="instant-booking">Instant Booking</Label>
                  <Switch 
                    id="packageInstantBooking" 
                    checked={inputData.packageInstantBooking}                                       
                    onCheckedChange={(checked) => setInputData((prev) => ({ ...prev, packageInstantBooking: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Package Category</Label>                  
                  <Select value={packageCategory} onValueChange={(val) => setPackageCategory(val as PackageCategory)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        packageCategoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>                                      
                  <Input 
                    id="packageTags" 
                    placeholder={tags} 
                    value={inputData.packageTags}
                    onInput={handleInput} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreatePackage;