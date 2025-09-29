import { useReducer } from 'react';
import { NotesContext } from './context.js';
import getInitialData from './initialData';
import { addNote, deleteNote, archiveNote } from './notes';

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [addNote(action.payload), ...state.notes],
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: deleteNote(state.notes, action.payload),
      };
    case 'ARCHIVE_NOTE':
      return {
        ...state,
        notes: archiveNote(state.notes, action.payload),
      };
    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: getInitialData(),
  });

  const addNewNote = (noteData) => {
    dispatch({ type: 'ADD_NOTE', payload: noteData });
  };

  const removeNote = (id) => {
    dispatch({ type: 'DELETE_NOTE', payload: id });
  };

  const toggleArchiveNote = (id) => {
    dispatch({ type: 'ARCHIVE_NOTE', payload: id });
  };

  const value = {
    notes: state.notes,
    addNote: addNewNote,
    deleteNote: removeNote,
    toggleArchive: toggleArchiveNote,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

