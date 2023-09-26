import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ReceiptIcon from "@mui/icons-material/Receipt";
const navigation = [
  {
    id: "Main",
    title: "",
    type: "group",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "item",
        icon: <DashboardIcon />,
        url: "/",
        exact: "true",
      },
      {
        id: "pos",
        title: "POS",
        type: "item",
        icon: <InventoryIcon />,
        url: "/orders/add-order",
        exact: "true",
      },
      {
        id: "users",
        title: "Users",
        type: "item",
        icon: <PersonIcon />,
        url: "/users",
        exact: "true",
      },
      {
        id: "products",
        title: "Products",
        type: "item",
        icon: <InventoryIcon />,
        url: "/products",
        exact: "true",
      },
      {
        id: "orders",
        title: "Orders",
        type: "item",
        icon: <InventoryIcon />,
        url: "/orders",
        exact: "true",
      },

      {
        id: "bookings",
        title: "Bookings",
        type: "collapse",
        icon: <FileCopyIcon />,
        badge: {
          title: "2",
          bg: "#525E8A",
          fg: "#FFFFFF",
        },
        children: [
          {
            id: "all bookings",
            title: "All Bookings",
            type: "item",
            url: "/bookings",
            exact: "true",
          },
          {
            id: "booking items",
            title: "Booking items",
            type: "item",
            url: "/bookings/booking-items",
            exact: "true",
          },
          {
            id: "deals",
            title: "Deals",
            type: "item",
            url: "/deals",
            exact: "true",
          },
        ],
      },
      {
        id: "expenses",
        title: "Expenses",
        type: "item",
        icon: <ReceiptIcon />,
        url: "/expenses",
        exact: "true",
      },
      {
        id: "dailyReport",
        title: "Daily Report",
        type: "item",
        icon: <ReceiptIcon />,
        url: "/dailyreport",
        exact: "true",
      },
    ],
  },
];

export default navigation;
