import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navigation } from '../../components/Navigation/Navigation';
import * as routes from '../../constants/routes';
import Home from '../Home/Home';
import Landing from '../Landing/Landing';
import { PasswordForget } from '../PasswordForget/PasswordForget';
import Post from '../Post/Post';
import { withAuthentication } from '../Session/withAuthentication';
import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';
import { Subforum } from '../Subforum/Subforum';
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
          <Switch>
            <div className="container">
              <Route exact={true} path={routes.LANDING} component={Landing} />
              <Route path={routes.SUBFORUM + '/:sub'} component={Subforum} />
              <Route path={routes.POST + '/:post'} component={Post} />
              <Route exact={true} path={routes.SIGN_UP} component={SignUp} />
              <Route exact={true} path={routes.SIGN_IN} component={SignIn} />
              <Route exact={true} path={routes.PASSWORD_FORGET} component={PasswordForget} />
              <Route exact={true} path={routes.HOME} component={Home} />
              <Route exact={true} path={routes.ACCOUNT} component={Account} />
            </div>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export const App = withAuthentication(AppComponent);