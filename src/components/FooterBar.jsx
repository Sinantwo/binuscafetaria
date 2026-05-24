import { formatRupiah } from '../utils/helpers.js';

export default function FooterBar({ total, queue, onOrder, checkout = false }) {
  return (
    <div className={`footer-bar ${checkout ? 'checkout-footer' : 'menu-footer'}`}>
      <div className="inner">
        {checkout ? (
          <>
            <div className="bar-row footer-title-row">
              <span>Checkout</span>
              <strong>Antrean Ke {queue}</strong>
            </div>

            <div className="bar-row footer-subtotal-row">
              <span>Subtotal</span>
              <span>{formatRupiah(total)}</span>
            </div>

            <div className="bar-row total footer-total-row">
              <span>Total</span>
              <strong>{formatRupiah(total)}</strong>
            </div>
          </>
        ) : (
          <div className="bar-row total menu-total-only">
            <span>Total</span>
            <strong>{formatRupiah(total)}</strong>
          </div>
        )}

        <button className="primary-btn" onClick={onOrder}>
          Order
        </button>
      </div>
    </div>
  );
}