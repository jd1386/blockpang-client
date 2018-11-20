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

class App extends React.Component {
  state = {
    isLoggedIn: false
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
    if (window.localStorage.getItem("userData")) {
      this.login();
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
            <Route exact path="/" component={Main} />
            <Route path="/login" render={() => <Login login={this.login} />} />
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
