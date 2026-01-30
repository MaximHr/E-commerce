import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { ToastContainer } from "react-toastify";

const ForgottenPassword = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      navigate("/admin");
    }
  }, [navigate]);

  const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("password resend...");
  };

  return (
    <>
      {localStorage.getItem("token") == null && (
        <>
          <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
              <div className="flex justify-center gap-2 md:justify-start">
                <a
                  href="/admin/home"
                  className="flex items-center gap-2 font-medium"
                >
                  <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  {import.meta.env.VITE_COMPANY_NAME}
                </a>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                  <ToastContainer />
                  <form
                    className={cn("flex flex-col gap-6", className)}
                    {...props}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <h1 className="text-3xl font-bold special-font">
                        Reset password
                      </h1>
                      <p className="text-muted-foreground text-sm text-balance">
                        Enter your details and we will send you an email with a
                        reset code.
                      </p>
                    </div>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="john@gmail.com"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" onClick={submit}>
                        Send Reset Link
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
              <img
                src="/placeholder.svg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgottenPassword;
