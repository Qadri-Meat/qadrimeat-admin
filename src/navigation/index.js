import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
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
        id: "users",
        title: "Users",
        type: "item",
        icon: <PersonIcon />,
        url: "/users",
        exact: "true",
      },
      {
        id: "deals",
        title: "Deals",
        type: "item",
        icon: <InventoryIcon />,
        url: "/deals",
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
        ],
      },
    ],
  },
];

export default navigation;