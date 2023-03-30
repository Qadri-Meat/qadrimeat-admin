import PersonIcon from "@mui/icons-material/Person";

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
        id: "batches",
        title: "Batches",
        type: "item",
        icon: <PersonIcon />,
        url: "/batches",
        exact: "true",
      },
    ],
  },
];

export default navigation;
