// import { Space, Input, Button } from 'antd';
import { Space } from 'antd';
// import { useForm } from 'react-hook-form';
import { SignWindowUI, FormTitleUI } from 'shared/ui';
// import styles from './styles.module.scss';

function SignUp() {
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
        <FormTitleUI tittle="Create new account" />
      </SignWindowUI>
    </Space>
  );
}

export default SignUp;
