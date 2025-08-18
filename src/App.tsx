import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import CustomerHome from "./pages/CustomerHome";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import Dashboard from "./pages/admin/Dashboard";
import Providers from "./pages/admin/Providers";
import AddProvider from "./pages/admin/AddProvider";
import Packages from "./pages/admin/Packages";
import CreatePackage from "./pages/admin/CreatePackage";
import Locations from "./pages/admin/Locations";
import Inquiries from "./pages/admin/Inquiries";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<CustomerHome />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/admin/providers" element={<Providers />} />
          <Route path="/admin/providers/add" element={<AddProvider />} />
          <Route path="/admin/packages" element={<Packages />} />
          <Route path="/admin/packages/create" element={<CreatePackage />} />
          <Route path="/admin/locations" element={<Locations />} />
          <Route path="/admin/inquiries" element={<Inquiries />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
