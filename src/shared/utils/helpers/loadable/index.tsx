// Проверить на работоспособность
import { Spin } from 'antd';
import { ReactPropTypes, Suspense, ComponentType } from 'react';

const Loadable = (Component: ComponentType<ReactPropTypes>) =>
  function (props: ReactPropTypes) {
    return (
      <Suspense fallback={<Spin />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default Loadable;
