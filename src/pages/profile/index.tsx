import { Space, Input, Button, Form, message } from 'antd';
import { userModel } from 'entities/user';
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from 'entities/user/model/usersApi';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import {
  IResponseSuccessUser,
  IResponseError,
  IErrorServ,
} from 'shared/interfaces';
import { SignWindowUI, FormTitleUI, SpinFlexUI, GoBackUI } from 'shared/ui';
import decodeTokenPayload from 'shared/utils/decode-token';
import { setTokenLocalStorage } from 'shared/utils/token-local-storage';
// import styles from './styles.module.scss';

type ProfileFormData = {
  username: string;
  email: string;
  password?: string;
  image: string;
};

function Profile() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(userModel.selectUser);
  const { data, isFetching, error } = useGetCurrentUserQuery();
  const [updateUserMutation, { isLoading }] = useUpdateUserMutation();

  const {
    handleSubmit,
    // getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    mode: 'onChange',
  });

  const handleEmailChange = (value: string) => value.toLowerCase();

  const validateUrl = (value: string) => {
    if (!value) return true;
    const reg =
      /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
    return reg.test(value) || 'Enter correct url';
  };

  const onSubmit = handleSubmit(async (dataForm: ProfileFormData) => {
    const { username, email, image, password } = dataForm;
    if (
      username !== currentUser.username ||
      email !== currentUser.email ||
      image !== currentUser.image ||
      password
    ) {
      let reqObj = {
        user: {
          email,
          password,
          username,
          image,
        },
      };
      reqObj = password ? reqObj : (delete reqObj.user.password, reqObj);
      const response = await updateUserMutation(reqObj);
      const success = response as IResponseSuccessUser;
      const fail = response as IResponseError;
      if (success.data) {
        dispatch(userModel.login(success.data.user));
        const decodedTokenInfo = decodeTokenPayload(success.data.user.token);
        setTokenLocalStorage(success.data.user.token, decodedTokenInfo);
        message.success('Profile has been successfully updated');
      } else {
        const errorRes = fail?.error as IErrorServ;
        message.error(
          `Profile Update Error: ${Object.entries(errorRes?.data?.errors)
            .flat()
            .join(' ')}`,
        );
      }
    } else {
      message.info('Profile does not need to be updated');
    }
  });

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
        linkText="Вернуться на главную"
        linkTo="/"
      />
    );
  }

  if (data) {
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
            <FormTitleUI tittle="Edit Profile" />
            <div>
              <label htmlFor="username">Username</label>
              <Controller
                name="username"
                control={control}
                defaultValue={
                  currentUser.username || data?.user?.username || ''
                }
                rules={{
                  required: 'This field is required',
                  pattern: {
                    value: /^[a-zA-Z0-9]*$/,
                    message: 'You can only use English letters and numbers',
                  },
                }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors?.username ? 'error' : ''}
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
                defaultValue={currentUser.email || data?.user?.email || ''}
                control={control}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors?.email ? 'error' : ''}
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
              <label htmlFor="password">New password</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  // required: 'This field is required',
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
                      placeholder="New password"
                    />
                  </Form.Item>
                )}
              />
            </div>

            <div>
              <label htmlFor="image">Avatar image (url)</label>
              <Controller
                name="image"
                control={control}
                rules={{ validate: validateUrl }}
                defaultValue={currentUser.image || data?.user?.image || ''}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors?.image ? 'error' : ''}
                    help={errors?.image?.message}
                  >
                    <Input id="avatar" {...field} placeholder="Avatar image" />
                  </Form.Item>
                )}
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              disabled={isSubmitting || isLoading} //! isValid
            >
              {isLoading ? 'Updating' : 'Save'}
            </Button>
          </Form>
        </SignWindowUI>
      </Space>
    );
  }

  return null;
}

export default Profile;
