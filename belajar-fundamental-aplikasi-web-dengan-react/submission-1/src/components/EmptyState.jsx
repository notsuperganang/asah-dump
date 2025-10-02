import { Link } from "react-router-dom";
import { FileText, Plus, Archive } from "lucide-react";

const EmptyState = ({
  title = "No notes found",
  message = "Start creating your first note to get started.",
  showAddButton = true,
  type = "notes"
}) => {
  const getIcon = () => {
    if (type === "archive") return <Archive size={48} style={{ color: "var(--text-muted)" }} />;
    return <FileText size={48} style={{ color: "var(--text-muted)" }} />;
  };

  const getEmptyMessage = () => {
    if (type === "archive") return "No archived notes found.";
    if (type === "search") return "No notes match your search criteria.";
    return message;
  };

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="card-glass text-center max-w-md mx-auto">
        <div className="mb-6">
          {getIcon()}
        </div>

        <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          {title}
        </h3>

        <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
          {getEmptyMessage()}
        </p>

        {showAddButton && type !== "archive" && (
          <Link
            to="/notes/new"
            className="inline-flex items-center space-x-2 btn-glass btn-primary"
          >
            <Plus size={18} />
            <span>Create Your First Note</span>
          </Link>
        )}

        {type === "search" && (
          <p className="text-sm mt-4" style={{ color: "var(--text-muted)" }}>
            Try adjusting your search keywords or browse all notes.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmptyState;