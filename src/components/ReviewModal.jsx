export default function ReviewModal({ reviewOrder, reviewDraft, setReviewDraft, close, save }) {
  if (!reviewOrder) return null;

  return (
    <div className="review-modal-overlay active" onClick={close}>
      <div className="review-modal" onClick={(event) => event.stopPropagation()}>
        <div className="review-modal-title">Rate Bintang Berapa!</div>
        <div className="review-modal-stars">★★★★★</div>

        <textarea
          value={reviewDraft}
          onChange={(event) => setReviewDraft(event.target.value)}
          placeholder="Tuliskan review mu!"
        />

        <div className="review-modal-buttons">
          <button onClick={close}>Cancel</button>
          <button onClick={save}>Review</button>
        </div>
      </div>
    </div>
  );
}
