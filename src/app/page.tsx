import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Unassigned/TableOne";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TabGroup from "@/components/Tabs/index";

export const metadata: Metadata = {
  title: "Raceit Delivery Service Dashboard",
};

const Unassigned = async () => {
  // const response = await fetch(
  //   "https://raceitbackend.raceitdelivery.in/api/orders",
  //   {
  //     cache: "no-store",
  //   },
  // );
  // const data = await response.json();

  // const unassignedData = data["data"].filter(
  //   (order: { attributes: { status: string } }) =>
  //     order.attributes.status === "Unassigned",
  // );

  return (
    <DefaultLayout>
      <TabGroup />
      <Breadcrumb pageName="Unassigned" />
      <div className="flex flex-col gap-10">
        <TableOne orders={[]} />
      </div>
    </DefaultLayout>
  );
};

export default Unassigned;
