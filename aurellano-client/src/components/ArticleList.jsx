import { Link } from "react-router-dom";
import Button from "./Button";

const EXCERPT_MAX = 150;

const excerptFromArticle = (article) => {
  const raw = String(article?.content?.[0] ?? "").trim();
  if (raw.length <= EXCERPT_MAX) return raw;
  return `${raw.slice(0, EXCERPT_MAX)}…`;
};

const ArticleList = ({ articles }) => {
  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={String(article._id ?? article.id ?? article.name)}
          className="flex min-h-0 min-w-0 flex-col rounded-3xl bg-[#97A6C9] p-4"
        >
          <div className="flex aspect-square min-h-0 w-full items-center justify-center overflow-hidden rounded-[1.25rem] bg-zinc-200">
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
            )}
          </div>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
            Article {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 wrap-break-word text-sm font-semibold leading-6 text-[#0C3AA7]">
            {article.title}
          </h3>

          <p className="mt-3 flex-1 text-pretty text-sm leading-6 text-white">
            {excerptFromArticle(article)}
          </p>
          <Link
            to={`/articles/${article.name}`}
            className="mt-4 block w-full min-w-0 sm:inline-block sm:w-auto"
          >
            <Button className="w-full justify-center sm:w-auto" variant="custom1">
              Read More
            </Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
