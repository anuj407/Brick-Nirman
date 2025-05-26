/* eslint-disable no-unused-vars */
import { apiUrl } from "./constant.jsx";

// add to favorites
export const fetchFavProducts = async (setFavProduct) => {
  try {
    const response = await fetch(`${apiUrl}/addToFav/get-favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    if (result?.data) {
      setFavProduct(result.data); // ✅ Update state inside component
    }
  } catch (error) {
    console.error("Error fetching favorite products:", error);
  }
};
export const fetchProductDetails = async (id, setProduct) => {
  try {
    const response = await fetch(`${apiUrl}/products/get-product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();

    if (result?.data) {
      setProduct(result.data); // ✅ Update state inside component
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
//get Supplier Producyts by SupplierId
export const fetchProductsBySupplierId = async (
  supplierId,
  setSupplierProducts
) => {
  try {
    const response = await fetch(
      `${apiUrl}/products/get-supplier-products/${supplierId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const result = await response.json();
    if (result?.data) {
      console.log("Supplier Products:", result.data);
      setSupplierProducts(result.data); // ✅ Update products state
    }
  } catch (error) {
    console.error("Error fetching supplier products:", error);
  }
};
export const checkFav = async (productId, setIsFavorited) => {
  try {
    const response = await fetch(
      `${apiUrl}/addToFav/check-favorite?productId=${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const result = await response.json();
    // console.log(result);

    if (result?.data) {
      setIsFavorited(result.data.isFavorited); // ✅ Update state inside component
    }
  } catch (error) {
    console.error("Error fetching favorite products:", error);
  }
};
export const AddFavProducts = async (id) => {
  // console.log("Adding favorite products id: ", id);

  try {
    const response = await fetch(`${apiUrl}/addToFav/add-to-favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
      credentials: "include",
    });
    const result = await response.json();
    // console.log(result);
  } catch (error) {
    console.error("Error fetching favorite products:", error);
  }
};
export const RemoveFavProducts = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/addToFav/remove-favorites`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
      credentials: "include",
    });
    const result = await response.json();
    // console.log(result);
  } catch (error) {
    console.error("Error fetching favorite products:", error);
  }
};
// add to cart
export const checkCart = async (productId, setIsCarted) => {
  try {
    const response = await fetch(
      `${apiUrl}/addToCart/check-cart/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const result = await response.json();
    // console.log("is carted value: ", result);

    if (result?.data) {
      setIsCarted(result.data.isInCart); // ✅ Update state inside component
    }
  } catch (error) {
    console.error("Error fetching favorite products:", error);
  }
};

export const AddCartProduct = async (productId, price) => {
  try {
    const response = await fetch(`${apiUrl}/addToCart/add-to-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId, price }),
    });
    const result = await response.json();
    
  } catch (error) {
    console.error("AddCartProduct error:", error);
  }
};

export const RemoveCartProduct = async (productId, setCartProducts) => {
  try {
    const response = await fetch(
      `${apiUrl}/addToCart/remove-from-cart/${productId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const result = await response.json();
    if (result.success) {
      await getCartItems(setCartProducts);
    }
  } catch (error) {
    console.error("RemoveCartProduct error:", error);
  }
};

export const RemoveCartProductCompletely = async (
  productId,
  setCartProducts
) => {
  try {
    const response = await fetch(
      `${apiUrl}/addToCart/remove-from-cart-complete/${productId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const result = await response.json();
    if (result.success) {
      await getCartItems(setCartProducts);
    }
  } catch (error) {
    console.error("RemoveCartProductCompletely error:", error);
  }
};

export const getCartItems = async (setCartProducts) => {
  try {
    const response = await fetch(`${apiUrl}/addToCart/get-cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();
    if (result?.data) {
      setCartProducts(result.data);
    }
  } catch (error) {
    console.error("Error fetching cart products:", error);
  }
};

//create Product
export const createProduct = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}/products/create-product`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const result = await response.json();
    if (!response.ok)
      throw new Error(result.message || "Failed to create product");

    return result; // ✅ return result so you can handle it in the caller
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // ❌ throw again so the caller knows it failed
  }
};
export const createOrder = async (
  products,
  totalAmount,
  addressData,
  setShowConfirmation
) => {
  try {
    const response = await fetch(`${apiUrl}/orders/create-order`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: products,
        totalAmount: totalAmount,
        paymentMethod: "Cash",
        deliveryAddress: addressData,
      }),
    });

    const result = await response.json();
    setShowConfirmation(true);
    if (!response.ok)
      throw new Error(result.message || "Failed to create product");

    return result; // ✅ return result so you can handle it in the caller
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // ❌ throw again so the caller knows it failed
  }
};
export const clearCart = async (setShowConfirmation) => {
  try {
    const response = await fetch(`${apiUrl}/addToCart/clear-cart`, {
      method: "DELETE",
      credentials: "include", // ensures cookies are sent for authentication
    });

    const result = await response.json();
    setShowConfirmation(true);
    if (!response.ok) {
      throw new Error(result.message || "Failed to clear cart");
    }

    return result; // ✅ success response
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error; // ❌ re-throw for error handling in UI
  }
};

export const fetchAllOrders = async (setOrders) => {
  try {
    const response = await fetch(`${apiUrl}/orders/get-All-Orders`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await response.json();
    if (result.success) {
      setOrders(result.data);
      return result
    }
  } catch (error) {
    console.error("fetchAllOrders error:", error);
  }
};


export const fetchOrderById = async (orderId, setOrder) => {
  try {
    const response = await fetch(`${apiUrl}/get-order/${orderId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await response.json();
    if (result.success) {
      setOrder(result.data);
    }
  } catch (error) {
    console.error("fetchOrderById error:", error);
  }
};

export const updateOrderDetails = async (orderId, updatedFields, setUpdatedOrder) => {
  try {
    const response = await fetch(`${apiUrl}/update-orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updatedFields),
    });

    const result = await response.json();
    if (result.success) {
      setUpdatedOrder(result.data);
    }
  } catch (error) {
    console.error("updateOrderDetails error:", error);
  }
};

export const cancelOrderById = async (orderId) => {
  try {
    const response = await fetch(`${apiUrl}/orders/update-status/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await response.json();
    if (result.success) {
       return result;
    }
  } catch (error) {
    console.error("cancelOrderById error:", error);
  }
};

export const updateOrderStatusById = async (orderId, statusFields, setOrderStatus) => {
  try {
    const response = await fetch(`${apiUrl}/update-order-status/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(statusFields),
    });

    const result = await response.json();
    if (result.success) {
      setOrderStatus(result.data);
    }
  } catch (error) {
    console.error("updateOrderStatusById error:", error);
  }
};