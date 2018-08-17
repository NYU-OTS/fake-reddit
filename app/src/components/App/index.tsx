import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { db, firebase } from '../../firebase';
import { Account } from '../Account';
import { Home } from '../Home';
import { Landing } from '../Landing';
import { Navigation } from '../Navigation';
import { PasswordForget } from '../PasswordForget';
import { Post } from '../Post';
import { withAuthentication } from '../Session/withAuthentication';
import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';
import { Subforum } from '../Subforum';


class AppComponent extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      authUser: null,
      currentUser: null
    };
  }

  public componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      // TODO: add currentUser to the entire scope
      if (authUser) {
        db.getUserByUID(authUser.uid).once('value', snapshot => {
          this.setState({
            authUser,
            currentUser: snapshot.val()
          })
        })
      } else {
        this.setState({
          authUser: null,
          currentUser: null
        })
      }
    });
  }

  public render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <hr />
          <Switch>
            <Route exact={true} path={routes.LANDING} component={Landing} />
            <Route exact={true} path={routes.SIGN_UP} component={SignUp} />
            <Route exact={true} path={routes.SIGN_IN} component={SignIn} />
            <Route exact={true} path={routes.PASSWORD_FORGET} component={PasswordForget} />
            <Route exact={true} path={routes.HOME} component={Home} />
            <Route exact={true} path={routes.ACCOUNT} component={Account} />
            <Route exact={true} path={routes.SUBFORUM + '/:sub'} component={Subforum} />
            <Route exact={true} path={routes.POST + '/:post'} component={Post} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export const App = withAuthentication(AppComponent);