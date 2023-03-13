import { unwrapResult } from '@reduxjs/toolkit';
import { Row, Col, Space } from 'antd';
import { ArticleRow, articleModel } from 'entities/article';
import queryString from 'query-string';
import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { SpinFlexUI, PaginationUI } from 'shared/ui';

// import styles from './styles.module.scss';

// const QUERY_KEYS = ['page'];

export default function ArticlesList() {
  const dispatch = useAppDispatch();

  const { fetchArticles } = articleModel;
  const articles = useAppSelector((state) => state.articles.entities);
  const status = useAppSelector((state) => state.articles.status);
  const currentPage = useAppSelector((state) => state.articles.articlesPage);
  const totalArticles = useAppSelector((state) => state.articles.articlesCount);
  const location = useLocation();
  const navigate = useNavigate();
  const query = useMemo(
    () => queryString.parse(location.search),
    [location.search],
  );

  const pageInQuery = (pageStr: string | null | (string | null)[]) => {
    if (pageStr === null || !Number.isFinite(+pageStr)) return 1;
    return +pageStr;
  };

  const setPageNavigate = useCallback(
    (page: number) => {
      if (page === 1) {
        navigate('./', { relative: 'path' });
      } else {
        navigate(`./?page=${page}`, { relative: 'path' });
      }
    },
    [navigate],
  );

  useEffect(() => {
    console.log(
      'Запрос на получение статей. ',
      'Зависимости верхнего: query:',
      query,
    );
    const pageQuery = pageInQuery(query.page);
    const fetchData = async () => {
      try {
        const resultAction = await dispatch(fetchArticles(pageQuery));
        const result = unwrapResult(resultAction);
        console.log('РЕЗУЛЬТАТ: ', result);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      }
    };
    fetchData();
  }, [dispatch, fetchArticles, query]);

  useEffect(() => {
    console.log(
      'Зависимости нижнего: query:',
      query,
      ' totalArticles:',
      totalArticles,
    );
    let pageQuery = pageInQuery(query.page);
    if (pageQuery > Math.ceil(totalArticles / 5) && totalArticles > 0) {
      pageQuery = 1;
    }
    dispatch(articleModel.changeArticlesPage(pageQuery));
    setPageNavigate(pageQuery);
  }, [totalArticles, query, dispatch, setPageNavigate]);

  if (status === 'pending')
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
          status={status}
          loggedIn={false}
          tittle={article.title}
          description={article.description}
          tagsArr={article.tagList}
          fullName={article.author.username}
          date={article.createdAt}
          avatarSrc={article.author.image}
        />
      ))}
      <Row justify="center">
        <Col>
          <PaginationUI
            current={currentPage}
            total={totalArticles}
            chgArticlesPage={(num) => {
              dispatch(articleModel.changeArticlesPage(num));
              setPageNavigate(num);
            }}
          />
        </Col>
      </Row>
    </Space>
  );
}
