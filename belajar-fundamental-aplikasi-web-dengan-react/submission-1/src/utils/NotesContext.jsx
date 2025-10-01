import { useState, useEffect, useMemo } from "react";
import { NotesContext } from "./context.js";
import {
  getActiveNotes as fetchActiveNotes,
  getArchivedNotes as fetchArchivedNotes,
  addNote as createNote,
  deleteNote as removeNote,
  archiveNote as setArchiveNote,
  unarchiveNote as setUnarchiveNote,
} from "./network-data";

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [activeResult, archivedResult] = await Promise.all([
        fetchActiveNotes(),
        fetchArchivedNotes(),
      ]);

      if (activeResult.error || archivedResult.error) {
        setError("Failed to fetch notes");
        setNotes([]);
        return;
      }

      const allNotes = [...activeResult.data, ...archivedResult.data];
      setNotes(allNotes);
    } catch (err) {
      setError("Failed to fetch notes");
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (noteData) => {
    const { error, data } = await createNote(noteData);

    if (error) {
      return { error: true };
    }

    setNotes((prevNotes) => [data, ...prevNotes]);
    return { error: false };
  };

  const deleteNote = async (id) => {
    const { error } = await removeNote(id);

    if (error) {
      return { error: true };
    }

    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    return { error: false };
  };

  const toggleArchive = async (id) => {
    const note = notes.find((n) => n.id === id);

    if (!note) {
      return { error: true };
    }

    const { error } = note.archived
      ? await setUnarchiveNote(id)
      : await setArchiveNote(id);

    if (error) {
      return { error: true };
    }

    setNotes((prevNotes) =>
      prevNotes.map((n) =>
        n.id === id ? { ...n, archived: !n.archived } : n
      )
    );

    return { error: false };
  };

  const value = useMemo(() => ({
    notes,
    isLoading,
    error,
    addNote,
    deleteNote,
    toggleArchive,
    refetchNotes: fetchNotes,
  }), [notes, isLoading, error]);

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

