export default function AppPopup({ popup, close }) {
  if (!popup) return null;

  return (
    <div className="app-popup-overlay active" onClick={close}>
      <div className="app-popup-box" onClick={(event) => event.stopPropagation()}>
        <div className="app-popup-title">{popup.title || 'Peringatan'}</div>
        <div className="app-popup-message">{popup.message}</div>
        <button className="app-popup-btn" onClick={close}>OK</button>
      </div>
    </div>
  );
}
