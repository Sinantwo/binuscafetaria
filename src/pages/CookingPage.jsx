import { COOKING_IMAGE } from '../utils/constants.js';

export default function CookingPage({ cookingOrder }) {
  return (
    <section id="cookingScreen" className="screen active">
      <div className="page-head left-title">
        <h1>Sedang Dimasak</h1>
      </div>

      <div className="content">
        <div className="desktop-center-wrap">
          <div className="status-card">
            <div className="status-top">
              <div className="seller">{cookingOrder?.sellerName || 'Nara Kitchen'}</div>
              <div className="mini-badge">Dimasak</div>
            </div>
            <div className="label">Antrean Ke</div>
            <div className="value">#{cookingOrder?.currentQueue || 1}</div>
          </div>

          <div className="simple-card">
            <div className="label">Nomor Order</div>
            <div className="value">{cookingOrder?.orderNumber || '#-'}</div>
          </div>

          <div className="simple-card">
            <div className="label">Nama</div>
            <div className="value">{cookingOrder?.customerName || '-'}</div>
          </div>

          <div className="illustration-box">
            <img src={COOKING_IMAGE} alt="Sedang Dimasak" className="cooking-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
