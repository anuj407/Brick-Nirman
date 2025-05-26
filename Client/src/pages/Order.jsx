import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { cancelOrderById, fetchAllOrders } from "../utils/HandleProductAPIs";

function Order() {
  const { orders, setOrders , user} = useContext(AppContext);
  const userId = user?._id; // Get user ID from context

  useEffect(() => {
    if (userId) {
      fetchAllOrders(setOrders);
      window.scrollTo(0, 0);
    }
  }, [setOrders, userId]);

  const handleCancelOrder = async (id) => {
    try {
      const res = await cancelOrderById(id); // your API call
      if (res.success) {
        // Update local state: change status to "Cancelled"
        fetchAllOrders(setOrders);
      }
    } catch (error) {
      console.error("Cancel order failed:", error);
    }
  };

  return (
    <div>
      {userId ? (
        orders && orders.length > 0 ? (
          <section className="py-8 antialiased bg-gray-900 md:min-h-screen">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-white sm:text-2xl">
                    My orders
                  </h2>
                </div>

                {/* Order Body */}
                <div className="mt-6 border-1 rounded-lg border-gray-800 p-4 flow-root sm:mt-8">
                  <div className="divide-y divide-gray-700">
                    {orders.map((order) => {
                      const status =
                        order.deliveryStatus?.toLowerCase() || "in progress";
                      const statusClass =
                        {
                          confirmed: " bg-green-900 text-green-300",
                          cancelled: " bg-red-900 text-red-300",
                          "in progress": "bg-yellow-900 text-yellow-300",
                        }[status] || "bg-gray-100 text-gray-800";

                      return (
                        <div
                          key={order._id}
                          className="flex flex-wrap items-center gap-y-4 py-6"
                        >
                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-400">
                              Order ID:
                            </dt>
                            <dd className="mt-1.5 text-base font-semibold text-white">
                              <a href="#" className="hover:underline">
                                #{order._id.slice(-8).toUpperCase()}
                              </a>
                            </dd>
                          </dl>

                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-400">
                              Date:
                            </dt>
                            <dd className="mt-1.5 text-base font-semibold text-white">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </dd>
                          </dl>

                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-400">
                              Price:
                            </dt>
                            <dd className="mt-1.5 text-base font-semibold text-white">
                              ₹{order.totalAmount.toLocaleString()}
                            </dd>
                          </dl>

                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-400">
                              Status:
                            </dt>
                            <dd
                              className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${statusClass}`}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </dd>
                          </dl>

                          <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                            {status === "cancelled" ? null : (
                              <button
                                onClick={() => handleCancelOrder(order._id)}
                                type="button"
                                className="w-full bg-red-500 hover:bg-red-600 cursor-pointer rounded-lg  px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:w-auto"
                              >
                                {status === "confirmed"
                                  ? "Order again"
                                  : "Cancel order"}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="flex text-red-400 w-full h-[20rem] justify-center items-center">
            No Orders
          </div>
        )
      ) : (
        <div className="flex w-full text-blue-400 h-[20rem] justify-center items-center">
          LogIn To See...
        </div>
      )}
    </div>
  );
}
export default Order;
