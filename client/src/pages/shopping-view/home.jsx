// ShoppingHome.jsx

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Flower, GiftIcon, Home, Leaf, Paintbrush, Shirt } from "lucide-react";
import { FaGifts, FaTshirt, FaPalette, FaLeaf, FaHands } from "react-icons/fa";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { getFeatureImages } from "@/store/common-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';


// Array of images with overlay texts using external URLs
const scrollingImages = [
  {
    src: "https://i.postimg.cc/cJsvV7Nf/IMG-20241211-WA0098.jpg",
    alt: "Designed by Gulam Mohammad",
    overlayText: "Designed by Gulam Mohammad",
    sellerInfoId: "1" // ID for Gulam Mohammad
  },
  {
    src: "https://i.postimg.cc/HxnVLpnx/IMG-20241211-WA0099.jpg",
    alt: "Designed by Rajendra Bhagel",
    overlayText: "Designed by Rajendra Bhagel",
    sellerInfoId: "2" // ID for Rajendra Bhagel

  },
  {
    src: "https://i.ibb.co/SPPDS22/Screenshot-2024-12-11-at-6-45-28-PM.png",
    alt: "Designed by Md.A.Ansari",
    overlayText: "Designed by Md.A.Ansari",
    sellerInfoId: "3" // ID for Md.A.Ansari

  },
  // Add more external images as needed
  {
    src: "https://i.pinimg.com/474x/6e/5a/09/6e5a09e353f28a34a8f03d06cf023ed4.jpg",
    alt: "Designed by Gafar Khatri",
    overlayText: "Designed by Gafar Khatri",
    sellerInfoId: "4" // ID for Gafar Khatri

  },

  {
    src: "https://i.pinimg.com/736x/6a/7b/87/6a7b87547b94d91e70e41f142db16ea3.jpg",
    alt: "Designed by Sajan Wahi",
    overlayText: "Designed by Sajan Wahi",
    sellerInfoId: "5"
  },
];

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

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    if (featureImageList && featureImageList.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
      }, 15000);
      return () => clearInterval(timer);
    }
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

  const handleNavigateToCommunity = () => {
    navigate("/community");
  };

  const handleNavigateToWorkshop = () => {
    navigate("/workshop");
  };

  const handleNavigateToHeritage = () => {
    navigate("/heritage");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">
            <Button variant="ghost" onClick={() => navigate("/")}>
              MyShop
            </Button>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              onClick={handleNavigateToCommunity}
              className="text-gray-700 hover:text-primary"
            >
              Community
            </Button>
            <Button
              variant="ghost"
              onClick={handleNavigateToWorkshop}
              className="text-gray-700 hover:text-primary"
            >
              Workshop
            </Button>
            <Button
              variant="ghost"
              onClick={handleNavigateToHeritage}
              className="text-gray-700 hover:text-primary"
            >
              Our Heritage
            </Button>
          </div>
        </div>
      </nav>

      {/* Banner Slider */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                alt={`Slide ${index + 1}`}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        {featureImageList && featureImageList.length > 0 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentSlide(
                  (prevSlide) =>
                    (prevSlide - 1 + featureImageList.length) %
                    featureImageList.length
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
                setCurrentSlide(
                  (prevSlide) => (prevSlide + 1) % featureImageList.length
                )
              }
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {/* Shop by Category */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
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

      {/* Shop by Brand */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
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

      {/* Feature Products with Infinite Scrolling Sidebar */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Products
          </h2>
          <div className="flex gap-6">
            {/* Left side: Product grid */}
            <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productList && productList.length > 0
                ? productList.map((productItem) => (
                    <ShoppingProductTile
                      key={productItem.id}
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  ))
                : <p className="col-span-full text-center text-gray-500">No products available.</p>}
            </div>

            {/* Right side: Infinite scrolling images with overlay text */}
            <div className="hidden lg:block w-1/4 relative overflow-hidden border border-gray-200 rounded-lg">
              <div className="absolute top-0 left-0 w-full h-full animate-scrollImages flex flex-col gap-y-4">
                {/* Duplicate images to create a seamless loop */}
                {[...scrollingImages, ...scrollingImages].map((img, idx) => (
                  <div key={idx} className="relative flex-shrink-0">
                  <Link to={`/seller-info/${img.sellerInfoId}`}>
                    <img 
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-[250px] object-cover rounded-lg"
                    />
                    </Link>
                    <div className="absolute bottom-4 rounded-lg font-bold  left-20 bg-white  text-black text-sm px-2 py-1  opacity-100 transition-transform duration-300 ease-in-out transform hover:scale-125">
                      {img.overlayText}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />

      {/* Chatbot Widget */}
      <ChatbotWidget />

      {/* Footer */}
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

      {/* Inline styles for infinite scroll animation */}
      <style jsx>{`
        @keyframes scrollImages {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .animate-scrollImages {
          animation: scrollImages 30s linear infinite; /* Increased duration for smoother scrolling */
        }

        /* Ensure no gaps disrupt the scroll */
        .animate-scrollImages > div {
          flex-shrink: 0;
        }

        /* Optional: Pause animation on hover */
        .animate-scrollImages:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default ShoppingHome;
