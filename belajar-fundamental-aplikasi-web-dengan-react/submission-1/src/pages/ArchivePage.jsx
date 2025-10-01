import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useNotes } from "../utils/hooks";
import { getArchivedNotes, searchNotes } from "../utils/notes";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner";
import { Archive } from "lucide-react";

const ArchivePage = () => {
  const { notes, deleteNote, toggleArchive, isLoading } = useNotes();
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
            <Archive size={48} className="text-gray-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">
              Archived Notes
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Your archived notes are stored here. You can restore them back to your active notes
            or delete them permanently.
          </p>
        </div>

        <div className="flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {keyword && (
          <div className="text-center">
            <p className="text-gray-400">
              {displayedNotes.length > 0
                ? `Found ${displayedNotes.length} archived note${displayedNotes.length === 1 ? "" : "s"} matching "${keyword}"`
                : `No archived notes found matching "${keyword}"`
              }
            </p>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner text="Loading archived notes..." />
        ) : displayedNotes.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {displayedNotes.length} Archived Note{displayedNotes.length === 1 ? "" : "s"}
              </h2>

              <div className="text-sm text-gray-400">
                Click the restore button to move notes back to active
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
            title={keyword ? "No archived notes found" : "Archive is empty"}
            message={
              keyword
                ? "No archived notes match your search criteria."
                : "No notes have been archived yet. Archive notes from your main notes list to see them here."
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