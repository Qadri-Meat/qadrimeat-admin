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
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      if (!selectedOrder || selectedOrder.id !== orderId) {
        dispatch(getOrder(orderId));
      }
    } else {
      history.push('/login');
    }
  }, [history, isLoggedIn, selectedOrder, orderId, dispatch]);
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
                            <strong>Phone:</strong> +92 304-4014345
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

                    <div className="d-flex flex-row-reverse bg-dark text-white p-4">
                      <div className="py-3 px-5 text-right">
                        <div className="mb-2">Grand Total</div>
                        <div className="h2 font-weight-light">
                          Rs {selectedOrder.totalPrice}
                        </div>
                      </div>

                      <div className="py-3 px-5 text-right">
                        <div className="mb-2">Shipping Price</div>
                        <div className="h2 font-weight-light">
                          Rs {selectedOrder.shippingPrice}
                        </div>
                      </div>

                      <div className="py-3 px-5 text-right">
                        <div className="mb-2">Sub - Total amount</div>
                        <div className="h2 font-weight-light">
                          Rs{' '}
                          {selectedOrder.totalPrice -
                            selectedOrder.shippingPrice}
                        </div>
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
