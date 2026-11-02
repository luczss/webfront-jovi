import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useApp } from "../../hooks/useApp";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

const LINKS = [
  { to: "/", label: "Início", end: true },
  { to: "/camera", label: "Câmera" },
  { to: "/galeria", label: "Galeria" },
  { to: "/referencias", label: "Referências" }
];

const navClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm transition ${
    isActive ? "bg-surface-2 text-lime" : "text-muted hover:text-ink"
  }`;

export default function Header() {
  const { aiEnabled, toggleAI } = useApp();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-3">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 font-display text-lg font-bold"
        >
          <span className="h-3 w-3 rounded-full bg-lime" />
          SnapFlow
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={navClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={aiEnabled}
            onClick={toggleAI}
            className="flex items-center gap-2 rounded-full border border-line px-3 py-2 text-xs text-ink"
          >
            <span
              className={`relative h-4 w-7 rounded-full transition ${
                aiEnabled ? "bg-lime" : "bg-line"
              }`}
            >
              <span
                className={`absolute top-0.5 h-3 w-3 rounded-full bg-bg transition-all ${
                  aiEnabled ? "left-3.5" : "left-0.5"
                }`}
              />
            </span>
            Sugestões {aiEnabled ? "ativas" : "desligadas"}
          </button>

          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <Button variant="ghost" onClick={signOut}>
                Sair
              </Button>
            ) : (
              <Button as={Link} to="/login" variant="secondary">
                Entrar
              </Button>
            )}
          </div>

          <button
            type="button"
            className="rounded-full border border-line p-2 md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Principal (mobile)"
          className="wrap flex flex-col gap-1 pb-4 md:hidden"
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={closeMenu}
              className={navClass}
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <Button
              variant="ghost"
              className="mt-2"
              onClick={() => {
                signOut();
                closeMenu();
              }}
            >
              Sair ({user.name})
            </Button>
          ) : (
            <Button
              as={Link}
              to="/login"
              variant="secondary"
              className="mt-2"
              onClick={closeMenu}
            >
              Entrar
            </Button>
          )}
        </nav>
      )}
    </header>
  );
}