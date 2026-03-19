import Button from "../components/Button";

import aboutImg from "../assets/imgs/about.jpg";
import grid1 from "../assets/imgs/grid (1).jpg";
import grid2 from "../assets/imgs/grid (2).jpg";
import grid3 from "../assets/imgs/grid (3).jpg";
import grid4 from "../assets/imgs/grid (4).jpg";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.85)] h-100">
            <img
              src={aboutImg}
              alt="About"
              className="object-cover w-full h-full"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Section
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-[#0C3AA7] sm:text-4xl">
              A profile wireframe focused on layout, spacing, and content
              grouping
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              This page follows the same low-fidelity system as the homepage
              with a simple hero, overview blocks, and supporting sections for
              profile details.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="custom1">
                Back Home
              </Button>
              <Button to="/article">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0C3AA7] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#97A6C9]">
            Profile Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Quick summary blocks
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-[#97A6C9] p-5">
            <p className="text-2xl font-bold text-white">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0C3AA7]">
              Years
            </p>
          </div>

          <div className="rounded-3xl bg-[#97A6C9] p-5">
            <p className="text-2xl font-bold text-white">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0C3AA7]">
              Projects
            </p>
          </div>

          <div className="rounded-3xl bg-[#97A6C9] p-5">
            <p className="text-2xl font-bold text-white">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0C3AA7]">
              Clients
            </p>
          </div>

          <div className="rounded-3xl bg-[#97A6C9] p-5">
            <p className="text-2xl font-bold text-white">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0C3AA7]">
              Focus Areas
            </p>
          </div>
        </div>
      </section>

      <section className="shadow-[0_0_10px_rgba(0,0,0,0.4)] bg-[#ebebeb px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Section Flow
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              Stacked content wireframe
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-[#0C3AA7] bg-[#97A6C9] p-5">
                <h3 className="text-lg font-bold text-white">Intro Block</h3>
                <p className="mt-3 text-sm leading-6 text-white">
                  A simple opening area for biography, role, or supporting
                  information.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-[#0C3AA7] bg-[#97A6C9] p-5">
                <h3 className="text-lg font-bold text-white">
                  Experience Block
                </h3>
                <p className="mt-3 text-sm leading-6 text-white">
                  Repeated section styling keeps the page readable and easy to
                  extend.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-[#0C3AA7] bg-[#97A6C9] p-5">
                <h3 className="text-lg font-bold text-white">Details Block</h3>
                <p className="mt-3 text-sm leading-6 text-white">
                  Another placeholder area for skills, notes, or references
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-[#0C3AA7] bg-[#97A6C9] p-5">
            <p className="text-[14px] font-bold uppercase tracking-[0.28em] text-white">
              Visual Grid
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                <img
                  src={grid1}
                  alt="About"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                <img
                  src={grid2}
                  alt="About"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                <img
                  src={grid3}
                  alt="About"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                <img
                  src={grid4}
                  alt="About"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <Button className="mt-5" variant="custom2">
              View Section
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
