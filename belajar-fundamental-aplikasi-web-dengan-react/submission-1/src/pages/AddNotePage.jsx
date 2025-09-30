import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useNotes } from '../utils/hooks';
import Layout from '../components/Layout';

const AddNotePage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const bodyRef = useRef(null);
  const navigate = useNavigate();
  const { addNote } = useNotes();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSave = async () => {
    if (!title.trim() && !body.trim()) {
      alert('Please add a title or content to your note.');
      return;
    }

    setIsSaving(true);

    try {
      const noteData = {
        title: title.trim() || 'Untitled',
        body: body.trim()
      };

      addNote(noteData);
      navigate('/');
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };


  const handleBack = () => {
    if (title.trim() || body.trim()) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto pt-4">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-2 btn-glass hover:bg-white/10 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center space-x-2 btn-glass btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            <span>{isSaving ? 'Saving...' : 'Save Note'}</span>
          </button>
        </div>

        <div className="card-glass">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-6">Create New Note</h1>

            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter note title..."
                  className="input-glass text-xl font-semibold"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-300 mb-2">
                  Content
                </label>

                <textarea
                  id="body"
                  ref={bodyRef}
                  value={body}
                  onChange={handleBodyChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Start writing your note here..."
                  className="w-full min-h-[400px] p-4 rounded-lg border transition-all duration-300 bg-transparent focus:outline-none focus:border-blue-500 focus:bg-black/10 resize-y text-base"
                  style={{
                    background: 'var(--bg-glass)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderColor: 'var(--border-glass)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit'
                  }}
                />

                <div className="mt-2 text-xs text-gray-500">
                  Tip: Use <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">Ctrl+S</kbd> to save quickly
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-700">
            <div className="text-sm text-gray-400">
              {title.trim() || body.trim() ? (
                <span>✏️ Unsaved changes</span>
              ) : (
                <span>Start typing to create your note</span>
              )}
            </div>

            <div className="flex space-x-3">
              <Link
                to="/"
                className="btn-glass hover:bg-white/10 transition-all duration-300"
                onClick={(e) => {
                  if (title.trim() || body.trim()) {
                    if (!window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
                      e.preventDefault();
                    }
                  }
                }}
              >
                Cancel
              </Link>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn-glass btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} className="mr-2" />
                {isSaving ? 'Saving...' : 'Save Note'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddNotePage;