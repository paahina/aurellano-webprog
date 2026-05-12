import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="flex min-h-dvh flex-col bg-zinc-100 text-zinc-900">
      <NavBar />
      <main className="min-w-0 grow overflow-x-hidden px-0 pb-12 pt-[calc(4.5rem+env(safe-area-inset-top,0px))] sm:pb-16 sm:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
