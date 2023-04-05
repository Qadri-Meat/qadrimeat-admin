import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";

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
        icon: <PersonIcon />,
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
    ],
  },
];

export default navigation;
