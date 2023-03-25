import { Row, Col, Space } from 'antd';
import { ArticleRow } from 'entities/article';

import { setArticlesList, changeArticlesPage } from 'entities/article/model';
import { useGetArticlesQuery } from 'entities/article/model/articlesApi';
import { userModel } from 'entities/user';
import queryString from 'query-string';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { SpinFlexUI, PaginationUI, GoBackUI } from 'shared/ui';

// import styles from './styles.module.scss';

const pageInQuery = (pageStr: string | null | (string | null)[]) => {
  if (pageStr === null || !Number.isFinite(+pageStr)) return 1;
  return +pageStr;
};

export default function ArticlesList() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = queryString.parse(location.search);
  const dispatch = useAppDispatch();
  // const [page, setPage] = useState(pageInQuery(query.page));
  const currentPage = useAppSelector((state) => state.articles.articlesPage);
  const user = useAppSelector(userModel.selectUser);
  const pageNum = pageInQuery(query.page);

  useEffect(() => {
    if (currentPage !== pageNum) {
      dispatch(changeArticlesPage(pageNum));
    }
  }, [currentPage, pageNum, dispatch]);

  const { data, isFetching, error, refetch } = useGetArticlesQuery(currentPage); // page
  const articles = useAppSelector((state) => state.articles.entities);
  const totalArticles = useAppSelector((state) => state.articles.articlesCount);

  useEffect(() => {
    if (data) {
      dispatch(setArticlesList(data));
    }
  }, [data, dispatch]);

  if (isFetching)
    return (
      <div
        style={{
          minHeight: 'calc(100vh - var(--header-heght))',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SpinFlexUI />
      </div>
    );

  if (error) {
    return (
      <GoBackUI
        text="При запросе произошла Ошибка"
        onClicked={() => {
          //    setPage(1);
          dispatch(changeArticlesPage(1));
          refetch();
        }}
      />
    );
  }

  if (!articles.length) {
    return (
      <GoBackUI
        text="Список статей по данному запросу пуст"
        linkText="Посмотреть другие статьи"
        linkTo="./"
        onClicked={() => {
          // setPage(1);
          dispatch(changeArticlesPage(1));
        }}
      />
    );
  }

  const pagination = (
    <Row justify="center">
      <Col>
        <PaginationUI
          current={currentPage} // page
          total={totalArticles}
          chgArticlesPage={(num) => {
            if (num === 1) {
              navigate('./', { relative: 'path' });
            } else {
              navigate(`./?page=${num}`, { relative: 'path' });
            }
            window.scrollTo(0, 0);
            dispatch(changeArticlesPage(1)); //  setPage(num);
          }}
        />
      </Col>
    </Row>
  );

  return (
    <Space
      direction="vertical"
      size={26}
      style={{
        display: 'flex',
        paddingTop: '26px',
        paddingBottom: '18px',
      }}
    >
      {articles.map((article) => (
        <ArticleRow
          key={article.slug}
          loading={isFetching}
          loggedIn={user.loggedIn}
          tittle={article.title}
          description={article.description}
          tagsArr={article.tagList}
          fullName={article.author.username}
          date={article.createdAt}
          avatarSrc={article.author.image}
          likesCount={article.favoritesCount}
          liked={article.favorited}
          slug={article.slug}
        />
      ))}

      {pagination}
    </Space>
  );
}
