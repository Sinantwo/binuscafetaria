export default function NoteModal({ noteItem, noteDraft, setNoteDraft, close, save }) {
  if (!noteItem) return null;

  return (
    <div className="note-modal-overlay active" onClick={close}>
      <div className="note-modal" onClick={(event) => event.stopPropagation()}>
        <div className="note-modal-title">Add Notes</div>

        <textarea
          value={noteDraft}
          onChange={(event) => setNoteDraft(event.target.value)}
          placeholder="Contoh: tidak pedas, saus dipisah, tanpa bawang..."
        />

        <div className="note-modal-buttons">
          <button onClick={close}>Cancel</button>
          <button onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
