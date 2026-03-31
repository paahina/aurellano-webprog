import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 gap-4">
      <img className="w-40 h-40" src="/assets/imgs/my_logo_2.png" alt="Logo" />
      <h1 className="text-6xl font-bold text-[#0C3AA7] mb-4">404</h1>

      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>

      <p className="text-gray-600 mb-6 max-w-md">
        The link you followed might be broken, or the page may have been
        removed.
      </p>

      <Link
        to="/"
        className="bg-[#0C3AA7] text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
