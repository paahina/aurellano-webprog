import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0C3AA7] px-4 py-10 sm:px-6 lg:px-8 text-white">
      <div className="flex gap-2">
        {/* Brand Section */}
        <img
          className="w-20 h-20"
          src="/assets/imgs/my_logo_2.png"
          alt="Logo"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-3">Page Aurellano</h2>
          <p className="text-sm text-[#97A6C9]">
            A learning platform focused on modern front-end development using
            ReactJS, Tailwind, and JavaScript best practices.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm text-[#97A6C9]">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/articles" className="hover:text-white">
                Articles
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-[#97A6C9]">
            <li>Email: p.aurellano3@gmail.com</li>
            <li>
              GitHub:{" "}
              <Link to="https://github.com/paahina">
                https://github.com/paahina
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-[#97A6C9]/30 pt-6 text-center">
        <p className="text-sm text-[#97A6C9]">
          © {new Date().getFullYear()} Page Aurellano. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
