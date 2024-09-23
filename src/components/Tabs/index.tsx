"use client";
import React, { useState } from "react";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { useRouter, usePathname } from "next/navigation";
import AddProductModal from "@/components/Addproduct/index"; // Import the modal component

// Define the type for button configuration
interface ButtonConfig {
  label: string;
  link: string;
}

const TabGroup = () => {
  const router = useRouter();
  const pathname = usePathname(); // use usePathname to get the current path

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Button configuration
  const buttonConfig: ButtonConfig[] = [
    { label: "New", link: "/unassigned" },
    { label: "Allocated", link: "/assigned" },
    { label: "Arrived", link: "/arrived" },
    { label: "Dispatched", link: "/dispatched" },
    { label: "Delivered", link: "/delivered" },
    { label: "Returned", link: "/returned" },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex gap-2 pb-5">
        {buttonConfig.map((button, i) => {
          const isActive = pathname === button.link;
          return (
            <ButtonDefault
              key={button.label}
              label={button.label}
              link={button.link}
              customClasses={`px-10 py-2 rounded-lg transform transition-transform duration-300 hover:scale-105 uppercase dark:bg-gray-dark dark:shadow-card ${
                isActive
                  ? "bg-blue-500 text-white dark:text-white" // Active state styling
                  : "bg-white text-black dark:text-gray-400"
              }`}
            />
          );
        })}
      </div>
      <div className="my-4 flex w-full items-center justify-end">
        <ButtonDefault
          label="create order"
          link=""
          customClasses="capitalize px-10 py-2 bg-blue-500 text-white rounded-lg transform transition-transform duration-300 hover:scale-105 dark:bg-gray-dark dark:shadow-card"
          onClick={() => openModal()}
        />
      </div>
      {isModalOpen && (
        <AddProductModal isOpen={isModalOpen} onClose={closeModal} />
      )}
      {/* Add the modal here */}
    </>
  );
};

export default TabGroup;
