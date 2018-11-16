import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { hot } from "react-hot-loader";
import Navbar from "./components/Navbar";
import Main from "./routes/Main";
import Login from "./routes/Login";
import MyPage from "./routes/MyPage";
import Admin from "./routes/Admin";

class App extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/my-page" component={MyPage} />
        </React.Fragment>
      </Router>
    );
  }
}

export default hot(module)(App);
