export const fetchProducts = async () => {
  const response = await fetch("http://localhost:9000/api/admin/products", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.json();
};

export const fetchOrders = async () => {
  const response = await fetch("http://localhost:9000/api/admin/orders", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.json();
};

export const deleteProduct = async (productId) => {
  await fetch(`http://localhost:9000/api/admin/products/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const updateOrderStatus = async (orderId, status) => {
  await fetch(`http://localhost:9000/api/admin/orders/${orderId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
};
