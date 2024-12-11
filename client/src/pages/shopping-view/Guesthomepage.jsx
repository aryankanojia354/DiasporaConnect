import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Flower, Gift, GiftIcon, Home, Leaf, Paintbrush } from "lucide-react";
import { FaGifts, FaTshirt, FaPalette, FaLeaf, FaHands } from "react-icons/fa";

import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";

import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { addToCart } from "@/store/shop/cart-slice";
import { getFeatureImages } from "@/store/common-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Card, CardContent } from "@/components/ui/card";

const categoriesWithIcon = [
  { id: "festive-essentials", label: "Festive Essentials", icon: FaGifts },
  { id: "traditional-clothing-accessories", label: "Traditional Clothing", icon: FaTshirt },
  { id: "handmade-artistic-items", label: "Artistic Items", icon: FaPalette },
  { id: "eco-friendly-traditional-goods", label: "Traditional Goods", icon: FaLeaf },
  { id: "handicrafts", label: "Handicrafts", icon: FaHands },
];

const brandsWithIcon = [
  { id: "Patanjali", label: "Patanjali", icon: Leaf },
  { id: "Khadi Gram Udyog", label: "Khadi Gram Udyog", icon: Home },
  { id: "indigifts", label: "Indigifts", icon: GiftIcon },
  { id: "fabindia", label: "FabIndia", icon: Flower },
  { id: "artisan-direct", label: "Artisan Direct", icon: Paintbrush },
  { id: "raymond-ethnix", label: "Raymond Ethnix", icon: Shirt },
];

function GuestHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [getCurrentItem.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
    toast({
      title: "Added to Cart",
      description: "Product added to your cart successfully!",
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <div className="text-2xl font-bold">Welcome to Our Store</div>
        <div className="space-x-4">
          <Button onClick={() => navigate("/auth/login")} variant="outline">
            Login
          </Button>
          <Button onClick={() => navigate("/auth/register")} variant="outline">
            Signup
          </Button>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative w-full h-[600px] overflow-hidden bg-white">
        {featureImageList?.map((slide, index) => (
          <img
            src={slide?.image}
            key={slide?.id || index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            loading="lazy"
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) % featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="cursor-pointer hover:shadow-lg transition-shadow bg-white"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow bg-white"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white flex-grow">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {productList?.map((productItem) => (
              <ShoppingProductTile
                key={productItem.id}
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              variant="default"
              onClick={() => {
                sessionStorage.removeItem("filters");
                navigate("/shop/listing");
              }}
            >
              Show All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Chatbot Widget */}
      <ChatbotWidget />

      {/* Footer - With More Colors and Removed "About Us" */}
      <footer className="bg-gradient-to-t from-indigo-100 via-white to-white border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 py-10 text-center text-gray-700">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm mb-10">
            <div className="text-left">
              <h4 className="font-semibold mb-3 text-indigo-900">Quick Links</h4>
              <ul className="space-y-1">
                <li>
                  <a href="/shop/listing" className="hover:underline text-indigo-700 transition-colors hover:text-indigo-900">
                    Shop All Products
                  </a>
                </li>
                <li>
                  <a href="/auth/login" className="hover:underline text-indigo-700 transition-colors hover:text-indigo-900">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/auth/register" className="hover:underline text-indigo-700 transition-colors hover:text-indigo-900">
                    Signup
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline text-indigo-700 transition-colors hover:text-indigo-900">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-left">
              <h4 className="font-semibold mb-3 text-indigo-900">Customer Service</h4>
              <ul className="space-y-1">
                <li>
                  <a href="/faq" className="hover:underline text-indigo-700 transition-colors hover:text-indigo-900">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/returns" className="hover:underline text-indigo-700 transition-colors hover:text-indigo-900">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="/shipping" className="hover:underline text-indigo-700 transition-colors hover:text-indigo-900">
                    Shipping
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-left">
              <h4 className="font-semibold mb-3 text-indigo-900">Categories</h4>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:underline text-indigo-700 transition-colors hover:text-indigo-900">
                    Festive Essentials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-indigo-700 transition-colors hover:text-indigo-900">
                    Traditional Clothing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-indigo-700 transition-colors hover:text-indigo-900">
                    Artistic Items
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-left">
              <h4 className="font-semibold mb-3 text-indigo-900">Contact</h4>
              <p className="leading-relaxed text-sm text-gray-700">
                123 Marketplace Ave, Shop City, Country
              </p>
              <p className="text-sm text-gray-700">Email: info@yourstore.com</p>
              <p className="text-sm text-gray-700">Phone: +1 (234) 567-890</p>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Diaspora-Connect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default GuestHomePage;
