
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeddingProvider } from "@/contexts/WeddingContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import OurStoryPage from "./pages/OurStoryPage";
import DetailsPage from "./pages/DetailsPage";
import RsvpPage from "./pages/RsvpPage";
import RegistryPage from "./pages/RegistryPage";
import GalleryPage from "./pages/GalleryPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminLayout from "./components/AdminLayout";

// Create admin dashboard page components
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGuestList from "./pages/admin/AdminGuestList";
import AdminStoryEditor from "./pages/admin/AdminStoryEditor";
import AdminDetailsEditor from "./pages/admin/AdminDetailsEditor";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminRegistry from "./pages/admin/AdminRegistry";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WeddingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/details" element={<DetailsPage />} />
            <Route path="/rsvp" element={<RsvpPage />} />
            <Route path="/registry" element={<RegistryPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/guests" element={<AdminLayout><AdminGuestList /></AdminLayout>} />
            <Route path="/admin/story" element={<AdminLayout><AdminStoryEditor /></AdminLayout>} />
            <Route path="/admin/details" element={<AdminLayout><AdminDetailsEditor /></AdminLayout>} />
            <Route path="/admin/gallery" element={<AdminLayout><AdminGallery /></AdminLayout>} />
            <Route path="/admin/registry" element={<AdminLayout><AdminRegistry /></AdminLayout>} />
            
            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </WeddingProvider>
  </QueryClientProvider>
);

export default App;
