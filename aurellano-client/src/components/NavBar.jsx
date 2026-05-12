import { useEffect, useId, useState } from "react";
import { NavLink } from "react-router-dom";
import SignOutButton from "./Button";

const logo = "/assets/imgs/my_logo.png";
const logoMobile = "/assets/imgs/my_logo_2.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Article", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-xl border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
    isActive
      ? "border-[#0C3AA7] bg-[#0C3AA7] text-white"
      : "border-transparent text-[#0C3AA7] hover:border-[#0C3AA7] hover:bg-transparent",
  ].join(" ");

const mobileNavLinkClassName = ({ isActive }) =>
  [
    "block rounded-xl border-2 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.24em] transition",
    isActive
      ? "border-[#0C3AA7] bg-[#0C3AA7] text-white"
      : "border-transparent text-[#0C3AA7] hover:border-[#0C3AA7] hover:bg-zinc-100",
  ].join(" ");

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#ebebeb]/95 p-2 shadow-[0_4px_8px_rgba(0,0,0,0.2)] backdrop-blur-md">
      <div className="relative mx-auto max-w-6xl min-w-0 px-2 sm:px-4 lg:px-8">
        <div className="flex min-w-0 items-center justify-between gap-2 sm:gap-4">
          <NavLink
            to="/"
            className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
            aria-label="Home"
            onClick={() => setMenuOpen(false)}
          >
            <div className="relative h-12 w-10 shrink-0 overflow-visible rounded-3xl sm:h-14 sm:w-12 md:hidden">
              <img
                src={logoMobile}
                alt=""
                className="h-full w-full rounded-3xl object-contain drop-shadow-[0_4px_10px_rgba(12,58,167,0.45)]"
              />
            </div>
            <div className="hidden min-w-0 md:block">
              <img
                src={logo}
                alt=""
                className="h-12 w-auto max-w-[200px] object-contain sm:h-14 lg:h-16"
              />
            </div>
          </NavLink>

          <nav
            className="hidden min-w-0 items-center gap-2 md:flex"
            aria-label="Main"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={navLinkClassName}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#0C3AA7]/30 text-[#0C3AA7] md:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>

            <SignOutButton variant="custom3" to="/auth/signin" className="shrink-0 px-3 py-2 text-[9px] sm:px-4 sm:text-[10px]">
              Sign In
            </SignOutButton>
          </div>
        </div>

        <nav
          id={menuId}
          className={`border-t border-zinc-300/80 bg-[#ebebeb] md:hidden ${menuOpen ? "block" : "hidden"}`}
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1 px-2 py-3 sm:px-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={mobileNavLinkClassName}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
