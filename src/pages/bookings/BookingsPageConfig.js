import AddBookingPage from "./AddBookingPage";
import AllBookingItemsPage from "./AllBookingItemsPage";
import AllBookingsPage from "./AllBookingsPage";
import BookingPage from "./BookingPage";
import InvoicePage from "./InvoicePage";
import UpdateBookingPage from "./UpdateBookingPage";

export const BookingPageConfig = {
  routes: [
    {
      path: "/bookings",
      exact: true,
      element: <AllBookingsPage />,
    },
    {
      path: "/bookings/booking-items",
      exact: true,
      element: <AllBookingItemsPage />,
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
    {
      path: "/bookings/invoice/:id",
      exact: true,
      element: <InvoicePage />,
    },
  ],
};
