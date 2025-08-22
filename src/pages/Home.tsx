import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  Users,
  Phone,
  Mail,
  Globe,
  Compass,
  Filter,
  Menu,
  X
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactModal } from "@/components/ContactModal";
import { toast } from "@/hooks/use-toast";

// File imports
import { CREATE_PACKAGE } from "@/lib/constant";

const featuredPackages = [
  {
    id: 1,
    title: "Umrah Deluxe Package",
    provider: "Al-Haramain Travel",
    price: { from: 3500, to: 4200 },
    duration: 14,
    rating: 4.8,
    reviews: 156,
    image: "/good.svg",
    features: ["5-star hotels", "VIP transport", "Guided tours"],
    location: "Makkah & Madinah",
    description: "Experience the spiritual journey of a lifetime with our carefully curated deluxe package including luxury accommodation, VIP transportation, and expert guided tours.",
    contactInfo: {
      phone: "+1-800-555-0123",
      email: "info@alharamain.com",
      website: "www.alharamain.com"
    }
  },
  {
    id: 2,
    title: "Hajj Premium Experience",
    provider: "Makkah Tours",
    price: { from: 8500, to: 12000 },
    duration: 21,
    rating: 4.9,
    reviews: 89,
    image: "/api/placeholder/400/200",
    features: ["Luxury accommodation", "Private transport", "24/7 support"],
    location: "Makkah, Madinah, Mina",
    description: "Complete Hajj experience with premium services, luxury accommodations, and dedicated support throughout your spiritual journey.",
    contactInfo: {
      phone: "+1-800-555-0456",
      email: "info@makkahtours.com",
      website: "www.makkahtours.com"
    }
  },
  {
    id: 3,
    title: "Budget Umrah Package",
    provider: "Sacred Journey",
    price: { from: 2200, to: 2800 },
    duration: 10,
    rating: 4.6,
    reviews: 203,
    image: "/api/placeholder/400/200",
    features: ["3-star hotels", "Group transport", "Basic meals"],
    location: "Makkah & Madinah",
    description: "Affordable Umrah package perfect for first-time pilgrims, including comfortable accommodation and group transportation.",
    contactInfo: {
      phone: "+1-800-555-0789",
      email: "info@sacredjourney.com",
      website: "www.sacredjourney.com"
    }
  }
];

// const providerDetails = {
//   name: "Al-Haramain Travel",
//   email: "info@alharamain.com",
//   phone: "+1-800-555-0123",
//   website: "www.alharamain.com",
//   address: "123 Islamic Center Blvd, New York, NY 10001",
//   description: "Leading Hajj and Umrah travel specialist with over 20 years of experience serving pilgrims worldwide.",
//   rating: 4.8,
//   totalPackages: 45,
//   yearsInBusiness: 20
// };

const Home = () => {
  
  // Constants
  const { 
    packageDepartureOptions
  } = CREATE_PACKAGE;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [providerDetails, setProviderDetails] = useState({});
  const [displayPackages, setDisplayPackages] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [packagesData, setPackagesData] = useState([]);
  const [featuredPackagesData, setFeaturedPackagesData] = useState([]);
  const [packageChange, setPackageChange] = useState("");

  const fetchProvider = async (providerId) => {
    try {
      const response = await fetch("http://localhost:8000/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "PROVIDER_FETCH", providerId })
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setProviderDetails(data.data);
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error provider save data:", error);
      toast({ title: "Something went wrong!" });
    }
  };

  const validation = () => {
    let isValid = true;

    const hasLocation = !!selectedLocation;
    const hasSearch = packageChange && packageChange.trim().length >= 3;

    if (!hasLocation && !hasSearch) {
      toast({ title: "Please select a location or enter at least 3 characters to search" });
      isValid = false;
    }

    return isValid;
  }

  const fetchPackages = async (isFeatured: Boolean = false) => {
    try {
      const response = await fetch("http://localhost:8000/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "PACKAGE_FETCH_ALL" })     
      });

      const data = await response.json();

      if (response.ok && data.status === "success" && data.data.length > 0) {
        !isFeatured && setDisplayPackages(true);
        isFeatured ? setFeaturedPackagesData(data.data) : setPackagesData(data.data);
      } else {
        toast({ title: data.message || "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error package save data:", error);
      toast({ title: "Something went wrong!" });
    }
  }


  const handleSearchPackages = async (isFeatured: Boolean = false) => {
    if (!validation()) return;
    fetchPackages(isFeatured);
  }

  const filteredPackagesData = useMemo(() => {

    const search = packageChange.toLowerCase();
    const location = selectedLocation?.toLowerCase();
    const isAutoDetect = location === "auto" || !location;

    return packagesData.filter((pkg) => {
      const matchesSearch =
        pkg.packageTitle.toLowerCase().includes(search) ||
        pkg.packageType.toLowerCase().includes(search) ||
        pkg.packageProvider.toLowerCase().includes(search);
      
      const matchesLocation = location && pkg.packageDeparture.toLowerCase().includes(location);

      if (isAutoDetect) {
        // Only search filter
        return matchesSearch;
      }

      if (!search && location) {
        // Case 2: Only location selected (no valid search input)
        return matchesLocation;
      }

      // Case 3: Both search + location
      return matchesSearch && matchesLocation;
    });
  }, [packageChange, selectedLocation, packagesData]);

  const handleContactClick = async (packageData) => {
    await fetchProvider(packageData.providerId);
    setSelectedPackage(packageData);
    setShowContactModal(true);
  };

  useEffect(() => {
    fetchPackages(true);
  }, []);

  const popularSearches = [
    "Hajj packages 2024",
    "Umrah Deluxe",
    "Budget Umrah",
    "Family Hajj packages",
    "Umrah from New York",
    "15 days Hajj"
  ];

  if (showResults) {
    return <SearchResults query={searchQuery} location={selectedLocation} onContactClick={handleContactClick} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-primary/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <Compass className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">HajjUmrah</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-foreground hover:text-primary font-medium">Home</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary">About</Link>
              <Link to="/team" className="text-muted-foreground hover:text-primary">Team</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
              <Link to="/support" className="text-muted-foreground hover:text-primary">Support</Link>
              <Link to="/admin/providers/add">
                <Button variant="outline" size="sm">Admin Portal</Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-foreground hover:text-primary py-2 font-medium">Home</Link>
                <Link to="/about" className="text-muted-foreground hover:text-primary py-2">About</Link>
                <Link to="/team" className="text-muted-foreground hover:text-primary py-2">Team</Link>
                <Link to="/contact" className="text-muted-foreground hover:text-primary py-2">Contact</Link>
                <Link to="/support" className="text-muted-foreground hover:text-primary py-2">Support</Link>
                <Link to="/admin" className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">Admin Portal</Button>
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your Perfect
            <span className="text-primary block">Hajj & Umrah Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Search through hundreds of verified packages from trusted providers worldwide
          </p>

          {/* Google-like Search Interface */}
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="shadow-elevated p-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for Hajj packages, Umrah tours, or provider names..."
                    className="pl-12 h-14 text-lg border-0 focus-visible:ring-0"
                    onChange={(e) => setPackageChange(e.target.value)} 
                    value={packageChange}
                  />
                </div>


                <div className="flex gap-2">
                  <Select value={selectedLocation} onValueChange={(val) => setSelectedLocation(val as any)}>
                    <SelectTrigger className="w-48 h-14 border-0">
                      <MapPin className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Your location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">📍 Auto-detect</SelectItem>
                      {
                        packageDepartureOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={()=> handleSearchPackages()}
                    className="h-14 px-8 bg-primary hover:bg-primary/90"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Popular Searches */}
            {/* <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(search);
                      setShowResults(true);
                    }}
                    className="text-xs hover:bg-primary hover:text-primary-foreground"
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {
        displayPackages && (
          <div className="container mx-auto px-4 py-16 bg-secondary/30">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Seached Packages</h2>
              <p className="text-muted-foreground">Search results from our trusted partners</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredPackagesData.map((pkg) => (
                <PackageCard key={pkg._id} package={pkg} onContactClick={handleContactClick} />
              ))}
            </div>
          </div>
        )
      }

      

      {/* Featured Packages */}
      <div className="container mx-auto px-4 py-16 bg-secondary/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Featured Packages</h2>
          <p className="text-muted-foreground">Hand-picked packages from our trusted partners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredPackagesData.map((pkg) => (
            pkg.packageFeatured && <PackageCard key={pkg._id} package={pkg} onContactClick={handleContactClick} />
          ))}
        </div>
      </div>

      {/* Customer Testimonials / Feedback Section */}
      <div className="container mx-auto px-4 py-16 bg-secondary/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">What Our Pilgrims Say</h2>
          <p className="text-muted-foreground">Hear from thousands of satisfied customers</p>
        </div>

        <TestimonialCarousel />
      </div>

      {/* Trust Indicators */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">Verified Packages</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <p className="text-muted-foreground">Trusted Providers</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
            <p className="text-muted-foreground">Happy Pilgrims</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary/5 border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-primary rounded-lg">
                  <Compass className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">HajjUmrah</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Your trusted platform for finding the perfect Hajj and Umrah packages from verified providers worldwide.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="w-8 h-8 bg-muted rounded-full"></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-muted-foreground hover:text-primary">About Us</Link>
                <Link to="/team" className="block text-muted-foreground hover:text-primary">Our Team</Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary">Contact</Link>
                <Link to="/support" className="block text-muted-foreground hover:text-primary">Support</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <div className="space-y-2">
                <Link to="/support" className="block text-muted-foreground hover:text-primary">Help Center</Link>
                <Link to="/faq" className="block text-muted-foreground hover:text-primary">FAQ</Link>
                <Link to="/terms" className="block text-muted-foreground hover:text-primary">Terms of Service</Link>
                <Link to="/privacy" className="block text-muted-foreground hover:text-primary">Privacy Policy</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 HajjUmrah Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && selectedPackage && (
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          package={selectedPackage}
          providerDetails={providerDetails}
        />
      )}
    </div>
  );
};

const PackageCard = ({ package: pkg, onContactClick }) => {
  return (
    <Card className="shadow-card hover:shadow-elevated transition-all duration-300 group">

      <div className="relative overflow-hidden rounded-t-lg">
        <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          {pkg.packageImage ? (
            <img
              src={pkg.packageImage} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Package Image</p>
            </div>
          )}
        </div>

        <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
          {pkg.packageDuration} days
        </Badge>
      </div>

      
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {pkg.packageTitle}
            </h3>
            <p className="text-sm text-muted-foreground">{pkg.packageProvider}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">from</div>
            <div className="text-lg font-bold text-foreground">{pkg.packageCurrency === 'inr' ? '₹' : '$'}{pkg.packagePriceFrom}</div>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{pkg.rating || 0}</span>
          <span className="text-sm text-muted-foreground">({pkg.reviews || 0} reviews)</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <MapPin className="h-3 w-3" />
          {pkg.packageLocations}
        </div>

        <div className="space-y-2 mb-4">
          {pkg.packageInclusions &&pkg.packageInclusions.split(',').map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1 h-1 bg-primary rounded-full" />
              {feature}
            </div>
          ))}
        </div>

        <Button 
          className="w-full bg-primary hover:bg-primary/90"
          onClick={() => onContactClick(pkg)}
        >
          View Details & Contact
        </Button>
      </CardContent>
    </Card>
  );
};

const SearchResults = ({ query, location, onContactClick }) => {
  const filteredPackages = featuredPackages.filter(pkg => 
    pkg.title.toLowerCase().includes(query.toLowerCase()) ||
    pkg.provider.toLowerCase().includes(query.toLowerCase()) ||
    pkg.features.some(feature => feature.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <header className="border-b border-border bg-primary/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <Compass className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">HajjUmrah</span>
            </Link>
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  defaultValue={query}
                  className="pl-10 h-10"
                  placeholder="Search packages..."
                />
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <p className="text-muted-foreground">
            About {filteredPackages.length} results for "<span className="text-foreground font-medium">{query}</span>"
            {location && <span> in {location}</span>}
          </p>
        </div>

        {/* Search Results */}
        <div className="space-y-6">
          {filteredPackages.map((pkg) => (
            <SearchResultCard key={pkg.id} package={pkg} onContactClick={onContactClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SearchResultCard = ({ package: pkg, onContactClick }) => {
  return (
    <Card className="shadow-card hover:shadow-elevated transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
            <Calendar className="h-8 w-8 text-muted-foreground opacity-50" />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold text-foreground hover:text-primary cursor-pointer">
                  {pkg.title}
                </h3>
                <p className="text-muted-foreground">{pkg.provider}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  ${pkg.price.from.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">per person</div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {pkg.duration} days
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {pkg.location}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {pkg.rating} ({pkg.reviews} reviews)
              </div>
            </div>

            <p className="text-muted-foreground mb-4">
              {pkg.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {pkg.packageInclusions && pkg.packageInclusions.split(',').map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3">
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => onContactClick(pkg)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Provider
              </Button>
              <Button 
                variant="outline"
                onClick={() => onContactClick(pkg)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Inquiry
              </Button>
              <Button 
                variant="outline"
                onClick={() => onContactClick(pkg)}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Testimonial Carousel Component
const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Hassan",
      location: "New York, USA",
      rating: 5,
      text: "Absolutely amazing experience! The package was well organized and the staff was incredibly helpful throughout our Umrah journey.",
      package: "Umrah Deluxe Package"
    },
    {
      id: 2,
      name: "Fatima Al-Zahra",
      location: "London, UK",
      rating: 5,
      text: "Perfect Hajj experience with excellent accommodation and transportation. Highly recommend to all pilgrims.",
      package: "Hajj Premium Experience"
    },
    {
      id: 3,
      name: "Muhammad Ali",
      location: "Toronto, Canada",
      rating: 5,
      text: "Great value for money. Everything was arranged perfectly and the guides were very knowledgeable.",
      package: "Budget Umrah Package"
    },
    {
      id: 4,
      name: "Aisha Khan",
      location: "Sydney, Australia",
      rating: 4,
      text: "Wonderful spiritual journey with professional service. The whole family had an amazing time.",
      package: "Family Hajj Package"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg text-muted-foreground mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="space-y-1">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.package}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;