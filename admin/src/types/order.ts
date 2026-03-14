import type { ProductTListResponse } from "./product";

export interface OrderItemDto {
  id: number;
  quantity: number;
  product: ProductTListResponse;
}

export interface Client {
  email: string;
  name: string;
}

export interface Address {
  country: string;
  city: string;
  address: string;
  postalCode: string | null;
}

export interface Order {
  id: number;
  client: Client;
  address: Address;
  items: OrderItemDto[];
  status: string;
  totalPrice: number;
	createdAt: number; // or is it
	amountTotal: number;
}
