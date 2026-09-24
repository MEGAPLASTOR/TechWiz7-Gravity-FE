import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import CustomerPortalPage from '@/pages/CustomerPortalPage';
import FarmerPortalPage from '@/pages/FarmerPortalPage';
import AdminPortalPage from '@/pages/AdminPortalPage';
import RoleGuard from './RoleGuard';
import PortalNavbar from '@/components/Common/PortalNavbar';

export default function AppRoutes({
  cartItems,
  setCartItems,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  cartCount,
  cartTotal,
  lang,
  onOpenLogin,
  onOpenRegister,
}) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {/* Hiển thị PortalNavbar ở các trang con /customer, /farmer, /admin */}
      {!isHome && (
        <PortalNavbar
          onOpenLogin={onOpenLogin}
          onOpenRegister={onOpenRegister}
        />
      )}

      <Routes>
        {/* Trang chủ Landing Page */}
        <Route
          path="/"
          element={
            <HomePage
              cartItems={cartItems}
              setCartItems={setCartItems}
              onAddToCart={onAddToCart}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
              cartCount={cartCount}
              cartTotal={cartTotal}
              lang={lang}
              onOpenLogin={onOpenLogin}
              onOpenRegister={onOpenRegister}
            />
          }
        />

        {/* 1. Phân vùng Khách Hàng (Customer Portal) */}
        <Route
          path="/customer/*"
          element={
            <RoleGuard requiredRole="customer" onOpenLogin={onOpenLogin}>
              <CustomerPortalPage lang={lang} onOpenLogin={onOpenLogin} />
            </RoleGuard>
          }
        />

        {/* 2. Phân vùng Nông Dân (Farmer Portal) */}
        <Route
          path="/farmer/*"
          element={
            <RoleGuard requiredRole="farmer" onOpenLogin={onOpenLogin}>
              <FarmerPortalPage lang={lang} />
            </RoleGuard>
          }
        />

        {/* 3. Phân vùng Quản Trị Viên (Admin Portal) */}
        <Route
          path="/admin/*"
          element={
            <RoleGuard requiredRole="admin" onOpenLogin={onOpenLogin}>
              <AdminPortalPage lang={lang} />
            </RoleGuard>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
