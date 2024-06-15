"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _generic = require("../utility/generic");
var _GroupSortable = _interopRequireDefault(require("./GroupSortable"));
var _GroupContent = _interopRequireDefault(require("./GroupContent"));
var _Timeline = require("../Timeline");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var Sidebar = exports["default"] = /*#__PURE__*/function (_Component) {
  function Sidebar() {
    _classCallCheck(this, Sidebar);
    return _callSuper(this, Sidebar, arguments);
  }
  _inherits(Sidebar, _Component);
  return _createClass(Sidebar, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !(nextProps.keys === this.props.keys && nextProps.width === this.props.width && nextProps.height === this.props.height && (0, _generic.arraysEqual)(nextProps.groups, this.props.groups) &&
      // arraysEqual(nextProps.groupHeights, this.props.groupHeights) &&
      nextProps.isShowInforGemba === this.props.isShowInforGemba && nextProps.isShowDragHandleButton === this.props.isShowDragHandleButton && nextProps.isScheduleScreen === this.props.isScheduleScreen && (0, _generic.deepObjectCompare)(this.props.sidebarPositionDisplayed, nextProps.sidebarPositionDisplayed));
    }
  }, {
    key: "renderGroupContent",
    value: function renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey) {
      if (this.props.groupRenderer) {
        return /*#__PURE__*/_react["default"].createElement(this.props.groupRenderer, {
          group: group,
          isRightSidebar: isRightSidebar
        });
      } else {
        return (0, _generic._get)(group, isRightSidebar ? groupRightTitleKey : groupTitleKey);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _groups$filter;
      var _this$props = this.props,
        width = _this$props.width,
        groupHeights = _this$props.groupHeights,
        height = _this$props.height,
        isRightSidebar = _this$props.isRightSidebar,
        isShowDragHandleButton = _this$props.isShowDragHandleButton,
        sortOrderTaskList = _this$props.sortOrderTaskList,
        canSortableGroups = _this$props.canSortableGroups,
        groupRenderer = _this$props.groupRenderer,
        scrollContainer = _this$props.scrollContainer,
        buttonTooltipRenderer = _this$props.buttonTooltipRenderer,
        groups = _this$props.groups,
        isScheduleScreen = _this$props.isScheduleScreen,
        sidebarPositionDisplayed = _this$props.sidebarPositionDisplayed;
      var _this$props$keys = this.props.keys,
        groupIdKey = _this$props$keys.groupIdKey,
        groupTitleKey = _this$props$keys.groupTitleKey,
        groupRightTitleKey = _this$props$keys.groupRightTitleKey;
      var sidebarStyle = {
        width: "".concat(width, "px"),
        height: "".concat(height, "px")
      };
      var groupsStyle = {
        width: "".concat(width, "px")
      };
      var start = sidebarPositionDisplayed.start,
        end = sidebarPositionDisplayed.end;
      var newGroupDisplayed = groups.filter(function (group) {
        return !(group !== null && group !== void 0 && group.isHide) && !(group !== null && group !== void 0 && group.isMerge) || !!(group !== null && group !== void 0 && group.isMerge);
      });
      var groupLines = newGroupDisplayed.map(function (group, index) {
        var defaultHeight = isScheduleScreen ? _Timeline.DEFAULT_HEIGHT_ROW : _Timeline.DEFAULT_HEIGHT_ROW_PROCESS_BASIC;
        var elementStyle = {
          height: "".concat((group === null || group === void 0 ? void 0 : group.height) || defaultHeight, "px"),
          lineHeight: "".concat((group === null || group === void 0 ? void 0 : group.height) || defaultHeight, "px")
        };
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: (0, _generic._get)(group, groupIdKey),
          className: "rct-sidebar-row rct-sidebar-row-".concat(index % 2 === 0 ? 'even' : 'odd', " ").concat(!!(group !== null && group !== void 0 && group.isMerge) && !!(group !== null && group !== void 0 && group.isCustomGroup) ? 'rct-sidebar-row-full-width' : ''),
          style: elementStyle
        }, index >= start && index <= end && /*#__PURE__*/_react["default"].createElement(_GroupContent["default"], {
          group: group,
          isRightSidebar: isRightSidebar,
          groupTitleKey: groupTitleKey,
          groupRightTitleKey: groupRightTitleKey,
          groupRenderer: groupRenderer
        }));
      });
      var newGroups = (_groups$filter = groups.filter(function (group) {
        return !(group !== null && group !== void 0 && group.isHide) && !(group !== null && group !== void 0 && group.isMerge) || (group === null || group === void 0 ? void 0 : group.isMerge) || (group === null || group === void 0 ? void 0 : group.isEmptyGroup);
      })) !== null && _groups$filter !== void 0 ? _groups$filter : [];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: 'rct-sidebar' + (isRightSidebar ? ' rct-sidebar-right' : ''),
        style: sidebarStyle
      }, canSortableGroups ? /*#__PURE__*/_react["default"].createElement("div", {
        style: groupsStyle
      }, /*#__PURE__*/_react["default"].createElement(_GroupSortable["default"], {
        groups: newGroups,
        groupHeights: groupHeights,
        isRightSidebar: isRightSidebar,
        groupTitleKey: groupTitleKey,
        groupRightTitleKey: groupRightTitleKey,
        groupIdKey: groupIdKey,
        groupRenderer: this.props.groupRenderer,
        sortOrderTaskList: sortOrderTaskList,
        isShowDragHandleButton: isShowDragHandleButton,
        openAddGroupForm: this.props.openAddGroupForm,
        scrollContainer: scrollContainer,
        buttonTooltipRenderer: buttonTooltipRenderer,
        sidebarPositionDisplayed: sidebarPositionDisplayed
      })) : /*#__PURE__*/_react["default"].createElement("div", {
        style: groupsStyle
      }, groupLines));
    }
  }]);
}(_react.Component);
_defineProperty(Sidebar, "propTypes", {
  groups: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]).isRequired,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  groupHeights: _propTypes["default"].array.isRequired,
  keys: _propTypes["default"].object.isRequired,
  groupRenderer: _propTypes["default"].func,
  isRightSidebar: _propTypes["default"].bool,
  isShowDragHandleButton: _propTypes["default"].bool,
  sortOrderTaskList: _propTypes["default"].func,
  openAddGroupForm: _propTypes["default"].func,
  scrollContainer: _propTypes["default"].node,
  buttonTooltipRenderer: _propTypes["default"].node,
  isScheduleScreen: _propTypes["default"].bool.isRequired,
  sidebarPositionDisplayed: _propTypes["default"].object.isRequired
});