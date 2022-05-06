import AddBookingPage from './AddBookingPage';
import AllBookingsPage from './AllBookingsPage';
import InvoicePage from './InvoicePage';

import BookingPage from './BookingPage';
import ReceiptPage from './ReceiptPage';
import UpdateBookingPage from './UpdateBookingPage';

export const BookingsPageConfig = {
  routes: [
    {
      path: '/bookings',
      exact: true,
      component: AllBookingsPage,
    },
    {
      path: '/bookings/add-booking',
      exact: true,
      component: AddBookingPage,
    },
    {
      path: '/bookings/update-booking/:id',
      exact: true,
      component: UpdateBookingPage,
    },
    {
      path: '/bookings/invoice/:id',
      exact: true,
      component: InvoicePage,
    },
    {
      path: '/bookings/:id',
      exact: true,
      component: BookingPage,
    },
    {
      path: '/bookings/invoice/:id',
      exact: true,
      component: InvoicePage,
    },
    {
      path: '/bookings/receipt/:id',
      exact: true,
      component: ReceiptPage,
    },
  ],
};
