import React from "react";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";

const DashboardPage = (props) => {
  return (
    <AdminLayout>
      <h1>Dashboard</h1>
      <AdminBreadcrumbs />
    </AdminLayout>
  );
};

export default DashboardPage;
