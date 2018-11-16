"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var React = _interopRequireWildcard(_react);

require("./App.css");

var _reactRouterDom = require("react-router-dom");

var _reactHotLoader = require("react-hot-loader");

var _Navbar = require("./components/Navbar");

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Main = require("./routes/Main");

var _Main2 = _interopRequireDefault(_Main);

var _Login = require("./routes/Login");

var _Login2 = _interopRequireDefault(_Login);

var _MyPage = require("./routes/MyPage");

var _MyPage2 = _interopRequireDefault(_MyPage);

var _Admin = require("./routes/Admin");

var _Admin2 = _interopRequireDefault(_Admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        React.createElement(
          React.Fragment,
          null,
          React.createElement(_Navbar2.default, null),
          React.createElement(_reactRouterDom.Route, { exact: true, path: "/", component: _Main2.default }),
          React.createElement(_reactRouterDom.Route, { path: "/login", component: _Login2.default }),
          React.createElement(_reactRouterDom.Route, { path: "/admin", component: _Admin2.default }),
          React.createElement(_reactRouterDom.Route, { path: "/my-page", component: _MyPage2.default })
        )
      );
    }
  }]);

  return App;
}(React.Component);

exports.default = (0, _reactHotLoader.hot)(module)(App);