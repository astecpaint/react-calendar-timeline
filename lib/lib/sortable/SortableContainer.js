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
var SortableListClass = /*#__PURE__*/function (_Component) {
  function SortableListClass(props) {
    _classCallCheck(this, SortableListClass);
    return _callSuper(this, SortableListClass, [props]);
  }
  _inherits(SortableListClass, _Component);
  return _createClass(SortableListClass, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !((0, _generic.arraysEqual)(nextProps.groups, this.props.groups) && (0, _generic.arraysEqual)(nextProps.groupHeights, this.props.groupHeights) && nextProps.groupIdKey === this.props.groupIdKey && nextProps.groupRightTitleKey === this.props.groupRightTitleKey && nextProps.groupTitleKey === this.props.groupTitleKey && nextProps.isRightSidebar === this.props.isRightSidebar);
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
        groupRenderer = _this$props.groupRenderer;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "list-task-draggable",
        id: "dropzone-task",
        style: {
          borderTopWidth: '0px'
        }
      }, groups === null || groups === void 0 ? void 0 : groups.map(function (item, index) {
        return item !== null && item !== void 0 && item.isEmptyGroup ? /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
          key: index
        }, groupRenderer ? /*#__PURE__*/_react["default"].createElement(groupRenderer, {
          group: item,
          isRightSidebar: isRightSidebar
        }) : _get(item, isRightSidebar ? groupRightTitleKey : groupTitleKey)) : /*#__PURE__*/_react["default"].createElement(_SortableItem.SortableItem, {
          keyIndex: item.index,
          key: "item-".concat(item.index),
          index: index,
          group: item,
          disabled: false,
          groupIdKey: groupIdKey,
          groupHeights: groupHeights,
          openAddGroupForm: openAddGroupForm,
          groupRenderer: groupRenderer,
          isRightSidebar: isRightSidebar,
          groupRightTitleKey: groupRightTitleKey,
          groupTitleKey: groupTitleKey
        });
      }));
    }
  }]);
}(_react.Component);
var SortableList = exports.SortableList = (0, _reactSortableHoc.SortableContainer)(SortableListClass);