import AllUsersPage from "./AllUsersPage";
import AddUserPage from "./AddUserPage";

export const UsersPageConfig = {
  routes: [
    {
      path: "/users",
      exact: true,
      element: <AllUsersPage />,
    },
    {
      path: "/users/:id",
      element: <AddUserPage />,
    },
  ],
};
