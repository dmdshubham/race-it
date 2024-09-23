import { cookies } from "next/headers";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TabGroup from "@/components/Tabs/index";
import fetcher from "@/dataProvider";
import TableOne from "@/components/Unassigned/TableOne";

export const metadata: Metadata = {
  title: "Raceit Delivery Service Dashboard",
};

// Get the token from cookies and pass it in the headers
const getNewOrderData = async () => {
  try {
    // Fetch the token from cookies using cookies() from next/headers
    const cookieStore = cookies(); // Get all cookies
    const token = cookieStore.get("token")?.value; // Get the token value from cookies

    if (!token) {
      throw new Error("Token is undefined");
    }

    // Make the API request with the token in the headers
    const response = await fetcher.get(
      "/api/v1/orders?status=New&limit=100&page=1",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      },
    );

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch order: Non-200 status code");
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    return []; // Return fallback data or handle error appropriately
  }
};

// Ensure that the cookies are available in the context
const TablesPage = async () => {
  const data = await getNewOrderData();

  return (
    <DefaultLayout>
      <TabGroup />
      <Breadcrumb pageName="Unassigned" />
      <div className="flex flex-col gap-10">
        <TableOne orders={data?.data} orderStatus="New" />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
