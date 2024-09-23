"use client";
import fetcher from "@/dataProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdateProductModal: React.FC<any> = ({ onClose, selectedOrder }) => {
  console.log("🚀 ~ data: UpdateProductModal", selectedOrder);
  const queryClient = useQueryClient();
  const router = useRouter();

  const [customerName, setCustomerName] = useState(
    selectedOrder?.attributes?.CustomerName,
  );
  const [paymentMode, setPaymentMode] = useState(
    selectedOrder?.attributes?.payment_mode,
  );
  const [customerAddress, setCustomerAddress] = useState(
    selectedOrder?.attributes?.CustomerAddress,
  );
  const [customerLocality, setCustomerLocality] = useState(
    selectedOrder?.attributes?.CustomerLocality,
  );
  const [customerContact, setCustomerContact] = useState(
    selectedOrder?.attributes?.CustomerPhone,
  );
  const [orderStatus, setOrderStatus] = useState(
    selectedOrder?.attributes?.status,
  );
  const [orderAmount, setOrderAmount] = useState(
    selectedOrder?.attributes?.amount,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let obj = {
      customerName: customerName,
      customerPhone: customerContact,
      customerAddress: customerAddress,
      customerLocality: customerLocality,
      amount: orderAmount,
      status: orderStatus,
      paymentMode: paymentMode,
    };
    updateOrder(obj);

    // Close modal after submission
  };

  const { mutate: updateOrder } = useMutation({
    mutationFn: (data: object) =>
      fetcher.patch(`/api/v1/orders/${selectedOrder?.id}`, { ...data }),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(["all-orders"] as any);
      // setIsLoading(false);
      // openSnackbar("success", "Amenity added successfully!");
      router.refresh();
      alert("Success");
      onClose();
    },
    onError: (err: any) => {
      // setIsLoading(false);
      alert(err?.response?.data?.message);
    },
  });

  //   useEffect(() => {
  //     setCustomerName(selectedOrder?.attributes?.customerName);
  //     setPaymentMode(selectedOrder?.attributes?.paymentMode);
  //     setCustomerAddress(selectedOrder?.attributes?.customerAddress);
  //     setCustomerLocality(selectedOrder?.attributes?.customerLocality);
  //     setCustomerContact(selectedOrder?.attributes?.customerContact);
  //     setOrderAmount(selectedOrder?.attributes?.orderAmount);
  //     setOrderStatus(selectedOrder?.attributes?.status);
  //   }, [selectedOrder]);

  return (
    <div className="z-90 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-20">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Update Order</h2>
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
              <input
                id="paymentMode"
                type="text"
                className="w-full rounded border border-gray-300 p-2"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                placeholder="Enter Payment mode"
                required
              />
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
                type="text"
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

            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="orderStatus"
              >
                Status
              </label>
              <select
                id="orderStatus"
                className="w-full rounded border border-gray-300 p-2"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                required
              >
                <option value="New">New</option>
                <option value="Allocated">Allocated</option>
                <option value="Arrived">Arrived</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Delivered">Delivered</option>
                <option value="Returned">Returned</option>
              </select>
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

export default UpdateProductModal;
