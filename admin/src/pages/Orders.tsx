import { handleError } from "@/api/errorHandler";
import { getAllOrders } from "@/api/orders";
import OrderCard from "@/components/OrderCard";
import { type Order } from "@/types/order";
import { useEffect, useState } from "react";

const ORDER_PAGE_SIZE = 100;

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>();
	const [totalElements, setTotalElements] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>();

  const loadOrders = async () => {
    try {
      const res = await getAllOrders(0, ORDER_PAGE_SIZE);
			setOrders(res.content);
			setTotalPages(res.totalPages);
      setTotalElements(res.totalElements);
    } catch (err) {
      if (err instanceof Error) {
        handleError(err.message);
      } else {
        handleError("An error occurred. Try again later.");
      }
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

 return (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl special-font mb-1">Orders</h1>
      <p className="text-sm text-muted-foreground">
        Total orders: {totalElements ?? 0}
      </p>
    </div>

    {!orders || orders.length === 0 ? (
      <p className="text-sm text-muted-foreground">No orders found.</p>
    ) : (
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    )}
  </div>
);
};

export default Orders;
