import React, { useEffect } from 'react';
import './styles/receipt.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from 'state/ducks/order/actions';
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
        <div>
          <link
            href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
            rel="stylesheet"
            id="bootstrap-css"
          />
          <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
          <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
          <button
            id="btnPrint"
            class="hidden-print"
            onClick={() => window.print()}
          >
            Print
          </button>
          <div class="ticket">
            <h5 class="centered">Qadri Meat</h5>

            <p class="centered">
              qadrimeat.com
              <br />
              qadrimeat@gmail.com
              <br />
              PH# +92 304-4014345
              <br />
              11-N Phase 1, DHA Lahore
            </p>
            <div
              className="d-flex justify-content-between"
              style={{ marginRight: '4px' }}
            >
              <div>{new Date().toLocaleDateString()}</div>
              <div>{new Date().toLocaleTimeString()}</div>
            </div>
            <table class="centered">
              <thead>
                <tr>
                  <th class="description">Description</th>
                  <th class="price">
                    Sale
                    <br />
                    Price
                  </th>
                  <th class="quantity">Q.</th>
                  <th class="amount">Amount</th>
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
                      <td class="price">
                        <>
                          {discountedPrice !== null
                            ? (finalDiscountedPrice * item.quantity).toFixed(2)
                            : (finalProductPrice * item.quantity).toFixed(2)}
                        </>
                      </td>
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
            <div className="d-flex justify-content-end">
              <div
                className="d-flex justify-content-between"
                style={{ marginRight: '4px', width: '100px' }}
              >
                <div>Sub Total</div>
                <div>{selectedOrder.totalPrice.toFixed(2)}</div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div
                className="d-flex justify-content-between"
                style={{ marginRight: '4px', width: '100px' }}
              >
                <div>Grand Total</div>
                <div>{selectedOrder.totalPrice.toFixed(2)}</div>
              </div>
            </div>

            <p class="centered">
              Thanks for your purchase!
              <br />
              Software provided by devprotocols.com
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ReceiptPage;
