import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useNotes } from "../utils/hooks";
import { useLocale } from "../hooks/useLocale";
import { getActiveNotes, searchNotes } from "../utils/notes";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

const NotesPage = () => {
  const { notes, deleteNote, toggleArchive, isLoading } = useNotes();
  const { localeText } = useLocale();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const handleSearch = useCallback(() => {
    // The search is handled via URL params in SearchBar component
  }, []);

  const displayedNotes = useMemo(() => {
    const activeNotes = getActiveNotes(notes);
    if (!keyword) {
      return activeNotes;
    }
    return searchNotes(activeNotes, keyword);
  }, [notes, keyword]);

  const handleArchive = async (id) => {
    await toggleArchive(id);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
  };

  return (
    <Layout>
      <div className="space-y-12">
        <div className="text-center pt-8">
          <h1 className="text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            {localeText.pages.notes.title}
          </h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {localeText.pages.notes.subtitle}
          </p>
        </div>

        <div className="flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {keyword && (
          <div className="text-center">
            <p style={{ color: "var(--text-secondary)" }}>
              {displayedNotes.length > 0
                ? `${localeText.pages.notes.found} ${displayedNotes.length} ${displayedNotes.length === 1 ? localeText.pages.notes.note : localeText.pages.notes.notes} ${localeText.pages.notes.matching} "${keyword}"`
                : `${localeText.pages.notes.noMatch} "${keyword}"`
              }
            </p>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner text={localeText.components.loading.loadingNotes} />
        ) : displayedNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {displayedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onArchive={handleArchive}
                onDelete={handleDelete}
                showArchiveButton={true}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={keyword ? localeText.components.emptyState.noMatch : localeText.components.emptyState.noNotes}
            message={keyword ? localeText.components.emptyState.adjustSearch : localeText.components.emptyState.noNotesMessage}
            type={keyword ? "search" : "notes"}
            showAddButton={!keyword}
          />
        )}
      </div>
    </Layout>
  );
};

export default NotesPage;