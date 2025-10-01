import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useNotes } from "../utils/hooks";
import { getActiveNotes, searchNotes } from "../utils/notes";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";

const NotesPage = () => {
  const { notes, deleteNote, toggleArchive, isLoading } = useNotes();
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
          <h1 className="text-4xl font-bold text-white mb-6">
            My Notes
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Organize your thoughts, ideas, and important information in one place.
            Create, edit, and manage your notes with ease.
          </p>
        </div>

        <div className="flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {keyword && (
          <div className="text-center">
            <p className="text-gray-400">
              {displayedNotes.length > 0
                ? `Found ${displayedNotes.length} note${displayedNotes.length === 1 ? "" : "s"} matching "${keyword}"`
                : `No notes found matching "${keyword}"`
              }
            </p>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner text="Loading notes..." />
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
            title={keyword ? "No notes found" : "No notes yet"}
            type={keyword ? "search" : "notes"}
            showAddButton={!keyword}
          />
        )}
      </div>
    </Layout>
  );
};

export default NotesPage;