"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _SortableContainer = require("../sortable/SortableContainer");
var _generic = require("../utility/generic");
var _reactSortableHoc = require("react-sortable-hoc");
var _Timeline = require("../Timeline");
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
var GroupSortable = exports["default"] = /*#__PURE__*/function (_Component) {
  function GroupSortable(props) {
    var _this;
    _classCallCheck(this, GroupSortable);
    _this = _callSuper(this, GroupSortable, [props]);
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
     * This function is invoked before sorting begins.
     * It can update state before sorting begins
     * @param {*} sort
     * @param {*} event
     */
    _defineProperty(_this, "updateBeforeSortStart", function (sort, event) {
      var _currentGroup$task, _draggableGroup$getBo;
      var sortParentId = null,
        groupSortableConstraints = {
          top: 0,
          bottom: 0
        },
        firstDragScrollTop = 0;
      var _this$state = _this.state,
        scrollContainer = _this$state.scrollContainer,
        currentGroup = _this$state.currentGroup;
      var setCurrentGroupMove = _this.props.setCurrentGroupMove;
      setCurrentGroupMove(currentGroup);
      var distanceScrollToTop = (scrollContainer === null || scrollContainer === void 0 ? void 0 : scrollContainer.scrollTop) || 0;
      var parentId = currentGroup === null || currentGroup === void 0 || (_currentGroup$task = currentGroup.task) === null || _currentGroup$task === void 0 ? void 0 : _currentGroup$task.parent_id;
      var heightButtonSidebar = 60; // Height of sidebar containing add button below

      var draggableGroup = document.querySelector('.-sort-index-' + sort.index);
      var offsetMouseToSidebarTop = event.y - ((draggableGroup === null || draggableGroup === void 0 || (_draggableGroup$getBo = draggableGroup.getBoundingClientRect()) === null || _draggableGroup$getBo === void 0 ? void 0 : _draggableGroup$getBo.top) || 0); // The offset from the mouse pointer to the sidebar will be drag dropped.

      if (parentId) {
        var subGroups = document.querySelectorAll('.sidebar-grouped-by-' + parentId);
        var subGroupsSize = subGroups === null || subGroups === void 0 ? void 0 : subGroups.length;
        if (subGroupsSize) {
          var _subGroups$;
          groupSortableConstraints.top = (((_subGroups$ = subGroups[1]) === null || _subGroups$ === void 0 || (_subGroups$ = _subGroups$.getBoundingClientRect()) === null || _subGroups$ === void 0 ? void 0 : _subGroups$.top) || 0) + distanceScrollToTop + offsetMouseToSidebarTop;
          groupSortableConstraints.bottom = (subGroups[subGroupsSize - 1].getBoundingClientRect().top || 0) + distanceScrollToTop + offsetMouseToSidebarTop;
          firstDragScrollTop = distanceScrollToTop;
        }
        sortParentId = parentId;
      } else {
        var sortableContainerElement = _this.getContainerElement();
        var _ref = (sortableContainerElement === null || sortableContainerElement === void 0 ? void 0 : sortableContainerElement.getBoundingClientRect()) || {
            top: 0,
            height: 0
          },
          top = _ref.top,
          height = _ref.height;
        if (sortableContainerElement) {
          groupSortableConstraints.top = top + distanceScrollToTop + offsetMouseToSidebarTop;
          groupSortableConstraints.bottom = top + height + distanceScrollToTop + offsetMouseToSidebarTop - heightButtonSidebar;
          firstDragScrollTop = distanceScrollToTop;
        }
      }
      _this.setState({
        isDragging: true,
        dragIndex: sort.index,
        groupSortableConstraints: groupSortableConstraints,
        firstDragScrollTop: firstDragScrollTop,
        sortParentId: sortParentId
      });
    });
    /**
     * the function handle event start sort
     * @param {*} sort
     * @param {*} event
     */
    _defineProperty(_this, "onSortStart", function (sort, event) {
      var _this$state2 = _this.state,
        scrollContainer = _this$state2.scrollContainer,
        currentGroup = _this$state2.currentGroup,
        dragIndex = _this$state2.dragIndex;
      var displacementSize = event.y + scrollContainer.scrollTop; // Initial distance before drag drop from drag drop position to top of container

      // get and style the element that will be drag dropped
      var dragItemElements = document.querySelectorAll('.rct_draggable_' + dragIndex);
      dragItemElements.forEach(function (element) {
        element.style.setProperty('z-index', '81', 'important');
        element.classList.add('draggable_task_process');
      });
      var draggableItem = document.querySelector('.draggable_task_item');
      var draggableButton = document.createElement('i');
      draggableButton.className = 'fas fa-arrows-alt draggable_button';
      draggableButton.style.cssText = 'font-size: 16x; width: 16px; color: white; position: absolute; top: 30px; left: 15px; transform: translate(-50%, -50%); z-index: 83; pointer-events: none;';
      draggableItem.appendChild(draggableButton);

      // add event auto scroll
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', _this.autoScrollEvent);
      }

      // load more element
      _this.state.loadMoreIntervalId = setInterval(function () {
        _this.props.isDragDrop.current = false;
      }, 2000);
      _this.state.displacementSize = displacementSize;
      _this.state.dragItemElements = {
        firstIndex: currentGroup.index,
        lastIndex: currentGroup.index,
        groupMove: '.rct_draggable_' + dragIndex
      };
    });
    /**
     * the function handle event move sort
     * @param {*} sort
     * @param {*} event
     */
    _defineProperty(_this, "onSortMove", function (event) {
      var _this$state3 = _this.state,
        scrollContainer = _this$state3.scrollContainer,
        dragItemElements = _this$state3.dragItemElements,
        displacementSize = _this$state3.displacementSize,
        groupSortableConstraints = _this$state3.groupSortableConstraints,
        firstDragScrollTop = _this$state3.firstDragScrollTop;
      var isDragDrop = _this.props.isDragDrop;
      // stop event load more elements
      isDragDrop.current = true;
      // The element will only be moved within a certain range, which can be within the group containing it or within the drag-drop area.
      if ((groupSortableConstraints === null || groupSortableConstraints === void 0 ? void 0 : groupSortableConstraints.top) > event.clientY + scrollContainer.scrollTop || (groupSortableConstraints === null || groupSortableConstraints === void 0 ? void 0 : groupSortableConstraints.bottom) < event.clientY + scrollContainer.scrollTop) {
        var dragTransform = 0;
        if ((groupSortableConstraints === null || groupSortableConstraints === void 0 ? void 0 : groupSortableConstraints.top) > event.clientY + scrollContainer.scrollTop) {
          dragTransform = (groupSortableConstraints === null || groupSortableConstraints === void 0 ? void 0 : groupSortableConstraints.top) - displacementSize + (firstDragScrollTop - scrollContainer.scrollTop);
        } else if ((groupSortableConstraints === null || groupSortableConstraints === void 0 ? void 0 : groupSortableConstraints.bottom) < event.clientY + scrollContainer.scrollTop) {
          dragTransform = (groupSortableConstraints === null || groupSortableConstraints === void 0 ? void 0 : groupSortableConstraints.bottom) - displacementSize + (firstDragScrollTop - scrollContainer.scrollTop);
        }
        document.querySelector('.draggable_task_item').style.transform = 'translate3d(0px, ' + dragTransform + 'px, 0px)';
      } else {
        event.stopPropagation();
        var newDisplacementSize = event.y + scrollContainer.scrollTop - displacementSize;
        _this.transformElements(dragItemElements, newDisplacementSize, 0);
        _this.state.lastDragPosition = event.y;
      }
    });
    /**
     * the function handle event over sort
     * @param {*} sort
     * @param {*} event
     */
    _defineProperty(_this, "onSortOver", function (sort) {
      var _this$props2 = _this.props,
        groups = _this$props2.groups,
        isDragDrop = _this$props2.isDragDrop;
      var _this$state4 = _this.state,
        rctItemElements = _this$state4.rctItemElements,
        sortParentId = _this$state4.sortParentId,
        rctLockItemElements = _this$state4.rctLockItemElements;
      var newIndexKey = '.rct_draggable_' + sort.newIndex;
      var oldIndexKey = '.rct_draggable_' + sort.oldIndex;
      var oldGroup = groups === null || groups === void 0 ? void 0 : groups.find(function (group) {
        return (group === null || group === void 0 ? void 0 : group.index) === sort.oldIndex;
      });
      var newGroup = groups === null || groups === void 0 ? void 0 : groups.find(function (group) {
        return (group === null || group === void 0 ? void 0 : group.index) === sort.newIndex;
      });
      if (sortParentId) {
        var _newGroup$task;
        if ((newGroup === null || newGroup === void 0 || (_newGroup$task = newGroup.task) === null || _newGroup$task === void 0 ? void 0 : _newGroup$task.parent_id) !== sortParentId) {
          var lockedIndexKey = '.-sort-index-' + sort.newIndex;
          document.querySelector(lockedIndexKey).classList.add('disable-transform');
          if (!rctLockItemElements.has(lockedIndexKey)) {
            _this.state.rctLockItemElements.set(lockedIndexKey, {
              groupMove: lockedIndexKey
            });
          }
          return;
        }
        if (!rctItemElements.has(newIndexKey)) {
          var _firstIndex = sort.newIndex;
          var _lastIndex = sort.newIndex;
          _this.state.rctItemElements.set(newIndexKey, {
            firstIndex: _firstIndex,
            lastIndex: _lastIndex,
            groupMove: newIndexKey
          });
        }
      } else {
        var _newGroup$task2, _newGroup$task3, _newGroup$task4, _oldGroup$task, _oldGroup$task2, _oldGroup$task3;
        newIndexKey = '.group-move-' + (newGroup !== null && newGroup !== void 0 && (_newGroup$task2 = newGroup.task) !== null && _newGroup$task2 !== void 0 && _newGroup$task2.parent_id ? newGroup === null || newGroup === void 0 || (_newGroup$task3 = newGroup.task) === null || _newGroup$task3 === void 0 ? void 0 : _newGroup$task3.parent_id : newGroup === null || newGroup === void 0 || (_newGroup$task4 = newGroup.task) === null || _newGroup$task4 === void 0 ? void 0 : _newGroup$task4.task_id);
        oldIndexKey = '.group-move-' + (oldGroup !== null && oldGroup !== void 0 && (_oldGroup$task = oldGroup.task) !== null && _oldGroup$task !== void 0 && _oldGroup$task.parent_id ? oldGroup === null || oldGroup === void 0 || (_oldGroup$task2 = oldGroup.task) === null || _oldGroup$task2 === void 0 ? void 0 : _oldGroup$task2.parent_id : oldGroup === null || oldGroup === void 0 || (_oldGroup$task3 = oldGroup.task) === null || _oldGroup$task3 === void 0 ? void 0 : _oldGroup$task3.task_id);
        if (!rctItemElements.has(newIndexKey)) {
          var _newGroup$task5, _newGroup$task6, _newGroup$task7;
          var idFilter = newGroup !== null && newGroup !== void 0 && (_newGroup$task5 = newGroup.task) !== null && _newGroup$task5 !== void 0 && _newGroup$task5.parent_id ? newGroup === null || newGroup === void 0 || (_newGroup$task6 = newGroup.task) === null || _newGroup$task6 === void 0 ? void 0 : _newGroup$task6.parent_id : newGroup === null || newGroup === void 0 || (_newGroup$task7 = newGroup.task) === null || _newGroup$task7 === void 0 ? void 0 : _newGroup$task7.task_id;
          var groupFilter = groups.filter(function (group) {
            var _group$task, _group$task2;
            return (group === null || group === void 0 || (_group$task = group.task) === null || _group$task === void 0 ? void 0 : _group$task.task_id) === idFilter || (group === null || group === void 0 || (_group$task2 = group.task) === null || _group$task2 === void 0 ? void 0 : _group$task2.parent_id) === idFilter;
          });
          var _firstIndex2 = groupFilter[0].index;
          var _lastIndex2 = groupFilter[groupFilter.length - 1].index;
          _this.state.rctItemElements.set(newIndexKey, {
            firstIndex: _firstIndex2,
            lastIndex: _lastIndex2,
            groupMove: newIndexKey
          });
        }
      }
      var itemElementsAtOldIndex = rctItemElements.get(oldIndexKey);
      var itemElementsAtNewIndex = rctItemElements.get(newIndexKey);
      var firstIndex = itemElementsAtNewIndex.firstIndex,
        lastIndex = itemElementsAtNewIndex.lastIndex;
      var _ref2 = itemElementsAtOldIndex || {
          firstIndex: undefined,
          lastIndex: undefined
        },
        oldFirstIndex = _ref2.firstIndex,
        oldLastIndex = _ref2.lastIndex;
      var newIndex = sort.newIndex,
        oldIndex = sort.oldIndex,
        index = sort.index;
      if (newIndex > index) {
        if (newIndex > oldIndex) {
          if (newIndex >= firstIndex && newIndex < lastIndex) {
            _this.transformElements(itemElementsAtNewIndex, 0, DEFAULT_SORTABLE_DURATION);
          } else if (newIndex === lastIndex) {
            _this.transformElements(itemElementsAtNewIndex, -60, DEFAULT_SORTABLE_DURATION);
          }
        } else {
          if (oldIndex === oldFirstIndex) {
            _this.transformElements(itemElementsAtOldIndex, 0, DEFAULT_SORTABLE_DURATION);
          } else if (oldIndex <= oldLastIndex && oldIndex > oldFirstIndex) {
            _this.transformElements(itemElementsAtOldIndex, -60, DEFAULT_SORTABLE_DURATION);
          }
        }
      } else if (newIndex < index) {
        if (newIndex < oldIndex) {
          if (newIndex <= lastIndex && newIndex > firstIndex) {
            _this.transformElements(itemElementsAtNewIndex, 0, DEFAULT_SORTABLE_DURATION);
          } else if (newIndex === firstIndex) {
            _this.transformElements(itemElementsAtNewIndex, 60, DEFAULT_SORTABLE_DURATION);
          }
        } else {
          if (oldIndex === oldLastIndex) {
            _this.transformElements(itemElementsAtOldIndex, 0, DEFAULT_SORTABLE_DURATION);
          } else if (oldIndex >= oldFirstIndex && oldIndex < oldLastIndex) {
            _this.transformElements(itemElementsAtOldIndex, 60, DEFAULT_SORTABLE_DURATION);
          }
        }
      } else {
        _this.transformElements(itemElementsAtOldIndex, 0, DEFAULT_SORTABLE_DURATION);
      }
    });
    /**
     * the function handle event auto scroll
     * @param {*} sort
     * @param {*} event
     */
    _defineProperty(_this, "autoScrollEvent", function (event) {
      var _this$state5 = _this.state,
        dragItemElements = _this$state5.dragItemElements,
        lastDragPosition = _this$state5.lastDragPosition,
        displacementSize = _this$state5.displacementSize,
        groupSortableConstraints = _this$state5.groupSortableConstraints,
        firstDragScrollTop = _this$state5.firstDragScrollTop;
      var isDragDrop = _this.props.isDragDrop;
      // stop load more element event
      isDragDrop.current = true;
      // The element will only be moved within a certain range, which can be within the group containing it or within the drag-drop area.
      if ((groupSortableConstraints === null || groupSortableConstraints === void 0 ? void 0 : groupSortableConstraints.top) > lastDragPosition + event.target.scrollTop || (groupSortableConstraints === null || groupSortableConstraints === void 0 ? void 0 : groupSortableConstraints.bottom) < lastDragPosition + event.target.scrollTop) {
        var dragTransform = 0;
        if ((groupSortableConstraints === null || groupSortableConstraints === void 0 ? void 0 : groupSortableConstraints.top) > lastDragPosition + event.target.scrollTop) {
          dragTransform = (groupSortableConstraints === null || groupSortableConstraints === void 0 ? void 0 : groupSortableConstraints.top) - displacementSize + (firstDragScrollTop - event.target.scrollTop);
        } else if ((groupSortableConstraints === null || groupSortableConstraints === void 0 ? void 0 : groupSortableConstraints.bottom) < lastDragPosition + event.target.scrollTop) {
          dragTransform = (groupSortableConstraints === null || groupSortableConstraints === void 0 ? void 0 : groupSortableConstraints.bottom) - displacementSize + (firstDragScrollTop - event.target.scrollTop);
        }
        document.querySelector('.draggable_task_item').style.transform = 'translate3d(0px, ' + dragTransform + 'px, 0px)';
      } else {
        var lastDragPositionScroll = lastDragPosition + event.target.scrollTop - displacementSize;
        _this.transformElements(dragItemElements, lastDragPositionScroll, 0);
      }
    });
    /**
     * the function handle event end sort
     * @param {*} sort
     */
    _defineProperty(_this, "onSortEnd", function (sort) {
      var _this$state6 = _this.state,
        scrollContainer = _this$state6.scrollContainer,
        rctItemElements = _this$state6.rctItemElements,
        dragItemElements = _this$state6.dragItemElements,
        sortParentId = _this$state6.sortParentId,
        currentGroup = _this$state6.currentGroup,
        rctLockItemElements = _this$state6.rctLockItemElements,
        loadMoreIntervalId = _this$state6.loadMoreIntervalId;
      var _this$props3 = _this.props,
        sortOrderTaskList = _this$props3.sortOrderTaskList,
        groups = _this$props3.groups,
        isDragDrop = _this$props3.isDragDrop,
        setCurrentGroupMove = _this$props3.setCurrentGroupMove;
      var exactlyNewIndex = sort.newIndex;
      if (sortParentId) {
        var _currentGroup$task2, _currentGroup$task3, _currentGroup$task4, _groupFilter$, _groupFilter;
        var idFilter = currentGroup !== null && currentGroup !== void 0 && (_currentGroup$task2 = currentGroup.task) !== null && _currentGroup$task2 !== void 0 && _currentGroup$task2.parent_id ? currentGroup === null || currentGroup === void 0 || (_currentGroup$task3 = currentGroup.task) === null || _currentGroup$task3 === void 0 ? void 0 : _currentGroup$task3.parent_id : currentGroup === null || currentGroup === void 0 || (_currentGroup$task4 = currentGroup.task) === null || _currentGroup$task4 === void 0 ? void 0 : _currentGroup$task4.task_id;
        var groupFilter = groups.filter(function (group) {
          var _group$task3, _group$task4;
          return (group === null || group === void 0 || (_group$task3 = group.task) === null || _group$task3 === void 0 ? void 0 : _group$task3.task_id) === idFilter || (group === null || group === void 0 || (_group$task4 = group.task) === null || _group$task4 === void 0 ? void 0 : _group$task4.parent_id) === idFilter;
        });
        var firstIndex = (_groupFilter$ = groupFilter[0]) === null || _groupFilter$ === void 0 ? void 0 : _groupFilter$.index;
        var lastIndex = (_groupFilter = groupFilter[groupFilter.length - 1]) === null || _groupFilter === void 0 ? void 0 : _groupFilter.index;
        if (sort.newIndex <= firstIndex) {
          exactlyNewIndex = firstIndex + 1;
        }
        if (sort.newIndex > lastIndex) {
          exactlyNewIndex = lastIndex;
        }
      } else {
        var _groupAtNewIndex$task, _groupAtNewIndex$task2, _groupAtNewIndex$task3;
        var groupAtNewIndex = groups === null || groups === void 0 ? void 0 : groups.find(function (group) {
          return (group === null || group === void 0 ? void 0 : group.index) === sort.newIndex;
        });
        var newIndexKey = sortParentId ? '.rct_draggable_' + (currentGroup === null || currentGroup === void 0 ? void 0 : currentGroup.index) : '.group-move-' + (groupAtNewIndex !== null && groupAtNewIndex !== void 0 && (_groupAtNewIndex$task = groupAtNewIndex.task) !== null && _groupAtNewIndex$task !== void 0 && _groupAtNewIndex$task.parent_id ? groupAtNewIndex === null || groupAtNewIndex === void 0 || (_groupAtNewIndex$task2 = groupAtNewIndex.task) === null || _groupAtNewIndex$task2 === void 0 ? void 0 : _groupAtNewIndex$task2.parent_id : groupAtNewIndex === null || groupAtNewIndex === void 0 || (_groupAtNewIndex$task3 = groupAtNewIndex.task) === null || _groupAtNewIndex$task3 === void 0 ? void 0 : _groupAtNewIndex$task3.task_id);
        var groupSortable = rctItemElements.get(newIndexKey);
        if (sort.oldIndex > sort.newIndex && (groupSortable === null || groupSortable === void 0 ? void 0 : groupSortable.lastIndex) >= sort.newIndex && sort.newIndex > (groupSortable === null || groupSortable === void 0 ? void 0 : groupSortable.firstIndex)) {
          exactlyNewIndex = (groupSortable === null || groupSortable === void 0 ? void 0 : groupSortable.lastIndex) + 1;
        } else if (sort.oldIndex < sort.newIndex && (groupSortable === null || groupSortable === void 0 ? void 0 : groupSortable.lastIndex) > sort.newIndex && sort.newIndex >= (groupSortable === null || groupSortable === void 0 ? void 0 : groupSortable.firstIndex)) {
          exactlyNewIndex = (groupSortable === null || groupSortable === void 0 ? void 0 : groupSortable.firstIndex) - 1;
        }
      }

      // set style of drag/drop element to default
      document.querySelectorAll('.draggable_task_process').forEach(function (element) {
        return element.classList.remove('disable-transform');
      });

      // clear style and data rct item elements on chart which are locked
      rctLockItemElements.forEach(function (elements) {
        _this.clearTransformElements(elements);
      });
      rctLockItemElements.clear();

      // clear style and data rct item elements on chart
      rctItemElements.forEach(function (elements) {
        _this.clearTransformElements(elements);
      });
      rctItemElements.clear();
      _this.clearTransformElements(dragItemElements);

      // remove event auto scroll
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', _this.autoScrollEvent);
      }
      isDragDrop.current = false;
      sortOrderTaskList(_reactSortableHoc.arrayMove, sort.oldIndex, exactlyNewIndex, currentGroup);
      setCurrentGroupMove(null);
      if (loadMoreIntervalId !== -1) {
        clearInterval(loadMoreIntervalId);
      }
      _this.setState(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
        isDragging: false,
        // state check move action

        dragControlElement: null,
        dragItemElements: [],
        displacementSize: 0,
        lastDragPosition: 0,
        dragIndex: -1,
        groupSortableConstraints: null,
        sortParentId: null,
        firstDragScrollTop: 0,
        // Distance to top of container when dragging starts
        rctItemElements: new Map()
      }, "sortParentId", null), "currentGroup", null), "rctLockItemElements", new Map()), "loadMoreIntervalId", -1));
    });
    /**
     * function handle add style css when handle drag/drop event
     * @param {object[]} groupElements - the array contains list key id
     * @param {number} transformSize - the value of distance transform
     * @param {number} delayDuration - the value of transition duration
     */
    _defineProperty(_this, "transformElements", function (groupElements, transformSize) {
      var delayDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var elements = document.querySelectorAll(groupElements === null || groupElements === void 0 ? void 0 : groupElements.groupMove);
      for (var i = 0; i < (elements === null || elements === void 0 ? void 0 : elements.length); i++) {
        if (elements[i].classList.contains('draggable_task_item')) {
          return;
        }
        if (elements[i].classList.contains('draggable_task_process')) {
          elements[i].style.transitionDuration = "".concat(delayDuration, "ms");
          elements[i].style.transform = 'translate(0px, ' + transformSize + 'px)';
        } else {
          elements[i].classList.remove('transform-to-above');
          elements[i].classList.remove('transform-to-below');
          elements[i].classList.remove('transform-reset');
          elements[i].classList.remove('disable-transform');
          if (transformSize > 0) {
            elements[i].classList.add('transform-to-above');
          } else if (transformSize < 0) {
            elements[i].classList.add('transform-to-below');
          } else {
            elements[i].classList.add('transform-reset');
          }
        }
      }
    });
    /**
     * function handle remove style css when handle drag/drop event
     * @param {object[]} groupElements - the array contains list key id
     */
    _defineProperty(_this, "clearTransformElements", function (groupElements) {
      var elements = document.querySelectorAll(groupElements === null || groupElements === void 0 ? void 0 : groupElements.groupMove);
      for (var i = 0; i < (elements === null || elements === void 0 ? void 0 : elements.length); i++) {
        if (elements[i].classList.contains('draggable_task_item')) {
          return;
        }
        if (elements[i].classList.contains('draggable_task_process')) {
          elements[i].style.transitionDuration = "0ms";
          elements[i].style.transform = 'none';
          elements[i].style.setProperty('z-index', '80', 'important');
          elements[i].classList.remove('draggable_task_process');
        } else {
          elements[i].classList.remove('transform-to-above');
          elements[i].classList.remove('transform-to-below');
          elements[i].classList.remove('transform-reset');
          elements[i].classList.remove('disable-transform');
        }
      }
    });
    _defineProperty(_this, "getContainerElement", function () {
      var dropZoneTask = document.getElementById('dropzone-task');
      return dropZoneTask;
    });
    _this.state = {
      isDragging: false,
      // state check move action
      scrollContainer: null,
      // state scroll container element

      dragControlElement: null,
      dragItemElements: [],
      // the item elements of the current group which are being dragged

      displacementSize: 0,
      // the distance from the position of the mouse pointer holding the move group to the top border of the scroll container
      lastDragPosition: 0,
      // the last drag position before triggering scroll event
      dragIndex: -1,
      // the index of the current group which are being dragged
      groupSortableConstraints: null,
      // Maximum top and bottom border position when dragging a sub group
      firstDragScrollTop: 0,
      // Distance to top of container when dragging starts
      rctItemElements: new Map(),
      // the item elements on chart
      sortParentId: null,
      // the parent id of the current group which are being dragged,
      currentGroup: null,
      rctLockItemElements: new Map(),
      // the item elements will be locked motion,
      loadMoreIntervalId: -1
    };
    return _this;
  }
  _inherits(GroupSortable, _Component);
  return _createClass(GroupSortable, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !((0, _generic.arraysEqual)(nextProps.groups, this.props.groups) &&
      // arraysEqual(nextProps.groupHeights, this.props.groupHeights) &&
      nextProps.groupIdKey === this.props.groupIdKey && nextProps.groupRightTitleKey === this.props.groupRightTitleKey && nextProps.groupTitleKey === this.props.groupTitleKey && nextProps.isRightSidebar === this.props.isRightSidebar && nextState.isDragging === this.state.isDragging && nextProps.isShowDragHandleButton === this.props.isShowDragHandleButton && nextProps.sidebarPositionDisplayed === this.props.sidebarPositionDisplayed && nextProps.viewOption === this.props.viewOption && nextProps.isShowTrackRecord === this.props.isShowTrackRecord);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.state.scrollContainer) {
        this.state.scrollContainer.removeEventListener('scroll', this.autoScrollEvent);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isDragging = this.state.isDragging;
      var _this$props4 = this.props,
        groups = _this$props4.groups,
        groupHeights = _this$props4.groupHeights,
        isRightSidebar = _this$props4.isRightSidebar,
        groupTitleKey = _this$props4.groupTitleKey,
        groupRightTitleKey = _this$props4.groupRightTitleKey,
        groupIdKey = _this$props4.groupIdKey,
        groupRenderer = _this$props4.groupRenderer,
        isShowDragHandleButton = _this$props4.isShowDragHandleButton,
        openAddGroupForm = _this$props4.openAddGroupForm,
        buttonTooltipRenderer = _this$props4.buttonTooltipRenderer,
        sidebarPositionDisplayed = _this$props4.sidebarPositionDisplayed,
        viewOption = _this$props4.viewOption,
        isShowTrackRecord = _this$props4.isShowTrackRecord;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: isShowDragHandleButton && !isDragging ? 'hover-show-sortable' : ''
      }, /*#__PURE__*/_react["default"].createElement(_SortableContainer.SortableList, {
        useDragHandle: true,
        lockAxis: "y",
        helperClass: "draggable_task_item",
        helperContainer: this.getContainerElement,
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