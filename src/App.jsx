import { useEffect, useMemo, useState } from 'react';

import { sellers, menus } from './data.js';
import { fuzzyScore, randomOrderNumber, randomQueue } from './utils/helpers.js';

import AppPopup from './components/AppPopup.jsx';
import NoteModal from './components/NoteModal.jsx';
import ReviewModal from './components/ReviewModal.jsx';

import SplashPage from './pages/SplashPage.jsx';
import HomePage from './pages/HomePage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import CheckoutListPage from './pages/CheckoutListPage.jsx';
import CheckoutPaymentPage from './pages/CheckoutPaymentPage.jsx';
import CookingPage from './pages/CookingPage.jsx';
import DonePage from './pages/DonePage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import SummaryPage from './pages/SummaryPage.jsx';

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [sellerId, setSellerId] = useState(null);
  const [cart, setCart] = useState({});
  const [notes, setNotes] = useState({});
  const [queue, setQueue] = useState(randomQueue());
  const [customerName, setCustomerName] = useState('');
  const [payment, setPayment] = useState('QRIS');
  const [orders, setOrders] = useState([]);
  const [activeSummaryId, setActiveSummaryId] = useState(null);
  const [cookingOrder, setCookingOrder] = useState(null);
  const [doneOrder, setDoneOrder] = useState(null);
  const [noteItem, setNoteItem] = useState(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [reviewOrder, setReviewOrder] = useState(null);
  const [reviewDraft, setReviewDraft] = useState('');
  const [popup, setPopup] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (screen !== 'splash') return undefined;

    const timer = setTimeout(() => setScreen('home'), 900);
    return () => clearTimeout(timer);
  }, [screen]);

  useEffect(() => {
    if (screen !== 'cooking' || !cookingOrder) return undefined;

    if (cookingOrder.currentQueue <= 1) {
      const finished = { ...cookingOrder, currentQueue: 1, status: 'done' };

      setOrders((prev) => prev.map((order) => (order.id === finished.id ? finished : order)));
      setDoneOrder(finished);

      const timer = setTimeout(() => {
        setCookingOrder(null);
        setScreen('done');
      }, 450);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCookingOrder((prev) => (prev ? { ...prev, currentQueue: prev.currentQueue - 1 } : prev));
    }, 1000);

    return () => clearTimeout(timer);
  }, [screen, cookingOrder]);

  const selectedSeller = useMemo(
    () => sellers.find((seller) => seller.id === sellerId) || sellers[0],
    [sellerId],
  );

  const cartItems = useMemo(() => Object.entries(cart).map(([menuId, qty]) => {
    const item = menus.find((menu) => menu.id === menuId);
    return {
      ...item,
      qty,
      subtotal: item.price * qty,
      note: notes[menuId] || '',
    };
  }), [cart, notes]);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.subtotal, 0),
    [cartItems],
  );

  const filteredSellers = useMemo(() => sellers
    .map((seller) => ({ ...seller, score: fuzzyScore(seller.name, search) }))
    .filter((seller) => seller.score >= (search ? 0.55 : 0))
    .sort((a, b) => b.score - a.score), [search]);

  const activeSummary = orders.find((order) => order.id === activeSummaryId);

  function showPopup(message, title = 'Peringatan') {
    setPopup({ title, message });
  }

  function openSeller(id) {
    setSellerId(id);
    setCart({});
    setNotes({});
    setQueue(randomQueue());
    setScreen('menu');
  }

  function changeQty(menuId, delta) {
    const currentQty = cart[menuId] || 0;
    const nextQty = Math.max(0, currentQty + delta);

    setCart((prev) => {
      const updated = { ...prev };

      if (nextQty === 0) {
        delete updated[menuId];
      } else {
        updated[menuId] = nextQty;
      }

      return updated;
    });

    if (nextQty === 0) {
      setNotes((prev) => {
        const updated = { ...prev };
        delete updated[menuId];
        return updated;
      });
    }
  }

  function openCheckoutList() {
    if (cartItems.length === 0) {
      showPopup('Pilih menu terlebih dahulu.');
      return;
    }

    setScreen('checkoutList');
  }

  function openCheckoutPayment() {
    if (cartItems.length === 0) {
      showPopup('Pilih menu terlebih dahulu.');
      return;
    }

    setScreen('checkoutPayment');
  }

  function placeOrder() {
    if (cartItems.length === 0) {
      showPopup('Keranjang masih kosong.');
      return;
    }

    const finalName = customerName.trim();

    if (!finalName) {
      showPopup('Tulis nama pembeli terlebih dahulu.');
      return;
    }

    const order = {
      id: 'ORD-' + Date.now(),
      sellerId: selectedSeller.id,
      sellerName: selectedSeller.name,
      sellerImage: selectedSeller.image,
      items: cartItems,
      total,
      queue,
      currentQueue: queue,
      orderNumber: randomOrderNumber(),
      customerName: finalName,
      payment,
      review: '',
      status: 'cooking',
    };

    setOrders((prev) => [order, ...prev]);
    setActiveSummaryId(order.id);
    setCookingOrder(order);
    setScreen('cooking');
  }

  function openOrders() {
    setScreen('orders');
  }

  function openSummary(orderId) {
    setActiveSummaryId(orderId);
    setScreen('summary');
  }

  function openLatestSummary() {
    if (orders.length > 0) {
      openSummary(orders[0].id);
    }
  }

  function openNote(menuId) {
    setNoteItem(menuId);
    setNoteDraft(notes[menuId] || '');
  }

  function saveNote() {
    if (!noteItem) return;

    const value = noteDraft.trim();

    setNotes((prev) => {
      const updated = { ...prev };

      if (value) {
        updated[noteItem] = value;
      } else {
        delete updated[noteItem];
      }

      return updated;
    });

    setNoteItem(null);
    setNoteDraft('');
  }

  function openReview(order) {
    setReviewOrder(order);
    setReviewDraft(order.review || '');
  }

  function saveReview() {
    if (!reviewOrder) return;

    setOrders((prev) => prev.map((order) => (
      order.id === reviewOrder.id ? { ...order, review: reviewDraft } : order
    )));

    setReviewOrder(null);
    setReviewDraft('');
    showPopup('Review berhasil disimpan.', 'Berhasil');
  }

  function orderAgain() {
    const order = orders.find((item) => item.id === activeSummaryId);

    if (!order) return;

    const restoredCart = {};
    const restoredNotes = {};

    order.items.forEach((item) => {
      restoredCart[item.id] = item.qty;

      if (item.note) {
        restoredNotes[item.id] = item.note;
      }
    });

    setSellerId(order.sellerId);
    setCart(restoredCart);
    setNotes(restoredNotes);
    setQueue(randomQueue());
    setCustomerName(order.customerName);
    setPayment(order.payment || 'QRIS');
    setScreen('menu');
  }

  return (
    <main className="app-shell">
      <div className="device">
        {screen === 'splash' && <SplashPage goHome={() => setScreen('home')} />}

        {screen === 'home' && (
          <HomePage
            screen={screen}
            setScreen={setScreen}
            openOrders={openOrders}
            search={search}
            setSearch={setSearch}
            filteredSellers={filteredSellers}
            openSeller={openSeller}
          />
        )}

        {screen === 'menu' && (
          <MenuPage
            screen={screen}
            setScreen={setScreen}
            openOrders={openOrders}
            selectedSeller={selectedSeller}
            menus={menus}
            cart={cart}
            changeQty={changeQty}
            total={total}
            openCheckoutList={openCheckoutList}
          />
        )}

        {screen === 'checkoutList' && (
          <CheckoutListPage
            cartItems={cartItems}
            selectedSeller={selectedSeller}
            queue={queue}
            total={total}
            setScreen={setScreen}
            openCheckoutPayment={openCheckoutPayment}
            openNote={openNote}
          />
        )}

        {screen === 'checkoutPayment' && (
          <CheckoutPaymentPage
            customerName={customerName}
            setCustomerName={setCustomerName}
            queue={queue}
            payment={payment}
            setPayment={setPayment}
            total={total}
            setScreen={setScreen}
            placeOrder={placeOrder}
          />
        )}

        {screen === 'cooking' && <CookingPage cookingOrder={cookingOrder} />}

        {screen === 'done' && <DonePage doneOrder={doneOrder} openOrders={openOrders} />}

        {screen === 'orders' && (
          <OrdersPage
            screen={screen}
            setScreen={setScreen}
            openOrders={openOrders}
            orders={orders}
            openSummary={openSummary}
            openReview={openReview}
            openLatestSummary={openLatestSummary}
          />
        )}

        {screen === 'summary' && (
          <SummaryPage
            activeSummary={activeSummary}
            openOrders={openOrders}
            orderAgain={orderAgain}
          />
        )}

        <NoteModal
          noteItem={noteItem}
          noteDraft={noteDraft}
          setNoteDraft={setNoteDraft}
          close={() => setNoteItem(null)}
          save={saveNote}
        />

        <ReviewModal
          reviewOrder={reviewOrder}
          reviewDraft={reviewDraft}
          setReviewDraft={setReviewDraft}
          close={() => setReviewOrder(null)}
          save={saveReview}
        />

        <AppPopup popup={popup} close={() => setPopup(null)} />
      </div>
    </main>
  );
}
