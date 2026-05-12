import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import ArticleList from "../../components/ArticleList.jsx";
import { fetchArticles, mapArticleFromApi } from "../../services/ArticleService";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadArticles = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const { data } = await fetchArticles();
        const list = data?.articles ?? [];
        const mapped = list.map(mapArticleFromApi).filter((a) => a.isActive);
        if (!cancelled) {
          setArticles(mapped);
        }
      } catch (err) {
        console.error("Failed to load articles:", err);
        if (!cancelled) {
          setLoadError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load articles.",
          );
          setArticles([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadArticles();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto w-full max-w-7xl min-w-0">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Articles
          </p>

          <h1 className="max-w-2xl text-balance text-3xl font-bold leading-tight text-[#0C3AA7] sm:text-4xl">
            Featured articles in a simple card grid
          </h1>

          <p className="mt-4 max-w-lg text-pretty text-sm leading-7 text-zinc-600 sm:text-base">
            A clean wireframe section for article thumbnails, titles, short
            descriptions, and one clear action per card.
          </p>

          <div className="mt-6">
            <Button to="/" variant="custom2">
              Back Home
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[#0C3AA7] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto mb-6 w-full max-w-7xl min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#97A6C9]">
            Featured Articles
          </p>

          <h2 className="mt-2 text-balance text-2xl font-semibold text-white sm:text-3xl">
            Article card grid
          </h2>
        </div>

        <div className="mx-auto w-full max-w-7xl min-w-0">
          {loadError ? (
            <p className="text-pretty text-sm leading-7 text-red-200">
              {loadError}
            </p>
          ) : null}

          {!loadError && loading ? (
            <p className="text-sm leading-7 text-[#97A6C9]">Loading articles…</p>
          ) : null}

          {!loadError && !loading && articles.length === 0 ? (
            <p className="text-pretty text-sm leading-7 text-[#97A6C9]">
              No articles to show yet. Check back soon.
            </p>
          ) : null}

          {!loadError && !loading && articles.length > 0 ? (
            <ArticleList articles={articles} />
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default ArticleListPage;
