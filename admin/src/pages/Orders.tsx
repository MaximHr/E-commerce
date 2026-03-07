import { handleError } from "@/api/errorHandler";
import { getAllOrders } from "@/api/orders";
import { Card, CardContent } from "@/components/ui/card";
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
          <Card key={order.id}>
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <p className="font-semibold text-lg">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium">
                    Status:{" "}
                    <span className="font-semibold">
                      {order.status.replaceAll("_", " ")}
                    </span>
                  </p>
                  <p className="text-lg font-bold">
                    ${(order.amountTotal / 100).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Client */}
              <div className="border rounded-lg p-3">
                <p className="text-sm font-semibold mb-1">Client</p>
                <p className="text-sm">{order.client.name}</p>
                <p className="text-xs text-muted-foreground">
                  {order.client.email}
                </p>
              </div>

              {/* Address */}
              <div className="border rounded-lg p-3">
                <p className="text-sm font-semibold mb-1">Shipping Address</p>
                <p className="text-sm text-muted-foreground">
                  {order.address.address}, {order.address.city},{" "}
                  {order.address.postalCode}, {order.address.country}
                </p>
              </div>

              {/* Items */}
              <div>
                <p className="text-sm font-semibold mb-2">Items</p>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border rounded-lg p-3"
                    >
                      <div>
                        <p className="font-medium text-sm">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-medium">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </div>
);
};

export default Orders;
