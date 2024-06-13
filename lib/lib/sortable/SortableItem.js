"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortableItem = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactSortableHoc = require("react-sortable-hoc");
var _generic = require("../utility/generic");
var _Timeline = require("../Timeline");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var renderGroupContent = function renderGroupContent(group, groupRenderer, isRightSidebar, groupRightTitleKey, groupTitleKey) {
  if (groupRenderer) {
    return /*#__PURE__*/_react["default"].createElement(groupRenderer, {
      group: group,
      isRightSidebar: isRightSidebar
    });
  } else {
    return (0, _generic._get)(group, isRightSidebar ? groupRightTitleKey : groupTitleKey);
  }
};
var DragHandle = (0, _reactSortableHoc.SortableHandle)(function () {
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: "drag-handle-btn"
  }, /*#__PURE__*/_react["default"].createElement("i", {
    "class": "icon-drag fas fa-grip-lines-vertical"
  }));
});
var SortableItemClass = /*#__PURE__*/function (_Component) {
  function SortableItemClass(props) {
    var _this;
    _classCallCheck(this, SortableItemClass);
    _this = _callSuper(this, SortableItemClass, [props]);
    _this.state = {
      groupChildren: renderGroupContent(_this.props.group, _this.props.groupRenderer, _this.props.isRightSidebar, _this.props.groupRightTitleKey, _this.props.groupTitleKey)
    };
    return _this;
  }
  _inherits(SortableItemClass, _Component);
  return _createClass(SortableItemClass, [{
    key: "render",
    value: function render() {
      var _group$task, _group$task2, _group$task3, _group$task4;
      var _this$props = this.props,
        group = _this$props.group,
        groupIdKey = _this$props.groupIdKey,
        groupHeights = _this$props.groupHeights,
        openAddGroupForm = _this$props.openAddGroupForm,
        index = _this$props.index,
        ButtonTooltip = _this$props.ButtonTooltip,
        currentIndex = _this$props.currentIndex,
        sidebarPositionDisplayed = _this$props.sidebarPositionDisplayed;
      var start = sidebarPositionDisplayed.start,
        end = sidebarPositionDisplayed.end;
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: (0, _generic._get)(group, groupIdKey),
        className: 'rct-sidebar-row rct-sidebar-row-' + (group.index % 2 === 0 ? 'even' : 'odd'),
        style: {
          height: "".concat((group === null || group === void 0 ? void 0 : group.height) || _Timeline.DEFAULT_HEIGHT_ROW_PROCESS_BASIC, "px"),
          lineHeight: "".concat((group === null || group === void 0 ? void 0 : group.height) || _Timeline.DEFAULT_HEIGHT_ROW_PROCESS_BASIC, "px")
        }
      }, currentIndex >= start && currentIndex <= end && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, this.state.groupChildren, /*#__PURE__*/_react["default"].createElement("div", {
        className: 'rct-drag-drop' + ((group === null || group === void 0 || (_group$task = group.task) === null || _group$task === void 0 ? void 0 : _group$task.parent_id) != null && (group === null || group === void 0 || (_group$task2 = group.task) === null || _group$task2 === void 0 ? void 0 : _group$task2.parent_id) != undefined ? ' -sub' : '')
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: 'rct-siderbar-control-btns' + ((group === null || group === void 0 || (_group$task3 = group.task) === null || _group$task3 === void 0 ? void 0 : _group$task3.parent_id) != null && (group === null || group === void 0 || (_group$task4 = group.task) === null || _group$task4 === void 0 ? void 0 : _group$task4.parent_id) != undefined ? ' -sub' : '')
      }, /*#__PURE__*/_react["default"].createElement(DragHandle, null), ButtonTooltip ? /*#__PURE__*/_react["default"].createElement(ButtonTooltip, {
        group: group,
        children: /*#__PURE__*/_react["default"].createElement("button", {
          onClick: function onClick() {
            return openAddGroupForm((0, _generic._get)(group, groupIdKey), group);
          }
        }, /*#__PURE__*/_react["default"].createElement("i", {
          className: "fas fa-plus"
        }))
      }) : /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          return openAddGroupForm((0, _generic._get)(group, groupIdKey), group);
        }
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "fas fa-plus"
      }))))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var derivedState = {};
      if (!(0, _generic.deepObjectCompare)(nextProps.group, prevState.group)) {
        Object.assign(derivedState, {
          groupChildren: renderGroupContent(nextProps.group, nextProps.groupRenderer, nextProps.isRightSidebar, nextProps.groupRightTitleKey, nextProps.groupTitleKey)
        });
      }
      return derivedState;
    }
  }]);
}(_react.Component);
var SortableItem = exports.SortableItem = (0, _reactSortableHoc.SortableElement)(SortableItemClass);