import './index.scss';
import Routing from 'pages';
import withProviders from './providers';

function App(): JSX.Element {
  const clazz = 'App--green';

  return (
    <div className={clazz}>
      <Routing />
    </div>
  );
}

export default withProviders(App);
