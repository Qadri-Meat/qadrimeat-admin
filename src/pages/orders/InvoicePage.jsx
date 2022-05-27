import React, { useEffect } from 'react';
import './styles/invoice.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from 'state/ducks/order/actions';
import { Avatar } from '@material-ui/core';
import { getDiscountPrice } from 'helpers/product';

const InvoicePage = (props) => {
  const { history, match } = props;
  const orderId = match.params.id;

  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((state) => state.order);
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      if (!selectedOrder || selectedOrder.id !== orderId) {
        dispatch(getOrder(orderId));
      }
    } else {
      history.push('/login');
    }
  }, [history, authUser, selectedOrder, orderId, dispatch]);
  return (
    <>
      {!selectedOrder ? (
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
                          Order # {selectedOrder.id}
                        </p>
                        <p className="text-muted">
                          Date: {selectedOrder.createdAt.substring(0, 10)}
                        </p>
                      </div>
                    </div>

                    <hr />
                    {selectedOrder.type === 'online' ? (
                      <div className="row">
                        <div className="col-md-6">
                          <p className="font-weight-bold mb-4">
                            To:{' '}
                            {selectedOrder.shippingDetails.firstName +
                              ' ' +
                              selectedOrder.shippingDetails.lastName}
                          </p>
                          <p className="text-muted">
                            <strong>Email:</strong>{' '}
                            {selectedOrder.shippingDetails.email}
                            <br />
                            <strong>Phone:</strong>{' '}
                            {selectedOrder.shippingDetails.phone}
                            <br />
                            <strong>Address:</strong>{' '}
                            {selectedOrder.shippingDetails.address},{' '}
                            {selectedOrder.shippingDetails.city}{' '}
                            {selectedOrder.shippingDetails.postalCode},{' '}
                            {selectedOrder.shippingDetails.country}
                          </p>
                        </div>

                        {/* <div className="col-md-6 text-right">
    <p className="font-weight-bold mb-4">Payment Details</p>
    <p className="mb-1">
      <span className="text-muted">ID: </span>{' '}
      {selectedOrder.paymentResult
        ? selectedOrder.paymentResult.id
        : ''}
    </p>
    <p className="mb-1">
      <span className="text-muted">Payment Type: </span>
      {selectedOrder.paymentResult
        ? selectedOrder.paymentMethod
        : ''}
    </p>
    <p className="mb-1">
      <span className="text-muted">Email: </span>{' '}
      {selectedOrder.paymentResult
        ? selectedOrder.paymentResult.emailAddress
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
                              <th className="border-0 text-uppercase small font-weight-bold">
                                Image
                              </th>
                              <th className="border-0 text-uppercase small font-weight-bold">
                                Product
                              </th>
                              <th className="border-0 text-uppercase small font-weight-bold">
                                Quantity
                              </th>
                              <th className="border-0 text-uppercase small font-weight-bold">
                                Weight (Kg)
                              </th>
                              <th className="border-0 text-uppercase small font-weight-bold">
                                Unit Cost
                              </th>
                              <th className="border-0 text-uppercase small font-weight-bold">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedOrder.orderItems.map((item, index) => {
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
                              let productPrice =
                                discountedPrice !== null
                                  ? finalDiscountedPrice * item.quantity
                                  : finalProductPrice * item.quantity;
                              productPrice = (
                                productPrice * item.weight
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
                                  <td>{item.weight}</td>
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
                                    <>{'PKR ' + productPrice}</>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="d-flex flex-row-reverse p-2">
                      <div className="px-5">
                        <table>
                          <tbody>
                            <tr>
                              <td className="pr-3 text-right">
                                <strong>Sub - Total amount:</strong>
                              </td>
                              <td>
                                <strong>
                                  Rs{' '}
                                  {selectedOrder.totalPrice -
                                    selectedOrder.shippingPrice +
                                    (selectedOrder.discount || 0)}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-3 text-right">
                                <strong>Shipping Price:</strong>
                              </td>
                              <td>
                                <strong>
                                  Rs {selectedOrder.shippingPrice}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-3 text-right">
                                <strong>Discount:</strong>
                              </td>
                              <td>
                                <strong>
                                  Rs {selectedOrder.discount || 0}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-3 text-right">
                                <strong>Grand Total:</strong>
                              </td>
                              <td>
                                <strong>Rs {selectedOrder.totalPrice}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-3 text-right">
                                <strong>Total Paid:</strong>
                              </td>
                              <td>
                                <strong>Rs {selectedOrder.totalPaid}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-3 text-right">
                                <strong>Balance:</strong>
                              </td>
                              <td>
                                <strong>
                                  Rs{' '}
                                  {selectedOrder.totalPrice -
                                    selectedOrder.totalPaid}
                                </strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-dark mt-5 mb-5 text-center small">
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
