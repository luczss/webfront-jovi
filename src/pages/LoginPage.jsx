import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import { useAuth } from "../hooks/useAuth";
import { DEMO_CREDENTIALS } from "../services/authService";

const inputClass =
  "mt-1 w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-ink placeholder:text-muted focus:border-lime";

export default function LoginPage() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from ?? "/camera";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function fillDemo() {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
  }

  return (
    <section className="wrap py-12 sm:py-20">
      <div className="mx-auto max-w-md">
        <p className="eyebrow">Acesso</p>

        <h1 className="mt-2 text-3xl font-semibold">Entrar no SnapFlow</h1>

        {location.state?.from && (
          <p
            role="status"
            className="mt-4 rounded-xl border border-lime-dim bg-surface p-3 text-sm text-muted"
          >
            Entre para acessar a página protegida ({location.state.from}).
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <label className="block text-sm">
            E-mail
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
              placeholder="voce@exemplo.com"
            />
          </label>

          <label className="block text-sm">
            Senha
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
            />
          </label>

          {error && (
            <p role="alert" className="text-sm text-ember">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !email || !password}
          >
            {loading ? <Spinner className="h-4 w-4" /> : null}
            {loading ? "Entrando…" : "Entrar"}
          </Button>
        </form>

        <aside className="mt-6 rounded-xl border border-line bg-surface p-4 text-sm text-muted">
          <p className="font-semibold text-ink">Login de demonstração</p>

          <p className="mt-2">
            E-mail: <code className="text-lime">{DEMO_CREDENTIALS.email}</code>
            <br />
            Senha: <code className="text-lime">{DEMO_CREDENTIALS.password}</code>
          </p>

          <Button variant="secondary" className="mt-3" onClick={fillDemo}>
            Preencher automaticamente
          </Button>

          <p className="mt-3 text-xs">
            Aviso: não há servidor de autenticação. Este login só controla o
            acesso às telas e não oferece segurança real.
          </p>
        </aside>
      </div>
    </section>
  );
}