import { formatRupiah } from '../utils/helpers.js';

export default function SummaryPage({ activeSummary, openOrders, orderAgain }) {
  return (
    <section className="screen active">
      <div className="page-head">
        <button className="back-btn" onClick={openOrders}>‹</button>
        <h1>Summary</h1>
      </div>

      <div className="content">
        {!activeSummary ? (
          <div className="orders-empty">Belum ada pesanan</div>
        ) : (
          <div className="summary-list">
            {activeSummary.items.map((item) => (
              <div className="summary-item-card" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div>
                  <h3>{item.name}</h3>
                  <p>{activeSummary.sellerName} · {item.qty} item</p>
                  {item.note && <div className="item-note-preview">Note: {item.note}</div>}
                </div>

                <div className="checkout-item-price">{formatRupiah(item.subtotal)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="summary-bottom">
        <div className="inner">
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <div className="label">Nomor Order</div>
            <div className="value">{activeSummary?.orderNumber || '#-'}</div>
          </div>

          <div className="bar-row total">
            <span>Total</span>
            <strong>{formatRupiah(activeSummary?.total || 0)}</strong>
          </div>

          <button className="primary-btn" onClick={orderAgain}>Order Again</button>
        </div>
      </div>
    </section>
  );
}
