import { useDispatch, useSelector } from 'react-redux';
import './styles/invoice.css';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDiscountPrice } from 'helper/product';
import { Avatar } from '@mui/material';
import withAuth from 'hooks/withAuth';
import { getOrder } from 'store/order';
import { getImageUrl } from 'helper/helpers';

const InvoicePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((state) => state.order);
  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedOrder || selectedOrder.id !== id) {
      dispatch(getOrder(id));
    }
  }, [selectedOrder, id, dispatch, navigate]);
  const items = selectedOrder?.orderItems || [];
  let totalPriceWithoutDiscount = 0;

  const printPage = () => {
    var ButtonControl = document.getElementById('btnprint');
    ButtonControl.style.visibility = 'hidden';
    window.print();
  };

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
                            <strong>Email:</strong>{' '}
                            qadrimeat@gmail.com
                            <br />
                            <strong>Phone:</strong> +92 302-4000719
                            <br />
                            <strong>PTCL:</strong> 042-38651881
                            <br />
                            <strong>Address:</strong> Street 113,
                            Sector 11 N Dha Phase 1, Lahore, Punjab ,
                            Pakistan
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6 text-right">
                        <button
                          id="btnprint"
                          className="btn btn-primary hidden-print"
                          onClick={printPage}
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
                          Date:
                          {new Date(
                            selectedOrder.createdAt
                          ).toLocaleDateString()}
                          ,{' '}
                          {new Date(
                            selectedOrder.createdAt
                          ).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <hr />
                    {/* {selectedOrder.type === 'online' ? ( */}
                    <div className="row">
                      <div className="col-md-6">
                        <p className="font-weight-bold">
                          To:{' '}
                          {selectedOrder.shippingDetails?.firstName +
                            ' ' +
                            selectedOrder.shippingDetails?.lastName}
                        </p>
                        <p className="text-muted">
                          {/* <strong>Email:</strong>{' '}
                          {selectedOrder.shippingDetails.email}
                          <br /> */}
                          <strong>Phone:</strong>{' '}
                          {selectedOrder.shippingDetails?.phone}
                          <br />
                          <strong>Address:</strong>{' '}
                          {selectedOrder.shippingDetails?.address}{' '}
                          {selectedOrder.shippingDetails?.city}{' '}
                          {selectedOrder.shippingDetails?.postalCode}{' '}
                          {selectedOrder.shippingDetails?.country}
                          <br />
                          <strong>Note:</strong>{' '}
                          {selectedOrder.shippingDetails?.notes}
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
                    {/* ) : (
                      <></>
                    )} */}

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
                                Type
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
                            {selectedOrder.orderItems.map(
                              (item, index) => {
                                const discountedPrice =
                                  getDiscountPrice(
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
                                        src={getImageUrl(
                                          item.image.length > 0
                                            ? item.image[0]
                                            : '/default.png'
                                        )}
                                      />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>

                                    <td>
                                      {item.isPackage
                                        ? 'Package'
                                        : 'Non Package'}
                                    </td>
                                    <td>
                                      <>
                                        {discountedPrice !== null ? (
                                          <>
                                            <span
                                              style={{
                                                textDecoration:
                                                  'line-through',
                                                color: 'gray',
                                              }}
                                            >
                                              {'PKR ' +
                                                finalProductPrice}
                                            </span>
                                            <span className="amount">
                                              {'    PKR ' +
                                                finalDiscountedPrice}
                                            </span>
                                          </>
                                        ) : (
                                          <span>
                                            {'PKR ' +
                                              finalProductPrice}
                                          </span>
                                        )}
                                      </>
                                    </td>
                                    <td>
                                      <>
                                        {discountedPrice !== null
                                          ? 'PKR ' +
                                            (
                                              finalDiscountedPrice *
                                              item.quantity
                                            ).toFixed(2)
                                          : 'PKR ' +
                                            (
                                              finalProductPrice *
                                              item.quantity
                                            ).toFixed(2)}
                                      </>
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {items.forEach((item) => {
                      totalPriceWithoutDiscount += item.price;
                    })}
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
                                  Rs {totalPriceWithoutDiscount}
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
                                  Rs{' '}
                                  {(
                                    totalPriceWithoutDiscount -
                                    selectedOrder.totalPrice
                                  ).toFixed(2)}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-3 text-right">
                                <strong>Grand Total:</strong>
                              </td>
                              <td>
                                <strong>
                                  Rs {selectedOrder.totalPrice}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-3 text-right">
                                <strong>Total Paid:</strong>
                              </td>
                              <td>
                                <strong>
                                  Rs {selectedOrder.totalPaid}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="pr-3 text-right">
                                <strong>Remaining Amount:</strong>
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

export default withAuth(InvoicePage);
