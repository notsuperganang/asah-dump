import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import useInput from "../hooks/useInput";
import { useLocale } from "../hooks/useLocale";
import { register } from "../utils/network-data";
import { useState, useMemo } from "react";
import LiquidChrome from "../components/LiquidChrome";

const RegisterPage = () => {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { localeText } = useLocale();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError(localeText.messages.error.requiredFields);
      return;
    }

    if (password.length < 6) {
      setError(localeText.messages.error.minPassword);
      return;
    }

    if (password !== confirmPassword) {
      setError(localeText.messages.error.passwordMismatch);
      return;
    }

    setIsLoading(true);

    const { error: registerError } = await register({ name, email, password });

    if (registerError) {
      setError(localeText.messages.error.registrationFailed);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    navigate("/login");
  };

  const liquidChromeBackground = useMemo(() => (
    <div className="fixed inset-0 z-0">
      <LiquidChrome
        baseColor={[0.1, 0.1, 0.1]}
        speed={0.3}
        amplitude={0.3}
        interactive={true}
      />
    </div>
  ), []);

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
      {/* LiquidChrome background */}
      {liquidChromeBackground}

      {/* Content */}
      <div className="max-w-md w-full relative z-10 rounded-2xl backdrop-filter backdrop-blur-2xl bg-white/10 border border-white/20 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-4">
            <UserPlus size={32} className="text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{localeText.pages.register.title}</h1>
          <p style={{ color: "var(--text-secondary)" }}>{localeText.pages.register.subtitle}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              {localeText.pages.register.name}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={onNameChange}
              placeholder={localeText.pages.register.namePlaceholder}
              className="input-glass"
              autoComplete="name"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              {localeText.pages.register.email}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={onEmailChange}
              placeholder={localeText.pages.register.emailPlaceholder}
              className="input-glass"
              autoComplete="email"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              {localeText.pages.register.password}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={onPasswordChange}
              placeholder={localeText.pages.register.passwordPlaceholder}
              className="input-glass"
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
              {localeText.pages.register.confirmPassword}
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              placeholder={localeText.pages.register.confirmPasswordPlaceholder}
              className="input-glass"
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-glass btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? localeText.pages.register.creatingAccount : localeText.pages.register.createAccount}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {localeText.pages.register.haveAccount}{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              {localeText.pages.register.signIn}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
