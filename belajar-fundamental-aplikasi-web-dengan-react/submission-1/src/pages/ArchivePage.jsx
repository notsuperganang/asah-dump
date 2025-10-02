import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useNotes } from "../utils/hooks";
import { useLocale } from "../hooks/useLocale";
import { getArchivedNotes, searchNotes } from "../utils/notes";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { Archive } from "lucide-react";

const ArchivePage = () => {
  const { notes, deleteNote, toggleArchive, isLoading } = useNotes();
  const { localeText } = useLocale();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const handleSearch = useCallback(() => {
    // The search is handled via URL params in SearchBar component
  }, []);

  const displayedNotes = useMemo(() => {
    const archivedNotes = getArchivedNotes(notes);
    if (!keyword) {
      return archivedNotes;
    }
    return searchNotes(archivedNotes, keyword);
  }, [notes, keyword]);

  const handleRestore = async (id) => {
    await toggleArchive(id);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
  };

  return (
    <Layout>
      <div className="space-y-12">
        <div className="text-center pt-8">
          <div className="flex items-center justify-center mb-6">
            <Archive size={48} style={{ color: "var(--text-muted)" }} className="mr-3" />
            <h1 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
              {localeText.pages.archive.title}
            </h1>
          </div>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {localeText.pages.archive.subtitle}
          </p>
        </div>

        <div className="flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {keyword && (
          <div className="text-center">
            <p style={{ color: "var(--text-secondary)" }}>
              {displayedNotes.length > 0
                ? `${localeText.pages.notes.found} ${displayedNotes.length} ${displayedNotes.length === 1 ? localeText.pages.archive.archivedNote : localeText.pages.archive.archivedNote + "s"} ${localeText.pages.notes.matching} "${keyword}"`
                : `${localeText.pages.archive.noArchivedMatch} "${keyword}"`
              }
            </p>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner text={localeText.components.loading.loadingArchived} />
        ) : displayedNotes.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
                {displayedNotes.length} {displayedNotes.length === 1 ? localeText.pages.archive.archivedNote : localeText.pages.archive.archivedNote + "s"}
              </h2>

              <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {localeText.pages.archive.restoreHint}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {displayedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onArchive={handleRestore}
                  onDelete={handleDelete}
                  showArchiveButton={true}
                />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            title={keyword ? localeText.components.emptyState.noMatch : localeText.pages.archive.empty}
            message={
              keyword
                ? localeText.components.emptyState.adjustSearch
                : localeText.pages.archive.emptyMessage
            }
            type="archive"
            showAddButton={false}
          />
        )}
      </div>
    </Layout>
  );
};

export default ArchivePage;