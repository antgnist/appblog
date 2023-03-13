import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const ArticlesListPage = lazy(() => import('./articles-list'));
const ArticleDetailPage = lazy(() => import('./article-detail'));

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<ArticlesListPage />} />
      <Route path="/articles" element={<ArticlesListPage />} />
      <Route path="/articles/1" element={<ArticleDetailPage />} />
      <Route path="*" element="Not Found" />
    </Routes>
  );
}

export default Routing;
