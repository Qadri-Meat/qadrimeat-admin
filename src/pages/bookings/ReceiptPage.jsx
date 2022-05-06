import React, { useEffect } from 'react';
import './styles/receipt.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBooking } from 'state/ducks/booking/actions';
import { Avatar } from '@material-ui/core';
import { getDiscountPrice } from 'helpers/product';

const ReceiptPage = (props) => {
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
        <>
          <button
            id="btnPrint"
            class="hidden-print"
            onClick={() => window.print()}
          >
            Print
          </button>
          <div class="ticket">
            <h1>Qadri Meat</h1>

            <p class="centered">
              qadrimeat@gmail.com
              <br />
              PH# +92 302-4000719
              <br />
              11 N Phase 1, DHA Lahore
            </p>
            <div class="centered">
              {new Date().toLocaleDateString()}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {new Date().toLocaleTimeString()}
            </div>
            <table>
              <thead>
                <tr>
                  <th class="description">Description</th>
                  <th class="price">Price</th>
                  <th class="quantity">Q.</th>
                  <th class="price">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedBooking.bookingItems.map((item, index) => {
                  const discountedPrice = getDiscountPrice(
                    item.price,
                    item.discount
                  );
                  const finalProductPrice = (item.price * 1).toFixed(2);
                  const finalDiscountedPrice = (discountedPrice * 1).toFixed(2);
                  return (
                    <tr>
                      <td class="description">{item.name}</td>
                      <td class="price">
                        {discountedPrice !== null ? (
                          <>
                            <span
                              style={{
                                textDecoration: 'line-through',
                                color: 'gray',
                              }}
                            >
                              {finalProductPrice}
                            </span>
                            <span className="amount">
                              {finalDiscountedPrice}
                            </span>
                          </>
                        ) : (
                          <span>{finalProductPrice}</span>
                        )}
                      </td>
                      <td class="quantity">{item.quantity}</td>
                      <td class="price">
                        {discountedPrice !== null
                          ? (finalDiscountedPrice * item.quantity).toFixed(2)
                          : (finalProductPrice * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <table style={{ marginLeft: '25px', width: '130px' }}>
              <tr>
                <td>
                  <strong>SUB TOTAL</strong>
                </td>
                <td>{selectedBooking.totalPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  <strong>GRAND TOTAL</strong>
                </td>
                <td>{selectedBooking.totalPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  <strong>PAYMENT CASH</strong>
                </td>
                <td>{selectedBooking.totalPaid.toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  <strong>CHANGE</strong>
                </td>
                <td>
                  {(
                    selectedBooking.totalPrice - selectedBooking.totalPaid
                  ).toFixed(2)}
                </td>
              </tr>
            </table>

            <p class="centered">
              Thanks for your purchase!
              <br />
              Software provided by devprotocols.com
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default ReceiptPage;
