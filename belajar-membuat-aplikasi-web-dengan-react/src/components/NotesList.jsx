import NoteItem from './NoteItem'

function NotesList({ notes, onDelete, onArchive, isArchived = false }) {
  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        <p className="notes-empty__message">Tidak ada catatan</p>
      </div>
    )
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
          isArchived={isArchived}
        />
      ))}
    </div>
  )
}

export default NotesList