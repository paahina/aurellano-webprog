import Button from "../components/Button";

import card1 from "../assets/imgs/card (1).jpg";
import card2 from "../assets/imgs/card (2).jpg";
import card3 from "../assets/imgs/card (3).jpg";
import card4 from "../assets/imgs/card (4).jpg";

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className=" px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-[#0C3AA7] sm:text-4xl">
          Featured articles in a simple card grid
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          A clean wireframe section for article thumbnails, titles, short
          descriptions, and one clear action per card.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className=" bg-[#0C3AA7] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#97A6C9]">
            Featured Articles
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Article card grid
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl  bg-[#97A6C9] p-4">
            <div className="flex aspect-4/4 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src={card1}
                alt="About"
                className="object-containe w-full h-full"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              Article 01
            </p>

            <h3 className="mt-2 text-lg font-semibold text-[#0C3AA7]">
              Wireframe layout basics
            </h3>

            <p className="mt-3 text-sm leading-6 text-black">
              A simple placeholder for a featured article with image, title, and
              short copy.
            </p>

            <Button className="mt-4" variant="custom2">
              Read More
            </Button>
          </article>
          <article className="rounded-3xl  bg-[#97A6C9] p-4">
            <div className="flex aspect-4/4 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src={card2}
                alt="About"
                className="object-containe w-full h-full"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              Article 02
            </p>

            <h3 className="mt-2 text-lg font-semibold text-[#0C3AA7]">
              Building clean sections
            </h3>

            <p className="mt-3 text-sm leading-6 text-black">
              Another card using the same layout pattern for a consistent
              article grid.
            </p>

            <Button className="mt-4" variant="custom2">
              Read More
            </Button>
          </article>
          <article className="rounded-3xl  bg-[#97A6C9] p-4">
            <div className="flex aspect-4/4 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src={card3}
                alt="About"
                className="object-containe w-full h-full"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              Article 03
            </p>

            <h3 className="mt-2 text-lg font-semibold text-[#0C3AA7]">
              Using cards and lists
            </h3>

            <p className="mt-3 text-sm leading-6 text-black">
              The same low-fidelity treatment keeps the card section easy to
              scan.
            </p>

            <Button className="mt-4" variant="custom2">
              Read More
            </Button>
          </article>
          <article className="rounded-3xl  bg-[#97A6C9] p-4">
            <div className="flex aspect-4/4 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src={card4}
                alt="About"
                className="object-containe w-full h-full"
              />
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              Article 04
            </p>

            <h3 className="mt-2 text-lg font-semibold text-[#0C3AA7]">
              Low-fidelity article flow
            </h3>

            <p className="mt-3 text-sm leading-6 text-black">
              A final article card to complete the featured grid layout.
            </p>

            <Button className="mt-4" variant="custom2">
              Read More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
