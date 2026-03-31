import Button from "../components/Button";

const homeImg = "/assets/imgs/home.jpg";
const placeholder = "/assets/imgs/placeholder.jpg";
const spacing = "/assets/imgs/spacing.jpg";
const consistent = "/assets/imgs/consistent.jpg";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className=" bg-transparent px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Hero Section
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-[#0C3AA7] sm:text-4xl">
              Welcome to Wireframe Studio Layout
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Discover the art of wireframing with a simple layout system for
              hero content, key numbers, and feature cards.
            </p>

            <div className="mt-6">
              <Button to="/about" variant="custom2">
                Learn More
              </Button>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.85)] h-100">
            <img
              src={homeImg}
              alt="BMW"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#0C3AA7] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#97A6C9]">
            KPI Section
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Quick overview blocks
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-[#97A6C9] p-5">
            <p className="text-2xl font-bold text-white">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0C3AA7]">
              Projects
            </p>
          </div>

          <div className="rounded-3xl bg-[#97A6C9] p-5">
            <p className="text-2xl font-bold text-white">08</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0C3AA7]">
              Sections
            </p>
          </div>

          <div className="rounded-3xl bg-[#97A6C9] p-5">
            <p className="text-2xl font-bold text-white">24</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0C3AA7]">
              Screens
            </p>
          </div>

          <div className="rounded-3xl bg-[#97A6C9] p-5">
            <p className="text-2xl font-bold text-white">04</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0C3AA7]">
              Layouts
            </p>
          </div>
        </div>
      </section>

      <section className="shadow-[0_0_10px_rgba(0,0,0,0.4)] bg-[#ebebeb] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Feature Cards
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Simple wireframe cards
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-[#0C3AA7] bg-[#97A6C9] p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <img
                src={placeholder}
                alt="Feature One"
                className="object-containe w-full h-full rounded-xl"
              />
            </div>

            <h3 className="mt-4 text-lg font-bold text-white">
              Feature Card One
            </h3>

            <p className="mt-3 text-sm leading-6 text-white">
              A clean placeholder for title, short text, and action.
            </p>

            <Button className="mt-4" variant="custom2">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-[#0C3AA7] bg-[#97A6C9] p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <img
                src={spacing}
                alt="Feature Two"
                className="object-containe w-full h-full rounded-xl"
              />
            </div>

            <h3 className="mt-4 text-lg font-bold text-white">
              Feature Card Two
            </h3>

            <p className="mt-3 text-sm leading-6 text-white">
              Balanced spacing keeps the card layout easy to scan.
            </p>

            <Button className="mt-4" variant="custom2">
              View More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-[#0C3AA7] bg-[#97A6C9] p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <img
                src={consistent}
                alt="Feature Three"
                className="object-containe w-full h-full rounded-xl"
              />
            </div>

            <h3 className="mt-4 text-lg font-bold text-white">
              Feature Card Three
            </h3>

            <p className="mt-3 text-sm leading-6 text-white">
              Repeated blocks give the page a consistent wireframe rhythm.
            </p>

            <Button className="mt-4" variant="custom2">
              View More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
