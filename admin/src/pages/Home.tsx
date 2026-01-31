import { handleError } from "@/api/errorHandler";
import { getTotalItemsSold, getTotalRevenue } from "@/api/orders";
import type { UserT } from "@/types/user";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

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
      setTotalRevenue(revenue);
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
    <div>
      <h1 className="text-2xl special-font mb-7">Welcome, {user?.email}</h1>
			<p>{totalRevenue}</p>
			<p>{totalItemsSold}</p>
    </div>
  );
};

export default Home;
