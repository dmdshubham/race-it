"use client";
import fetcher from "@/dataProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import UpdateProductModal from "../UpdateProduct";
import ConfirmModal from "../common/ConfirmPopup/page";

const fetchOrders = async (orderStatus: string) => {
  const response = await fetcher.get(
    `/api/v1/orders?status=${orderStatus}&limit=100&page=1`,
  );
  if (response.status === 200) {
    return response.data.data.data;
  } else {
    throw new Error("Failed to fetch amenities");
  }
};

const TableOne: React.FC<any> = ({ orders, orderStatus = "New" }) => {
  // Using useQuery for fetching amenities

  const [selectedItem, setSelectedItem] = useState<any>();
  const [isModalOpen, setModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleConfirmAction = () => {
    setModalOpen(false);
    deleteOrder(selectedItem?.id);
  };

  const closeModalEdit = () => {
    setIsEditModalOpen(false);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-orders"], // Unique query key
    queryFn: () => fetchOrders(orderStatus), // Function to fetch orders
    staleTime: 0, // Refetch data if it becomes stale
    initialData: orders, // Pass initial data from server-side (if you need it)
  });

  const { mutate: deleteOrder } = useMutation({
    mutationFn: (id: string) => fetcher.delete(`/api/v1/orders/${id}`),
    onSuccess: ({ data }) => {
      refetch();
      console.log("🚀 ~ response:", data);
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message);
    },
  });

  const handleDelete = useCallback((item: any) => {
    setSelectedItem(item);
    handleOpenModal();
  }, []);

  const handleEdit = useCallback((item: any) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  }, []);

  const formatISODate = (isoString: any) => {
    const date = new Date(isoString);

    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

  return (
    <div>
      {data?.length > 0 ? (
        <div>
          <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="flex flex-col">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-8">
                {[
                  "Delivery Order ID",
                  "Customer Name",
                  "Customer Phone",
                  "Customer Address",
                  "Amount",
                  "Payment Mode",
                  "Status",
                  "Order date",
                ].map((header, index) => (
                  <div className="px-2 pb-3.5 text-center" key={index}>
                    <h5 className="text-sm font-medium uppercase xsm:text-sm">
                      {header}
                    </h5>
                  </div>
                ))}
              </div>

              {data?.map((item: any, key: number) => (
                <div
                  className={`grid grid-cols-3 gap-2 sm:grid-cols-8 ${
                    key === data?.length - 1
                      ? ""
                      : "border-b border-stroke dark:border-dark-3"
                  }`}
                  key={key}
                >
                  <div className="flex items-center justify-center px-2 py-4">
                    <p className="hidden font-medium text-dark dark:text-white sm:block">
                      #{item?.id}
                    </p>
                  </div>
                  <div className="flex items-center justify-center px-2 py-4">
                    <p className="font-medium text-dark dark:text-white">
                      {item?.attributes?.CustomerName}
                    </p>
                  </div>
                  <div className="flex items-center justify-center px-2 py-4">
                    <p className="font-medium text-dark dark:text-white">
                      {item?.attributes?.CustomerPhone}
                    </p>
                  </div>
                  <div className="hidden items-center justify-center px-2 py-4 sm:flex">
                    <p className="font-medium text-dark dark:text-white">
                      {item?.attributes?.CustomerAddress}
                    </p>
                  </div>
                  <div className="hidden items-center justify-center px-2 py-4 sm:flex">
                    <p className="font-medium text-dark dark:text-white">
                      {item?.attributes?.amount}
                    </p>
                  </div>
                  <div className="hidden items-center justify-center px-2 py-4 sm:flex">
                    <p className="font-medium text-dark dark:text-white">
                      {item?.attributes?.payment_mode}
                    </p>
                  </div>
                  <div className="hidden items-center justify-center px-2 py-4 sm:flex">
                    <p className="font-medium text-dark dark:text-white">
                      {item?.attributes?.status}
                    </p>
                  </div>
                  <div className="hidden items-center justify-center px-2 py-4 sm:flex">
                    <p className="font-medium text-dark dark:text-white">
                      {formatISODate(item?.attributes?.createdAt)}
                    </p>
                  </div>
                  {/* <div className="hidden items-center justify-center px-2 py-4 sm:flex">
                    <p
                      onClick={() => handleEdit(item)}
                      className=" cursor-pointer font-medium text-dark dark:text-white"
                    >
                      Edit
                    </p>{" "}
                    &nbsp;
                    <p
                      onClick={() => handleDelete(item)}
                      className="cursor-pointer font-medium text-dark text-red dark:text-white"
                    >
                      {" "}
                      Delete
                    </p>
                  </div> */}
                </div>
              ))}
            </div>
          </div>

          <div>
            <ConfirmModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              title="Delete Order"
              subtitle="Are you sure you want to delete this order"
              cancelText="Cancel"
              confirmText="Delete"
              onConfirm={handleConfirmAction}
            />
          </div>
          {isEditModalOpen && (
            <UpdateProductModal
              selectedOrder={selectedItem}
              isOpen={isEditModalOpen}
              onClose={closeModalEdit}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center text-xl">
          No Record Found
        </div>
      )}
    </div>
  );
};

export default TableOne;
