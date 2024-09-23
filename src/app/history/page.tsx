import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/History/TableOne";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Raceit Delivery Service Dashboard",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="History" />
      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
