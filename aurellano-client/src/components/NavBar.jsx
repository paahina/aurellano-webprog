import { NavLink } from "react-router-dom";
import SignOutButton from "./Button";

const logo = "/assets/imgs/my_logo.png";

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

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#ebebeb] backdrop-blur p-2 shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="space-y-0.5">
            <div className="h-15 w-10 rounded-3xl">
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-contain scale-450"
              />
            </div>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
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

        <SignOutButton variant="custom3" to="auth/signin">
          Sign In
        </SignOutButton>
      </div>
    </header>
  );
};

export default NavBar;
