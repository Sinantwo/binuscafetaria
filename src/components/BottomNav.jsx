export default function BottomNav({ screen, setScreen, openOrders }) {
  const homeActive = screen === 'home' || screen === 'menu';
  const ordersActive = screen === 'orders';

  return (
    <nav className="bottom-nav">
      <button className={`nav-item ${homeActive ? 'active' : ''}`} onClick={() => setScreen('home')}>
        <span className="nav-icon home-icon" />
        <span>Home</span>
      </button>

      <button className={`nav-item ${ordersActive ? 'active' : ''}`} onClick={openOrders}>
        <span className="nav-icon orders-icon" />
        <span>Orders</span>
      </button>
    </nav>
  );
}
