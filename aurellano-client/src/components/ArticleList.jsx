import { Link } from "react-router-dom";
import Button from "./Button";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article key={article.name} className="rounded-3xl  bg-[#97A6C9] p-4">
          <div className="flex aspect-4/4 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="object-contain w-full h-full"
              />
            ) : (
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
            )}
          </div>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
            Article {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-sm leading-6 text-black">{article.title}</h3>

          <p className="mt-3 text-sm leading-6 text-zinc-600">
            {article.content[0].substring(0, 150)}...
          </p>
          <Link to={`/articles/${article.name}`}>
            <Button className="mt-4" variant="custom2">
              Read More
            </Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
