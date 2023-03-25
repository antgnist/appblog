// import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useAppSelector } from 'shared/hooks';

import PrivateRoutes from 'shared/utils/private-router';
import AddArticlePage from './add-article';
import AppLayoutPage from './app-layout';
import ArticleDetailPage from './article-detail';
import ArticlesListPage from './articles-list';
import EditArticlePage from './edit-article';
import NotFoundPage from './not-found';
import ProfilePage from './profile';
import SignInPage from './sign-in';
import SignUpPage from './sign-up';

// const AppLayoutPage = lazy(() => import('./app-layout'));
// const ArticlesListPage = lazy(() => import('./articles-list'));
// const ArticleDetailPage = lazy(() => import('./article-detail'));
// const SignUpPage = lazy(() => import('./sign-up'));
// const SignInPage = lazy(() => import('./sign-in'));
// const ProfilePage = lazy(() => import('./profile'));
// const NotFoundPage = lazy(() => import('./not-found'));
// const PrivateRoutes = lazy(() => import('shared/utils/private-router'));

function Routing() {
  // const loggedProp = useAppSelector((state) => state.user.loggedIn);
  // console.log(loggedProp);
  // const AppLayoutPageMemo = memo(AppLayoutPage);

  return (
    <Routes>
      <Route element={<AppLayoutPage />}>
        <Route path="/" element={<ArticlesListPage />} />
        <Route path="articles" element={<ArticlesListPage />} />
        <Route path="articles/:slug" element={<ArticleDetailPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<ProfilePage />} path="profile" />
          <Route element={<AddArticlePage />} path="new-article" />
          <Route element={<EditArticlePage />} path="articles/:slug/edit" />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Routing;
