export default function DonePage({ doneOrder, openOrders }) {
  return (
    <section id="doneScreen" className="screen active">
      <div className="page-head left-title">
        <button className="close-btn" onClick={openOrders}>×</button>
        <h1>Sudah Selesai</h1>
      </div>

      <div className="content">
        <div className="desktop-center-wrap">
          <div className="status-card">
            <div className="status-top">
              <div className="seller">{doneOrder?.sellerName || 'Nara Kitchen'}</div>
              <div className="mini-badge">Selesai</div>
            </div>
            <div className="label">Pickup Order</div>
            <div className="value">{doneOrder?.orderNumber || '#-'}</div>
          </div>

          <div className="simple-card">
            <div className="label">Nama</div>
            <div className="value">{doneOrder?.customerName || '-'}</div>
          </div>

          <div className="check-illustration">
            <img
              src="https://img.magnific.com/free-vector/green-double-circle-check-mark_78370-1749.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Order selesai"
              className="done-check-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
