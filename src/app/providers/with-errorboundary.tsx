import { ErrorBoundary } from 'shared/ui';

const withErrorBoundary = (component: () => React.ReactNode) =>
  function () {
    return <ErrorBoundary>{component()}</ErrorBoundary>;
  };

export default withErrorBoundary;
