import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotesProvider } from './utils/NotesContext.jsx';
import NotesPage from './pages/NotesPage';
import NoteDetailPage from './pages/NoteDetailPage';
import AddNotePage from './pages/AddNotePage';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <NotesProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<NotesPage />} />
            <Route path="/notes/new" element={<AddNotePage />} />
            <Route path="/notes/:id" element={<NoteDetailPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </NotesProvider>
  );
}

export default App
