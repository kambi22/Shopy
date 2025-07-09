import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './firebaseConfig';

// Routes that are only for merchants
const merchantOnlyRoutes = [
  "/add-product",
  "/edit-product",
  "/marchant-product-list",
  "/delete-product"
];

// Routes related to authentication that should not be accessible when logged in
const authPages = [
  "/sign-up",
  "/login",
  "/choose-profile"
];

const ProtectedRoute = () => {
  const auth = getAuth(app);
  const location = useLocation();
  
  // State to manage auth status and loading
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // We get the role from localStorage. Note: This is client-side and can be tampered with.
  // For higher security, the role should be verified on the server or via custom claims in the JWT.
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    // onAuthStateChanged is the recommended way to get the current user
    // as it listens for changes in the authentication state.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  // Display a loading indicator while Firebase is checking the auth state.
  // This prevents a flicker effect where a protected page is shown briefly
  // before redirecting to the login page.
  if (loading) {
    // You can replace this with a proper spinner component
    return <div>Loading...</div>;
  }

  const currentPath = location.pathname.toLowerCase();
  const isAuthPage = authPages.some((route) => currentPath.startsWith(route));
  const isMerchantRoute = merchantOnlyRoutes.some((route) => currentPath.startsWith(route));

  // --- Logic for logged-in users ---
  if (user) {
    // If a logged-in user tries to access an authentication page (login, signup),
    // redirect them to the home page. This fulfills your request.
    if (isAuthPage) {
      return <Navigate to="/" replace />;
    }

    // If a logged-in user is a 'customer' and tries to access a merchant-only route,
    // redirect them to the home page.
    if (role === "customer" && isMerchantRoute) {
      return <Navigate to="/" replace />;
    }

    // If the user is logged in and the route is allowed, render the component.
    return <Outlet />;
  }

  // --- Logic for logged-out users ---
  if (!user) {
    // If a logged-out user is trying to access an authentication page, allow it.
    if (isAuthPage) {
      return <Outlet />;
    }

    // If a logged-out user tries to access any other page (which are all protected),
    // redirect them to the login page.
    return <Navigate to="/login" replace />;
  }

  // Fallback, should not be reached but good practice to have.
  return <Outlet />;
};

export default ProtectedRoute;
