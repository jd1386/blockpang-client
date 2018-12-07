import * as React from 'react';
import './App.scss';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Navbar from './components/Navbar/';
import Main from './routes/Main';
import Login from './routes/Login';
import MyPage from './routes/MyPage';
import Leaderboard from './routes/Leaderboard';
import Admin from './routes/Admin';
import Footer from './components/Footer/';
import NoPage from './routes/NoPage';
import util from './util';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    isAdmin: false
  };

  login = () => {
    this.setState(prevState => ({
      isLoggedIn: true
    }));
  };

  logout = () => {
    this.setState({ isLoggedIn: false });
    this.deleteToken();
  };

  deleteToken = () => {
    window.localStorage.clear();
  };

  _onAdminLogIn() {
    this.setState({ isAdmin: true });
  }

  componentDidMount() {
    this.setState({ isAdmin: util.isAdmin() });

    if (util.isLoggedIn()) {
      this.login();
    } else {
      this.logout();
    }
  }

  render() {
    return (
      <Router>
        <div id="App">
          <Navbar
            isLoggedIn={this.state.isLoggedIn}
            logout={this.logout}
            isAdmin={this.state.isAdmin}
          />
          <div className="site-content">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route
                path="/mypage"
                render={() => <MyPage isLoggedIn={this.state.isLoggedIn} />}
              />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route
                path="/login"
                render={() => <Login login={this.login} />}
              />
              <Route
                path="/admin"
                render={() => (
                  <Admin onAdminLogin={() => this._onAdminLogIn()} />
                )}
              />
              <Route component={NoPage} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
