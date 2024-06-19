"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortableList = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactSortableHoc = require("react-sortable-hoc");
var _SortableItem = require("./SortableItem");
var _generic = require("../utility/generic");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var SortableListClass = /*#__PURE__*/function (_Component) {
  function SortableListClass(props) {
    _classCallCheck(this, SortableListClass);
    return _callSuper(this, SortableListClass, [props]);
  }
  _inherits(SortableListClass, _Component);
  return _createClass(SortableListClass, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !((0, _generic.arraysEqual)(nextProps.groups, this.props.groups) &&
      // arraysEqual(nextProps.groupHeights, this.props.groupHeights) &&
      nextProps.groupIdKey === this.props.groupIdKey && nextProps.groupRightTitleKey === this.props.groupRightTitleKey && nextProps.groupTitleKey === this.props.groupTitleKey && nextProps.isRightSidebar === this.props.isRightSidebar && nextProps.sidebarPositionDisplayed === this.props.sidebarPositionDisplayed);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        groups = _this$props.groups,
        groupHeights = _this$props.groupHeights,
        groupIdKey = _this$props.groupIdKey,
        groupRightTitleKey = _this$props.groupRightTitleKey,
        groupTitleKey = _this$props.groupTitleKey,
        isRightSidebar = _this$props.isRightSidebar,
        openAddGroupForm = _this$props.openAddGroupForm,
        groupRenderer = _this$props.groupRenderer,
        buttonTooltipRenderer = _this$props.buttonTooltipRenderer,
        sidebarPositionDisplayed = _this$props.sidebarPositionDisplayed;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "list-task-draggable",
        id: "dropzone-task",
        style: {
          borderTopWidth: '0px'
        }
      }, groups === null || groups === void 0 ? void 0 : groups.map(function (item, index) {
        var _item$task;
        return !!(item !== null && item !== void 0 && item.isEmptyGroup) || !!(item !== null && item !== void 0 && (_item$task = item.task) !== null && _item$task !== void 0 && _item$task.isEmptySubGroup) ? /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
          key: index
        }, groupRenderer ? /*#__PURE__*/_react["default"].createElement(groupRenderer, {
          group: item,
          isRightSidebar: isRightSidebar
        }) : _get(item, isRightSidebar ? groupRightTitleKey : groupTitleKey)) : /*#__PURE__*/_react["default"].createElement(_SortableItem.SortableItem, {
          keyIndex: item.index,
          key: "item-".concat(item.index),
          index: item.index,
          group: item,
          disabled: false,
          groupIdKey: groupIdKey,
          groupHeights: groupHeights,
          openAddGroupForm: openAddGroupForm,
          groupRenderer: groupRenderer,
          isRightSidebar: isRightSidebar,
          groupRightTitleKey: groupRightTitleKey,
          groupTitleKey: groupTitleKey,
          ButtonTooltip: buttonTooltipRenderer,
          currentIndex: index,
          sidebarPositionDisplayed: sidebarPositionDisplayed
        });
      }));
    }
  }]);
}(_react.Component);
var SortableList = exports.SortableList = (0, _reactSortableHoc.SortableContainer)(SortableListClass);