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
    isFetching,
    error,
  } = useGetArticleBySlugQuery(slug);

  const user = useAppSelector(userModel.selectUser);

  useEffect(() => {
    if (data.article.slug) {
      dispatch(articleModel.setArticle(data.article));
    }
  }, [data, dispatch]);

  if (error) {
    return (
      <GoBackUI
        text="Ошибка при получении данной статьи"
        linkText="Посмотреть другие статьи"
        linkTo=".."
      />
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
        loading={isFetching}
        loggedIn={user.loggedIn}
        currentAuthor={data.article.author.username === user.username}
        slug={data.article.slug}
        tittle={data.article.title}
        description={data.article.description}
        body={data.article.body}
        tagsArr={data.article.tagList}
        avatarSrc={data.article.author.image}
        date={data.article.createdAt}
        likesCount={data.article.favoritesCount}
        liked={data.article.favorited}
        fullName={data.article.author.username}
      />
    </Space>
  );
}
