// import styles from './styles.module.scss';
import { Space } from 'antd';
import { SingleArticle, articleModel } from 'entities/article';
import { useGetArticleBySlugQuery } from 'entities/article/model/articlesApi';
import { userModel } from 'entities/user';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'shared/hooks';
import { GoBackUI } from 'shared/ui';

const initialStateArticle = {
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  },
};

export default function ArticleDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const slug = params.slug as string;
  const {
    data = initialStateArticle,
    currentData,
    isFetching,
    error,
    refetch,
  } = useGetArticleBySlugQuery(slug);

  const user = useAppSelector(userModel.selectUser);
  const article = useAppSelector(articleModel.selectArticles);

  useEffect(() => {
    if (currentData) {
      // && currentData.article.slug
      dispatch(articleModel.setArticle(currentData.article));
    }
  }, [currentData, dispatch]);

  useEffect(() => {
    if (
      currentData &&
      (!article.likes || !article.likes[currentData.article.slug])
    ) {
      dispatch(
        articleModel.updateLikes({
          id: currentData.article.slug,
          isFavorited: currentData.article.favorited,
          favoritesCount: currentData.article.favoritesCount,
        }),
      );
    }
  }, [currentData, article.likes, dispatch]);

  if (error) {
    return (
      <GoBackUI
        text="Ошибка при получении данной статьи"
        linkText="Посмотреть другие статьи"
        linkTo=".."
      />
    );
  }

  if (isFetching || article.likes === null) {
    return (
      <Space
        direction="vertical"
        style={{
          display: 'flex',
          paddingTop: '24px',
          paddingBottom: '64px',
        }}
      >
        <SingleArticle slug="" tittle="" loading />
      </Space>
    );
  }

  return (
    <Space
      direction="vertical"
      style={{
        display: 'flex',
        paddingTop: '24px',
        paddingBottom: '64px',
      }}
    >
      <SingleArticle
        loading={false}
        loggedIn={user.loggedIn}
        currentAuthor={data.article.author.username === user.username}
        slug={data.article.slug}
        tittle={data.article.title}
        description={data.article.description}
        body={data.article.body}
        tagsArr={data.article.tagList}
        avatarSrc={data.article.author.image}
        date={data.article.createdAt}
        fullName={data.article.author.username}
        deleteCallback={refetch}
      />
    </Space>
  );
}
