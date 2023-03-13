import './index.scss';
import { ConfigProvider } from 'antd';
import Layout, { Content } from 'antd/es/layout/layout';
// import Counter from 'entities/counter/ui/counter';
import Routing from 'pages';
import HeaderBlog from 'widgets/header-blog';
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
      <Layout className="app">
        {/* <div>
          <p>I&apos;m working</p>
          <Counter />
        </div> */}
        <HeaderBlog />
        <Content>
          <Routing />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default withProviders(App);
