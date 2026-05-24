import BottomNav from '../components/BottomNav.jsx';
import FooterBar from '../components/FooterBar.jsx';
import { formatRupiah } from '../utils/helpers.js';

export default function MenuPage({
  screen,
  setScreen,
  openOrders,
  selectedSeller,
  menus,
  cart,
  changeQty,
  total,
  openCheckoutList,
}) {
  const sellerMenus = menus.filter((item) => item.sellerId === selectedSeller.id);

  return (
    <section id="menuScreen" className="screen active">
      <div className="page-head">
        <button className="back-btn" onClick={() => setScreen('home')}>‹</button>
      </div>

      <div className="content">
        <div className="seller-hero">
          <img src={selectedSeller.image} alt={selectedSeller.name} />
        </div>

        <div className="seller-panel">
          <div className="distance-badge">$$</div>
          <h2>{selectedSeller.name}</h2>
          <div className="seller-meta">
            <span className="rating">★ {selectedSeller.rating}</span> · {selectedSeller.sold}
          </div>
          <div className="seller-desc">{selectedSeller.description}</div>
        </div>

        <div className="menu-grid">
          {sellerMenus.map((item) => (
            <article className="menu-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="menu-body">
                <div className="menu-name">{item.name}</div>
                <div className="menu-price">{formatRupiah(item.price)}</div>

                <div className="qty-control">
                  <button onClick={() => changeQty(item.id, -1)}>−</button>
                  <span>{cart[item.id] || 0}</span>
                  <button onClick={() => changeQty(item.id, 1)}>+</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <FooterBar total={total} onOrder={openCheckoutList} />
      <BottomNav screen={screen} setScreen={setScreen} openOrders={openOrders} />
    </section>
  );
}
