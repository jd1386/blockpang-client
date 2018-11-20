import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { hot } from "react-hot-loader";
import Navbar from "./components/Navbar/";
import Main from "./routes/Main";
import Login from "./routes/Login";
import MyPage from "./routes/MyPage";
import Admin from "./routes/Admin";
import Footer from "./components/Footer/";
import Game from "./game";

class App extends React.Component {
  state = {
<<<<<<< HEAD
    login: false,
    isPlayingGame: false
=======
    isLoggedIn: false
>>>>>>> dev
  };

  login = () => {
    this.setState({ isLoggedIn: true });
  };

  logout = () => {
    this.setState({ isLoggedIn: false });
    this.deleteToken();
  };

  deleteToken = () => {
    window.localStorage.clear();
  };

  componentDidMount() {
<<<<<<< HEAD
    if (window.localStorage.getItem("userData")) {
      this.logon();
=======
    if (window.localStorage.getItem('userData')) {
      this.login();
>>>>>>> dev
    } else {
      this.logout();
    }
  }

  render() {
    return (
      <Router>
        <div id="App">
          <Navbar isLoggedIn={this.state.isLoggedIn} logout={this.logout} />
          <div className="site-content">
<<<<<<< HEAD
            <Route
              exact
              path="/"
              component={Main}
              isPlayingGame={this.state.isPlayingGame}
            />
            <Route path="/login" render={() => <Login logon={this.logon} />} />
=======
            <Route exact path="/" component={Main} />
            <Route path="/login" render={() => <Login login={this.login} />} />
>>>>>>> dev
            <Route path="/admin" component={Admin} />
            <Route
              path="/mypage"
              render={() => <MyPage isLoggedIn={this.state.isLoggedIn} />}
            />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
