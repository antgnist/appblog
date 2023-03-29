import { Popconfirm, message } from 'antd';
import { useDeleteArticleMutation } from 'entities/article/model/articlesApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonUI } from 'shared/ui';

export interface DeleteArticleButtonProps {
  slug?: string;
  style?: object;
  className?: string;
  text?: string;
  callback?: () => void;
}

export function DeleteArticleButton({
  slug = '',
  style = {},
  className = '',
  text = 'Delete',
  callback,
}: DeleteArticleButtonProps) {
  const [deleteArticleMutation, { isLoading, isError, isSuccess }] =
    useDeleteArticleMutation();
  const navigate = useNavigate();

  const title = (
    <div style={{ fontWeight: 400, display: 'flex' }}>
      <div style={{ width: 184 }}>Are you sure to delete this article?</div>
    </div>
  );

  useEffect(() => {
    if (isError) {
      message.error('Deletion error');
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      message.success('Article successfully deleted');
      if (callback) {
        callback();
      }
    }
  }, [isSuccess, navigate, callback]);

  return (
    <div>
      <Popconfirm
        placement="rightTop"
        title={title}
        onConfirm={() => {
          deleteArticleMutation(slug);
        }}
        okText="Yes"
        cancelText="No"
      >
        <ButtonUI
          className={className}
          style={style}
          disabled={isLoading || isSuccess}
          action={async () => {}}
        >
          {(isLoading && 'Deleting...') || (isSuccess && 'Deleted!') || text}
        </ButtonUI>
      </Popconfirm>
    </div>
  );
}
