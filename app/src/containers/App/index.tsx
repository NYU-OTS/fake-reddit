import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navigation } from '../../components/Navigation';
import * as routes from '../../constants/routes';
import Home from '../Home';
import Landing from '../Landing';
import { PasswordForget } from '../PasswordForget';
import Post from '../Post';
import { withAuthentication } from '../Session/withAuthentication';
import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';
import { Subforum } from '../Subforum';
import Account from '../User/Account';

class AppComponent extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <hr />
          <Switch>
            <Route exact={true} path={routes.LANDING} component={Landing} />
            <Route path={routes.SUBFORUM + '/:sub'} component={Subforum} />
            <Route path={routes.POST + '/:post'} component={Post} />
            <Route exact={true} path={routes.SIGN_UP} component={SignUp} />
            <Route exact={true} path={routes.SIGN_IN} component={SignIn} />
            <Route exact={true} path={routes.PASSWORD_FORGET} component={PasswordForget} />
            <Route exact={true} path={routes.HOME} component={Home} />
            <Route exact={true} path={routes.ACCOUNT} component={Account} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export const App = withAuthentication(AppComponent);