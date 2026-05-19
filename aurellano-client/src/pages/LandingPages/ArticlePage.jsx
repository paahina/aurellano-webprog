import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button.jsx";
import {
  fetchArticles,
  getArticleErrorMessage,
  mapArticleFromApi,
} from "../../services/ArticleService";

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadArticle = async () => {
      setLoading(true);
      setLoadError("");
      setArticle(null);
      try {
        const { data } = await fetchArticles();
        const list = (data?.articles ?? [])
          .map(mapArticleFromApi)
          .filter((a) => a.isActive);
        const match = list.find((a) => a.name === name);
        if (!cancelled) {
          setArticle(match ?? null);
        }
      } catch (err) {
        console.error("Failed to load article:", err);
        if (!cancelled) {
          setLoadError(getArticleErrorMessage(err));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadArticle();
    return () => {
      cancelled = true;
    };
  }, [name]);

  if (loading) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-6">
        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto w-full max-w-3xl min-w-0 px-1 text-center sm:px-0">
            <p className="text-sm leading-7 text-zinc-600">Loading article…</p>
          </div>
        </section>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-6">
        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto w-full max-w-3xl min-w-0 px-1 text-center sm:px-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0C3AA7]">
              Error
            </p>
            <h1 className="mt-2 text-balance text-3xl font-bold text-zinc-900 sm:text-4xl">
              Could not load article
            </h1>
            <p className="mt-4 text-pretty text-sm leading-7 text-zinc-600 sm:text-base">
              {loadError}
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
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

  if (!article) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-6">
        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto w-full max-w-3xl min-w-0 px-1 text-center sm:px-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0C3AA7]">
              Error 404
            </p>

            <h1 className="mt-2 text-balance text-3xl font-bold text-zinc-900 sm:text-4xl">
              Article Not Found
            </h1>

            <p className="mt-4 text-pretty text-sm leading-7 text-zinc-600 sm:text-base">
              The article you are looking for does not exist, may have been
              removed, or the link you followed is incorrect.
            </p>

            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
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
    <div className="flex w-full min-w-0 flex-col gap-6">
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto w-full max-w-3xl min-w-0">
          <div className="mb-4">
            <Button to="/articles" variant="custom2">
              ← Back to Articles
            </Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Article
          </p>
          <h1 className="wrap-break-word text-balance text-3xl font-bold leading-tight text-[#0C3AA7] sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-2 wrap-break-word text-sm text-zinc-500">
            {article.name
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        </div>
      </section>

      <section className="bg-[#0C3AA7] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto w-full max-w-3xl min-w-0 px-1 py-2 sm:p-4 sm:px-4">
          <div className="flex aspect-4/3 max-h-[min(360px,55vh)] w-full items-center justify-center overflow-hidden rounded-[1.25rem] bg-zinc-200 sm:max-h-none sm:aspect-4/3">
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full max-h-full object-contain"
              />
            ) : (
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
            )}
          </div>

          <div className="prose prose-sm mt-5 max-w-none space-y-4 text-zinc-700">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="wrap-break-word text-base leading-7 whitespace-pre-wrap text-white"
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
