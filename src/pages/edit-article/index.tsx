import { Space } from 'antd';
import {
  useUpdateArticleMutation,
  useGetArticleBySlugQuery,
} from 'entities/article/model/articlesApi';
import { userModel } from 'entities/user';
import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAppSelector } from 'shared/hooks';
import {
  IErrorServ,
  IResponseSuccessArticle,
  IResponseError,
} from 'shared/interfaces';
import {
  SignWindowUI,
  FormTitleUI,
  ArticleFormUI,
  GoBackUI,
  SpinFlexUI,
} from 'shared/ui';
// import styles from './styles.module.scss';

type EditArticleFormData = {
  title: string;
  description: string;
  text: string;
  tags: {
    value: string;
  }[];
};

function EditArticle() {
  const navigate = useNavigate();
  const currentUser = useAppSelector(userModel.selectUser);

  const params = useParams();
  const slug = params.slug as string;
  const { data, isFetching, error } = useGetArticleBySlugQuery(slug);
  const [errorStatus, setErrorStatus] = useState<[string, unknown][]>([]);
  const [updateArticleMutation, { isLoading, isError, isSuccess }] =
    useUpdateArticleMutation();

  const onSubmit = async (dataForm: EditArticleFormData) => {
    const response = await updateArticleMutation({
      slug,
      data: {
        article: {
          title: dataForm.title,
          description: dataForm.description,
          body: dataForm.text,
          tagList: dataForm.tags.map((el) => el.value),
        },
      },
    });
    const success = response as IResponseSuccessArticle;
    const fail = response as IResponseError;

    if (success.data) {
      navigate(`/articles/${success.data.article.slug}`);
    } else {
      const errorRes = fail.error as IErrorServ;
      const arrError = Object.entries(errorRes.data.errors);
      setErrorStatus(arrError);
    }
  };

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
        text="Ошибка при получении данных"
        linkText="Посмотреть другие статьи"
        linkTo="/articles"
      />
    );
  }

  if (data) {
    if (data.article.author.username !== currentUser.username) {
      return <Navigate to=".." relative="path" />;
    }
    return (
      <Space
        direction="vertical"
        style={{
          display: 'flex',
          paddingTop: '34px',
          paddingBottom: '50px',
        }}
      >
        <SignWindowUI flexBasis={938}>
          <FormTitleUI tittle="Edit article" />
          <ArticleFormUI
            action={onSubmit}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            errorStatus={errorStatus}
            initialArticle={{
              title: data.article.title || '',
              description: data.article.description || '',
              text: data.article.body || '',
              tags: data.article.tagList.map((tag) => ({ value: tag })) || [],
            }}
          />
        </SignWindowUI>
      </Space>
    );
  }

  return null;
}

export default EditArticle;
