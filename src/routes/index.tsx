import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { routes } from './routes';
import Spinner from '@components/Spinner';

const Routes = () => {
  return (
    <Switch>
      {routes.map(({ Component, exact, path }) => (
        <Route
          key={path}
          exact={exact}
          path={path}
          render={props => (
            <Suspense fallback={<Spinner />}>
              <Component {...props} />
            </Suspense>
          )}
        />
      ))}
      <Route exact path="*" render={() => <Redirect to="/404" />} />
    </Switch>
  );
};

export default Routes;
