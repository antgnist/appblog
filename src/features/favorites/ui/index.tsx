import { message } from 'antd';
import { articleModel } from 'entities/article';
import {
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from 'entities/article/model/articlesApi';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { LikesUI } from 'shared/ui';

export interface FavoritesProps {
  keySlug?: string;
  style?: object;
  disabled?: boolean;
}

export function Favorites({
  keySlug = '',
  style = {},
  disabled = true,
}: FavoritesProps) {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(articleModel.selectArticles);
  const { likes } = articles;

  const [favoriteArticleMutation, { isError: isErrorLike }] =
    useFavoriteArticleMutation();
  const [unfavoriteArticleMutation, { isError: isErrorUnlike }] =
    useUnfavoriteArticleMutation();

  const likeHandler = () => {
    if (likes) {
      if (!likes[keySlug].isLiked) {
        favoriteArticleMutation(keySlug);
        dispatch(articleModel.setLike(keySlug));
      } else {
        unfavoriteArticleMutation(keySlug);
        dispatch(articleModel.deleteLike(keySlug));
      }
    }
  };

  useEffect(() => {
    if (isErrorLike) {
      message.error('Error Like');
      dispatch(articleModel.deleteLike(keySlug));
    }
  }, [isErrorLike, dispatch, keySlug]);

  useEffect(() => {
    if (isErrorUnlike) {
      message.error('Error Unlike');
      dispatch(articleModel.setLike(keySlug));
    }
  }, [isErrorUnlike, dispatch, keySlug]);

  return (
    <LikesUI
      count={likes ? likes[keySlug]?.likesCount || 0 : 0}
      style={style}
      disabled={disabled}
      liked={likes ? likes[keySlug]?.isLiked || false : false}
      action={likeHandler}
    />
  );
}
