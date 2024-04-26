"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _events = require("../utility/events");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PreventClickOnDrag = /*#__PURE__*/function (_Component) {
  function PreventClickOnDrag() {
    var _this;
    _classCallCheck(this, PreventClickOnDrag);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, PreventClickOnDrag, [].concat(args));
    _defineProperty(_this, "handleMouseDown", function (evt) {
      _this.originClickX = evt.clientX;
    });
    _defineProperty(_this, "handleMouseUp", function (evt) {
      if (Math.abs(_this.originClickX - evt.clientX) > _this.props.clickTolerance) {
        _this.cancelClick = true;
      }
    });
    _defineProperty(_this, "handleClick", function (evt) {
      if (!_this.cancelClick) {
        _this.props.onClick(evt);
      }
      _this.cancelClick = false;
      _this.originClickX = null;
    });
    return _this;
  }
  _inherits(PreventClickOnDrag, _Component);
  return _createClass(PreventClickOnDrag, [{
    key: "render",
    value: function render() {
      var _this$props, _this$props2, _this$props3;
      var childElement = _react["default"].Children.only(this.props.children);
      return /*#__PURE__*/_react["default"].cloneElement(childElement, {
        onMouseDown: (0, _events.composeEvents)(this.handleMouseDown, (_this$props = this.props) === null || _this$props === void 0 ? void 0 : _this$props.onRowMouseDown),
        onMouseUp: (0, _events.composeEvents)(this.handleMouseUp, (_this$props2 = this.props) === null || _this$props2 === void 0 ? void 0 : _this$props2.onRowMouseUp),
        onMouseMove: (_this$props3 = this.props) === null || _this$props3 === void 0 ? void 0 : _this$props3.onRowMouseMove,
        onClick: this.handleClick
      });
    }
  }]);
}(_react.Component);
_defineProperty(PreventClickOnDrag, "propTypes", {
  children: _propTypes["default"].element.isRequired,
  onClick: _propTypes["default"].func.isRequired,
  clickTolerance: _propTypes["default"].number.isRequired,
  onRowMouseDown: _propTypes["default"].func,
  onRowMouseUp: _propTypes["default"].func,
  onRowMouseMove: _propTypes["default"].func
});
var _default = exports["default"] = PreventClickOnDrag;