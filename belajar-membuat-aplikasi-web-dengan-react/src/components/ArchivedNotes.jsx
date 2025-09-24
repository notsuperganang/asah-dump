import NoteItem from './NoteItem'

function ArchivedNotes({ notes, onDelete, onArchive }) {
  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        <p className="notes-empty__message">Tidak ada catatan yang diarsip</p>
      </div>
    )
  }

  return (
    <div className="notes-list notes-list--archived">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
          isArchived={true}
        />
      ))}
    </div>
  )
}

export default ArchivedNotes