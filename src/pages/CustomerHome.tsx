import { useState } from "react";
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
  DollarSign,
  Phone,
  Mail,
  Globe,
  Compass,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const featuredPackages = [
  {
    id: 1,
    title: "Umrah Deluxe Package",
    provider: "Al-Haramain Travel",
    price: { from: 3500, to: 4200 },
    duration: 14,
    rating: 4.8,
    reviews: 156,
    image: "/api/placeholder/400/200",
    features: ["5-star hotels", "VIP transport", "Guided tours"],
    location: "Makkah & Madinah"
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
    location: "Makkah, Madinah, Mina"
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
    location: "Makkah & Madinah"
  }
];

const CustomerHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  };

  const popularSearches = [
    "Hajj packages 2024",
    "Umrah Deluxe",
    "Budget Umrah",
    "Family Hajj packages",
    "Umrah from New York",
    "15 days Hajj"
  ];

  if (showResults) {
    return <SearchResults query={searchQuery} location={selectedLocation} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Compass className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">HajjUmrah</span>
          </Link>
          <Link to="/admin">
            <Button variant="outline" size="sm">Admin</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Find Your Perfect
            <span className="text-primary block">Hajj & Umrah Journey</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Search through hundreds of verified packages from trusted providers worldwide
          </p>

          {/* Search Interface */}
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="shadow-elevated p-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for Hajj packages, Umrah tours, or provider names..."
                    className="pl-12 h-14 text-lg border-0 focus-visible:ring-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-48 h-14 border-0">
                      <MapPin className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Your location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">📍 Auto-detect</SelectItem>
                      <SelectItem value="new-york">New York, USA</SelectItem>
                      <SelectItem value="london">London, UK</SelectItem>
                      <SelectItem value="toronto">Toronto, Canada</SelectItem>
                      <SelectItem value="sydney">Sydney, Australia</SelectItem>
                      <SelectItem value="dubai">Dubai, UAE</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleSearch}
                    className="h-14 px-8 bg-primary hover:bg-primary-hover"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Popular Searches */}
            <div className="text-center">
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
                    className="text-xs"
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Packages */}
      <div className="container mx-auto px-4 py-16 bg-secondary/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Featured Packages</h2>
          <p className="text-muted-foreground">Hand-picked packages from our trusted partners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
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
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 HajjUmrah Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const PackageCard = ({ package: pkg }) => {
  return (
    <Card className="shadow-card hover:shadow-elevated transition-all duration-300 group">
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Package Image</p>
          </div>
        </div>
        <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
          {pkg.duration} days
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {pkg.title}
            </h3>
            <p className="text-sm text-muted-foreground">{pkg.provider}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">from</div>
            <div className="text-lg font-bold text-foreground">${pkg.price.from.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{pkg.rating}</span>
          <span className="text-sm text-muted-foreground">({pkg.reviews} reviews)</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <MapPin className="h-3 w-3" />
          {pkg.location}
        </div>

        <div className="space-y-2 mb-4">
          {pkg.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1 h-1 bg-primary rounded-full" />
              {feature}
            </div>
          ))}
        </div>

        <Button className="w-full bg-primary hover:bg-primary-hover">
          View Details & Contact
        </Button>
      </CardContent>
    </Card>
  );
};

const SearchResults = ({ query, location }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
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
            About 1,247 results for "<span className="text-foreground font-medium">{query}</span>"
            {location && <span> in {location}</span>}
          </p>
        </div>

        {/* Search Results */}
        <div className="space-y-6">
          {featuredPackages.map((pkg) => (
            <SearchResultCard key={pkg.id} package={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SearchResultCard = ({ package: pkg }) => {
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
              Experience the spiritual journey of a lifetime with our carefully curated package including accommodation, transportation, and guided tours.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {pkg.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3">
              <Button className="bg-primary hover:bg-primary-hover">
                <Phone className="h-4 w-4 mr-2" />
                Contact Provider
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Send Inquiry
              </Button>
              <Button variant="outline">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerHome;