// import { Buffer } from 'buffer';
import { Space, Input, Form, Button } from 'antd';
import { userModel } from 'entities/user';
import { useSignInMutation } from 'entities/user/model/usersApi';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import {
  IErrorServ,
  IResponseSuccessUser,
  IResponseError,
} from 'shared/interfaces';
import { SignWindowUI, FormTitleUI, LinkUnderFormUI } from 'shared/ui';
import decodeTokenPayload from 'shared/utils/decode-token';
import { setTokenLocalStorage } from 'shared/utils/token-local-storage';
// import styles from './styles.module.scss';

type SignInFormData = {
  email: string;
  password: string;
};

function SignIn() {
  const [errorStatus, setErrorStatus] = useState<[string, unknown][]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(userModel.selectUser);
  const [signInMutation, { isLoading, isError, isSuccess }] =
    useSignInMutation();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignInFormData>({
    mode: 'onChange',
  });

  const handleEmailChange = (value: string) => value.toLowerCase();

  const onSubmit = handleSubmit(async (data: SignInFormData) => {
    console.log(data);
    const response = await signInMutation({
      user: {
        email: data.email,
        password: data.password,
      },
    });
    const success = response as IResponseSuccessUser;
    const fail = response as IResponseError;
    console.log('response: ', response);

    if (success.data) {
      dispatch(userModel.login({ ...success.data.user }));
      const decodedTokenInfo = decodeTokenPayload(success.data.user.token);
      setTokenLocalStorage(success.data.user.token, decodedTokenInfo);
      navigate('/');
    } else {
      const error = fail.error as IErrorServ;
      const arrError = Object.entries(error.data.errors);
      setErrorStatus(arrError);
      console.log('вся ошибка: ', fail);
      console.log('arrError: ', arrError);
      console.log((response as IResponseError).error);
    }
  });

  return (
    <Space
      direction="vertical"
      style={{
        display: 'flex',
        paddingTop: '59px',
        paddingBottom: '10px',
      }}
    >
      <SignWindowUI>
        <Form
          onFinish={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '21px' }}
        >
          <FormTitleUI tittle="Sign In" />

          {isError && (
            <div style={{ textAlign: 'center' }}>
              <span>There was an error with your sign-in request! </span>
              {errorStatus.map((elem) => {
                const elemStr = elem.join(': ');
                return (
                  <div key={elemStr} style={{ color: 'var(--color-error)' }}>
                    {elemStr}
                  </div>
                );
              })}
            </div>
          )}

          <div>
            <label htmlFor="email">Email address</label>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={
                    (errors?.email ? 'error' : '') ||
                    (errorStatus.join(' ').includes('email') ? 'error' : '')
                  }
                  // help={errors?.email?.message}
                >
                  <Input
                    type="email"
                    id="email"
                    {...field}
                    onChange={(e) =>
                      field.onChange(handleEmailChange(e.target.value))
                    }
                    placeholder="Email address"
                  />
                </Form.Item>
              )}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'This field is required',
              }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={
                    (errors?.password ? 'error' : '') ||
                    (errorStatus.join(' ').includes('password') ? 'error' : '')
                  }
                  // help={errors?.password?.message}
                >
                  <Input.Password
                    id="password"
                    {...field}
                    placeholder="Password"
                  />
                </Form.Item>
              )}
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            disabled={!isValid || isSubmitting || isSuccess || user.loggedIn}
          >
            {isLoading
              ? 'Loading...'
              : ((isSuccess || user.loggedIn) && (
                  <span>You have successfully signed in!</span>
                )) ||
                'Login'}
          </Button>
          <LinkUnderFormUI
            text="Don’t have an account? "
            link="/sign-up"
            linkText="Sign Up."
          />
        </Form>
      </SignWindowUI>
    </Space>
  );
}

export default SignIn;
