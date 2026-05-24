import BottomNav from '../components/BottomNav.jsx';

export default function HomePage({
  screen,
  setScreen,
  openOrders,
  search,
  setSearch,
  filteredSellers,
  openSeller,
}) {
  return (
    <section className="screen active">
      <div className="content">
        <div className="home-title">Binus Cafetaria</div>

        <div className="search-wrap">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari Tempat Makan"
          />
        </div>

        <div className="section-title">Tempat Makan</div>

        <div className="seller-grid">
          {filteredSellers.map((seller) => (
            <button className="seller-card" key={seller.id} onClick={() => openSeller(seller.id)}>
              <img src={seller.image} alt={seller.name} />
              <div className="seller-body">
                <div className="seller-name">{seller.name}</div>
                <div className="seller-meta">
                  <span className="rating">★ {seller.rating}</span> · {seller.sold}
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredSellers.length === 0 && (
          <div className="empty-search">Tempat makan tidak ditemukan.</div>
        )}
      </div>

      <BottomNav screen={screen} setScreen={setScreen} openOrders={openOrders} />
    </section>
  );
}
