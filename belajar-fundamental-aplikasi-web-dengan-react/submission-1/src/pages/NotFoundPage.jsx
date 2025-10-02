import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import Layout from "../components/Layout";
import { useLocale } from "../hooks/useLocale";

const NotFoundPage = () => {
  const { localeText } = useLocale();
  const { notFound } = localeText.pages;

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center pt-12">
        <div className="card-glass text-center max-w-lg mx-auto">
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-blue-500 mb-4">{notFound.title}</h1>
            <h2 className="text-2xl font-bold text-white mb-4">
              {notFound.subtitle}
            </h2>
            <p className="text-gray-400 mb-8">
              {notFound.message}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center space-x-2 btn-glass btn-primary"
              >
                <Home size={18} />
                <span>{notFound.goHome}</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center space-x-2 btn-glass hover:bg-white/10"
              >
                <ArrowLeft size={18} />
                <span>{notFound.goBack}</span>
              </button>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-500 mb-4">
                {notFound.lookingFor}
              </p>

              <div className="flex flex-col space-y-2 text-sm">
                <Link
                  to="/"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {notFound.browseNotes}
                </Link>
                <Link
                  to="/archive"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {notFound.viewArchived}
                </Link>
                <Link
                  to="/notes/new"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {notFound.createNew}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;