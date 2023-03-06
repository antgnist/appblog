import './index.scss';
import Counter from 'entities/counter/ui/counter';
import withProviders from './providers';

function App(): JSX.Element {
  const clazz = 'App--green';

  return (
    <div className={clazz}>
      <header className="">
        <div>
          <p>I&apos;m working</p>
          <Counter />
        </div>
      </header>
    </div>
  );
}

export default withProviders(App);
