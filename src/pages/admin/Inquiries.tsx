import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  MessageSquare, 
  User,
  Package,
  Building2,
  Calendar,
  Mail,
  Phone,
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const inquiries = [
  {
    id: 1,
    customerName: "Ahmed Al-Rashid",
    customerEmail: "ahmed@email.com",
    customerPhone: "+1 (555) 123-4567",
    packageTitle: "Umrah Deluxe Package 2024",
    provider: "Al-Haramain Travel",
    message: "I'm interested in this package for 4 people. What are the available dates in March?",
    preferredDates: ["2024-03-15", "2024-03-22"],
    numberOfTravelers: 4,
    status: "pending",
    createdAt: "2024-01-20T10:30:00Z",
    respondedAt: null,
  },
  {
    id: 2,
    customerName: "Fatima Hassan",
    customerEmail: "fatima.h@email.com",
    customerPhone: "+1 (555) 987-6543",
    packageTitle: "Hajj Premium Experience 2024",
    provider: "Makkah Tours",
    message: "Please provide more details about the accommodation and transportation included in this package.",
    preferredDates: ["2024-06-10", "2024-06-17"],
    numberOfTravelers: 2,
    status: "responded",
    createdAt: "2024-01-18T14:15:00Z",
    respondedAt: "2024-01-19T09:20:00Z",
  },
  {
    id: 3,
    customerName: "Mohammad Ibrahim",
    customerEmail: "m.ibrahim@email.com",
    customerPhone: "+1 (555) 456-7890",
    packageTitle: "Budget Umrah Package",
    provider: "Sacred Journey",
    message: "Is it possible to customize this package? We need special dietary requirements.",
    preferredDates: ["2024-04-05", "2024-04-12"],
    numberOfTravelers: 6,
    status: "closed",
    createdAt: "2024-01-15T16:45:00Z",
    respondedAt: "2024-01-16T11:30:00Z",
  },
];

const Inquiries = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inquiries</h1>
            <p className="text-muted-foreground">Manage customer inquiries and communications</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="warning" className="px-3 py-1">
              {inquiries.filter(i => i.status === 'pending').length} Pending
            </Badge>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search inquiries..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="default">
                  <Filter className="h-4 w-4 mr-2" />
                  Status
                </Button>
                <Button variant="outline" size="default">
                  <Filter className="h-4 w-4 mr-2" />
                  Provider
                </Button>
                <Button variant="outline" size="default">
                  <Filter className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inquiries List */}
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{inquiry.customerName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Inquiry #{inquiry.id} • {new Date(inquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      inquiry.status === "pending" ? "warning" :
                      inquiry.status === "responded" ? "success" : "secondary"
                    }>
                      {inquiry.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Responded
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <XCircle className="h-4 w-4 mr-2" />
                          Close Inquiry
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{inquiry.packageTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{inquiry.provider}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{inquiry.numberOfTravelers} travelers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{inquiry.preferredDates.join(", ")}</span>
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-foreground">{inquiry.message}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {inquiry.customerEmail}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {inquiry.customerPhone}
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Inquiry Details</DialogTitle>
                        <DialogDescription>
                          Complete information for inquiry #{inquiry.id}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Customer Name</label>
                            <p className="text-sm text-muted-foreground">{inquiry.customerName}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <p className="text-sm text-muted-foreground">{inquiry.customerEmail}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Phone</label>
                            <p className="text-sm text-muted-foreground">{inquiry.customerPhone}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Travelers</label>
                            <p className="text-sm text-muted-foreground">{inquiry.numberOfTravelers}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Package</label>
                          <p className="text-sm text-muted-foreground">{inquiry.packageTitle}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Message</label>
                          <p className="text-sm text-muted-foreground">{inquiry.message}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Response</label>
                          <Textarea 
                            placeholder="Type your response here..."
                            className="mt-1"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button className="bg-primary hover:bg-primary-hover">Send Response</Button>
                          <Button variant="outline">Save Draft</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Inquiries;