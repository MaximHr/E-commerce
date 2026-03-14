import { CardContent } from "@/components/ui/card";
import { type Order } from "@/types/order";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="border rounded-md max-w-2xl">
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <p className="font-semibold text-lg">Order</p>
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

        <div className="border rounded-[5px] py-3 px-4 flex justify-between gap-6">
          <div>
            <p className="text-sm font-semibold mb-1">{order.client.name}</p>
            <p className="text-sm text-muted-foreground">
              {order.client.email}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-1">Shipping Address</p>
            <p className="text-sm text-muted-foreground">
              {order.address.address}, {order.address.city}
              {order.address.postalCode &&
                `, ${order.address.postalCode}`}, {order.address.country}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Items:</p>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border rounded-[5px] px-4 py-3"
              >
                <div>
                  <p className="font-medium text-sm">{item.product.title}</p>
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
    </div>
  );
};

export default OrderCard;
