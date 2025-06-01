"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _SortableContainer = require("../sortable/SortableContainer");
var _generic = require("../utility/generic");
var _lodash = _interopRequireDefault(require("lodash"));
var _constants = require("../common/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var DEFAULT_SORTABLE_DURATION = 300;
var DRAG_LEVEL_GROUP = {
  ONE: 1,
  TWO: 2,
  THREE: 3
};
var initState = {
  isDragging: false,
  // state check move action

  lastDragPosition: 0,
  // the last drag position before triggering scroll event
  currentGroup: null,
  // the current group
  loadMoreIntervalId: -1,
  // time interval id for load element

  startScrollTop: 0,
  // the start scroll top
  topGroup: null,
  // the sortable top group
  bottomGroup: null,
  // the sortable bottom group
  offsetMouseToSidebarTop: 0,
  // the offset mouse to sidebar top
  sortableGroupElms: new Map(),
  // the sortable group dom elements
  dragItemElms: null,
  // the drag item dom elements
  sortableZone: {
    // limit top and bottom can drag drop
    top: 0,
    bottom: 0
  },
  startDragToTopPosition: 0,
  // the start drag to top position
  transformSize: 0,
  // the transform size
  dragContainer: null,
  // the drag container element
  lastScrollTop: 0,
  // the last scroll top
  sortableGroups: new Map(),
  // the sortable groups
  dragLevel: null,
  // the drag level
  swappedGroup: new Map(),
  // the swapped group
  swappedClassName: [],
  // the swapped class name
  lastSwappedIndex: null // the last swapped index
};
var GroupSortable = exports["default"] = /*#__PURE__*/function (_Component) {
  function GroupSortable(props) {
    var _this;
    _classCallCheck(this, GroupSortable);
    _this = _callSuper(this, GroupSortable, [props]);
    /**
     * Get the sortable groups
     * @param {object[]} groups - the list of groups
     * @param {object} currentGroup - the current group
     * @param {number} dragLevel - the drag level
     * @returns {object[]} the list of sortable groups
     */
    _defineProperty(_this, "getSortableGroups", function (groups, currentGroup, dragLevel) {
      var sortableGroups = new Map();
      var topGroup = null; // the top group, it is the first group in the list draggable transform
      var bottomGroup = null; // the bottom group, it is the last group in the list draggable transform

      switch (dragLevel) {
        case DRAG_LEVEL_GROUP.ONE:
          // this is the first level of draggable transform
          groups.forEach(function (group) {
            var _group$task, _currentGroup$task;
            if ((group === null || group === void 0 || (_group$task = group.task) === null || _group$task === void 0 ? void 0 : _group$task.parent_id) === (currentGroup === null || currentGroup === void 0 || (_currentGroup$task = currentGroup.task) === null || _currentGroup$task === void 0 ? void 0 : _currentGroup$task.parent_id)) {
              // find the first level groups
              if (topGroup === null) {
                topGroup = group;
              }
              bottomGroup = group;
              sortableGroups.set(group === null || group === void 0 ? void 0 : group.index, {
                topLinked: group,
                bottomLinked: group
              });
            }
          });
          break;
        case DRAG_LEVEL_GROUP.TWO:
          // this is the second level of draggable transform
          groups.forEach(function (group) {
            // find the second level groups
            var isTask = (group === null || group === void 0 ? void 0 : group.isCustomGroup) && !(group !== null && group !== void 0 && group.isSection) && (group === null || group === void 0 ? void 0 : group.customId) === (currentGroup === null || currentGroup === void 0 ? void 0 : currentGroup.customId);
            if (isTask) {
              var _linkedIndex$topLinke, _linkedIndex$bottomLi;
              if (topGroup === null) {
                topGroup = group;
              }
              // get sortable linked groups
              var linkedGroups = groups.filter(function (groupFilter) {
                var _groupFilter$task, _group$task2, _groupFilter$task2, _group$task3, _group$task4;
                return ((groupFilter === null || groupFilter === void 0 || (_groupFilter$task = groupFilter.task) === null || _groupFilter$task === void 0 ? void 0 : _groupFilter$task.parent_id) === (group === null || group === void 0 || (_group$task2 = group.task) === null || _group$task2 === void 0 ? void 0 : _group$task2.task_id) || (groupFilter === null || groupFilter === void 0 || (_groupFilter$task2 = groupFilter.task) === null || _groupFilter$task2 === void 0 ? void 0 : _groupFilter$task2.task_id) === (group === null || group === void 0 || (_group$task3 = group.task) === null || _group$task3 === void 0 ? void 0 : _group$task3.task_id)) && !_lodash["default"].isNil(group === null || group === void 0 || (_group$task4 = group.task) === null || _group$task4 === void 0 ? void 0 : _group$task4.task_id);
              });
              var linkedIndex = {
                topLinked: linkedGroups[0],
                bottomLinked: linkedGroups[linkedGroups.length - 1]
              };
              // set the linked groups to the sortable groups
              sortableGroups.set(linkedIndex === null || linkedIndex === void 0 || (_linkedIndex$topLinke = linkedIndex.topLinked) === null || _linkedIndex$topLinke === void 0 ? void 0 : _linkedIndex$topLinke.index, linkedIndex);
              sortableGroups.set(linkedIndex === null || linkedIndex === void 0 || (_linkedIndex$bottomLi = linkedIndex.bottomLinked) === null || _linkedIndex$bottomLi === void 0 ? void 0 : _linkedIndex$bottomLi.index, linkedIndex);
              bottomGroup = linkedGroups[linkedGroups.length - 1] || group;
            }
          });
          break;
        case DRAG_LEVEL_GROUP.THREE: // this is the third level of draggable transform
        default:
          groups.forEach(function (group) {
            // find the third level groups
            var isPBTask = group === null || group === void 0 ? void 0 : group.isSection;
            if (isPBTask) {
              var _linkedIndex$topLinke2, _linkedIndex$bottomLi2;
              if (topGroup === null) {
                topGroup = group;
              }
              // get sortable linked groups
              var linkedGroups = groups.filter(function (groupFilter) {
                return (groupFilter === null || groupFilter === void 0 ? void 0 : groupFilter.customId) === (group === null || group === void 0 ? void 0 : group.customId);
              });
              var linkedIndex = {
                topLinked: linkedGroups[0],
                bottomLinked: linkedGroups[linkedGroups.length - 1]
              };
              // set the linked groups to the sortable groups
              sortableGroups.set(linkedIndex === null || linkedIndex === void 0 || (_linkedIndex$topLinke2 = linkedIndex.topLinked) === null || _linkedIndex$topLinke2 === void 0 ? void 0 : _linkedIndex$topLinke2.index, linkedIndex);
              sortableGroups.set(linkedIndex === null || linkedIndex === void 0 || (_linkedIndex$bottomLi2 = linkedIndex.bottomLinked) === null || _linkedIndex$bottomLi2 === void 0 ? void 0 : _linkedIndex$bottomLi2.index, linkedIndex);
              bottomGroup = linkedGroups[linkedGroups.length - 1] || group;
            }
          });
          break;
      }
      return {
        sortableGroups: sortableGroups,
        topGroup: topGroup,
        bottomGroup: bottomGroup
      };
    });
    /**
     * Get the drag level of the current group
     * @param {object} currentGroup - the current group
     * @returns {number} the drag level of the current group
     */
    _defineProperty(_this, "getDragLevel", function (currentGroup) {
      var _currentGroup$task2;
      if (currentGroup !== null && currentGroup !== void 0 && (_currentGroup$task2 = currentGroup.task) !== null && _currentGroup$task2 !== void 0 && _currentGroup$task2.parent_id) {
        return DRAG_LEVEL_GROUP.ONE;
      }
      if (currentGroup !== null && currentGroup !== void 0 && currentGroup.isCustomGroup && !(currentGroup !== null && currentGroup !== void 0 && currentGroup.isSection)) {
        return DRAG_LEVEL_GROUP.TWO;
      }
      return DRAG_LEVEL_GROUP.THREE;
    });
    /**
     * Get the offset of the mouse to the top of the sidebar
     * @param {object} event - the event object
     * @param {number} index - the index of the current group
     * @returns {number} the offset of the mouse to the top of the sidebar
     */
    _defineProperty(_this, "getOffsetMouseToSidebarTop", function (event, dragGroupRect) {
      return event.y - (dragGroupRect === null || dragGroupRect === void 0 ? void 0 : dragGroupRect.top);
    });
    /**
     * This function is invoked before sorting begins, and can be used to cancel sorting before it begins
     * @param {object} event - draggable handle element event
     * @returns {boolean}
     * return if return true then sort event will be cancel else the sort event will be start
     */
    _defineProperty(_this, "shouldCancelStart", function (event) {
      var _event$target, _event$target2;
      var _this$props = _this.props,
        onStartSort = _this$props.onStartSort,
        groups = _this$props.groups;
      var currentGroupIndex = Number(event === null || event === void 0 || (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.getAttribute('data-group-index'));
      var currentGroup = groups === null || groups === void 0 ? void 0 : groups.find(function (groupFind) {
        return (groupFind === null || groupFind === void 0 ? void 0 : groupFind.index) === currentGroupIndex;
      });
      _this.state.currentGroup = currentGroup;
      return (_event$target2 = event.target) !== null && _event$target2 !== void 0 && _event$target2.sortableHandle ? onStartSort(currentGroup) : false;
    });
    /**
     * Get the sortable elements
     * @param {object} currentGroup - the current group
     * @param {object} topGroup - the top group
     * @param {object} bottomGroup - the bottom group
     * @returns {object[]} the list of sortable elements
     */
    _defineProperty(_this, "getSortableElements", function (currentGroup, topGroup, bottomGroup) {
      var _currentGroup$index, _currentGroup$index2, _topGroup$index, _bottomGroup$index;
      var dragGroupElm = document.querySelector('.sortable-group-' + ((_currentGroup$index = currentGroup === null || currentGroup === void 0 ? void 0 : currentGroup.index) !== null && _currentGroup$index !== void 0 ? _currentGroup$index : -1));
      var dragItemElms = document.querySelectorAll('.sortable-item-' + ((_currentGroup$index2 = currentGroup === null || currentGroup === void 0 ? void 0 : currentGroup.index) !== null && _currentGroup$index2 !== void 0 ? _currentGroup$index2 : -1));
      var topGroupElm = document.querySelector('.sortable-group-' + ((_topGroup$index = topGroup === null || topGroup === void 0 ? void 0 : topGroup.index) !== null && _topGroup$index !== void 0 ? _topGroup$index : -1));
      var bottomGroupElm = document.querySelector('.sortable-group-' + ((_bottomGroup$index = bottomGroup === null || bottomGroup === void 0 ? void 0 : bottomGroup.index) !== null && _bottomGroup$index !== void 0 ? _bottomGroup$index : -1));
      return {
        dragGroupElm: dragGroupElm,
        dragItemElms: dragItemElms,
        topGroupElm: topGroupElm,
        bottomGroupElm: bottomGroupElm
      };
    });
    /**
     * Set style for drag container element
     * @param {object[]} dragItemElms - the list item element
     * @param {object} dragContainer - the drag container element
     */
    _defineProperty(_this, "setStyleDragElement", function (dragItemElms, dragContainer) {
      var draggableButton = document.createElement('i');
      draggableButton.className = 'fas fa-arrows-alt drag_button';
      draggableButton.style.cssText = 'font-size: 16x; width: 16px; color: white; position: absolute; top: 50%; left: 15px; transform: translate(-50%, -50%); z-index: 100; pointer-events: none;';
      dragContainer.style.setProperty('z-index', '100', 'important');
      dragContainer.appendChild(draggableButton);
      if (dragItemElms.length <= 0) return;
      dragItemElms.forEach(function (item) {
        item.style.setProperty('z-index', '100', 'important');
      });
    });
    /**
     * function handle set transform for element
     * @param {object[]} elements - the list of elements
     * @param {number} transformSize - the size of transform
     * @param {number} transformDuration - the duration of transform
     */
    _defineProperty(_this, "handleTransformElement", function (elements, transformSize) {
      var transformDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var isReset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      elements.forEach(function (element) {
        if (!element || !element.style) return;
        element.style.setProperty('--translateY', transformSize === 0 ? 'none' : "".concat(transformSize, "px"), 'important');
        element.style.setProperty('--transition-duration', transformDuration === 0 ? 'none' : "".concat(transformDuration, "ms"), 'important');
        if (isReset) {
          element.style.setProperty('z-index', '80', 'important');
        }
      });
    });
    /**
     * Get the transform class name
     * @param {number} dragLevel - the drag level
     * @param {object} groupTransform - the group transform
     * @returns {string} the transform class name
     */
    _defineProperty(_this, "getTransformClassName", function (dragLevel, groupTransform) {
      var ONE = _constants.SORTABLE_LAYER_CLASS_NAME.ONE,
        TWO = _constants.SORTABLE_LAYER_CLASS_NAME.TWO,
        THREE = _constants.SORTABLE_LAYER_CLASS_NAME.THREE;
      var task = groupTransform.task,
        customId = groupTransform.customId;
      var taskId = task === null || task === void 0 ? void 0 : task.task_id;
      var parentId = task === null || task === void 0 ? void 0 : task.parent_id;
      switch (dragLevel) {
        case DRAG_LEVEL_GROUP.ONE:
          return ".".concat(ONE, "--").concat(taskId);
        case DRAG_LEVEL_GROUP.TWO:
          return ".".concat(TWO, "--").concat(parentId || taskId);
        case DRAG_LEVEL_GROUP.THREE:
          return ".".concat(THREE, "--").concat(customId);
        default:
          return '';
      }
    });
    /**
     * Apply the transform to the elements
     * @param {string} transformClassName - the transform class name
     * @param {number} swapSize - the size of swap
     * @param {number} transformDuration - the duration of transform
     */
    _defineProperty(_this, "applyTransformToElements", function (transformClassName, swapSize) {
      var transformDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_SORTABLE_DURATION;
      var isReset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var elements = document.querySelectorAll(transformClassName);
      _this.handleTransformElement(elements, swapSize, transformDuration, isReset);
    });
    /**
     * Clear the styles
     */
    _defineProperty(_this, "resetState", function () {
      _this.state.swappedClassName.forEach(function (transformClassName) {
        _this.applyTransformToElements(transformClassName, 0, 0, true);
      });
      _this.handleTransformElement(_this.state.dragItemElms, 0, 0, true);
      _this.handleTransformElement([_this.state.dragContainer], 0, 0, true);
      _this.setState(initState);
    });
    /**
     * This function is invoked before sorting begins.
     * It can update state before sorting begins
     * @param {object} sort - the sort object
     * @param {object} event - the event object
     */
    _defineProperty(_this, "updateBeforeSortStart", function (sort, event) {});
    /**
     * the function handle event start sort
     * @param {object} sort - the sort object
     * @param {object} event - the event object
     */
    _defineProperty(_this, "onSortStart", function (sort, event) {
      var currentGroup = _this.state.currentGroup;
      var _this$props2 = _this.props,
        scrollContainer = _this$props2.scrollContainer,
        onLogGroupSortable = _this$props2.onLogGroupSortable,
        groups = _this$props2.groups;
      var dragLevel = _this.getDragLevel(currentGroup);

      // get sortable groups by group list, current group and drag level
      var _this$getSortableGrou = _this.getSortableGroups(groups, currentGroup, dragLevel),
        sortableGroups = _this$getSortableGrou.sortableGroups,
        topGroup = _this$getSortableGrou.topGroup,
        bottomGroup = _this$getSortableGrou.bottomGroup;
      var scrollTop = (scrollContainer === null || scrollContainer === void 0 ? void 0 : scrollContainer.scrollTop) || 0;
      var _this$getSortableElem = _this.getSortableElements(currentGroup, topGroup, bottomGroup),
        dragGroupElm = _this$getSortableElem.dragGroupElm,
        dragItemElms = _this$getSortableElem.dragItemElms,
        topGroupElm = _this$getSortableElem.topGroupElm,
        bottomGroupElm = _this$getSortableElem.bottomGroupElm;
      var dragGroupRect = dragGroupElm === null || dragGroupElm === void 0 ? void 0 : dragGroupElm.getBoundingClientRect();
      // get transform size
      var transformSize = dragGroupRect === null || dragGroupRect === void 0 ? void 0 : dragGroupRect.height;
      var offsetMouseToSidebarTop = _this.getOffsetMouseToSidebarTop(event, dragGroupRect);
      var topElmRect = topGroupElm === null || topGroupElm === void 0 ? void 0 : topGroupElm.getBoundingClientRect();
      var bottomElmRect = bottomGroupElm === null || bottomGroupElm === void 0 ? void 0 : bottomGroupElm.getBoundingClientRect();

      // get sortable zone, this is the zone that the draggable group can be moved
      var sortableZone = {
        top: (topElmRect === null || topElmRect === void 0 ? void 0 : topElmRect.top) + offsetMouseToSidebarTop + scrollTop,
        bottom: (bottomElmRect === null || bottomElmRect === void 0 ? void 0 : bottomElmRect.top) + offsetMouseToSidebarTop + scrollTop - (bottomGroup !== null && bottomGroup !== void 0 && bottomGroup.isEmptyGroup ? transformSize : 0)
      };
      var dragContainer = document.querySelector('.drag_container');
      _this.setStyleDragElement(dragItemElms, dragContainer);
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', _this.autoScrollEvent);
      }
      _this.state.loadMoreIntervalId = setInterval(function () {
        _this.props.isDragDrop.current = false;
      }, 2000);
      var startDragToTopPosition = event.y + scrollTop;
      _this.state.lastDragPosition = event.y;
      _this.state.startScrollTop = scrollTop;
      _this.state.startDragToTopPosition = startDragToTopPosition;
      _this.state.dragContainer = dragContainer;
      _this.state.sortableZone = sortableZone;
      _this.state.transformSize = transformSize;
      _this.state.dragItemElms = dragItemElms;
      _this.state.dragGroupElm = dragGroupElm;
      _this.state.transformSize = transformSize;
      _this.state.offsetMouseToSidebarTop = offsetMouseToSidebarTop;
      _this.state.sortableGroups = sortableGroups;
      _this.state.topGroup = topGroup;
      _this.state.bottomGroup = bottomGroup;
      _this.state.dragLevel = dragLevel;
    });
    /**
     * the function handle event move sort
     * @param {object} sort - the sort object
     * @param {object} event - the event object
     */
    _defineProperty(_this, "onSortMove", function (event) {
      var _this$props3 = _this.props,
        isDragDrop = _this$props3.isDragDrop,
        scrollContainer = _this$props3.scrollContainer;
      // stop event load more elements
      isDragDrop.current = true;
      // The element will only be moved within a certain range, which can be within the group containing it or within the drag-drop area.

      var _this$state = _this.state,
        sortableZone = _this$state.sortableZone,
        startDragToTopPosition = _this$state.startDragToTopPosition,
        dragItemElms = _this$state.dragItemElms,
        dragContainer = _this$state.dragContainer,
        startScrollTop = _this$state.startScrollTop;
      var scrollTop = scrollContainer.scrollTop;
      var mouseYToTop = event.y + scrollTop;
      var isOverTop = mouseYToTop < (sortableZone === null || sortableZone === void 0 ? void 0 : sortableZone.top);
      var isOverBottom = mouseYToTop > (sortableZone === null || sortableZone === void 0 ? void 0 : sortableZone.bottom);
      if (!isOverTop && !isOverBottom) {
        event.stopPropagation();
        _this.state.lastDragPosition = event.y;
        _this.state.lastScrollTop = scrollTop;
      }
      var stuckPosition = isOverTop ? sortableZone === null || sortableZone === void 0 ? void 0 : sortableZone.top : sortableZone === null || sortableZone === void 0 ? void 0 : sortableZone.bottom;

      // for element
      var transformElms = dragItemElms !== null && dragItemElms !== void 0 ? dragItemElms : [];
      var newTransformSize = (isOverTop || isOverBottom ? stuckPosition : event.y + scrollTop) - startDragToTopPosition;
      _this.handleTransformElement(transformElms, newTransformSize);

      // for container
      transformElms = [dragContainer];
      newTransformSize = (isOverTop || isOverBottom ? stuckPosition + (startScrollTop - scrollTop) : event.y + startScrollTop) - startDragToTopPosition;
      _this.handleTransformElement(transformElms, newTransformSize);
    });
    /**
     * the function handle event auto scroll
     * @param {object} event - the event object
     */
    _defineProperty(_this, "autoScrollEvent", function (event) {
      var isDragDrop = _this.props.isDragDrop;
      // stop event load more elements
      isDragDrop.current = true;
      // The element will only be moved within a certain range, which can be within the group containing it or within the drag-drop area.
      var _this$state2 = _this.state,
        sortableZone = _this$state2.sortableZone,
        startDragToTopPosition = _this$state2.startDragToTopPosition,
        dragItemElms = _this$state2.dragItemElms,
        dragContainer = _this$state2.dragContainer,
        lastDragPosition = _this$state2.lastDragPosition,
        startScrollTop = _this$state2.startScrollTop;
      var scrollTop = event.target.scrollTop;
      var mouseYToTop = lastDragPosition + scrollTop;
      var isOverTop = mouseYToTop < (sortableZone === null || sortableZone === void 0 ? void 0 : sortableZone.top);
      var isOverBottom = mouseYToTop > (sortableZone === null || sortableZone === void 0 ? void 0 : sortableZone.bottom);
      var stuckPosition = isOverTop ? sortableZone === null || sortableZone === void 0 ? void 0 : sortableZone.top : sortableZone === null || sortableZone === void 0 ? void 0 : sortableZone.bottom;
      // for element
      var transformElms = dragItemElms !== null && dragItemElms !== void 0 ? dragItemElms : [];
      var newTransformSize = (isOverTop || isOverBottom ? stuckPosition : lastDragPosition + scrollTop) - startDragToTopPosition;
      _this.handleTransformElement(transformElms, newTransformSize);

      // for container
      transformElms = [dragContainer];
      newTransformSize = (isOverTop || isOverBottom ? stuckPosition + (startScrollTop - scrollTop) : lastDragPosition + startScrollTop) - startDragToTopPosition;
      _this.handleTransformElement(transformElms, newTransformSize);
    });
    /**
     * the function handle event over sort
     * @param {object} sort - the sort object
     * @param {object} event - the event object
     */
    _defineProperty(_this, "onSortOver", function (sort) {
      var index = sort.index,
        skipNewIndex = sort.newIndex,
        skipOldIndex = sort.oldIndex;
      var _this$state3 = _this.state,
        sortableGroups = _this$state3.sortableGroups,
        dragLevel = _this$state3.dragLevel,
        transformSize = _this$state3.transformSize;

      // loop to ensure elements are swapped in the correct position in case newIndex and oldIndex are not adjacent
      for (var skipIndex = 0; Math.abs(skipIndex) < Math.abs(skipOldIndex - skipNewIndex); skipOldIndex - skipNewIndex > 0 ? skipIndex++ : skipIndex--) {
        var newIndex = skipNewIndex + skipIndex;
        var oldIndex = newIndex + (skipOldIndex - skipNewIndex > 0 ? 1 : -1);
        var nextGroup = sortableGroups.get(newIndex);
        var previousGroup = sortableGroups.get(oldIndex);
        var swapGroup = null;
        var swapSize = 0;
        if (newIndex > index) {
          var _nextGroup$bottomLink, _previousGroup$topLin;
          if (newIndex > oldIndex && newIndex === (nextGroup === null || nextGroup === void 0 || (_nextGroup$bottomLink = nextGroup.bottomLinked) === null || _nextGroup$bottomLink === void 0 ? void 0 : _nextGroup$bottomLink.index)) {
            var _nextGroup$topLinked;
            // down until down
            swapGroup = nextGroup === null || nextGroup === void 0 ? void 0 : nextGroup.bottomLinked;
            swapSize = -transformSize;
            _this.state.swappedGroup.set(nextGroup === null || nextGroup === void 0 || (_nextGroup$topLinked = nextGroup.topLinked) === null || _nextGroup$topLinked === void 0 ? void 0 : _nextGroup$topLinked.index, nextGroup);
          } else if (newIndex < oldIndex && oldIndex === (previousGroup === null || previousGroup === void 0 || (_previousGroup$topLin = previousGroup.topLinked) === null || _previousGroup$topLin === void 0 ? void 0 : _previousGroup$topLin.index)) {
            var _this$state$swappedGr;
            // down but up
            swapGroup = _lodash["default"].cloneDeep((_this$state$swappedGr = _this.state.swappedGroup.get(oldIndex)) === null || _this$state$swappedGr === void 0 ? void 0 : _this$state$swappedGr.topLinked);
            swapSize = 0;
            _this.state.swappedGroup["delete"](oldIndex);
          }
        } else if (newIndex < index) {
          var _nextGroup$topLinked2, _previousGroup$bottom;
          if (newIndex < oldIndex && newIndex === (nextGroup === null || nextGroup === void 0 || (_nextGroup$topLinked2 = nextGroup.topLinked) === null || _nextGroup$topLinked2 === void 0 ? void 0 : _nextGroup$topLinked2.index)) {
            var _nextGroup$bottomLink2;
            swapGroup = nextGroup === null || nextGroup === void 0 ? void 0 : nextGroup.topLinked;
            swapSize = transformSize;
            _this.state.swappedGroup.set(nextGroup === null || nextGroup === void 0 || (_nextGroup$bottomLink2 = nextGroup.bottomLinked) === null || _nextGroup$bottomLink2 === void 0 ? void 0 : _nextGroup$bottomLink2.index, nextGroup);
            // up until up
          } else if (newIndex > oldIndex && oldIndex === (previousGroup === null || previousGroup === void 0 || (_previousGroup$bottom = previousGroup.bottomLinked) === null || _previousGroup$bottom === void 0 ? void 0 : _previousGroup$bottom.index)) {
            var _this$state$swappedGr2;
            // up but down
            swapGroup = _lodash["default"].cloneDeep((_this$state$swappedGr2 = _this.state.swappedGroup.get(oldIndex)) === null || _this$state$swappedGr2 === void 0 ? void 0 : _this$state$swappedGr2.bottomLinked);
            _this.state.swappedGroup["delete"](oldIndex);
            swapSize = 0;
          }
        } else {
          var _this$state$swappedGr3;
          swapGroup = (_this$state$swappedGr3 = _this.state.swappedGroup.get(oldIndex)) === null || _this$state$swappedGr3 === void 0 ? void 0 : _this$state$swappedGr3.bottomLinked;
          _this.state.swappedGroup["delete"](oldIndex);
          swapSize = 0;
        }
        if (swapGroup) {
          var clearTransformClassName = _this.getTransformClassName(dragLevel, swapGroup);
          _this.state.swappedClassName.push(clearTransformClassName);
          _this.state.lastSwappedIndex = skipNewIndex;
          _this.applyTransformToElements(clearTransformClassName, swapSize);
        }
      }
    });
    /**
     * the function handle event end sort
     * @param {*} sort
     */
    _defineProperty(_this, "onSortEnd", function (sort) {
      var _this$state4 = _this.state,
        topGroup = _this$state4.topGroup,
        bottomGroup = _this$state4.bottomGroup,
        loadMoreIntervalId = _this$state4.loadMoreIntervalId,
        lastSwappedIndex = _this$state4.lastSwappedIndex,
        dragLevel = _this$state4.dragLevel;
      var _this$props4 = _this.props,
        sortOrderTaskList = _this$props4.sortOrderTaskList,
        scrollContainer = _this$props4.scrollContainer;
      var newIndex = sort.newIndex,
        oldIndex = sort.oldIndex;
      var isOverTop = newIndex < (topGroup === null || topGroup === void 0 ? void 0 : topGroup.index);
      var isOverBottom = newIndex >= (bottomGroup === null || bottomGroup === void 0 ? void 0 : bottomGroup.index);
      var exactlyNewIndex = newIndex;

      // get exactly new index
      if (isOverTop) {
        // if over top, set the new index to the top group index
        exactlyNewIndex = topGroup === null || topGroup === void 0 ? void 0 : topGroup.index;
      } else if (isOverBottom) {
        // if over bottom, set the new index to the bottom group index
        exactlyNewIndex = (bottomGroup === null || bottomGroup === void 0 ? void 0 : bottomGroup.index) - (bottomGroup !== null && bottomGroup !== void 0 && bottomGroup.isEmptyGroup ? 1 : 0);
      } else if (!isOverTop && !isOverBottom) {
        // if not over top and bottom, set the new index to the last swapped index
        exactlyNewIndex = lastSwappedIndex !== null && lastSwappedIndex !== void 0 ? lastSwappedIndex : oldIndex;
      }
      if (loadMoreIntervalId !== -1) {
        clearInterval(loadMoreIntervalId);
      }
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', _this.autoScrollEvent);
      }
      _this.resetState();
      sortOrderTaskList(sort.oldIndex, exactlyNewIndex, dragLevel);
    });
    /**
     * get container element
     * @returns {JSX.Element}
     */
    _defineProperty(_this, "getContainerElement", function () {
      var dropZoneTask = document.getElementById('dropzone-task');
      return dropZoneTask;
    });
    _this.state = initState;
    return _this;
  }
  _inherits(GroupSortable, _Component);
  return _createClass(GroupSortable, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !((0, _generic.arraysEqual)(nextProps.groups, this.props.groups) &&
      // arraysEqual(nextProps.groupHeights, this.props.groupHeights) &&
      nextProps.groupIdKey === this.props.groupIdKey && nextProps.groupRightTitleKey === this.props.groupRightTitleKey && nextProps.groupTitleKey === this.props.groupTitleKey && nextProps.isRightSidebar === this.props.isRightSidebar && nextState.isDragging === this.state.isDragging && nextProps.isShowDragHandleButton === this.props.isShowDragHandleButton && (0, _generic.deepObjectCompare)(nextProps.sidebarPositionDisplayed, this.props.sidebarPositionDisplayed) && nextProps.viewOption === this.props.viewOption && nextProps.isShowTrackRecord === this.props.isShowTrackRecord);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.scrollContainer) {
        this.props.scrollContainer.removeEventListener('scroll', this.autoScrollEvent);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isDragging = this.state.isDragging;
      var _this$props5 = this.props,
        groups = _this$props5.groups,
        groupHeights = _this$props5.groupHeights,
        isRightSidebar = _this$props5.isRightSidebar,
        groupTitleKey = _this$props5.groupTitleKey,
        groupRightTitleKey = _this$props5.groupRightTitleKey,
        groupIdKey = _this$props5.groupIdKey,
        groupRenderer = _this$props5.groupRenderer,
        isShowDragHandleButton = _this$props5.isShowDragHandleButton,
        openAddGroupForm = _this$props5.openAddGroupForm,
        buttonTooltipRenderer = _this$props5.buttonTooltipRenderer,
        sidebarPositionDisplayed = _this$props5.sidebarPositionDisplayed,
        viewOption = _this$props5.viewOption,
        isShowTrackRecord = _this$props5.isShowTrackRecord;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: isShowDragHandleButton && !isDragging ? 'hover-show-sortable' : ''
      }, /*#__PURE__*/_react["default"].createElement(_SortableContainer.SortableList, {
        useDragHandle: true,
        lockAxis: "y",
        helperClass: "drag_container",
        helperContainer: this.getContainerElement,
        lockToContainerEdges: true,
        lockOffset: ['10px', '10px'],
        shouldCancelStart: this.shouldCancelStart,
        updateBeforeSortStart: this.updateBeforeSortStart,
        onSortStart: this.onSortStart,
        onSortMove: this.onSortMove,
        onSortOver: this.onSortOver,
        onSortEnd: this.onSortEnd,
        groups: groups,
        groupIdKey: groupIdKey,
        groupHeights: groupHeights,
        isRightSidebar: isRightSidebar,
        openAddGroupForm: openAddGroupForm,
        groupRenderer: groupRenderer,
        groupRightTitleKey: groupRightTitleKey,
        groupTitleKey: groupTitleKey,
        buttonTooltipRenderer: buttonTooltipRenderer,
        sidebarPositionDisplayed: sidebarPositionDisplayed,
        viewOption: viewOption,
        isShowTrackRecord: isShowTrackRecord
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var derivedState = {};
      if (!prevState.scrollContainer) {
        if (nextProps.scrollContainer) {
          Object.assign(derivedState, {
            scrollContainer: nextProps.scrollContainer
          });
        }
      }
      return derivedState;
    }
  }]);
}(_react.Component);