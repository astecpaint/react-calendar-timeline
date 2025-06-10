"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortableItem = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactSortableHoc = require("react-sortable-hoc");
var _generic = require("../utility/generic");
var _Timeline = require("../Timeline");
var _constants = require("../common/constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
var DragHandle = (0, _reactSortableHoc.SortableHandle)(function (_ref) {
  var groupIndex = _ref.groupIndex;
  return /*#__PURE__*/_react["default"].createElement("button", {
    className: "drag-handle-btn",
    "data-group-index": groupIndex
  }, /*#__PURE__*/_react["default"].createElement("i", {
    "class": "icon-drag fas fa-grip-lines-vertical",
    style: {
      pointerEvents: 'none'
    }
  }));
});
var SortableItemClass = /*#__PURE__*/function (_PureComponent) {
  function SortableItemClass(props) {
    var _this;
    _classCallCheck(this, SortableItemClass);
    _this = _callSuper(this, SortableItemClass, [props]);
    _defineProperty(_this, "getSortableClassName", function (group) {
      var ONE = _constants.SORTABLE_LAYER_CLASS_NAME.ONE,
        TWO = _constants.SORTABLE_LAYER_CLASS_NAME.TWO,
        THREE = _constants.SORTABLE_LAYER_CLASS_NAME.THREE;
      var isSection = group.isSection,
        task = group.task,
        customId = group.customId;
      var parentId = task === null || task === void 0 ? void 0 : task.parent_id;
      var taskId = task === null || task === void 0 ? void 0 : task.task_id;
      var sortableClassNames = ['sortable', " sortable-group-".concat(group === null || group === void 0 ? void 0 : group.index)];
      if (parentId && taskId) {
        sortableClassNames.push(" ".concat(ONE, "--").concat(taskId));
      }
      if (!isSection && (parentId || taskId)) {
        sortableClassNames.push(" ".concat(TWO, "--").concat(parentId || taskId));
      }
      if (customId) {
        sortableClassNames.push(" ".concat(THREE, "--").concat(customId));
      }
      return sortableClassNames.join('');
    });
    _this.state = {
      groupChildren: renderGroupContent(_this.props.group, _this.props.groupRenderer, _this.props.isRightSidebar, _this.props.groupRightTitleKey, _this.props.groupTitleKey)
    };
    return _this;
  }
  _inherits(SortableItemClass, _PureComponent);
  return _createClass(SortableItemClass, [{
    key: "render",
    value: function render() {
      var _group$task, _group$task2, _group$task3, _group$task4, _group$task5;
      var _this$props = this.props,
        group = _this$props.group,
        groupIdKey = _this$props.groupIdKey,
        openAddGroupForm = _this$props.openAddGroupForm,
        ButtonTooltip = _this$props.ButtonTooltip,
        currentIndex = _this$props.currentIndex,
        sidebarPositionDisplayed = _this$props.sidebarPositionDisplayed;
      var start = sidebarPositionDisplayed.start,
        end = sidebarPositionDisplayed.end;
      var sortableClassNameStr = this.getSortableClassName(group);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: sortableClassNameStr + ' rct-sidebar-row rct-sidebar-row-' + (group.index % 2 === 0 ? 'even' : 'odd') + (group !== null && group !== void 0 && group.isSection ? ' rct-sidebar-row-full-width' : ''),
        style: {
          height: "".concat((group === null || group === void 0 ? void 0 : group.height) || _Timeline.DEFAULT_HEIGHT_ROW_PROCESS_BASIC, "px"),
          lineHeight: "".concat((group === null || group === void 0 ? void 0 : group.height) || _Timeline.DEFAULT_HEIGHT_ROW_PROCESS_BASIC, "px")
        }
      }, (currentIndex >= start && currentIndex <= end || (group === null || group === void 0 ? void 0 : group.isAddinationForm) || (group === null || group === void 0 ? void 0 : group.isSection) && ((group === null || group === void 0 ? void 0 : group.isCreateSectionGroup) || (group === null || group === void 0 ? void 0 : group.isUpdateSectionGroup))) && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, this.state.groupChildren, !(group !== null && group !== void 0 && group.isEmptyGroup) && !(group !== null && group !== void 0 && (_group$task = group.task) !== null && _group$task !== void 0 && _group$task.isEmptySubGroup) && /*#__PURE__*/_react["default"].createElement("div", {
        className: 'rct-drag-drop' + ((group === null || group === void 0 || (_group$task2 = group.task) === null || _group$task2 === void 0 ? void 0 : _group$task2.parent_id) != null && (group === null || group === void 0 || (_group$task3 = group.task) === null || _group$task3 === void 0 ? void 0 : _group$task3.parent_id) != undefined ? ' -sub' : '') + (group !== null && group !== void 0 && group.isSection ? ' -section' : '')
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: 'rct-siderbar-control-btns' + ((group === null || group === void 0 || (_group$task4 = group.task) === null || _group$task4 === void 0 ? void 0 : _group$task4.parent_id) != null && (group === null || group === void 0 || (_group$task5 = group.task) === null || _group$task5 === void 0 ? void 0 : _group$task5.parent_id) != undefined ? ' -sub' : '')
      }, /*#__PURE__*/_react["default"].createElement(DragHandle, {
        groupIndex: group === null || group === void 0 ? void 0 : group.index
      }), !(group !== null && group !== void 0 && group.isSection) && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, ButtonTooltip ? /*#__PURE__*/_react["default"].createElement(ButtonTooltip, {
        group: group,
        children: /*#__PURE__*/_react["default"].createElement("button", {
          onClick: function onClick() {
            return openAddGroupForm(group);
          }
        }, /*#__PURE__*/_react["default"].createElement("i", {
          className: "fas fa-plus"
        }))
      }) : /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          return openAddGroupForm(group);
        }
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "fas fa-plus"
      })))))));
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
}(_react.PureComponent);
var SortableItem = exports.SortableItem = (0, _reactSortableHoc.SortableElement)(SortableItemClass);