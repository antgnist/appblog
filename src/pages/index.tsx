import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const ArticlesListPage = lazy(() => import('./articles-list'));
const ArticleDetailPage = lazy(() => import('./article-detail'));
const SignUpPage = lazy(() => import('./sign-up'));

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<ArticlesListPage />} />
      <Route path="articles" element={<ArticlesListPage />} />
      <Route path="articles/:slug" element={<ArticleDetailPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="*" element="Not Found" />
    </Routes>
  );
}

export default Routing;
