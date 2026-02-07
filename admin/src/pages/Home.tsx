import { handleError } from "@/api/errorHandler";
import { getTotalItemsSold, getTotalRevenue } from "@/api/orders";
import type { UserT } from "@/types/user";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button, buttonVariants } from '@/components/ui/button';

type OutletContextType = {
  user: UserT;
};

const Home = () => {
  const [totalRevenue, setTotalRevenue] = useState<number>();
  const [totalItemsSold, setTotalItemsSold] = useState<number>();
  const { user } = useOutletContext<OutletContextType>();

  function areStatsAllowed(): boolean {
    return user?.role == "Owner" || user?.role == "Store manager";
  }

  const loadStats = async () => {
    try {
      const revenue = await getTotalRevenue();
      setTotalRevenue(revenue / 100);
      const items = await getTotalItemsSold();
      setTotalItemsSold(items);
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("An error occurred. Try again later.");
      }
    }
  };

  useEffect(() => {
    if (areStatsAllowed()) {
      loadStats();
    }
  }, [user]);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl special-font mb-7">Welcome, {user?.email}</h1>
      <div className="card-holder flex items-center gap-12">
        <div className="stats-card">
          <h5 className="stats-title">
						{totalRevenue} 💸
          </h5>
					<p className="stats-desc">Good Job! {import.meta.env.VITE_COMPANY_NAME} has made exaclty {totalRevenue}€ in sales.</p>
          <Link to="/admin/orders">
            <Button size="lg" variant="outline">View orders</Button>
          </Link>
        </div>
        <div className="stats-card">
          <h5 className="stats-title">
						{totalItemsSold} 🛒
          </h5>
					<p className="stats-desc">{totalItemsSold} items sold - and this is just the beginning.</p>
          <Link to="/admin/products">
            <Button size="lg" variant="outline">View products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
