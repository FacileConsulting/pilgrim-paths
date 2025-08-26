import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Compass, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Menu,
  X,
  Send,
  MessageSquare,
  Headphones,
  Globe
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+1-800-HAJJ-UMRAH",
      hours: "24/7 Available",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions and feedback",
      contact: "support@hajjumrah.com",
      hours: "Response within 2 hours",
      action: "Send Email"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our representatives instantly",
      contact: "Available on website",
      hours: "24/7 Available",
      action: "Start Chat"
    },
    {
      icon: Headphones,
      title: "WhatsApp",
      description: "Message us on WhatsApp",
      contact: "+1-800-555-HAJJ",
      hours: "24/7 Available",
      action: "Message Us"
    }
  ];

  const offices = [
    {
      city: "New York (Headquarters)",
      address: "123 Islamic Center Blvd, New York, NY 10001",
      phone: "+1-800-555-0101",
      email: "ny@hajjumrah.com",
      hours: "Mon-Fri: 9AM-6PM EST"
    },
    {
      city: "London",
      address: "456 Park Lane, London W1K 1QT, UK",
      phone: "+44-20-7946-0958",
      email: "london@hajjumrah.com",
      hours: "Mon-Fri: 9AM-6PM GMT"
    },
    {
      city: "Dubai",
      address: "789 Sheikh Zayed Road, Dubai, UAE",
      phone: "+971-4-555-0103",
      email: "dubai@hajjumrah.com",
      hours: "Sun-Thu: 9AM-6PM GST"
    },
    {
      city: "Toronto",
      address: "321 Bay Street, Toronto, ON M5H 2R2, Canada",
      phone: "+1-416-555-0104",
      email: "toronto@hajjumrah.com",
      hours: "Mon-Fri: 9AM-6PM EST"
    }
  ];

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
              <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary">About</Link>
              <Link to="/team" className="text-muted-foreground hover:text-primary">Team</Link>
              <Link to="/contact" className="text-foreground hover:text-primary font-medium">Contact</Link>
              <Link to="/support" className="text-muted-foreground hover:text-primary">Support</Link>
              <Link to="/admin/providers/add">
                <Button variant="outline" size="sm">Admin Portal</Button>
              </Link>
            </nav>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-muted-foreground hover:text-primary py-2">Home</Link>
                <Link to="/about" className="text-muted-foreground hover:text-primary py-2">About</Link>
                <Link to="/team" className="text-muted-foreground hover:text-primary py-2">Team</Link>
                <Link to="/contact" className="text-foreground hover:text-primary py-2 font-medium">Contact</Link>
                <Link to="/support" className="text-muted-foreground hover:text-primary py-2">Support</Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We're here to help with your pilgrimage journey. Reach out to us through any of our channels 
            and our dedicated support team will assist you promptly.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="container mx-auto px-4 py-16 bg-secondary/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">How Can We Help?</h2>
          <p className="text-muted-foreground">Choose the method that works best for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactMethods.map((method, index) => (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 text-center group">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <method.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                <div className="space-y-1 mb-4">
                  <p className="text-sm font-medium text-foreground">{method.contact}</p>
                  <p className="text-xs text-muted-foreground">{method.hours}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Form & Office Info */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="9876543210"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="booking">Booking Support</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief description of your inquiry"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Please provide detailed information about your inquiry..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Office Locations */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Offices</h2>
              <p className="text-muted-foreground mb-6">
                Visit us at any of our global locations or contact your nearest office.
              </p>
            </div>

            <div className="space-y-4">
              {offices.map((office, index) => (
                <Card key={index} className="shadow-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {office.city}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">{office.address}</p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-foreground">{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-foreground">{office.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{office.hours}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="container mx-auto px-4 py-16 bg-destructive/5 border-y border-destructive/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Emergency Support</h2>
          <p className="text-muted-foreground mb-6">
            If you're currently on pilgrimage and need immediate assistance, use our emergency hotline.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Card className="border-destructive/20">
              <CardContent className="p-4 text-center">
                <Phone className="h-8 w-8 text-destructive mx-auto mb-2" />
                <p className="font-semibold text-foreground">Emergency Hotline</p>
                <p className="text-destructive font-bold">+966 12 345 6789</p>
                <p className="text-xs text-muted-foreground">Available 24/7 during Hajj & Umrah seasons</p>
              </CardContent>
            </Card>
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
    </div>
  );
};

export default Contact;