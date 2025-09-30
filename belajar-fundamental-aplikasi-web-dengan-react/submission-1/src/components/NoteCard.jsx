import { Link } from 'react-router-dom';
import { Archive, ArchiveRestore, Trash2, Clock } from 'lucide-react';
import { formatDate } from '../utils/notes';

const NoteCard = ({ note, onArchive, onDelete, showArchiveButton = true }) => {
  const handleArchive = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onArchive(note.id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmMessage = `Are you sure you want to delete "${note.title || 'this note'}"? This action cannot be undone.`;
    if (window.confirm(confirmMessage)) {
      onDelete(note.id);
    }
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="card-glass glass-hover group fade-in min-h-[200px] w-full overflow-hidden">
      <Link to={`/notes/${note.id}`} className="block h-full">
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors flex-1 mr-4 break-words overflow-hidden">
              <span className="line-clamp-2">
                {note.title || 'Untitled'}
              </span>
            </h3>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              {showArchiveButton && (
                <button
                  onClick={handleArchive}
                  className="p-2 rounded-lg btn-glass hover:bg-blue-500/20 transition-all duration-300"
                  title={note.archived ? 'Restore from archive' : 'Archive note'}
                >
                  {note.archived ? <ArchiveRestore size={16} /> : <Archive size={16} />}
                </button>
              )}
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg btn-glass hover:bg-red-500/20 transition-all duration-300 text-red-400"
                title="Delete note"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-400 mb-5">
            <Clock size={14} className="mr-2 flex-shrink-0" />
            <span className="truncate">{formatDate(note.createdAt)}</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="text-gray-300 text-sm leading-relaxed break-words">
              {truncateText(note.body || '')}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;