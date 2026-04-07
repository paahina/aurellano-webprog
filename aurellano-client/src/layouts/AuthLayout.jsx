import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="flex items-center justify-center bg-white p-8 sm:p-10 lg:p-16">
          <div className="h-15 w-100 rounded-3xl">
            <img
              src="/assets/imgs/my_logo_3.png"
              className="w-full h-full object-contain scale-450"
              alt=""
            />
          </div>
        </div>
        <main className="flex items-center bg-[#8ea7e0] px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
