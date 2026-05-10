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
          <Button to="/" variant="custom2">
            Back Home
          </Button>
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

        {loadError ? (
          <p className="text-sm leading-7 text-red-200">{loadError}</p>
        ) : null}

        {!loadError && loading ? (
          <p className="text-sm leading-7 text-[#97A6C9]">Loading articles…</p>
        ) : null}

        {!loadError && !loading && articles.length === 0 ? (
          <p className="text-sm leading-7 text-[#97A6C9]">
            No articles to show yet. Check back soon.
          </p>
        ) : null}

        {!loadError && !loading && articles.length > 0 ? (
          <ArticleList articles={articles} />
        ) : null}
      </section>
    </div>
  );
};

export default ArticleListPage;
