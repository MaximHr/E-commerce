import { handleError } from "@/api/errorHandler";
import { getAllOrders } from "@/api/orders";
import { type Order } from "@/types/order";
import { useEffect, useState } from "react";

const ORDER_PAGE_SIZE = 100;

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>();
	const [totalElements, setTotalElements] = useState<number>();
	const [totalPages, setTotalPages] = useState<number>();

  const loadOrders = async () => {
    try {
      const res = await getAllOrders(0, ORDER_PAGE_SIZE);
			setOrders(res.content);
      setTotalElements(res.totalElements);
			setTotalPages(res.totalElements);
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
    <div>
      <h1 className="text-2xl special-font mb-7">Orders</h1>
    </div>
  );
};

export default Orders;
