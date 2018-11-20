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
    login: false,
    isPlayingGame: false
  };

  logon = () => {
    this.setState({ login: true });
  };

  logout = () => {
    this.setState({ login: false });
    this.deleteToken();
  };

  deleteToken = () => {
    window.localStorage.clear();
  };

  componentDidMount() {
    if (window.localStorage.getItem("userData")) {
      this.logon();
    } else {
      this.logout();
    }
  }

  render() {
    return (
      <Router>
        <div id="App">
          <Navbar login={this.state.login} logout={this.logout} />
          <div className="site-content">
            <Route
              exact
              path="/"
              component={Main}
              isPlayingGame={this.state.isPlayingGame}
            />
            <Route path="/login" render={() => <Login logon={this.logon} />} />
            <Route path="/admin" component={Admin} />
            <Route path="/mypage" component={MyPage} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
