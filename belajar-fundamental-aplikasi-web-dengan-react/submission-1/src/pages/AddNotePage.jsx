import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useNotes } from "../utils/hooks";
import { useLocale } from "../hooks/useLocale";
import Layout from "../components/Layout";

const AddNotePage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const bodyRef = useRef(null);
  const navigate = useNavigate();
  const { addNote } = useNotes();
  const { localeText } = useLocale();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSave = async () => {
    if (!title.trim() && !body.trim()) {
      alert(localeText.messages.error.addContent);
      return;
    }

    setIsSaving(true);

    try {
      const noteData = {
        title: title.trim() || localeText.components.noteCard.untitled,
        body: body.trim()
      };

      const { error } = await addNote(noteData);

      if (error) {
        alert(localeText.messages.error.saveFailed);
        setIsSaving(false);
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving note:", error);
      alert(localeText.messages.error.saveFailed);
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      handleSave();
    }
  };


  const handleBack = () => {
    if (title.trim() || body.trim()) {
      if (window.confirm(localeText.pages.add.confirmLeave)) {
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
            <span>{localeText.pages.add.back}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center space-x-2 btn-glass btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            <span>{isSaving ? localeText.pages.add.saving : localeText.pages.add.save}</span>
          </button>
        </div>

        <div className="card-glass">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>{localeText.pages.add.title}</h1>

            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                  {localeText.pages.add.titleLabel}
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  onKeyDown={handleKeyDown}
                  placeholder={localeText.pages.add.titlePlaceholder}
                  className="input-glass text-xl font-semibold"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="body" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                  {localeText.pages.add.contentLabel}
                </label>

                <textarea
                  id="body"
                  ref={bodyRef}
                  value={body}
                  onChange={handleBodyChange}
                  onKeyDown={handleKeyDown}
                  placeholder={localeText.pages.add.contentPlaceholder}
                  className="w-full min-h-[400px] p-4 rounded-lg border transition-all duration-300 bg-transparent focus:outline-none focus:border-blue-500 focus:bg-black/10 resize-y text-base"
                  style={{
                    background: "var(--bg-glass)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderColor: "var(--border-glass)",
                    color: "var(--text-primary)",
                    fontFamily: "inherit"
                  }}
                />

                <div className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                  {localeText.pages.add.tip} <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">Ctrl+S</kbd> {localeText.pages.add.toSave}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-700">
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {title.trim() || body.trim() ? (
                <span>{localeText.pages.add.unsavedChanges}</span>
              ) : (
                <span>{localeText.pages.add.startTyping}</span>
              )}
            </div>

            <div className="flex space-x-4">
              <Link
                to="/"
                className="px-6 py-3 btn-glass hover:bg-white/10 transition-all duration-300 min-w-[100px] flex items-center justify-center"
                onClick={(e) => {
                  if (title.trim() || body.trim()) {
                    if (!window.confirm(localeText.pages.add.confirmLeave)) {
                      e.preventDefault();
                    }
                  }
                }}
              >
                {localeText.pages.add.cancel}
              </Link>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-3 btn-glass btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] flex items-center justify-center space-x-2"
              >
                <Save size={16} />
                <span>{isSaving ? localeText.pages.add.saving : localeText.pages.add.save}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddNotePage;