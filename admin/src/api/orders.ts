import { authFetch } from "./auth";
import { checkIsForbidden, checkIsOk } from "./errorHandler";

export async function getAllOrders(pageNumber: number, size: number) {
	const res = await authFetch(
		`${import.meta.env.VITE_SERVER_URL}/orders?page=${pageNumber}&size=${size}`,
		{
			method: "GET",
		},
	);

	checkIsForbidden(res);
	const data = await res.json();
	console.log(data);
	checkIsOk(res, data);

	return data;
}

export async function updateStauts(
	id: number,
	status: string
): Promise<string> {
	const res = await authFetch(
		`${import.meta.env.VITE_SERVER_URL}/orders/${id}`,
		{
			method: "PATCH",
			body: JSON.stringify(status),
		},
	);

	checkIsForbidden(res);
	const data = await res.text();
	console.log(data);
	checkIsOk(res, data);

	return data;
}

export async function getTotalRevenue(): Promise<number> {
	const res = await authFetch(
		`${import.meta.env.VITE_SERVER_URL}/orders/revenue`,
		{
			method: "GET",
		},
	);

	checkIsForbidden(res);
	const data = await res.json();
	checkIsOk(res, data);

	return data;
}

export async function getTotalItemsSold(): Promise<number> {
	const res = await authFetch(
		`${import.meta.env.VITE_SERVER_URL}/orders/items-sold`,
		{
			method: "GET",
		},
	);

	checkIsForbidden(res);
	const data = await res.json();
	checkIsOk(res, data);

	return data;
}