import { useState } from 'react'

function NoteInput({ addNote }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const maxTitleLength = 50
  const remainingChars = maxTitleLength - title.length

  const handleTitleChange = (e) => {
    if (e.target.value.length <= maxTitleLength) {
      setTitle(e.target.value)
    }
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title.trim() === '' || body.trim() === '') {
      return
    }

    addNote({
      title: title.trim(),
      body: body.trim()
    })

    setTitle('')
    setBody('')
  }

  return (
    <form className="note-input" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Masukkan judul catatan..."
          value={title}
          onChange={handleTitleChange}
          className="note-input__title"
        />
        <div className="char-limit">
          <span className={remainingChars < 10 ? 'char-limit--warning' : ''}>
            Sisa karakter: {remainingChars}
          </span>
        </div>
      </div>

      <div className="input-group">
        <textarea
          placeholder="Tulis catatan Anda di sini..."
          value={body}
          onChange={handleBodyChange}
          className="note-input__body"
          rows="6"
        />
      </div>

      <button
        type="submit"
        className="note-input__submit"
        disabled={title.trim() === '' || body.trim() === ''}
      >
        Buat Catatan
      </button>
    </form>
  )
}

export default NoteInput