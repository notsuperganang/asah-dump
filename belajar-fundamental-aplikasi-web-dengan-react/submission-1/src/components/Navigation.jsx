import { Link, useLocation } from 'react-router-dom';
import { Home, Archive, Plus, Search } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            📝 Notes App
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                  : 'hover:bg-white/10 text-gray-300 hover:text-white'
              }`}
            >
              <Home size={18} />
              <span>Notes</span>
            </Link>

            <Link
              to="/archive"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive('/archive')
                  ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                  : 'hover:bg-white/10 text-gray-300 hover:text-white'
              }`}
            >
              <Archive size={18} />
              <span>Archive</span>
            </Link>

            <Link
              to="/notes/new"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg btn-primary transition-all duration-300"
            >
              <Plus size={18} />
              <span>Add Note</span>
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              to="/"
              className={`p-2 rounded-lg transition-all duration-300 ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                  : 'hover:bg-white/10 text-gray-300 hover:text-white'
              }`}
            >
              <Home size={20} />
            </Link>

            <Link
              to="/archive"
              className={`p-2 rounded-lg transition-all duration-300 ${
                isActive('/archive')
                  ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                  : 'hover:bg-white/10 text-gray-300 hover:text-white'
              }`}
            >
              <Archive size={20} />
            </Link>

            <Link
              to="/notes/new"
              className="p-2 rounded-lg btn-primary transition-all duration-300"
            >
              <Plus size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;