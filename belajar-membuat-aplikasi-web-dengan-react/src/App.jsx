import { useState } from 'react'
import { getInitialData } from './utils'
import NoteInput from './components/NoteInput'
import SearchBar from './components/SearchBar'
import NotesList from './components/NotesList'
import ArchivedNotes from './components/ArchivedNotes'
import './App.css'

function App() {
  const [notes, setNotes] = useState(getInitialData())
  const [searchQuery, setSearchQuery] = useState('')

  const addNote = ({ title, body }) => {
    const newNote = {
      id: +new Date(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString()
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
  }

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }

  const archiveNote = (id) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    )
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeNotes = filteredNotes.filter(note => !note.archived)
  const archivedNotes = filteredNotes.filter(note => note.archived)

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Catatan Pribadi</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </header>

      <main className="app-main">
        <section className="note-input-section">
          <h2>Buat Catatan</h2>
          <NoteInput addNote={addNote} />
        </section>

        <section className="notes-section">
          <h2>Catatan Aktif</h2>
          <NotesList
            notes={activeNotes}
            onDelete={deleteNote}
            onArchive={archiveNote}
            isArchived={false}
          />
        </section>

        <section className="archived-section">
          <h2>Arsip</h2>
          <ArchivedNotes
            notes={archivedNotes}
            onDelete={deleteNote}
            onArchive={archiveNote}
          />
        </section>
      </main>
    </div>
  )
}

export default App
