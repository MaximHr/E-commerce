const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const fetchProducts = async (pageNumber, size, sortBy, order) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/products/list?page=${pageNumber}&size=${size}&sort=${sortBy},${order}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(response.error);
    }
  } catch (err) {
    throw new Error(
      err.message ||
        "Unable to retrieve products. Please refresh and try again.",
    );
  }
};

export const createCheckout = async (orders) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/payments/create-link`,
      {
        method: "POST",
        body: JSON.stringify(orders),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      const data = await response.json();

      return data;
    } else {
      throw new Error(response.error);
    }
  } catch (err) {
    throw new Error(
      err.message || "Unable to create payment. Please refresh and try again.",
    );
  }
};

export const fetchCollections = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/collections`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(response.error);
    }
  } catch (err) {
    throw new Error(err.message || "Unable to retrieve collections.");
  }
};

export const fetchProductBySlug = async (slug) => {
  try {
    const response = await fetch(`${SERVER_URL}/products/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(response.error);
    }
  } catch (err) {
    throw new Error(err.message || "Unable to retrieve this product.");
  }
};

export const fetchCollectionsBySlug = async (slug) => {
  try {
    const response = await fetch(`${SERVER_URL}/collections/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(response.error);
    }
  } catch (err) {
    throw new Error(
      err.message || "Unable to retrieve products from this collection.",
    );
  }
};
