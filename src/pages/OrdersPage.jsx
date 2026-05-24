import BottomNav from '../components/BottomNav.jsx';

export default function OrdersPage({
  screen,
  setScreen,
  openOrders,
  orders,
  openSummary,
  openReview,
  openLatestSummary,
}) {
  return (
    <section className="screen active">
      <div className="content">
        <div className="orders-header">
          <h2>Ordered Items</h2>
          <button onClick={openLatestSummary}>See All</button>
        </div>

        {orders.length === 0 ? (
          <div className="orders-empty">Belum ada pesanan</div>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <img src={order.sellerImage} alt={order.sellerName} />

                <div>
                  <h3>{order.sellerName}</h3>
                  <p>{order.status === 'done' ? 'Selesai' : 'Sedang Dimasak'} · {order.sellerName}</p>
                  <button className="text-link" onClick={() => openSummary(order.id)}>Summary</button>
                </div>

                <div className="action-col">
                  <button className="small-btn" onClick={() => openReview(order)}>Review</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav screen={screen} setScreen={setScreen} openOrders={openOrders} />
    </section>
  );
}
