import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Navbar from './components/Navbar/';
import Main from './routes/Main';
import Login from './routes/Login';
import MyPage from './routes/MyPage';
import Admin from './routes/Admin';
import Footer from './components/Footer/';

class App extends React.Component {
  state = {
    isLogin: false
  };

  login = () => {
    this.setState({ isLogin: true });
  };

  logout = () => {
    this.setState({ isLogin: false });
    this.deleteToken();
  };

  deleteToken = () => {
    window.localStorage.clear();
  };

  componentDidMount() {
    if (window.localStorage.getItem('userData')) {
      this.login();
    } else {
      this.logout();
    }
  }

  render() {
    return (
      <Router>
        <div id="App">
          <Navbar isLogin={this.state.isLogin} logout={this.logout} />
          <div className="site-content">
            <Route exact path="/" component={Main} />
            <Route path="/login" render={() => <Login login={this.login} />} />
            <Route path="/admin" component={Admin} />
            <Route
              path="/mypage"
              render={() => <MyPage isLogin={this.state.isLogin} />}
            />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
