import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const root = createRoot(document.getElementById("root"));

function LoadingWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white bg-opacity-80 z-50">
          <DotLottieReact
            src="https://lottie.host/461e9f32-33c8-487c-aa3f-9c4d40676022/fN3rzHQysX.lottie"
            loop
            autoplay
            style={{ width: '300px', height: '300px' }}
          />
        </div>
      )}
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </>
  );
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingWrapper />
    </BrowserRouter>
  </React.StrictMode>
);