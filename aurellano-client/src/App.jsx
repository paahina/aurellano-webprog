import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Layouts
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
//Landing Pages
import HomePage from "./pages/LandingPages/HomePage";
import ArticleListPage from "./pages/LandingPages/ArticleListPage";
import ArticlePage from "./pages/LandingPages/ArticlePage";
import AboutPage from "./pages/LandingPages/AboutPage";
//Authentication Pages
import SignInPage from "./pages/AuthPages/SignInPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";
//Error Page
import NotFoundPage from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/articleS", element: <ArticleListPage /> },
      { path: "/articles/:name", element: <ArticlePage /> },
    ],
  },
  {
    path: "auth/",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
