import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Compass, 
  Linkedin, 
  Mail, 
  Phone,
  Menu,
  X,
  MapPin
} from "lucide-react";
import { useState } from "react";

const Team = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Ahmed Al-Rashid",
      position: "Founder & CEO",
      department: "Leadership",
      image: "/api/placeholder/300/300",
      bio: "With over 20 years in the travel industry and having performed Hajj 5 times, Dr. Al-Rashid founded HajjUmrah to revolutionize the pilgrimage experience.",
      email: "ahmed@hajjumrah.com",
      phone: "+1-800-555-0101",
      location: "New York, USA",
      expertise: ["Strategic Leadership", "Islamic Tourism", "Business Development"],
      languages: ["English", "Arabic", "Urdu"]
    },
    {
      id: 2,
      name: "Fatima Hassan",
      position: "Head of Operations",
      department: "Operations",
      image: "/api/placeholder/300/300",
      bio: "Fatima ensures seamless operations and quality control across all our partner providers, with 15 years of experience in hospitality management.",
      email: "fatima@hajjumrah.com",
      phone: "+1-800-555-0102",
      location: "London, UK",
      expertise: ["Operations Management", "Quality Assurance", "Customer Service"],
      languages: ["English", "Arabic", "French"]
    },
    {
      id: 3,
      name: "Mohammad Ibrahim",
      position: "Chief Technology Officer",
      department: "Technology",
      image: "/api/placeholder/300/300",
      bio: "Mohammad leads our technology initiatives, developing innovative solutions to make pilgrimage booking simple and secure for users worldwide.",
      email: "mohammad@hajjumrah.com",
      phone: "+1-800-555-0103",
      location: "Toronto, Canada",
      expertise: ["Software Development", "System Architecture", "Cybersecurity"],
      languages: ["English", "Arabic", "French"]
    },
    {
      id: 4,
      name: "Aisha Khan",
      position: "Head of Customer Success",
      department: "Customer Service",
      image: "/api/placeholder/300/300",
      bio: "Aisha leads our customer support team, ensuring every pilgrim receives exceptional service and support throughout their journey.",
      email: "aisha@hajjumrah.com",
      phone: "+1-800-555-0104",
      location: "Dubai, UAE",
      expertise: ["Customer Relations", "Support Management", "Training"],
      languages: ["English", "Arabic", "Hindi", "Urdu"]
    },
    {
      id: 5,
      name: "Omar Al-Mansouri",
      position: "Regional Director - Middle East",
      department: "Regional Operations",
      image: "/api/placeholder/300/300",
      bio: "Omar manages our Middle East operations and partnerships, ensuring authentic and high-quality services in the region.",
      email: "omar@hajjumrah.com",
      phone: "+1-800-555-0105",
      location: "Riyadh, Saudi Arabia",
      expertise: ["Regional Management", "Partner Relations", "Cultural Consulting"],
      languages: ["Arabic", "English"]
    },
    {
      id: 6,
      name: "Sarah Abdullah",
      position: "Head of Marketing",
      department: "Marketing",
      image: "/api/placeholder/300/300",
      bio: "Sarah develops marketing strategies that reach Muslim communities worldwide, spreading awareness about our trusted pilgrimage services.",
      email: "sarah@hajjumrah.com",
      phone: "+1-800-555-0106",
      location: "Sydney, Australia",
      expertise: ["Digital Marketing", "Community Outreach", "Brand Management"],
      languages: ["English", "Arabic", "Malay"]
    }
  ];

  const departments = [
    { name: "Leadership", count: 1, color: "bg-primary" },
    { name: "Operations", count: 1, color: "bg-accent" },
    { name: "Technology", count: 1, color: "bg-secondary" },
    { name: "Customer Service", count: 1, color: "bg-success" },
    { name: "Regional Operations", count: 1, color: "bg-warning" },
    { name: "Marketing", count: 1, color: "bg-muted" }
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
              <Link to="/team" className="text-foreground hover:text-primary font-medium">Team</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
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
                <Link to="/team" className="text-foreground hover:text-primary py-2 font-medium">Team</Link>
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
            Meet Our <span className="text-primary">Team</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Dedicated professionals committed to making your spiritual journey meaningful, 
            safe, and unforgettable. Our diverse team brings together expertise from 
            technology, hospitality, and Islamic scholarship.
          </p>
        </div>
      </div>

      {/* Department Overview */}
      <div className="container mx-auto px-4 py-16 bg-secondary/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Departments</h2>
          <p className="text-muted-foreground">Diverse expertise working together for your journey</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
          {departments.map((dept, index) => (
            <Card key={index} className="text-center shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-4">
                <div className={`w-12 h-12 ${dept.color} rounded-full mx-auto mb-3 opacity-20`}></div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{dept.name}</h3>
                <p className="text-xs text-muted-foreground">{dept.count} member{dept.count > 1 ? 's' : ''}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Members */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Leadership & Key Personnel</h2>
          <p className="text-muted-foreground">The people behind our success</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member) => (
            <Card key={member.id} className="shadow-card hover:shadow-elevated transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="text-2xl font-bold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-1">{member.position}</p>
                  <Badge variant="secondary" className="text-xs">
                    {member.department}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{member.location}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">Expertise</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.expertise.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">Languages</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.languages.map((language, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Linkedin className="h-4 w-4 mr-1" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Join Our Team */}
      <div className="container mx-auto px-4 py-16 bg-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Mission</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who share our vision of making 
            the pilgrimage experience better for Muslims worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary/90">
                View Open Positions
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">Send Your CV</Button>
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

export default Team;