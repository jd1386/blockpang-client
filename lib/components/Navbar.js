"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _semanticUiReact = require("semantic-ui-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = function (_Component) {
  _inherits(Navbar, _Component);

  function Navbar() {
    _classCallCheck(this, Navbar);

    return _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).apply(this, arguments));
  }

  _createClass(Navbar, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _semanticUiReact.Menu,
        { fixed: "top", inverted: true },
        _react2.default.createElement(
          _semanticUiReact.Container,
          null,
          _react2.default.createElement(
            _semanticUiReact.Menu.Item,
            { as: _reactRouterDom.Link, to: "/", header: true },
            _react2.default.createElement(_semanticUiReact.Image, {
              size: "mini",
              src: "favicon.ico",
              style: { marginRight: "1.5em" }
            }),
            "\uBE14\uB85D\uD321"
          ),
          _react2.default.createElement(
            _semanticUiReact.Menu.Item,
            { as: _reactRouterDom.Link, to: "/my-page" },
            "My Page"
          ),
          _react2.default.createElement(
            _semanticUiReact.Menu.Item,
            { as: _reactRouterDom.Link, to: "/admin" },
            "Admin"
          ),
          _react2.default.createElement(
            _semanticUiReact.Menu.Item,
            { position: "right" },
            _react2.default.createElement(
              _semanticUiReact.Button,
              { as: _reactRouterDom.Link, to: "/login", inverted: true },
              "Log in"
            ),
            _react2.default.createElement(
              _semanticUiReact.Button,
              {
                as: _reactRouterDom.Link,
                to: "/login",
                primary: true,
                style: { marginLeft: "0.5em" }
              },
              "Sign up"
            )
          )
        )
      );
    }
  }]);

  return Navbar;
}(_react.Component);

exports.default = Navbar;