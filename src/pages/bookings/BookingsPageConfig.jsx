import AddBookingPage from './AddBookingPage';
import AllBookingsPage from './AllBookingsPage';
import InvoicePage from './InvoicePage';

import BookingPage from './BookingPage';
import UpdateBookingPage from './UpdateBookingPage';
import AllBookingItemsPage from './AllBookingItemsPage';

export const BookingsPageConfig = {
  routes: [
    {
      path: '/bookings',
      exact: true,
      component: AllBookingsPage,
    },

    {
      path: '/bookings/booking-items',
      exact: true,
      component: AllBookingItemsPage,
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
  ],
};
