import Profile from "./Profile";

export const ProfilePageConfig = {
  routes: [
    {
      path: "/profile",
      exact: true,
      element: <Profile />,
    },
  ],
};
