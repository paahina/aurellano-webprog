import { useParams } from "react-router-dom";
import Button from "../../components/Button.jsx";
import articles from "../../assets/article-content.js";

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find((article) => article.name === name);

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0C3AA7]">
              Error 404
            </p>

            <h1 className="mt-2 text-3xl font-bold text-zinc-900 sm:text-4xl">
              Article Not Found
            </h1>

            <p className="mt-4 text-zinc-600">
              The article you are looking for does not exist, may have been
              removed, or the link you followed is incorrect.
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <Button to="/articles" variant="custom1">
                Back to Articles
              </Button>

              <Button to="/" variant="custom2">
                Go Home
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles" variant="custom2">
              ← Back to Articles
            </Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Article
          </p>
          <h1 className="text-3xl font-bold leading-tight text-[#0C3AA7] sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {article.name
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        </div>
      </section>

      <section className="bg-[#0C3AA7] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl p-4">
          <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="object-contain w-full h-full scale-100"
              />
            ) : (
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
            )}
          </div>

          <div className="prose prose-sm max-w-none space-y-4 text-zinc-700 mt-5">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-7 text-white whitespace-pre-wrap"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t-2 border-[#0C3AA7] pt-6">
            <Button to="/articles" variant="custom1">
              Back to Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
