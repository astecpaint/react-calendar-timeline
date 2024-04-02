"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _PreventClickOnDrag = _interopRequireDefault(require("../interaction/PreventClickOnDrag"));
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
var DEFAULT_HEIGHT_TASK = 32,
  DEFAULT_PADDING_BOTTOM = 8;
var GroupRow = /*#__PURE__*/function (_Component) {
  function GroupRow() {
    var _this;
    _classCallCheck(this, GroupRow);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, GroupRow, [].concat(args));
    _defineProperty(_this, "renderBorderTaskList", function () {
      var _task_list$length;
      var group = _this.props.group;
      var height = group.height,
        task_list = group.task_list,
        expanded = group.expanded,
        isGroupLoading = group.isGroupLoading;
      var numberOfTaskList = (_task_list$length = task_list === null || task_list === void 0 ? void 0 : task_list.length) !== null && _task_list$length !== void 0 ? _task_list$length : 0;
      if (!numberOfTaskList) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
      var topPositionOfTaskFirst = height - (DEFAULT_HEIGHT_TASK * numberOfTaskList + DEFAULT_PADDING_BOTTOM);
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, expanded && !isGroupLoading && task_list.map(function (task, taskIndex) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: "".concat(task === null || task === void 0 ? void 0 : task.task_id, "-").concat(taskIndex),
          style: {
            position: 'absolute',
            top: "".concat(topPositionOfTaskFirst + DEFAULT_HEIGHT_TASK * taskIndex, "px"),
            left: 0,
            width: '100%',
            borderTop: '1px dashed #e3e3e3'
          }
        });
      }));
    });
    return _this;
  }
  _inherits(GroupRow, _Component);
  return _createClass(GroupRow, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        onContextMenu = _this$props.onContextMenu,
        onDoubleClick = _this$props.onDoubleClick,
        isEvenRow = _this$props.isEvenRow,
        style = _this$props.style,
        onClick = _this$props.onClick,
        clickTolerance = _this$props.clickTolerance,
        horizontalLineClassNamesForGroup = _this$props.horizontalLineClassNamesForGroup,
        group = _this$props.group;
      var classNamesForGroup = [];
      if (horizontalLineClassNamesForGroup) {
        classNamesForGroup = horizontalLineClassNamesForGroup(group);
      }
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, !(group !== null && group !== void 0 && group.isHide) || group !== null && group !== void 0 && group.isMerge ? /*#__PURE__*/_react["default"].createElement(_PreventClickOnDrag["default"], {
        clickTolerance: clickTolerance,
        onClick: onClick
      }, /*#__PURE__*/_react["default"].createElement("div", {
        onContextMenu: onContextMenu,
        onDoubleClick: onDoubleClick,
        className: (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') + (classNamesForGroup ? classNamesForGroup.join(' ') : ''),
        style: style
      }, this.renderBorderTaskList())) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null));
    }
  }]);
}(_react.Component);
_defineProperty(GroupRow, "propTypes", {
  onClick: _propTypes["default"].func.isRequired,
  onDoubleClick: _propTypes["default"].func.isRequired,
  onContextMenu: _propTypes["default"].func.isRequired,
  isEvenRow: _propTypes["default"].bool.isRequired,
  style: _propTypes["default"].object.isRequired,
  clickTolerance: _propTypes["default"].number.isRequired,
  group: _propTypes["default"].object.isRequired,
  horizontalLineClassNamesForGroup: _propTypes["default"].func
});
var _default = exports["default"] = GroupRow;