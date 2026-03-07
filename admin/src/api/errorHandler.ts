import { toast } from "react-toastify";

export function handleError(err: string | string[]): void {
  if (typeof err == "string") {
    if (err === "token expired") {
			localStorage.removeItem("token");
    } else {
      toast.error(err);
    }
  } else {
    err.forEach((message) => {
      toast.error(message);
    });
  }
}

export function checkIsForbidden(res: Response) {
  if (res.status === 403) {
    throw new Error("Forbidden request.");
  }
}

interface DataInterface {
	error?: string;
	messages?: string
}

export function checkIsOk(res: Response, data: DataInterface | string) {
  if (res.status < 200 || res.status >= 300) {
		if (typeof data == "string") {
			throw new Error(data);
		}

    if (data?.error) {
      throw new Error(data.error);
    }
    throw new Error(data.messages);
  }
}
