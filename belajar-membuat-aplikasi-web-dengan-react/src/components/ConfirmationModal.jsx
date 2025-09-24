import { useEffect } from 'react'

function ConfirmationModal({ isOpen, title, message, onConfirm, onCancel, confirmText, confirmType = 'delete' }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onCancel])

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  const confirmButtonClass = confirmType === 'archive'
    ? 'confirmation-modal__button--archive'
    : 'confirmation-modal__button--confirm'

  return (
    <div className="confirmation-modal" onClick={handleBackdropClick}>
      <div className="confirmation-modal__content">
        <h3 className="confirmation-modal__title">{title}</h3>
        <p className="confirmation-modal__message">{message}</p>
        <div className="confirmation-modal__actions">
          <button
            onClick={onCancel}
            className="confirmation-modal__button confirmation-modal__button--cancel"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className={`confirmation-modal__button ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal