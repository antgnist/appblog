import App from 'app';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const renderApp = () => {
  root.render(<App />);
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('app', renderApp);
}

renderApp();
