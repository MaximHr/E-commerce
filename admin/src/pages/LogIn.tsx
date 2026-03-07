import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/LoginForm";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import AdminInfo from "@/components/AdminInfo";

export default function LogIn() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            {import.meta.env.VITE_COMPANY_NAME}
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ToastContainer />
            <LoginForm />
          </div>
        </div>
      </div>
      <AdminInfo />
    </div>
  );
}
