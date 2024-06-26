"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _GroupRow = _interopRequireDefault(require("./GroupRow"));
var _generic = require("../utility/generic");
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
var GroupRows = exports["default"] = /*#__PURE__*/function (_Component) {
  function GroupRows() {
    _classCallCheck(this, GroupRows);
    return _callSuper(this, GroupRows, arguments);
  }
  _inherits(GroupRows, _Component);
  return _createClass(GroupRows, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !(nextProps.resizingItemCalled || nextProps.dragMoveItemCalled || nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineCount === this.props.lineCount && nextProps.groupHeights === this.props.groupHeights && nextProps.groups === this.props.groups && (0, _generic.deepObjectCompare)(this.props.itemPositionDisplayed, nextProps.itemPositionDisplayed) && nextProps.isShowTrackRecord === this.props.isShowTrackRecord);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        canvasWidth = _this$props.canvasWidth,
        lineCount = _this$props.lineCount,
        groupHeights = _this$props.groupHeights,
        onRowClick = _this$props.onRowClick,
        onRowDoubleClick = _this$props.onRowDoubleClick,
        clickTolerance = _this$props.clickTolerance,
        groups = _this$props.groups,
        horizontalLineClassNamesForGroup = _this$props.horizontalLineClassNamesForGroup,
        onRowContextClick = _this$props.onRowContextClick,
        width = _this$props.width,
        canvasTimeStart = _this$props.canvasTimeStart,
        canvasTimeEnd = _this$props.canvasTimeEnd,
        visibleTimeStart = _this$props.visibleTimeStart,
        visibleTimeEnd = _this$props.visibleTimeEnd,
        speedScrollHorizontal = _this$props.speedScrollHorizontal,
        isCreateTaskList = _this$props.isCreateTaskList,
        onCreateTask = _this$props.onCreateTask,
        scrollRef = _this$props.scrollRef,
        getTimeFromRowClickEvent = _this$props.getTimeFromRowClickEvent,
        onDayToTime = _this$props.onDayToTime,
        isShowBgColorGroup = _this$props.isShowBgColorGroup,
        isScheduleScreen = _this$props.isScheduleScreen,
        itemPositionDisplayed = _this$props.itemPositionDisplayed,
        isCreateTrackRecord = _this$props.isCreateTrackRecord;
      var lines = [];
      var newGroups = groups.filter(function (group) {
        return !(group !== null && group !== void 0 && group.isHide) && !(group !== null && group !== void 0 && group.isMerge) || !!(group !== null && group !== void 0 && group.isMerge);
      });
      var newLineCount = newGroups.length;
      var defaultHeight = isScheduleScreen ? _Timeline.DEFAULT_HEIGHT_ROW : _Timeline.DEFAULT_HEIGHT_ROW_PROCESS_BASIC;
      var _loop = function _loop(i) {
        var _newGroups$i;
        lines.push( /*#__PURE__*/_react["default"].createElement(_GroupRow["default"], {
          clickTolerance: clickTolerance,
          onContextMenu: function onContextMenu(evt) {
            return onRowContextClick(evt, i);
          },
          onClick: function onClick(evt) {
            return onRowClick(evt, i);
          },
          onDoubleClick: function onDoubleClick(evt) {
            return onRowDoubleClick(evt, i);
          },
          key: "horizontal-line-".concat(i),
          isEvenRow: i % 2 === 0,
          group: newGroups[i],
          horizontalLineClassNamesForGroup: horizontalLineClassNamesForGroup,
          style: {
            width: "".concat(canvasWidth, "px"),
            height: "".concat(((_newGroups$i = newGroups[i]) === null || _newGroups$i === void 0 ? void 0 : _newGroups$i.height) || defaultHeight, "px"),
            position: 'relative'
          },
          width: width,
          canvasTimeStart: canvasTimeStart,
          canvasTimeEnd: canvasTimeEnd,
          visibleTimeStart: visibleTimeStart,
          visibleTimeEnd: visibleTimeEnd,
          speedScrollHorizontal: speedScrollHorizontal,
          isCreateTaskList: isCreateTaskList,
          onCreateTask: onCreateTask,
          scrollRef: scrollRef,
          getTimeFromRowClickEvent: getTimeFromRowClickEvent,
          onDayToTime: onDayToTime,
          canvasWidth: canvasWidth,
          isShowBgColorGroup: isShowBgColorGroup,
          index: i,
          itemPositionDisplayed: itemPositionDisplayed,
          isScheduleScreen: isScheduleScreen,
          isCreateTrackRecord: isCreateTrackRecord
        }));
      };
      for (var i = 0; i < newLineCount; i++) {
        _loop(i);
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rct-horizontal-lines"
      }, lines);
    }
  }]);
}(_react.Component);
_defineProperty(GroupRows, "propTypes", {
  canvasWidth: _propTypes["default"].number.isRequired,
  lineCount: _propTypes["default"].number.isRequired,
  groupHeights: _propTypes["default"].array.isRequired,
  onRowClick: _propTypes["default"].func.isRequired,
  onRowDoubleClick: _propTypes["default"].func.isRequired,
  clickTolerance: _propTypes["default"].number.isRequired,
  groups: _propTypes["default"].array.isRequired,
  horizontalLineClassNamesForGroup: _propTypes["default"].func,
  onRowContextClick: _propTypes["default"].func.isRequired,
  width: _propTypes["default"].number.isRequired,
  canvasTimeStart: _propTypes["default"].number.isRequired,
  canvasTimeEnd: _propTypes["default"].number.isRequired,
  visibleTimeStart: _propTypes["default"].number.isRequired,
  visibleTimeEnd: _propTypes["default"].number.isRequired,
  speedScrollHorizontal: _propTypes["default"].number.isRequired,
  isCreateTaskList: _propTypes["default"].bool.isRequired,
  onCreateTask: _propTypes["default"].func.isRequired,
  scrollRef: _propTypes["default"].object,
  getTimeFromRowClickEvent: _propTypes["default"].func.isRequired,
  onDayToTime: _propTypes["default"].func.isRequired,
  isShowBgColorGroup: _propTypes["default"].bool.isRequired,
  isScheduleScreen: _propTypes["default"].bool.isRequired,
  itemPositionDisplayed: _propTypes["default"].object.isRequired,
  isCreateTrackRecord: _propTypes["default"].bool.isRequired,
  resizingItemCalled: _propTypes["default"].bool,
  dragMoveItemCalled: _propTypes["default"].bool,
  isShowTrackRecord: _propTypes["default"].bool
});