"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _SortableContainer = require("../sortable/SortableContainer");
var _generic = require("../utility/generic");
var _reactSortableHoc = require("react-sortable-hoc");
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
var DEFAULT_SORTABLE_DURATION = 300;
var GroupSortable = exports["default"] = /*#__PURE__*/function (_Component) {
  function GroupSortable(props) {
    var _this;
    _classCallCheck(this, GroupSortable);
    _this = _callSuper(this, GroupSortable, [props]);
    /**
     * the function handle event start sort
     * @param {*} sort
     * @param {*} event
     */
    _defineProperty(_this, "onSortStart", function (sort, event) {
      var scrollContainer = _this.state.scrollContainer;
      var dragIndex = sort.index;
      var displacementSize = event.y + scrollContainer.scrollTop;
      var dragItemElements = document.querySelectorAll('.rct_draggable_' + dragIndex);
      dragItemElements.forEach(function (element) {
        element.style.setProperty('z-index', '81', 'important');
      });
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', _this.autoScrollEvent);
      }
      var dragableItem = document.querySelector('.draggable_task_item');
      var dragableButton = document.createElement('i');
      dragableButton.className = 'fas fa-arrows-alt draggable_button';
      dragableButton.style.cssText = 'font-size: 24px; width: 24px; color: white; position: absolute; top: 40px; left: 18px; transform: translate(-50%, -50%); z-index: 83;';
      dragableItem.appendChild(dragableButton);
      _this.setState({
        isDraging: true,
        dragIndex: dragIndex,
        displacementSize: displacementSize,
        dragItemElements: dragItemElements
      });
    });
    /**
     * the function handle event move sort
     * @param {*} sort
     * @param {*} event
     */
    _defineProperty(_this, "onSortMove", function (event) {
      var _this$state = _this.state,
        scrollContainer = _this$state.scrollContainer,
        dragItemElements = _this$state.dragItemElements,
        displacementSize = _this$state.displacementSize;
      event.stopPropagation();
      var newDisplacementSize = event.y - displacementSize + scrollContainer.scrollTop;
      var lastDragPosition = event.y - displacementSize;
      _this.transformElements(dragItemElements, newDisplacementSize, 0);
      _this.setState({
        lastDragPosition: lastDragPosition
      });
    });
    /**
     * the function handle event over sort
     * @param {*} sort
     * @param {*} event
     */
    _defineProperty(_this, "onSortOver", function (sort, event) {
      var groupHeights = _this.props.groupHeights;
      var rctItemElements = _this.state.rctItemElements;
      var newIndexKey = '.rct_draggable_' + sort.newIndex;
      var oldIndexKey = '.rct_draggable_' + sort.oldIndex;
      if (!rctItemElements.has(newIndexKey)) {
        rctItemElements.set(newIndexKey, document.querySelectorAll(newIndexKey));
      }
      if (sort.newIndex > sort.index) {
        if (sort.newIndex > sort.oldIndex) {
          _this.transformElements(rctItemElements.get(newIndexKey), -groupHeights[sort.index], DEFAULT_SORTABLE_DURATION);
        } else {
          _this.transformElements(rctItemElements.get(oldIndexKey), 0, DEFAULT_SORTABLE_DURATION);
        }
      } else if (sort.newIndex < sort.index) {
        if (sort.newIndex < sort.oldIndex) {
          _this.transformElements(rctItemElements.get(newIndexKey), groupHeights[sort.index], DEFAULT_SORTABLE_DURATION);
        } else {
          _this.transformElements(rctItemElements.get(oldIndexKey), 0, DEFAULT_SORTABLE_DURATION);
        }
      } else {
        _this.transformElements(rctItemElements.get(oldIndexKey), 0, DEFAULT_SORTABLE_DURATION);
      }
    });
    /**
     * the function handle event auto scroll
     * @param {*} sort
     * @param {*} event
     */
    _defineProperty(_this, "autoScrollEvent", function (event) {
      var _this$state2 = _this.state,
        dragItemElements = _this$state2.dragItemElements,
        lastDragPosition = _this$state2.lastDragPosition;
      var lastDragPositionScroll = lastDragPosition + event.target.scrollTop;
      _this.transformElements(dragItemElements, lastDragPositionScroll, 0);
    });
    /**
     * the function handle event end sort
     * @param {*} sort
     */
    _defineProperty(_this, "onSortEnd", function (sort) {
      var _this$state3 = _this.state,
        scrollContainer = _this$state3.scrollContainer,
        rctItemElements = _this$state3.rctItemElements,
        dragItemElements = _this$state3.dragItemElements;
      var _this$props = _this.props,
        groups = _this$props.groups,
        sortOrderTaskList = _this$props.sortOrderTaskList;
      rctItemElements.forEach(function (elements) {
        _this.clearTransformElements(elements);
      });
      rctItemElements.clear();
      _this.clearTransformElements(dragItemElements);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', _this.autoScrollEvent);
      }
      if (sort.oldIndex !== sort.newIndex) {
        var groupFilter = groups.filter(function (group) {
          var _group$task;
          return !(group !== null && group !== void 0 && group.isEmptyGroup) && !(group !== null && group !== void 0 && (_group$task = group.task) !== null && _group$task !== void 0 && _group$task.isEmptySubGroup);
        });
        var newList = (0, _reactSortableHoc.arrayMove)(groupFilter, sort.oldIndex, sort.newIndex);
        var result = newList.map(function (group, index) {
          group.task['sort_order'] = index;
          return group;
        });
        sortOrderTaskList(result);
      }
      _this.setState({
        isDraging: false,
        // state check move action

        dragControlElement: null,
        dragItemElements: [],
        displacementSize: 0,
        lastDragPosition: 0,
        dragIndex: -1
      });
    });
    _defineProperty(_this, "transformElements", function (elements, transformSize, delayDuration) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.transitionDuration = "".concat(delayDuration, "ms");
        elements[i].style.transform = 'translate(0px, ' + transformSize + 'px)';
      }
    });
    _defineProperty(_this, "clearTransformElements", function (elements) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.transitionDuration = "0ms";
        elements[i].style.transform = 'none'; // fix bug ticket GP-15699. translate function will create a new viewport
        elements[i].style.setProperty('z-index', '80', 'important');
      }
    });
    _defineProperty(_this, "getContainerElement", function () {
      var dropZoneTask = document.getElementById('dropzone-task');
      return dropZoneTask;
    });
    _this.state = {
      isDraging: false,
      // state check move action
      scrollContainer: null,
      // state scroll container element

      dragControlElement: null,
      dragItemElements: [],
      displacementSize: 0,
      lastDragPosition: 0,
      dragIndex: -1,
      rctItemElements: new Map()
    };
    return _this;
  }
  _inherits(GroupSortable, _Component);
  return _createClass(GroupSortable, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !((0, _generic.arraysEqual)(nextProps.groups, this.props.groups) && (0, _generic.arraysEqual)(nextProps.groupHeights, this.props.groupHeights) && nextProps.groupIdKey === this.props.groupIdKey && nextProps.groupRightTitleKey === this.props.groupRightTitleKey && nextProps.groupTitleKey === this.props.groupTitleKey && nextProps.isRightSidebar === this.props.isRightSidebar && nextState.isDraging === this.state.isDraging && nextProps.isShowDragHandleButton === this.props.isShowDragHandleButton);
    }
  }, {
    key: "render",
    value: function render() {
      var isDraging = this.state.isDraging;
      var _this$props2 = this.props,
        groups = _this$props2.groups,
        groupHeights = _this$props2.groupHeights,
        isRightSidebar = _this$props2.isRightSidebar,
        groupTitleKey = _this$props2.groupTitleKey,
        groupRightTitleKey = _this$props2.groupRightTitleKey,
        groupIdKey = _this$props2.groupIdKey,
        groupRenderer = _this$props2.groupRenderer,
        isShowDragHandleButton = _this$props2.isShowDragHandleButton,
        openAddGroupForm = _this$props2.openAddGroupForm;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: isShowDragHandleButton && !isDraging ? 'hover-show-sortable' : ''
      }, /*#__PURE__*/_react["default"].createElement(_SortableContainer.SortableList, {
        useDragHandle: true,
        lockAxis: "y",
        helperClass: "draggable_task_item",
        helperContainer: this.getContainerElement,
        lockToContainerEdges: true,
        lockOffset: ['2px', '10px'],
        onSortStart: this.onSortStart,
        onSortMove: this.onSortMove,
        onSortOver: this.onSortOver,
        onSortEnd: this.onSortEnd,
        groups: groups,
        groupIdKey: groupIdKey,
        groupHeights: groupHeights,
        isRightSidebar: isRightSidebar,
        isDraging: isDraging,
        openAddGroupForm: openAddGroupForm,
        groupRenderer: groupRenderer,
        groupRightTitleKey: groupRightTitleKey,
        groupTitleKey: groupTitleKey
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var derivedState = {};
      if (!prevState.scrollContainer) {
        var scrollContainerElement = document.getElementById((nextProps === null || nextProps === void 0 ? void 0 : nextProps.scrollContainerId) || 'process-basic-component');
        if (scrollContainerElement) {
          Object.assign(derivedState, {
            scrollContainer: scrollContainerElement
          });
        }
      }
      return derivedState;
    }
  }]);
}(_react.Component);