import './index.scss';
import { ConfigProvider } from 'antd';
import Routing from 'pages';
import withProviders from './providers';

function App(): JSX.Element {
  return (
    <ConfigProvider
      componentSize="large"
      theme={{
        token: {
          colorText: 'var(--color-text)',
          borderRadius: 4.99,
          paddingLG: 0,
          paddingMD: 0,
          paddingSM: 0,
          paddingXL: 0,
          paddingXS: 0,
          paddingXXS: 0,
        },
      }}
    >
      <Routing />
    </ConfigProvider>
  );
}

export default withProviders(App);
