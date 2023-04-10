import AllBookingsPage from "./AllBookingsPage";

export const BookingPageConfig = {
  routes: [
    {
      path: "/bookings",
      exact: true,
      element: <AllBookingsPage />,
    },
  ],
};
