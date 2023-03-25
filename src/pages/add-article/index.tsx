import { Space } from 'antd';
import { useAddArticleMutation } from 'entities/article/model/articlesApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IErrorServ,
  IResponseSuccessArticle,
  IResponseError,
} from 'shared/interfaces';
import { SignWindowUI, FormTitleUI, ArticleFormUI } from 'shared/ui';
// import styles from './styles.module.scss';

type AddArticleFormData = {
  title: string;
  description: string;
  text: string;
  tags: {
    value: string;
  }[];
};

function AddArticle() {
  const [errorStatus, setErrorStatus] = useState<[string, unknown][]>([]);
  const [addArticleMutation, { isLoading, isError, isSuccess }] =
    useAddArticleMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: AddArticleFormData) => {
    const response = await addArticleMutation({
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: data.tags.map((el) => el.value),
      },
    });
    const success = response as IResponseSuccessArticle;
    const fail = response as IResponseError;

    if (success.data) {
      navigate(`/articles/${success.data.article.slug}`);
    } else {
      const error = fail.error as IErrorServ;
      const arrError = Object.entries(error.data.errors);
      setErrorStatus(arrError);
    }
  };

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
        <FormTitleUI tittle="Create new article" />
        <ArticleFormUI
          action={onSubmit}
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
          errorStatus={errorStatus}
        />
      </SignWindowUI>
    </Space>
  );
}

export default AddArticle;
