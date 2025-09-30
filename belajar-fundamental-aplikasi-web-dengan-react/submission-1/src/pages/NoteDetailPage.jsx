import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Archive, ArchiveRestore, Trash2, Clock, Edit } from 'lucide-react';
import { useNotes } from '../utils/hooks';
import { getNoteById, formatDate } from '../utils/notes';
import Layout from '../components/Layout';

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, deleteNote, toggleArchive } = useNotes();

  const note = getNoteById(notes, id);

  if (!note) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="card-glass text-center py-16">
            <h2 className="text-2xl font-bold text-white mb-4">Note Not Found</h2>
            <p className="text-gray-400 mb-6">The note you're looking for doesn't exist or has been deleted.</p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 btn-glass btn-primary"
            >
              <ArrowLeft size={18} />
              <span>Back to Notes</span>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleArchive = () => {
    toggleArchive(note.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      try {
        deleteNote(note.id);
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto pt-4">
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-2 btn-glass hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>

        <div className="card-glass">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 break-words">
                {note.title || 'Untitled'}
              </h1>

              <div className="flex items-center text-gray-400 text-sm mb-6">
                <Clock size={16} className="mr-2" />
                <span>{formatDate(note.createdAt)}</span>
                {note.archived && (
                  <>
                    <span className="mx-3">•</span>
                    <Archive size={16} className="mr-2" />
                    <span>Archived</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 lg:ml-6">
              <button
                onClick={handleArchive}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg btn-glass transition-all duration-300 ${
                  note.archived
                    ? 'hover:bg-blue-500/20 text-blue-400'
                    : 'hover:bg-yellow-500/20 text-yellow-400'
                }`}
                title={note.archived ? 'Restore from archive' : 'Archive note'}
              >
                {note.archived ? <ArchiveRestore size={18} /> : <Archive size={18} />}
                <span className="hidden sm:inline">
                  {note.archived ? 'Restore' : 'Archive'}
                </span>
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg btn-glass btn-danger transition-all duration-300"
                title="Delete note"
              >
                <Trash2 size={18} />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none overflow-hidden">
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
              {note.body ? note.body : (
                <p className="text-gray-500 italic">No content available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 btn-glass btn-primary"
          >
            <ArrowLeft size={18} />
            <span>Back to Notes</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NoteDetailPage;