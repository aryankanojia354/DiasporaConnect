import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
  role: "user", // Default role
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Redirect to home when the back button is pressed
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);

    const handleBackButton = () => {
      window.location.href = '/';
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  // Redirect if the user is already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  function handleCheckboxChange(event) {
    setFormData({
      ...formData,
      role: event.target.checked ? "admin" : "user", // Set role based on checkbox
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      {/* Admin Privilege Checkbox */}
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          id="admin-checkbox"
          onChange={handleCheckboxChange}
          className="h-4 w-4 border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="admin-checkbox" className="text-sm text-gray-700">
          Request Admin Privileges
        </label>
      </div>
    </div>
  );
}

export default AuthRegister;
