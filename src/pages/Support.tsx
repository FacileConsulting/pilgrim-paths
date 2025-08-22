import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Compass, 
  Search, 
  HelpCircle,
  Book,
  MessageSquare,
  Phone,
  Mail,
  Download,
  Video,
  Menu,
  X,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Globe
} from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Support = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const supportCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using our platform",
      articles: 12,
      color: "bg-primary/10 text-primary"
    },
    {
      icon: MessageSquare,
      title: "Booking & Payments",
      description: "Help with reservations and payment issues",
      articles: 18,
      color: "bg-accent/10 text-accent"
    },
    {
      icon: Globe,
      title: "Travel Documentation",
      description: "Visa, passport, and travel requirements",
      articles: 8,
      color: "bg-success/10 text-success"
    },
    {
      icon: Phone,
      title: "During Your Journey",
      description: "Support while you're on pilgrimage",
      articles: 15,
      color: "bg-warning/10 text-warning"
    }
  ];

  const quickActions = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with support agent",
      action: "Start Chat",
      available: true
    },
    {
      icon: Phone,
      title: "Call Support",
      description: "Speak with our team",
      action: "Call Now",
      available: true
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a message",
      action: "Send Email",
      available: true
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Schedule a video consultation",
      action: "Schedule",
      available: false
    }
  ];

  const faqData = [
    {
      question: "How do I book a Hajj or Umrah package?",
      answer: "You can browse packages on our homepage, compare different options, and click 'Contact Provider' to get in touch with verified travel agencies. Our platform connects you directly with trusted providers who will handle your booking."
    },
    {
      question: "Are all providers on your platform verified?",
      answer: "Yes, all providers go through a rigorous verification process. We check their licenses, credentials, customer reviews, and business history before allowing them on our platform."
    },
    {
      question: "What documents do I need for Hajj/Umrah?",
      answer: "You'll need a valid passport (with at least 6 months validity), visa for Saudi Arabia, vaccination certificates (especially for meningitis), and proof of accommodation. Your chosen provider will guide you through the specific requirements."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Cancellation and modification policies vary by provider. When you contact a provider, make sure to ask about their specific terms and conditions. We recommend purchasing travel insurance for added protection."
    },
    {
      question: "What if I need help during my pilgrimage?",
      answer: "We provide 24/7 emergency support during pilgrimage seasons. You can reach our emergency hotline, use our mobile app, or contact your travel provider directly. We also have local representatives in key cities."
    },
    {
      question: "How are prices determined?",
      answer: "Prices vary based on accommodation level, package duration, group size, travel dates, and included services. Our platform allows you to compare different options to find the best value for your needs and budget."
    }
  ];

  const resources = [
    {
      title: "Pilgrimage Preparation Guide",
      description: "Complete guide to preparing for Hajj and Umrah",
      type: "PDF Guide",
      downloadUrl: "#"
    },
    {
      title: "Mobile App Tutorial",
      description: "How to use our mobile app for support",
      type: "Video Tutorial",
      downloadUrl: "#"
    },
    {
      title: "Prayer Times Calculator",
      description: "Calculate prayer times for any location",
      type: "Web Tool",
      downloadUrl: "#"
    },
    {
      title: "Packing Checklist",
      description: "Essential items for your pilgrimage",
      type: "PDF Checklist",
      downloadUrl: "#"
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
              <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
              <Link to="/support" className="text-foreground hover:text-primary font-medium">Support</Link>
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
                <Link to="/contact" className="text-muted-foreground hover:text-primary py-2">Contact</Link>
                <Link to="/support" className="text-foreground hover:text-primary py-2 font-medium">Support</Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How Can We <span className="text-primary">Help You?</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Find answers to your questions, access helpful resources, and get support 
            for your pilgrimage journey.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for help articles, guides, or FAQ..."
                className="pl-12 h-14 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-2 top-2 h-10">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 py-16 bg-secondary/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Need Immediate Help?</h2>
          <p className="text-muted-foreground">Get in touch with our support team right away</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {quickActions.map((action, index) => (
            <Card key={index} className={`shadow-card hover:shadow-elevated transition-all duration-300 ${!action.available ? 'opacity-60' : ''}`}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <action.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                <Button 
                  variant={action.available ? "default" : "outline"} 
                  size="sm" 
                  className="w-full"
                  disabled={!action.available}
                >
                  {action.action}
                  {!action.available && <span className="ml-2 text-xs">(Soon)</span>}
                </Button>
                {action.available && (
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-xs text-success">Available now</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Support Categories */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Browse Help Topics</h2>
          <p className="text-muted-foreground">Find answers organized by category</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {supportCategories.map((category, index) => (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-4`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {category.articles} articles
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16 bg-secondary/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Quick answers to common questions</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-medium text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Resources */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Helpful Resources</h2>
          <p className="text-muted-foreground">Guides, tools, and materials to assist your journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {resources.map((resource, index) => (
            <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Status & Updates */}
      <div className="container mx-auto px-4 py-16 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">System Status</h2>
            <p className="text-muted-foreground">Current status of our services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-success mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Website</h3>
                <p className="text-sm text-success">Operational</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-success mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Support</h3>
                <p className="text-sm text-success">Operational</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-8 w-8 text-warning mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Mobile App</h3>
                <p className="text-sm text-warning">Under Maintenance</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you 
            with any questions or issues you may have.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary/90">
                Contact Support
              </Button>
            </Link>
            <Button variant="outline">
              Schedule Consultation
            </Button>
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

export default Support;