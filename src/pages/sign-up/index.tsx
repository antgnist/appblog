import { Space, Input, Button, Form, Checkbox, Divider } from 'antd';
import { userModel } from 'entities/user';
import { useSignUpMutation } from 'entities/user/model/usersApi';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
// import styles from './styles.module.scss';
import {
  IErrorServ,
  IResponseSuccessUser,
  IResponseError,
} from 'shared/interfaces';
import { SignWindowUI, FormTitleUI, LinkUnderFormUI } from 'shared/ui';
import decodeTokenPayload from 'shared/utils/decode-token';
import { setTokenLocalStorage } from 'shared/utils/token-local-storage';

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  'repeat password': string;
  agreedToTerms: boolean;
};

function SignUp() {
  const [errorStatus, setErrorStatus] = useState<[string, unknown][]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(userModel.selectUser);

  const [signUpMutation, { isLoading, isError, isSuccess }] =
    useSignUpMutation();

  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpFormData>({
    mode: 'onChange',
    defaultValues: {
      agreedToTerms: true,
    },
  });

  const handleEmailChange = (value: string) => value.toLowerCase();
  const validateRepeatPassword = (value: string) =>
    value === getValues('password') || 'Passwords must match';

  const onSubmit = handleSubmit(async (data: SignUpFormData) => {
    console.log(data);
    const response = await signUpMutation({
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
    const success = response as IResponseSuccessUser;
    const fail = response as IResponseError;

    if (success.data) {
      dispatch(userModel.login({ ...success.data.user }));
      const decodedTokenInfo = decodeTokenPayload(success.data.user.token);
      setTokenLocalStorage(success.data.user.token, decodedTokenInfo);
      navigate('/');
    } else {
      const error = fail.error as IErrorServ;
      const arrError = Object.entries(error.data.errors);
      setErrorStatus(arrError);
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
          <FormTitleUI tittle="Create new account" />

          {isError && (
            <div style={{ textAlign: 'center' }}>
              <span>There was an error with your sign-up request! </span>
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
            <label htmlFor="username">Username</label>
            <Controller
              name="username"
              control={control}
              rules={{
                required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z0-9]*$/,
                  message: 'You can only use English letters and numbers',
                },
              }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={
                    (errors?.username ? 'error' : '') ||
                    (errorStatus.flat().includes('username') ? 'error' : '')
                  }
                  help={errors?.username?.message}
                >
                  <Input id="username" {...field} placeholder="Username" />
                </Form.Item>
              )}
            />
          </div>
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
                    (errorStatus.flat().includes('email') ? 'error' : '')
                  }
                  help={errors?.email?.message}
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
                pattern: {
                  value: /^[\S]*$/,
                  message: 'Do not use space characters',
                },
                minLength: 6,
                maxLength: 40,
              }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors?.password ? 'error' : ''}
                  help={
                    errors?.password?.message ||
                    (errors?.password?.type === 'minLength' && (
                      <div>Password must be at least 6 characters</div>
                    )) ||
                    (errors?.password?.type === 'maxLength' && (
                      <div>Password must be maximum 40 characters</div>
                    ))
                  }
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
          <div>
            <label htmlFor="repeat password">Repeat Password</label>
            <Controller
              name="repeat password"
              control={control}
              rules={{
                required: 'This field is required',
                pattern: {
                  value: /^[\S]*$/,
                  message: 'Do not use space characters',
                },
                validate: validateRepeatPassword,
              }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors['repeat password'] ? 'error' : ''}
                  help={errors['repeat password']?.message}
                >
                  <Input.Password
                    id="repeat_password"
                    {...field}
                    placeholder="Password"
                  />
                </Form.Item>
              )}
            />
          </div>

          <div>
            <Divider style={{ margin: '0px 0px 8px 0px' }} />
            <Controller
              name="agreedToTerms"
              control={control}
              rules={{
                required: 'You must agree to the terms of data processing',
              }}
              render={({ field }) => (
                <Form.Item
                  validateStatus={errors.agreedToTerms ? 'error' : ''}
                  help={errors.agreedToTerms?.message}
                  noStyle
                >
                  <Checkbox {...field} checked={field.value}>
                    I agree to the processing of my personal information
                  </Checkbox>
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
                  <span>You have successfully signed up!</span>
                )) ||
                'Sign Up'}
          </Button>
          <LinkUnderFormUI
            text="Already have an account? "
            link="/sign-in"
            linkText="Sign In."
          />
        </Form>
      </SignWindowUI>
    </Space>
  );
}

export default SignUp;
