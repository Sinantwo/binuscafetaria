import FooterBar from '../components/FooterBar.jsx';
import { QRIS_LOGO } from '../utils/constants.js';

export default function CheckoutPaymentPage({
  customerName,
  setCustomerName,
  queue,
  payment,
  setPayment,
  total,
  setScreen,
  placeOrder,
}) {
  return (
    <section className="screen active">
      <div className="page-head">
        <button className="back-btn" onClick={() => setScreen('checkoutList')}>‹</button>
        <h1>Checkout</h1>
      </div>

      <div className="content">
        <div className="info-input-card">
          <div className="input-row">
            <span className="left-icon">♙</span>
            <input
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Tulis Nama Pembeli"
            />
            <span className="arrow-right">›</span>
          </div>

          <div className="queue-row">
            <span className="left-icon">♙</span>
            <span>Antrean #{queue}</span>
            <span className="arrow-right">›</span>
          </div>
        </div>

        <div className="payment-card">
          <button className="payment-option" onClick={() => setPayment('QRIS')}>
            <span className="pay-icon qris-pay-icon">
              <img src={QRIS_LOGO} alt="QRIS" className="qris-logo" />
            </span>
            <span className={`radio ${payment === 'QRIS' ? 'active' : ''}`} data-pay="QRIS" />
          </button>

          <button className="payment-option" onClick={() => setPayment('CARD')}>
            <span className="pay-icon">💳</span>
            <span>xxxx-0910</span>
            <span className={`radio ${payment === 'CARD' ? 'active' : ''}`} data-pay="CARD" />
          </button>

          <button className="payment-option" onClick={() => setPayment('NEW_CARD')}>
            <span className="pay-icon">⊕</span>
            <span>Add new card</span>
            <span className={`radio ${payment === 'NEW_CARD' ? 'active' : ''}`} data-pay="NEW_CARD" />
          </button>
        </div>
      </div>

      <FooterBar total={total} queue={queue} onOrder={placeOrder} checkout />
    </section>
  );
}
