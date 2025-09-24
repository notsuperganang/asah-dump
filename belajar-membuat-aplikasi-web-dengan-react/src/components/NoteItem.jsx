import { useState } from 'react'
import { showFormattedDate } from '../utils'
import ConfirmationModal from './ConfirmationModal'

function NoteItem({ note, onDelete, onArchive, isArchived }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showArchiveModal, setShowArchiveModal] = useState(false)

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleArchiveClick = () => {
    setShowArchiveModal(true)
  }

  const handleDeleteConfirm = () => {
    onDelete(note.id)
    setShowDeleteModal(false)
  }

  const handleArchiveConfirm = () => {
    onArchive(note.id)
    setShowArchiveModal(false)
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
  }

  const handleArchiveCancel = () => {
    setShowArchiveModal(false)
  }

  return (
    <>
      <div className="note-item">
        <div className="note-item__content">
          <h3 className="note-item__title">{note.title}</h3>
          <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
          <p className="note-item__body">{note.body}</p>
        </div>

        <div className="note-item__actions">
          <button
            onClick={handleDeleteClick}
            className="note-item__button note-item__button--delete"
            title="Hapus catatan"
          >
            Hapus
          </button>

          <button
            onClick={handleArchiveClick}
            className="note-item__button note-item__button--archive"
            title={isArchived ? "Pindahkan dari arsip" : "Arsipkan catatan"}
          >
            {isArchived ? 'Pindahkan' : 'Arsipkan'}
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Hapus Catatan"
        message={`Apakah Anda yakin ingin menghapus catatan "${note.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        confirmType="delete"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      <ConfirmationModal
        isOpen={showArchiveModal}
        title={isArchived ? "Pindahkan Catatan" : "Arsipkan Catatan"}
        message={
          isArchived
            ? `Apakah Anda yakin ingin memindahkan catatan "${note.title}" dari arsip?`
            : `Apakah Anda yakin ingin mengarsipkan catatan "${note.title}"?`
        }
        confirmText={isArchived ? "Pindahkan" : "Arsipkan"}
        confirmType="archive"
        onConfirm={handleArchiveConfirm}
        onCancel={handleArchiveCancel}
      />
    </>
  )
}

export default NoteItem