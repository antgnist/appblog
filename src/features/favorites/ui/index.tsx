import { message } from 'antd';
import {
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from 'entities/article/model/articlesApi';
import { useState, useEffect } from 'react';
import { LikesUI } from 'shared/ui';

export interface FavoritesProps {
  keySlug?: string;
  count?: string | number;
  style?: object;
  disabled?: boolean;
  liked?: boolean;
}

export function Favorites({
  keySlug = '',
  count = 0,
  style = {},
  disabled = true,
  liked = false,
}: FavoritesProps) {
  const [currentLike, setCurrentLike] = useState(liked);
  const [currentLikeCount, setCurrentLikeCount] = useState(count);

  const [favoriteArticleMutation, { isError }] = useFavoriteArticleMutation();
  const [unfavoriteArticleMutation, { isError: isError2 }] =
    useUnfavoriteArticleMutation();

  const likeHandler = () => {
    if (!currentLike) {
      favoriteArticleMutation(keySlug);
      setCurrentLikeCount((oldLikeCount) => +oldLikeCount + 1);
    } else {
      unfavoriteArticleMutation(keySlug);
      setCurrentLikeCount((oldLikeCount) => +oldLikeCount - 1);
    }
    setCurrentLike((state) => !state);
  };

  useEffect(() => {
    if (isError) {
      message.error('Error Like');
    }
  }, [isError]);

  useEffect(() => {
    if (isError2) {
      message.error('Error Unlike');
    }
  }, [isError2]);

  return (
    <LikesUI
      count={currentLikeCount}
      style={style}
      disabled={disabled}
      liked={currentLike}
      action={likeHandler}
    />
  );
}
