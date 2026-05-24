export default function SplashPage({ goHome }) {
  return (
    <section className="screen active">
      <div className="splash" onClick={goHome}>
        <h1>Binus<br />Cafetaria</h1>
        <div className="binus-logo">BINUS UNIVERSITY</div>
      </div>
    </section>
  );
}
