"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require("semantic-ui-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Admin = function (_Component) {
  _inherits(Admin, _Component);

  function Admin() {
    _classCallCheck(this, Admin);

    return _possibleConstructorReturn(this, (Admin.__proto__ || Object.getPrototypeOf(Admin)).apply(this, arguments));
  }

  _createClass(Admin, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _semanticUiReact.Container,
        null,
        _react2.default.createElement(
          _semanticUiReact.Segment,
          { style: { padding: "8em 0em" }, vertical: true },
          _react2.default.createElement(
            _semanticUiReact.Grid,
            { container: true, stackable: true, verticalAlign: "middle" },
            _react2.default.createElement(
              _semanticUiReact.Grid.Row,
              null,
              _react2.default.createElement(
                _semanticUiReact.Header,
                { as: "h1" },
                "Admin Page"
              )
            ),
            _react2.default.createElement(
              _semanticUiReact.Grid.Row,
              null,
              _react2.default.createElement(
                _semanticUiReact.Grid.Column,
                null,
                _react2.default.createElement(
                  _semanticUiReact.Header,
                  { as: "h3", style: { fontSize: "2em" } },
                  "We Help Companies and Companions"
                ),
                _react2.default.createElement(
                  "p",
                  { style: { fontSize: "1.33em" } },
                  "We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs... through pure data analytics."
                ),
                _react2.default.createElement(
                  _semanticUiReact.Header,
                  { as: "h3", style: { fontSize: "2em" } },
                  "We Make Bananas That Can Dance"
                ),
                _react2.default.createElement(
                  "p",
                  { style: { fontSize: "1.33em" } },
                  "Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered."
                )
              )
            ),
            _react2.default.createElement(
              _semanticUiReact.Grid.Row,
              null,
              _react2.default.createElement(
                _semanticUiReact.Grid.Column,
                { textAlign: "center" },
                _react2.default.createElement(
                  _semanticUiReact.Button,
                  { size: "huge" },
                  "Check Them Out"
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Admin;
}(_react.Component);

exports.default = Admin;