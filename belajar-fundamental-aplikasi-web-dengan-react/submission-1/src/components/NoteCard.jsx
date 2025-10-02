import { Link } from "react-router-dom";
import { Archive, ArchiveRestore, Trash2, Clock } from "lucide-react";
import { formatDate } from "../utils/notes";
import { useLocale } from "../hooks/useLocale";

const NoteCard = ({ note, onArchive, onDelete, showArchiveButton = true }) => {
  const { localeText } = useLocale();

  const handleArchive = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await onArchive(note.id);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirmMessage = `${localeText.components.noteCard.confirmDelete} "${note.title || localeText.components.noteCard.thisNote}"${localeText.components.noteCard.cannotUndo}`;
    if (window.confirm(confirmMessage)) {
      await onDelete(note.id);
    }
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="card-glass glass-hover group fade-in min-h-[200px] w-full overflow-hidden">
      <Link to={`/notes/${note.id}`} className="block h-full">
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold group-hover:text-blue-300 transition-colors flex-1 mr-4 break-words overflow-hidden" style={{ color: "var(--text-primary)" }}>
              <span className="line-clamp-2">
                {note.title || localeText.components.noteCard.untitled}
              </span>
            </h3>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              {showArchiveButton && (
                <button
                  onClick={handleArchive}
                  className="p-2 rounded-lg btn-glass hover:bg-blue-500/20 transition-all duration-300"
                  title={note.archived ? localeText.components.noteCard.restore : localeText.components.noteCard.archive}
                >
                  {note.archived ? <ArchiveRestore size={16} /> : <Archive size={16} />}
                </button>
              )}
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg btn-glass hover:bg-red-500/20 transition-all duration-300 text-red-400"
                title={localeText.components.noteCard.delete}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center text-sm mb-5" style={{ color: "var(--text-muted)" }}>
            <Clock size={14} className="mr-2 flex-shrink-0" />
            <span className="truncate">{formatDate(note.createdAt)}</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="text-sm leading-relaxed break-words" style={{ color: "var(--text-secondary)" }}>
              {truncateText(note.body || "")}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;