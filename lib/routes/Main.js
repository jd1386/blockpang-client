"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Home =
/*#__PURE__*/
function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, _getPrototypeOf(Home).apply(this, arguments));
  }

  _createClass(Home, [{
    key: "mainComponent",
    value: function mainComponent() {
      return _react.default.createElement(_semanticUiReact.Container, null, _react.default.createElement(_semanticUiReact.Segment, {
        style: {
          padding: '8em 0em'
        },
        vertical: true
      }, _react.default.createElement(_semanticUiReact.Grid, {
        container: true,
        stackable: true,
        verticalAlign: "middle"
      }, _react.default.createElement(_semanticUiReact.Grid.Row, null, _react.default.createElement(_semanticUiReact.Header, {
        as: "h1"
      }, "Main")), _react.default.createElement(_semanticUiReact.Grid.Row, null, _react.default.createElement(_semanticUiReact.Grid.Column, null, _react.default.createElement(_semanticUiReact.Header, {
        as: "h3",
        style: {
          fontSize: '2em'
        }
      }, "We Help Companies and Companions"), _react.default.createElement("p", {
        style: {
          fontSize: '1.33em'
        }
      }, "We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs... through pure data analytics."), _react.default.createElement(_semanticUiReact.Header, {
        as: "h3",
        style: {
          fontSize: '2em'
        }
      }, "We Make Bananas That Can Dance"), _react.default.createElement("p", {
        style: {
          fontSize: '1.33em'
        }
      }, "Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered."))), _react.default.createElement(_semanticUiReact.Grid.Row, null, _react.default.createElement(_semanticUiReact.Grid.Column, {
        textAlign: "center"
      }, _react.default.createElement(_semanticUiReact.Button, {
        size: "huge"
      }, "Check Them Out"))))));
    }
  }, {
    key: "render",
    value: function render() {
      return this.mainComponent();
    }
  }]);

  return Home;
}(_react.Component);

var _default = Home;
exports.default = _default;