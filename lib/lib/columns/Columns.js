"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _calendar = require("../utility/calendar");
var _TimelineStateContext = require("../timeline/TimelineStateContext");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var passThroughPropTypes = {
  canvasTimeStart: _propTypes["default"].number.isRequired,
  canvasTimeEnd: _propTypes["default"].number.isRequired,
  canvasWidth: _propTypes["default"].number.isRequired,
  lineCount: _propTypes["default"].number.isRequired,
  minUnit: _propTypes["default"].string.isRequired,
  timeSteps: _propTypes["default"].object.isRequired,
  height: _propTypes["default"].number.isRequired,
  verticalLineClassNamesForTime: _propTypes["default"].func
};
var Columns = /*#__PURE__*/function (_Component) {
  function Columns() {
    _classCallCheck(this, Columns);
    return _callSuper(this, Columns, arguments);
  }
  _inherits(Columns, _Component);
  return _createClass(Columns, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !(nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineCount === this.props.lineCount && nextProps.minUnit === this.props.minUnit && nextProps.timeSteps === this.props.timeSteps && nextProps.height === this.props.height && nextProps.verticalLineClassNamesForTime === this.props.verticalLineClassNamesForTime);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        canvasTimeStart = _this$props.canvasTimeStart,
        canvasTimeEnd = _this$props.canvasTimeEnd,
        canvasWidth = _this$props.canvasWidth,
        minUnit = _this$props.minUnit,
        timeSteps = _this$props.timeSteps,
        height = _this$props.height,
        verticalLineClassNamesForTime = _this$props.verticalLineClassNamesForTime,
        getLeftOffsetFromDate = _this$props.getLeftOffsetFromDate;
      var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
      var lines = [];
      (0, _calendar.iterateTimes)(canvasTimeStart, canvasTimeEnd, 'day', timeSteps, function (time, nextTime) {
        var minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit);
        var firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);
        var classNamesForTime = [];
        if (verticalLineClassNamesForTime) {
          classNamesForTime = verticalLineClassNamesForTime(time.unix() * 1000,
          // turn into ms, which is what verticalLineClassNamesForTime expects
          nextTime.unix() * 1000 - 1);
        }

        // TODO: rename or remove class that has reference to vertical-line
        var classNames = 'rct-vl' + (firstOfType ? ' rct-vl-first' : '') + (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute' ? " rct-day-".concat(time.day(), " ") : ' ') + classNamesForTime.join(' ');
        var left = getLeftOffsetFromDate(time.valueOf());
        var right = getLeftOffsetFromDate(nextTime.valueOf());
        lines.push( /*#__PURE__*/_react["default"].createElement("div", {
          key: "line-".concat(time.valueOf()),
          className: classNames,
          style: {
            pointerEvents: 'none',
            top: '0px',
            left: "".concat(left, "px"),
            width: "".concat(right - left, "px"),
            height: "".concat(height, "px")
          }
        }));
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rct-vertical-lines"
      }, lines);
    }
  }]);
}(_react.Component);
_defineProperty(Columns, "propTypes", _objectSpread(_objectSpread({}, passThroughPropTypes), {}, {
  getLeftOffsetFromDate: _propTypes["default"].func.isRequired
}));
var ColumnsWrapper = function ColumnsWrapper(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/_react["default"].createElement(_TimelineStateContext.TimelineStateConsumer, null, function (_ref2) {
    var getLeftOffsetFromDate = _ref2.getLeftOffsetFromDate;
    return /*#__PURE__*/_react["default"].createElement(Columns, _extends({
      getLeftOffsetFromDate: getLeftOffsetFromDate
    }, props));
  });
};
ColumnsWrapper.defaultProps = _objectSpread({}, passThroughPropTypes);
var _default = exports["default"] = ColumnsWrapper;