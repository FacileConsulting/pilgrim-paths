import { useState } from "react";
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
  Filter,
  SlidersHorizontal,
  ArrowUpDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ContactModal } from "@/components/ContactModal";

interface SearchFilters {
  priceRange: [number, number];
  duration: string;
  packageType: string;
  rating: number;
  features: string[];
}

interface Package {
  id: number;
  title: string;
  provider: string;
  price: { from: number; to: number };
  duration: number;
  rating: number;
  reviews: number;
  location: string;
  features: string[];
  packageType: 'hajj' | 'umrah' | 'both';
  description: string;
}

const mockPackages: Package[] = [
  {
    id: 1,
    title: "Umrah Deluxe Package 2024",
    provider: "Al-Haramain Travel",
    price: { from: 3500, to: 4200 },
    duration: 14,
    rating: 4.8,
    reviews: 156,
    location: "Makkah & Madinah",
    features: ["5-star hotels", "VIP transport", "Guided tours", "24/7 support"],
    packageType: 'umrah',
    description: "Experience the spiritual journey of a lifetime with our carefully curated deluxe package including luxury accommodation and premium services."
  },
  {
    id: 2,
    title: "Hajj Premium Experience 2024",
    provider: "Makkah Tours",
    price: { from: 8500, to: 12000 },
    duration: 21,
    rating: 4.9,
    reviews: 89,
    location: "Makkah, Madinah, Mina",
    features: ["Luxury accommodation", "Private transport", "Dedicated guide", "All meals included"],
    packageType: 'hajj',
    description: "Complete Hajj experience with premium accommodations and personalized service throughout your spiritual journey."
  },
  {
    id: 3,
    title: "Budget Umrah Package",
    provider: "Sacred Journey",
    price: { from: 2200, to: 2800 },
    duration: 10,
    rating: 4.6,
    reviews: 203,
    location: "Makkah & Madinah",
    features: ["3-star hotels", "Group transport", "Basic meals", "English guide"],
    packageType: 'umrah',
    description: "Affordable Umrah package perfect for families and budget-conscious travelers without compromising on essential services."
  },
  {
    id: 4,
    title: "Family Hajj Complete Package",
    provider: "Holy Land Travel",
    price: { from: 6500, to: 9000 },
    duration: 18,
    rating: 4.7,
    reviews: 124,
    location: "Makkah, Madinah, Mina, Arafat",
    features: ["Family rooms", "Child-friendly", "Group activities", "Educational tours"],
    packageType: 'hajj',
    description: "Specially designed family package with accommodations and activities suitable for travelers of all ages."
  },
  {
    id: 5,
    title: "Express Umrah Package",
    provider: "Quick Pilgrimage",
    price: { from: 1800, to: 2200 },
    duration: 7,
    rating: 4.4,
    reviews: 87,
    location: "Makkah & Madinah",
    features: ["Economy hotels", "Shared transport", "Basic services", "Quick processing"],
    packageType: 'umrah',
    description: "Fast and efficient Umrah package for those with limited time, covering all essential rituals."
  }
];

const providerDetails = {
  name: "Al-Haramain Travel Agency",
  email: "info@alharamain.com",
  phone: "+1 (555) 123-4567",
  website: "www.alharamain.com",
  address: "123 Travel Plaza, New York, NY 10001",
  description: "Leading travel agency specializing in Hajj and Umrah packages for over 15 years. We provide comprehensive spiritual journey experiences with verified accommodations and expert guides.",
  rating: 4.8,
  totalPackages: 25,
  yearsInBusiness: 15
};

export const SearchResults = ({ query, location }: { query: string; location: string }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    priceRange: [1000, 15000],
    duration: '',
    packageType: '',
    rating: 0,
    features: []
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleContactClick = (pkg: Package) => {
    setSelectedPackage(pkg);
    setShowContactModal(true);
  };

  const filteredPackages = mockPackages.filter(pkg => {
    const matchesPrice = pkg.price.from >= filters.priceRange[0] && pkg.price.from <= filters.priceRange[1];
    const matchesDuration = !filters.duration || pkg.duration.toString() === filters.duration;
    const matchesType = !filters.packageType || pkg.packageType === filters.packageType;
    const matchesRating = pkg.rating >= filters.rating;
    
    return matchesPrice && matchesDuration && matchesType && matchesRating;
  });

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price.from - b.price.from;
      case 'price-high':
        return b.price.from - a.price.from;
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return a.duration - b.duration;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <Search className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">HajjUmrah</span>
            </div>
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
            
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your search results
                  </SheetDescription>
                </SheetHeader>
                <FilterPanel filters={filters} setFilters={setFilters} />
              </SheetContent>
            </Sheet>

            {/* Desktop Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 hidden md:flex">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-80 shrink-0">
            <Card className="shadow-card sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Filters</h3>
                <FilterPanel filters={filters} setFilters={setFilters} />
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {sortedPackages.length} results for "<span className="text-foreground font-medium">{query}</span>"
                {location && <span> in {location}</span>}
              </p>
            </div>

            <div className="space-y-6">
              {sortedPackages.map((pkg) => (
                <SearchResultCard 
                  key={pkg.id} 
                  package={pkg} 
                  onContactClick={() => handleContactClick(pkg)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {selectedPackage && (
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

const FilterPanel = ({ filters, setFilters }: { filters: SearchFilters; setFilters: (filters: SearchFilters) => void }) => {
  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => setFilters({...filters, priceRange: value as [number, number]})}
          max={15000}
          min={1000}
          step={100}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${filters.priceRange[0].toLocaleString()}</span>
          <span>${filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Package Type */}
      <div>
        <h4 className="font-medium mb-3">Package Type</h4>
        <Select value={filters.packageType} onValueChange={(value) => setFilters({...filters, packageType: value})}>
          <SelectTrigger>
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All types</SelectItem>
            <SelectItem value="hajj">Hajj</SelectItem>
            <SelectItem value="umrah">Umrah</SelectItem>
            <SelectItem value="both">Hajj & Umrah</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Duration */}
      <div>
        <h4 className="font-medium mb-3">Duration</h4>
        <Select value={filters.duration} onValueChange={(value) => setFilters({...filters, duration: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Any duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any duration</SelectItem>
            <SelectItem value="7">1 week</SelectItem>
            <SelectItem value="14">2 weeks</SelectItem>
            <SelectItem value="21">3 weeks</SelectItem>
            <SelectItem value="30">1 month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-medium mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                checked={filters.rating === rating}
                onCheckedChange={(checked) => setFilters({...filters, rating: checked ? rating : 0})}
              />
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="text-sm">{rating}+ stars</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h4 className="font-medium mb-3">Features</h4>
        <div className="space-y-2">
          {['5-star hotels', 'VIP transport', 'Guided tours', '24/7 support', 'All meals included'].map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                checked={filters.features.includes(feature)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilters({...filters, features: [...filters.features, feature]});
                  } else {
                    setFilters({...filters, features: filters.features.filter(f => f !== feature)});
                  }
                }}
              />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SearchResultCard = ({ package: pkg, onContactClick }: { package: Package; onContactClick: () => void }) => {
  return (
    <Card className="shadow-card hover:shadow-elevated transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Package Image */}
          <div className="w-full lg:w-64 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center shrink-0">
            <Calendar className="h-12 w-12 text-muted-foreground opacity-50" />
          </div>
          
          {/* Package Details */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
              <div>
                <h3 className="text-xl font-semibold text-foreground hover:text-primary cursor-pointer mb-1">
                  {pkg.title}
                </h3>
                <p className="text-muted-foreground mb-2">{pkg.provider}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">{pkg.rating}</span>
                  <span className="text-sm text-muted-foreground">({pkg.reviews} reviews)</span>
                </div>
              </div>
              <div className="text-right lg:ml-4">
                <div className="text-2xl font-bold text-foreground">
                  ${pkg.price.from.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">per person from</div>
                <Badge variant="secondary" className="mt-1">
                  {pkg.duration} days
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {pkg.location}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {pkg.packageType.toUpperCase()} Package
              </div>
            </div>

            <p className="text-muted-foreground mb-4 line-clamp-2">
              {pkg.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {pkg.features.slice(0, 4).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {pkg.features.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{pkg.features.length - 4} more
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={onContactClick}
                className="bg-primary hover:bg-primary-hover"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Provider
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Send Inquiry
              </Button>
              <Button variant="outline">
                View Full Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};