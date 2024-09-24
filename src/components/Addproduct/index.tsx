"use client";
import fetcher from "@/dataProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddProductModal: React.FC<any> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerLocality, setCustomerLocality] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [deliveryCost, setDeliveryCost] = useState("");
  const [orderAmount, setOrderAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let obj = {
      customerName: customerName,
      customerPhone: customerContact,
      customerAddress: customerAddress,
      customerLocality: customerLocality,
      amount: orderAmount,
      status: "New",
      paymentMode: paymentMode,
    };
    addOrder(obj);
  };

  const { mutate: addOrder } = useMutation({
    mutationFn: (data: object) => fetcher.post("/api/v1/orders", { ...data }),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(["all-orders"] as any);
      // setIsLoading(false);
      // openSnackbar("success", "Order added successfully!");

      alert("Order added successfully!");
      router.refresh();
      onClose();
    },
    onError: (err: any) => {
      // setIsLoading(false);
      alert(err?.response?.data?.message);
    },
  });

  return (
    <div className="z-90 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-20">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Add Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="customerName"
              >
                Customer Name
              </label>
              <input
                id="customerName"
                type="text"
                className="w-full rounded border border-gray-300 p-2"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="paymentMode"
              >
                Payment mode
              </label>
              <select
                id="paymentMode"
                className="w-full rounded border border-gray-300 p-2"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                required
              >
                <option value="COD">COD</option>
                <option value="Online">Online</option>
              </select>
            </div>

            {/* Second row */}
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="customerAddress"
              >
                Customer Address
              </label>
              <textarea
                id="customerAddress"
                className="w-full rounded border border-gray-300 p-2"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Enter customer address"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="customerLocality"
              >
                Customer Locality
              </label>
              <input
                id="customerLocality"
                type="text"
                className="w-full rounded border border-gray-300 p-2"
                value={customerLocality}
                onChange={(e) => setCustomerLocality(e.target.value)}
                placeholder="Enter customer locality"
                required
              />
            </div>

            {/* Third row */}
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="customerContact"
              >
                Customer Contact Number
              </label>
              <input
                id="customerContact"
                type="number"
                className="w-full rounded border border-gray-300 p-2"
                value={customerContact}
                onChange={(e) => setCustomerContact(e.target.value)}
                placeholder="Enter contact number"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="orderAmount"
              >
                Order Amount
              </label>
              <input
                id="orderAmount"
                type="number"
                className="w-full rounded border border-gray-300 p-2"
                value={orderAmount}
                onChange={(e) => setOrderAmount(e.target.value)}
                placeholder="Enter order amount"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded bg-gray-300 px-4 py-2 text-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Add Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
