import React, { useEffect } from 'react';
import './styles/receipt.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from 'state/ducks/order/actions';
import { Avatar } from '@material-ui/core';
import { getDiscountPrice } from 'helpers/product';

const ReceiptPage = (props) => {
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
              PH# +92 304-4014345
              <br />
              11 N Phase 1, DHA Lahore
            </p>
            <table>
              <thead>
                <tr>
                  <th class="description">Description</th>
                  <th class="quantity">Q.</th>
                  <th class="price">PKR</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.orderItems.map((item, index) => {
                  const discountedPrice = getDiscountPrice(
                    item.price,
                    item.discount
                  );
                  const finalProductPrice = (item.price * 1).toFixed(2);
                  const finalDiscountedPrice = (discountedPrice * 1).toFixed(2);
                  return (
                    <tr>
                      <td class="description">{item.name}</td>
                      <td class="quantity">{item.quantity}</td>
                      <td class="price">
                        <>
                          {discountedPrice !== null
                            ? (finalDiscountedPrice * item.quantity).toFixed(2)
                            : (finalProductPrice * item.quantity).toFixed(2)}
                        </>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p>
              SUB TOTAL {selectedOrder.totalPrice.toFixed(2)} <br /> TOTAL{' '}
              {selectedOrder.totalPrice.toFixed(2)}
            </p>

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
