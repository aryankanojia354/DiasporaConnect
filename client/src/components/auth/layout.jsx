import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side with Background Image and Welcome Text */}
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
          style={{
            backgroundImage: "url('/src/assets/registerimage.jpg')",
          }}
        />
        <div className="relative z-10 max-w-md space-y-6 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight transform transition-transform duration-500 hover:scale-110 hover:text-yellow-300 hover:drop-shadow-lg">
            Welcome to DiasporaConnect
          </h1>
        </div>
      </div>

      {/* Right Side for Outlet */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
