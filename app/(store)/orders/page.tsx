import { formatCurrency } from "@/lib/formatCurrency";
import { urlFor } from "@/sanity/lib/image";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default async function Orders() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);

  console.log(orders);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl rounded-xl bg-white p-4 shadow-lg sm:p-8">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>You have not placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="border-b border-gray-200 p-4 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <div>
                      <p className="mb-1 text-sm font-bold text-gray-600">
                        Order Number
                      </p>
                      <p className="break-all font-mono text-sm text-green-600">
                        {order.orderNumber}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="mb-1 text-sm text-gray-600">Order Date</p>
                      <p className="font-medium">
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString(
                              "en-NZ",
                            )
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center">
                      <span className="mr-2 text-sm">Status:</span>
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${order.status === "paid" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="sm:text-right">
                      <p className="mb-1 text-sm text-gray-600">Total Amount</p>
                      <p className="text-lg font-bold">
                        {formatCurrency(order.totalPrice ?? 0, order.currency)}
                      </p>
                    </div>
                  </div>

                  {order.amountDiscount ? (
                    <div className="mt-4 rounded-lg bg-red-50 p-3 sm:p-4">
                      <p className="mb-1 text-sm font-medium text-red-600 sm:text-base">
                        Discount Applied:{" "}
                        {formatCurrency(order.amountDiscount, order.currency)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Original Subtotal:{" "}
                        {formatCurrency(
                          (order.totalPrice ?? 0) + order.amountDiscount,
                          order.currency,
                        )}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="px-4 py-3 sm:px-6 sm:py-4">
                  <p className="mb-3 text-sm font-semibold text-gray-600 sm:mb-4">
                    Order Items
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    {order.products?.map((product) => (
                      <div
                        key={product.product?._id}
                        className="flex flex-col gap-3 border-b py-2 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          {product.product?.image && (
                            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md sm:h-16 sm:w-10">
                              <Image
                                src={urlFor(product.product.image).url() || ""}
                                alt={product.product.name ?? "Product image"}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium sm:text-base">
                              {product.product?.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Quantity: {product.quantity ?? "N/A"}
                            </p>
                          </div>
                        </div>

                        <p className="text-right font-medium font-bold">
                          {product.product?.price && product.quantity
                            ? formatCurrency(
                                product.product.price * product.quantity,
                                order.currency,
                              )
                            : "N/A"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
