// import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ArticlesListPage from './articles-list';

// const ArticlesListPage = lazy(() => import('./articles-list'));

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<ArticlesListPage />} />
    </Routes>
  );
}

export default Routing;
