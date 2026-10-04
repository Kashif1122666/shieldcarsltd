import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { CarLoadingScreen } from './components/common/CarLoadingScreen';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
// Public Pages
import { HomePage } from './pages/public/HomePage';
import { InventoryPage } from './pages/public/InventoryPage';
import { CarDetailsPage } from './pages/public/CarDetailsPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { FaqPage } from './pages/public/FaqPage';
import { NotFoundPage } from './pages/public/NotFoundPage';
// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { AdminAddCarPage } from './pages/admin/AdminAddCarPage';
import { AdminEditCarPage } from './pages/admin/AdminEditCarPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';
export default function App() {
    const [initialLoading, setInitialLoading] = useState(true);
    useEffect(() => {
        // Elegant, short initial branded loading screen
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 750);
        return () => clearTimeout(timer);
    }, []);
    if (initialLoading) {
        return <CarLoadingScreen message="Shield Cars · Showroom Initializing"/>;
    }
    return (<AuthProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes with Navbar & Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />}/>
              <Route path="/cars" element={<InventoryPage />}/>
              <Route path="/cars/:id" element={<CarDetailsPage />}/>
              <Route path="/about" element={<AboutPage />}/>
              <Route path="/contact" element={<ContactPage />}/>
              <Route path="/faq" element={<FaqPage />}/>
              <Route path="*" element={<NotFoundPage />}/>
            </Route>

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLoginPage />}/>

            {/* Admin Management Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboardPage />}/>
              <Route path="cars" element={<AdminInventoryPage />}/>
              <Route path="cars/new" element={<AdminAddCarPage />}/>
              <Route path="cars/:id/edit" element={<AdminEditCarPage />}/>
              <Route path="inquiries" element={<AdminInquiriesPage />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>);
}
