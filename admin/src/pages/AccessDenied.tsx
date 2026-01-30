import { Link, useNavigate } from "react-router";
import { ArrowLeft, LogIn } from "lucide-react";
import { Button } from "../components/ui/button";

const AccessDenied = () => {
  const navigate = useNavigate();
	
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-destructive mb-4">403</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Access Denied
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            You do not have permission to view this page. Please sign in with
            the correct account to continue.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to={"/login"}>
              <>
                <LogIn />
                Log in
              </>
            </Link>
          </Button>

          <Button variant="outline" size="lg" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
