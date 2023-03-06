import { Spin } from 'antd';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

const withRouter = (component: () => React.ReactNode) =>
  function () {
    return (
      <BrowserRouter>
        <Suspense
          fallback={<Spin delay={300} className="overlay" size="large" />}
        >
          {component()}
        </Suspense>
      </BrowserRouter>
    );
  };

export default withRouter;
