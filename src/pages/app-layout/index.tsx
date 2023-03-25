import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import Layout, { Content } from 'antd/es/layout/layout';
import { userModel } from 'entities/user';
import {
  ErrorResponse,
  useGetCurrentUserQuery,
} from 'entities/user/model/usersApi';
import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { GoBackUI, SpinFlexUI } from 'shared/ui';
import decodeTokenPayload from 'shared/utils/decode-token';
import {
  getTokenLocalStorage,
  clearTokenLocalStorage,
  setTokenLocalStorage,
} from 'shared/utils/token-local-storage';
import HeaderBlog from 'widgets/header-blog';
import styles from './index.module.scss';

function AppLayout() {
  const dispatch = useAppDispatch();
  const tokenObj = useMemo(getTokenLocalStorage, []);

  useEffect(() => {
    if (tokenObj && tokenObj.exp * 1000 - Date.now() > 0) {
      dispatch(
        userModel.login({
          token: tokenObj.token,
        }),
      );
    }
  }, [dispatch, tokenObj]);

  const user = useAppSelector(userModel.selectUser);
  const { loggedIn } = user;
  const { data, isFetching, error, refetch } = useGetCurrentUserQuery();

  useEffect(() => {
    if (data) {
      const decodedTokenInfo = decodeTokenPayload(data.user.token);
      setTokenLocalStorage(data.user.token, decodedTokenInfo);
      dispatch(userModel.login(data.user));
    }
  }, [data, dispatch]);

  useEffect(() => {
    console.log('ОШИБКА внутри useEffect AppLayout: ', error);
    const err = error as FetchBaseQueryError;
    if (err?.status === 401) {
      if (tokenObj) {
        dispatch(userModel.logout());
        clearTokenLocalStorage();
      }
    }
  }, [error, tokenObj, dispatch]);

  if (isFetching)
    return (
      <div
        style={{
          minHeight: 'calc(100vh)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SpinFlexUI />
      </div>
    );

  if (error) {
    const err = error as FetchBaseQueryError;
    const dataError = err.data as ErrorResponse;
    if (err?.status !== 401) {
      return (
        <GoBackUI
          text={`При запросе произошла Ошибка: ${
            dataError?.errors?.message || ''
          }`}
          onClicked={() => {
            refetch();
          }}
        />
      );
    }
  }

  return (
    <Layout className={styles.app}>
      <HeaderBlog auth={loggedIn} />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default AppLayout;
