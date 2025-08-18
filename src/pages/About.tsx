import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Compass, 
  Shield, 
  Globe, 
  Users, 
  Star, 
  CheckCircle,
  Heart,
  Award,
  Clock,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const About = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "All our providers are thoroughly vetted and verified for your safety and peace of mind."
    },
    {
      icon: Heart,
      title: "Spiritual Care",
      description: "We understand the sacred nature of your journey and provide respectful, caring support."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering exceptional service and unforgettable spiritual experiences."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance throughout your Hajj or Umrah journey."
    }
  ];

  const achievements = [
    { number: "20+", label: "Years of Experience" },
    { number: "50K+", label: "Satisfied Pilgrims" },
    { number: "100+", label: "Verified Providers" },
    { number: "40+", label: "Countries Served" }
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
              <Link to="/about" className="text-foreground hover:text-primary font-medium">About</Link>
              <Link to="/team" className="text-muted-foreground hover:text-primary">Team</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
              <Link to="/support" className="text-muted-foreground hover:text-primary">Support</Link>
              <Link to="/admin">
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
                <Link to="/about" className="text-foreground hover:text-primary py-2 font-medium">About</Link>
                <Link to="/team" className="text-muted-foreground hover:text-primary py-2">Team</Link>
                <Link to="/contact" className="text-muted-foreground hover:text-primary py-2">Contact</Link>
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
            About <span className="text-primary">HajjUmrah</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your trusted companion for the spiritual journey of a lifetime. We connect pilgrims with 
            verified providers worldwide, ensuring safe, comfortable, and meaningful Hajj and Umrah experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              Global Network
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Verified Providers
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              50K+ Pilgrims Served
            </Badge>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We believe that every Muslim should have access to safe, affordable, and spiritually 
                enriching Hajj and Umrah experiences. Our platform bridges the gap between pilgrims 
                and trusted service providers, making the sacred journey accessible to Muslims worldwide.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Transparency</h4>
                    <p className="text-sm text-muted-foreground">Clear pricing, honest reviews, and complete package details</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Quality Assurance</h4>
                    <p className="text-sm text-muted-foreground">Rigorous vetting process for all service providers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Continuous Support</h4>
                    <p className="text-sm text-muted-foreground">24/7 assistance from booking to return</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 text-center">
              <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Compass className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Guiding Your Sacred Journey</h3>
              <p className="text-muted-foreground">
                Since 2004, we've been dedicated to making the pilgrimage experience seamless, 
                spiritual, and memorable for Muslims around the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These core principles guide everything we do and every decision we make
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="container mx-auto px-4 py-16 bg-secondary/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Journey in Numbers</h2>
          <p className="text-muted-foreground">Milestones that reflect our commitment to excellence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{achievement.number}</div>
              <p className="text-muted-foreground">{achievement.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of pilgrims who have trusted us with their sacred journey. 
            Start exploring packages today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/90">
                Explore Packages
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
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

export default About;