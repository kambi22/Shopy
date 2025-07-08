import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from './firebaseConfig'

const merchantOnlyRoutes = [
  "/add-product",
  "/edit-product",
  "/marchant-product-list",
  '/delete-product'
  // add more merchant-only routes as needed
];

const ProtectedRoute = () => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const role = localStorage.getItem("userRole");
  const location = useLocation();

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is customer and tries to access merchant-only pages, redirect to home
  if (
    role === "customer" &&
    merchantOnlyRoutes.some((route) =>
      location.pathname.toLowerCase().startsWith(route)
    )
  ) {
    return <Navigate to="/" replace />;
  }

  // If logged in and authorized, render child routes
  return <Outlet />;
};

export default ProtectedRoute;