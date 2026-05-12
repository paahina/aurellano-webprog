import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0C3AA7] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex min-w-0 gap-4 sm:col-span-2 lg:col-span-5 lg:items-start">
            <img
              className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20"
              src="/assets/imgs/my_logo_2.png"
              alt=""
            />
            <div className="min-w-0 flex-1">
              <h2 className="mb-3 text-xl font-bold">Page Aurellano</h2>
              <p className="text-pretty text-sm leading-relaxed text-[#97A6C9]">
                A learning platform focused on modern front-end development
                using ReactJS, Tailwind, and JavaScript best practices.
              </p>
            </div>
          </div>

          <div className="min-w-0 sm:col-span-1 lg:col-span-3">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">
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

          <div className="min-w-0 sm:col-span-1 lg:col-span-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-[#97A6C9]">
              <li>
                Email:{" "}
                <a
                  href="mailto:p.aurellano3@gmail.com"
                  className="wrap-break-word underline decoration-[#97A6C9]/50 underline-offset-2 hover:text-white"
                >
                  p.aurellano3@gmail.com
                </a>
              </li>
              <li className="wrap-break-word">
                GitHub:{" "}
                <a
                  href="https://github.com/paahina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[#97A6C9]/50 underline-offset-2 hover:text-white"
                >
                  github.com/paahina
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#97A6C9]/30 pt-6 text-center">
          <p className="text-sm text-[#97A6C9]">
            © {new Date().getFullYear()} Page Aurellano. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
