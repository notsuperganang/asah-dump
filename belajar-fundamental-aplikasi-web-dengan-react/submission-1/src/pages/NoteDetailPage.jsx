import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Archive, ArchiveRestore, Trash2, Clock, Edit } from "lucide-react";
import { useNotes } from "../utils/hooks";
import { useLocale } from "../hooks/useLocale";
import { getNoteById, formatDate } from "../utils/notes";
import Layout from "../components/Layout";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, deleteNote, toggleArchive } = useNotes();
  const { localeText } = useLocale();

  const note = getNoteById(notes, id);

  if (!note) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="card-glass text-center py-16">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>{localeText.pages.detail.notFound}</h2>
            <p className="mb-6" style={{ color: "var(--text-secondary)" }}>{localeText.pages.detail.notFoundMessage}</p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 btn-glass btn-primary"
            >
              <ArrowLeft size={18} />
              <span>{localeText.pages.detail.backToNotes}</span>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleArchive = async () => {
    await toggleArchive(note.id);
  };

  const handleDelete = async () => {
    if (window.confirm(`${localeText.components.noteCard.confirmDelete} ${localeText.components.noteCard.thisNote}${localeText.components.noteCard.cannotUndo}`)) {
      try {
        const { error } = await deleteNote(note.id);
        if (!error) {
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("Error deleting note:", error);
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
            <span>{localeText.pages.add.back}</span>
          </button>
        </div>

        <div className="card-glass">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 wrap-break-words" style={{ color: "var(--text-primary)" }}>
                {note.title || localeText.components.noteCard.untitled}
              </h1>

              <div className="flex items-center text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                <Clock size={16} className="mr-2" />
                <span>{formatDate(note.createdAt)}</span>
                {note.archived && (
                  <>
                    <span className="mx-3">•</span>
                    <Archive size={16} className="mr-2" />
                    <span>{localeText.pages.detail.archived}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 lg:ml-6">
              <button
                onClick={handleArchive}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg btn-glass transition-all duration-300 ${
                  note.archived
                    ? "hover:bg-blue-500/20 text-blue-400"
                    : "hover:bg-yellow-500/20 text-yellow-400"
                }`}
                title={note.archived ? localeText.components.noteCard.restore : localeText.components.noteCard.archive}
              >
                {note.archived ? <ArchiveRestore size={18} /> : <Archive size={18} />}
                <span className="hidden sm:inline">
                  {note.archived ? localeText.pages.detail.restore : localeText.pages.detail.archive}
                </span>
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg btn-glass btn-danger transition-all duration-300"
                title={localeText.components.noteCard.delete}
              >
                <Trash2 size={18} />
                <span className="hidden sm:inline">{localeText.pages.detail.delete}</span>
              </button>
            </div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none overflow-hidden">
            <div className="leading-relaxed whitespace-pre-wrap wrap-break-words overflow-wrap-anywhere" style={{ color: "var(--text-secondary)" }}>
              {note.body ? note.body : (
                <p className="italic" style={{ color: "var(--text-muted)" }}>{localeText.pages.detail.noContent}</p>
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
            <span>{localeText.pages.detail.backToNotes}</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NoteDetailPage;