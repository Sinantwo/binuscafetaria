import FooterBar from '../components/FooterBar.jsx';
import { formatRupiah } from '../utils/helpers.js';

export default function CheckoutListPage({
  cartItems,
  selectedSeller,
  queue,
  total,
  setScreen,
  openCheckoutPayment,
  openNote,
}) {
  return (
    <section className="screen active">
      <div className="page-head">
        <button className="back-btn" onClick={() => setScreen('menu')}>‹</button>
        <h1>Checkout</h1>
      </div>

      <div className="content">
        <div className="checkout-list">
          {cartItems.map((item) => (
            <div className="checkout-item-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div>
                <h3>{item.name}</h3>
                <p>{selectedSeller.name} · {item.qty} item</p>
                {item.note && <div className="item-note-preview">Note: {item.note}</div>}
              </div>

              <div className="checkout-price-note">
                <div className="checkout-item-price">{formatRupiah(item.subtotal)}</div>
                <button className="add-notes-btn" onClick={() => openNote(item.id)}>Add Notes</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterBar total={total} queue={queue} onOrder={openCheckoutPayment} checkout />
    </section>
  );
}
