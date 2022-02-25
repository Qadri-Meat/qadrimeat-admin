import React, { useEffect } from 'react';
import './styles/invoice.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from 'state/ducks/order/actions';
import { Avatar } from '@material-ui/core';

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
                  <div className="card-body p-0">
                    <div className="row p-5">
                      <div className="col-md-6">
                        <img
                          alt=""
                          src="/assets/img/logo/logo-orignal.png"
                          className="w-50"
                        />
                      </div>

                      <div className="col-md-6 text-right">
                        <p className="font-weight-bold mb-1">
                          Order # {selectedOrder.id}
                        </p>
                        <p className="text-muted">
                          Date: {selectedOrder.createdAt.substring(0, 10)}
                        </p>
                        <button
                          className="btn btn-primary hidden-print"
                          onClick={() => window.print()}
                        >
                          <span
                            className="glyphicon glyphicon-print"
                            aria-hidden="true"
                          ></span>{' '}
                          Print
                        </button>
                      </div>
                    </div>

                    <hr />

                    <div className="row p-5">
                      <div className="col-md-6">
                        <p className="font-weight-bold mb-4">
                          To: {selectedOrder.shippingDetails.name}
                        </p>
                        <p>Email: {selectedOrder.shippingDetails.email}</p>
                        <p>Phone: {selectedOrder.shippingDetails.phone}</p>
                        <p className="mb-1">
                          Address: {selectedOrder.shippingDetails.address},{' '}
                          {selectedOrder.shippingDetails.city}{' '}
                          {selectedOrder.shippingDetails.postalCode},{' '}
                          {selectedOrder.shippingDetails.country}
                        </p>
                      </div>

                      <div className="col-md-6 text-right">
                        <p className="font-weight-bold mb-4">Payment Details</p>
                        <p className="mb-1">
                          <span className="text-muted">ID: </span>{' '}
                          {selectedOrder.paymentResult.id}
                        </p>
                        <p className="mb-1">
                          <span className="text-muted">Payment Type: </span>
                          {selectedOrder.paymentMethod}
                        </p>
                        <p className="mb-1">
                          <span className="text-muted">Email: </span>{' '}
                          {selectedOrder.paymentResult.emailAddress}
                        </p>
                      </div>
                    </div>

                    <div className="row p-5">
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
                            {selectedOrder.orderItems.map((item, index) => (
                              <tr>
                                <td>
                                  <Avatar
                                    variant="rounded"
                                    alt={item.name}
                                    src={
                                      item.image.length > 0
                                        ? ''
                                        : process.env.REACT_APP_API_URL +
                                          item.image[0]
                                    }
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>€{item.price}</td>
                                <td>€{item.quantity * item.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="d-flex flex-row-reverse bg-dark text-white p-4">
                      <div className="py-3 px-5 text-right">
                        <div className="mb-2">Grand Total</div>
                        <div className="h2 font-weight-light">
                          €{selectedOrder.totalPrice}
                        </div>
                      </div>

                      <div className="py-3 px-5 text-right">
                        <div className="mb-2">Shipping Price</div>
                        <div className="h2 font-weight-light">
                          €{selectedOrder.shippingPrice}
                        </div>
                      </div>

                      <div className="py-3 px-5 text-right">
                        <div className="mb-2">Sub - Total amount</div>
                        <div className="h2 font-weight-light">
                          €
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
              <a className="text-dark" target="_blank" href="https://mywiz.eu">
                Wiz (mywiz.eu)
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoicePage;
