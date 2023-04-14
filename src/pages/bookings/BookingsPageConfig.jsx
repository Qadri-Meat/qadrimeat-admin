import AddBookingPage from "./AddBookingPage";
import AllBookingsPage from "./AllBookingsPage";
import BookingPage from "./BookingPage";
import UpdateBookingPage from "./UpdateBookingPage";

export const BookingPageConfig = {
  routes: [
    {
      path: "/bookings",
      exact: true,
      element: <AllBookingsPage />,
    },
    {
      path: "/bookings/add-booking",
      element: <AddBookingPage />,
    },
    {
      path: "/bookings/:id",
      element: <BookingPage />,
    },

    {
      path: "/bookings/update-booking/:id",
      element: <UpdateBookingPage />,
    },
  ],
};
