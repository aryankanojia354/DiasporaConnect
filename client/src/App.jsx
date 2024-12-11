  // App.jsx
  import React, { useEffect } from "react";
  import { Route, Routes } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import AuthLayout from "./components/auth/layout";
  import AuthLogin from "./pages/auth/login";
  import AuthRegister from "./pages/auth/register";
  import AdminLayout from "./components/admin-view/layout";
  import AdminDashboard from "./pages/admin-view/dashboard";
  import AdminProducts from "./pages/admin-view/products";
  import AdminOrders from "./pages/admin-view/orders";
  import AdminFeatures from "./pages/admin-view/features";
  import ShoppingLayout from "./components/shopping-view/layout";
  import NotFound from "./pages/not-found";
  import ShoppingHome from "./pages/shopping-view/home";
  import ShoppingListing from "./pages/shopping-view/listing";
  import ShoppingCheckout from "./pages/shopping-view/checkout";
  import ShoppingAccount from "./pages/shopping-view/account";
  import CheckAuth from "./components/common/check-auth";
  import UnauthPage from "./pages/unauth-page";
  import { checkAuth } from "./store/auth-slice";
  import { Skeleton } from "@/components/ui/skeleton";
  import PaypalReturnPage from "./pages/shopping-view/paypal-return";
  import PaymentSuccessPage from "./pages/shopping-view/payment-success";
  import SearchProducts from "./pages/shopping-view/search";
  import GuestHomePage from "./pages/shopping-view/Guesthomepage";
  import Community from "./pages/shopping-view/community"; // Correct import for community.jsx
  import WorkshopPage from "./pages/shopping-view/workshoppage"; // Correct import for workshoppage.jsx
  import OurHeritage from "./pages/shopping-view/ourheritage";
  import SellerInfo1 from "./pages/shopping-view/sellerinfo1";
  import SellerInfo2 from "./pages/shopping-view/sellerinfo2";
  import SellerInfo3 from "./pages/shopping-view/sellerinfo3";
  import SellerInfo4 from "./pages/shopping-view/sellerinfo4";
  import SellerInfo from "./pages/shopping-view/sellerinfo";
  import TrackOrder from "./pages/shopping-view/track-order"; // Import TrackOrder component


  function App() {
    const { user, isAuthenticated, isLoading } = useSelector(
      (state) => state.auth
    );
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(checkAuth());
    }, [dispatch]);

    if (isLoading)
      return <Skeleton className="w-[800px] bg-black h-[600px]" />;

    return (
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          {/* Home page route before login/signup */}
          <Route
            path="/"
            element={
              <div>
                {/* Home Page with Buttons */}
                <GuestHomePage />
                {!isAuthenticated && (
                  <div className="button-container flex space-x-4 justify-center mt-4">
                    
                  </div>
                )}
              </div>
            }
          />

          {/* Authentication Routes */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>

          {/* Shopping Routes */}
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ShoppingListing />} />
            <Route path="checkout" element={<ShoppingCheckout />} />
            <Route path="account" element={<ShoppingAccount />} />
            <Route path="paypal-return" element={<PaypalReturnPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="search" element={<SearchProducts />} />
          </Route>

          {/* Track Order Route */}
          <Route
            path="/track-order/:orderId"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <TrackOrder />
              </CheckAuth>
            }
          />

          {/* Community Route (Public) */}
          <Route path="/community" element={<Community />} />

          {/* Workshop Route (Public) */}
          <Route path="/workshop" element={<WorkshopPage />} />

          {/* heritage Route (Public) */}
          <Route path="/heritage" element={<OurHeritage/>} />

          {/* Unauthorized Page */}
          <Route path="/unauth-page" element={<UnauthPage />} />

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />

          
          <Route path="/seller-info/1" element={<SellerInfo1 />} />
          <Route path="/seller-info/2" element={<SellerInfo3 />} />
          <Route path="/seller-info/3" element={<SellerInfo />} />
          <Route path="/seller-info/4" element={<SellerInfo4 />} />
          <Route path="/seller-info/5" element={<SellerInfo2 />} />
        </Routes>
      </div>
    );
  }

  export default App;
