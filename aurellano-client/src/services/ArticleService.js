import constants from "../constant";
import axios from "axios";

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

export const mapArticleFromApi = (a) => ({
  ...a,
  content: Array.isArray(a.content) ? [...a.content] : [],
  description: String(a.content?.[0] ?? "").trim(),
});

export const getArticleErrorMessage = (err) =>
  err.response?.data?.message || err.message || "Something went wrong.";

export const buildArticlePayload = ({
  name,
  title,
  imageUrl,
  body,
  isActive = true,
}) => {
  const paragraphs = String(body ?? "")
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const content = paragraphs.length ? paragraphs : [""];

  return {
    name: String(name ?? "").trim().toLowerCase(),
    title: String(title ?? "").trim(),
    imageUrl: String(imageUrl ?? "").trim(),
    content,
    isActive: Boolean(isActive),
  };
};

export const fetchArticles = () => API.get("/");
export const createArticle = (article) => API.post("/", article);
export const updateArticle = (id, article) => API.put(`/${id}`, article);
export const deleteArticle = (id) => API.delete(`/${id}`);
