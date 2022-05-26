import React, { useEffect } from 'react';
import './styles/invoice.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBooking } from 'state/ducks/booking/actions';
import { Avatar } from '@material-ui/core';
import { getDiscountPrice } from 'helpers/product';

const InvoicePage = (props) => {
  const { history, match } = props;
  const bookingId = match.params.id;

  const dispatch = useDispatch();
  const { selectedBooking } = useSelector((state) => state.booking);
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      if (!selectedBooking || selectedBooking.id !== bookingId) {
        dispatch(getBooking(bookingId));
      }
    } else {
      history.push('/login');
    }
  }, [history, authUser, selectedBooking, bookingId, dispatch]);
  return (
    <>
      {!selectedBooking ? (
        <></>
      ) : (
        <div>
          <link
            href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
            rel="stylesheet"
            id="bootstrap-css"
          />
          <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
          <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
          <div className="container mt-3">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body p-0 p-5">
                    <div className="row ">
                      <div className="col-md-6">
                        <h2>Qadri Meat</h2>
                        <div>
                          <p className="text-muted">
                            <strong>Email:</strong> qadrimeat@gmail.com
                            <br />
                            <strong>Phone:</strong> +92 302-4000719
                            <br />
                            <strong>Address:</strong> Street 113, Sector N Dha
                            Phase 1, Lahore, Punjab , Pakistan
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6 text-right">
                        <button
                          className="btn btn-primary hidden-print"
                          onClick={() => window.print()}
                        >
                          <span
                            className="glyphicon glyphicon-print noprint"
                            aria-hidden="true"
                          ></span>{' '}
                          Print
                        </button>
                        <p className="font-weight-bold mb-1">
                          Booking # {selectedBooking.id}
                        </p>
                        <p className="text-muted">
                          Date: {selectedBooking.createdAt.substring(0, 10)}
                        </p>
                      </div>
                    </div>

                    <hr />
                    {selectedBooking.type === 'online' ? (
                      <div className="row">
                        <div className="col-md-6">
                          <p className="font-weight-bold mb-4">
                            To:{' '}
                            {selectedBooking.shippingDetails.firstName +
                              ' ' +
                              selectedBooking.shippingDetails.lastName}
                          </p>
                          <p className="text-muted">
                            <strong>Email:</strong>{' '}
                            {selectedBooking.shippingDetails.email}
                            <br />
                            <strong>Phone:</strong>{' '}
                            {selectedBooking.shippingDetails.phone}
                            <br />
                            <strong>Address:</strong>{' '}
                            {selectedBooking.shippingDetails.address},{' '}
                            {selectedBooking.shippingDetails.city}{' '}
                            {selectedBooking.shippingDetails.postalCode},{' '}
                            {selectedBooking.shippingDetails.country}
                          </p>
                        </div>

                        {/* <div className="col-md-6 text-right">
    <p className="font-weight-bold mb-4">Payment Details</p>
    <p className="mb-1">
      <span className="text-muted">ID: </span>{' '}
      {selectedBooking.paymentResult
        ? selectedBooking.paymentResult.id
        : ''}
    </p>
    <p className="mb-1">
      <span className="text-muted">Payment Type: </span>
      {selectedBooking.paymentResult
        ? selectedBooking.paymentMethod
        : ''}
    </p>
    <p className="mb-1">
      <span className="text-muted">Email: </span>{' '}
      {selectedBooking.paymentResult
        ? selectedBooking.paymentResult.emailAddress
        : ''}
    </p>
  </div> */}
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="row ">
                      <div className="col-md-12">
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="bbooking-0 text-uppercase small font-weight-bold">
                                Image
                              </th>
                              <th className="bbooking-0 text-uppercase small font-weight-bold">
                                Product
                              </th>
                              <th className="bbooking-0 text-uppercase small font-weight-bold">
                                Quantity
                              </th>
                              <th className="bbooking-0 text-uppercase small font-weight-bold">
                                Day
                              </th>
                              <th className="bbooking-0 text-uppercase small font-weight-bold">
                                Time
                              </th>
                              <th className="bbooking-0 text-uppercase small font-weight-bold">
                                Unit Cost
                              </th>
                              <th className="bbooking-0 text-uppercase small font-weight-bold">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedBooking.bookingItems.map((item, index) => {
                              const discountedPrice = getDiscountPrice(
                                item.price,
                                item.discount
                              );
                              const finalProductPrice = (
                                item.price * 1
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * 1
                              ).toFixed(2);
                              return (
                                <tr>
                                  <td>
                                    <Avatar
                                      variant="rounded"
                                      alt={item.name}
                                      src={
                                        item.image.length > 0
                                          ? process.env.REACT_APP_API_URL +
                                            item.image[0]
                                          : ''
                                      }
                                    />
                                  </td>
                                  <td>{item.name}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.day}</td>
                                  <td>{item.time}</td>
                                  <td>
                                    <>
                                      {discountedPrice !== null ? (
                                        <>
                                          <span
                                            style={{
                                              textDecoration: 'line-through',
                                              color: 'gray',
                                            }}
                                          >
                                            {'PKR ' + finalProductPrice}
                                          </span>
                                          <span className="amount">
                                            {'    PKR ' + finalDiscountedPrice}
                                          </span>
                                        </>
                                      ) : (
                                        <span>
                                          {'PKR ' + finalProductPrice}
                                        </span>
                                      )}
                                    </>
                                  </td>
                                  <td>
                                    <>
                                      {discountedPrice !== null
                                        ? 'PKR ' +
                                          (
                                            finalDiscountedPrice * item.quantity
                                          ).toFixed(2)
                                        : 'PKR ' +
                                          (
                                            finalProductPrice * item.quantity
                                          ).toFixed(2)}
                                    </>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="d-flex flex-row-reverse p-2">
                      <div className=" px-5 text-right">
                        <div className="mb-2">
                          <strong>
                            Sub - Total amount: Rs{' '}
                            {selectedBooking.totalPrice -
                              selectedBooking.shippingPrice +
                              (selectedBooking.discount || 0)}
                          </strong>
                        </div>
                        <div className="mb-2">
                          <strong>
                            Shipping Price: Rs {selectedBooking.shippingPrice}
                          </strong>
                        </div>
                        <div className="mb-2">
                          <strong>
                            Discount: Rs {selectedBooking.discount || 0}
                          </strong>
                        </div>
                        <div className="mb-2">
                          <strong>
                            Grand Total: Rs {selectedBooking.totalPrice}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-dark mt-2 mb-2 text-center small">
              by :{' '}
              <a
                className="text-dark"
                target="_blank"
                rel="noopener noreferrer"
                href="https://qadrimeat.com"
              >
                QADRI MEAT (qadrimeat.com)
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoicePage;
