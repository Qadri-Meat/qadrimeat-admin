import AddBookingPage from "./AddBookingPage";
import AllBookingsPage from "./AllBookingsPage";
import BookingPage from "./BookingPage";

export const BookingPageConfig = {
  routes: [
    {
      path: "/bookings",
      exact: true,
      element: <AllBookingsPage />,
    },
    {
      path: "/add-booking",
      element: <AddBookingPage />,
    },
    {
      path: "/bookings/:id",
      element: <BookingPage />,
    },
  ],
};
