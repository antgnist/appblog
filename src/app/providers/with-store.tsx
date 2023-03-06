import { Provider } from 'react-redux';
import store from '../store/configureStore';

const withStore = (component: () => React.ReactNode) =>
  function () {
    return <Provider store={store}>{component()}</Provider>;
  };

export default withStore;
