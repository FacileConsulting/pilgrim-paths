import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Globe,
  Star,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Send
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: {
    id: number;
    title: string;
    provider: string;
    price: { from: number; to: number };
    duration: number;
    rating: number;
    reviews: number;
    location: string;
    features: string[];
  };
  providerDetails: {
    name: string;
    email: string;
    phone: string;
    website: string;
    address: string;
    description: string;
    rating: number;
    totalPackages: number;
    yearsInBusiness: number;
  };
}

export const ContactModal = ({ isOpen, onClose, package: pkg, providerDetails }: ContactModalProps) => {
  const [activeTab, setActiveTab] = useState<'contact' | 'inquiry'>('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '2',
    preferredDate: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Contact Provider</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Get in touch with {providerDetails.name} about "{pkg.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Package Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">{pkg.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span className="text-sm font-medium">{pkg.duration} days</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Price Range</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span className="text-sm font-medium">
                      ${pkg.price.from.toLocaleString()} - ${pkg.price.to.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Location</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="text-sm font-medium">{pkg.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span className="text-sm font-medium">{pkg.rating} ({pkg.reviews} reviews)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Includes:</span>
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex gap-1 mb-6 bg-secondary rounded-lg p-1">
              <Button
                variant={activeTab === 'contact' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('contact')}
                className="flex-1"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Info
              </Button>
              <Button
                variant={activeTab === 'inquiry' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('inquiry')}
                className="flex-1"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Inquiry
              </Button>
            </div>

            {/* Contact Information Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      {providerDetails.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{providerDetails.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{providerDetails.phone}</p>
                            <p className="text-xs text-muted-foreground">Primary contact</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{providerDetails.email}</p>
                            <p className="text-xs text-muted-foreground">Email support</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{providerDetails.website}</p>
                            <p className="text-xs text-muted-foreground">Official website</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{providerDetails.address}</p>
                            <p className="text-xs text-muted-foreground">Business address</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Star className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{providerDetails.rating}/5.0 Rating</p>
                            <p className="text-xs text-muted-foreground">Customer satisfaction</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{providerDetails.yearsInBusiness}+ years</p>
                            <p className="text-xs text-muted-foreground">In business</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button className="flex-1 bg-primary hover:bg-primary-hover">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Inquiry Form Tab */}
            {activeTab === 'inquiry' && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Send Inquiry</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form below and we'll send your inquiry directly to {providerDetails.name}
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="travelers">Number of Travelers</Label>
                        <Select value={formData.travelers} onValueChange={(value) => setFormData({...formData, travelers: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8,9,10].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'person' : 'people'}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Travel Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide any additional details about your travel requirements, special needs, or questions about this package..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="flex-1 bg-primary hover:bg-primary-hover">
                        <Send className="h-4 w-4 mr-2" />
                        Send Inquiry
                      </Button>
                      <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};