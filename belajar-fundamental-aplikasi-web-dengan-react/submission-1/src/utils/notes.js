// Utility functions for notes operations

export const formatDate = (dateString) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

export const searchNotes = (notes, keyword) => {
  return notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );
};

export const getActiveNotes = (notes) => {
  return notes.filter((note) => !note.archived);
};

export const getArchivedNotes = (notes) => {
  return notes.filter((note) => note.archived);
};

export const addNote = ({ title, body }) => {
  return {
    id: `notes-${+new Date()}`,
    title: title || '',
    body: body || '',
    archived: false,
    createdAt: new Date().toISOString(),
  };
};

export const deleteNote = (notes, id) => {
  return notes.filter((note) => note.id !== id);
};

export const archiveNote = (notes, id) => {
  return notes.map((note) =>
    note.id === id ? { ...note, archived: !note.archived } : note
  );
};

export const getNoteById = (notes, id) => {
  return notes.find((note) => note.id === id);
};