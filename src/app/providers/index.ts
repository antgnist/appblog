import compose from 'compose-function';
import withErrorBoundary from './with-errorboundary';
import withRouter from './with-router';
import withStore from './with-store';

const withProviders = compose(withErrorBoundary, withRouter, withStore);

export default withProviders;
