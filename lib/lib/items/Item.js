"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _interactjs = _interopRequireDefault(require("interactjs"));
var _moment = _interopRequireDefault(require("moment"));
var _generic = require("../utility/generic");
var _events = require("../utility/events");
var _defaultItemRenderer = require("./defaultItemRenderer");
var _calendar = require("../utility/calendar");
var _domHelpers = require("../utility/dom-helpers");
var _styles = require("./styles");
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
var DEFAULT_TYPE_TRACK_RECORD = 2,
  DEFAULT_MARGIN_TOP_TRACK_RECORD_IN_SCHEDULE = 28,
  DEFAULT_MARGIN_TOP_TRACK_RECORD_IN_PROCESS_BASIC = 25;
var Item = exports["default"] = /*#__PURE__*/function (_Component) {
  function Item(_props) {
    var _this;
    _classCallCheck(this, Item);
    _this = _callSuper(this, Item, [_props]);
    _defineProperty(_this, "canSelectItem", function () {
      return _this.canMove() || _this.canResizeLeft() || _this.canResizeRight();
    });
    _defineProperty(_this, "onMouseDown", function (e) {
      e.preventDefault();
      if (!_this.state.interactMounted) {
        _this.startedClicking = true;
      }

      //Custom
      _this.startedClickingCustom = true;
    });
    _defineProperty(_this, "onMouseUp", function (e) {
      if (!_this.state.interactMounted && _this.startedClicking) {
        _this.startedClicking = false;
        _this.actualClick(e, 'click');
      }

      //Custom
      if (_this.startedClickingCustom) {
        _this.startedClickingCustom = false;
      }
    });
    _defineProperty(_this, "onTouchStart", function (e) {
      if (!_this.state.interactMounted) {
        e.preventDefault();
        _this.startedTouching = true;
      }
    });
    _defineProperty(_this, "onTouchEnd", function (e) {
      if (!_this.state.interactMounted && _this.startedTouching) {
        _this.startedTouching = false;
        _this.actualClick(e, 'touch');
      }
    });
    _defineProperty(_this, "handleDoubleClick", function (e) {
      e.stopPropagation();
      if (_this.props.onItemDoubleClick) {
        _this.props.onItemDoubleClick(_this.itemId, e);
      }
    });
    _defineProperty(_this, "handleContextMenu", function (e) {
      if (_this.props.onContextMenu) {
        e.preventDefault();
        e.stopPropagation();
        _this.props.onContextMenu(_this.itemId, e);
      }
    });
    /**
     * function handle event mouse move
     */
    _defineProperty(_this, "onMouseMove", function (e) {
      var _e$currentTarget;
      if (!_this.props.isGembaMode || !_this.props.isHoverToSelectedItem || !_this.canSelectItem() || _this.props.selectedItem === _this.itemId) return;
      var divRect = e === null || e === void 0 ? void 0 : e.currentTarget.getBoundingClientRect();
      if (Number(divRect.left) + Number((e === null || e === void 0 || (_e$currentTarget = e.currentTarget) === null || _e$currentTarget === void 0 ? void 0 : _e$currentTarget.clientWidth) || 0) < e.clientX) {
        e.currentTarget.style.cursor = 'default';
        return;
      }
      e.currentTarget.style.cursor = 'move';
      _this.actualClick(e, 'hover');
    });
    /**
     * function handle event mouse leave
     */
    _defineProperty(_this, "onMouseLeave", function () {
      if (!_this.props.isHoverToSelectedItem || !_this.props.isGembaMode || _this.startedClickingCustom || !_this.canSelectItem()) return;
      _this.props.onSelect(null);
    });
    _defineProperty(_this, "getItemRef", function (el) {
      return _this.item = el;
    });
    _defineProperty(_this, "getDragLeftRef", function (el) {
      return _this.dragLeft = el;
    });
    _defineProperty(_this, "getDragRightRef", function (el) {
      return _this.dragRight = el;
    });
    _defineProperty(_this, "getItemProps", function () {
      var _this$props;
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      //TODO: maybe shouldnt include all of these classes
      var classNames = 'rct-item' + (_this.props.item.className ? " ".concat(_this.props.item.className) : '') + ' rct_draggable_' + ((_this$props = _this.props) === null || _this$props === void 0 || (_this$props = _this$props.item) === null || _this$props === void 0 ? void 0 : _this$props.group);
      return {
        key: _this.itemId,
        ref: _this.getItemRef,
        title: _this.itemDivTitle,
        className: classNames + " ".concat(props.className ? props.className : ''),
        onMouseDown: (0, _events.composeEvents)(_this.onMouseDown, props.onMouseDown),
        onMouseUp: (0, _events.composeEvents)(_this.onMouseUp, props.onMouseUp),
        onTouchStart: (0, _events.composeEvents)(_this.onTouchStart, props.onTouchStart),
        onTouchEnd: (0, _events.composeEvents)(_this.onTouchEnd, props.onTouchEnd),
        onDoubleClick: (0, _events.composeEvents)(_this.handleDoubleClick, props.onDoubleClick),
        onContextMenu: (0, _events.composeEvents)(_this.handleContextMenu, props.onContextMenu),
        onMouseMove: (0, _events.composeEvents)(_this.onMouseMove, props.onMouseMove),
        onMouseLeave: (0, _events.composeEvents)(_this.onMouseLeave, props.onMouseLeave),
        style: Object.assign({}, _this.getItemStyle(props))
      };
    });
    _defineProperty(_this, "getResizeProps", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var leftName = 'rct-item-handler rct-item-handler-left rct-item-handler-resize-left';
      if (props.leftClassName) {
        leftName += " ".concat(props.leftClassName);
      }
      var rightName = 'rct-item-handler rct-item-handler-right rct-item-handler-resize-right';
      if (props.rightClassName) {
        rightName += " ".concat(props.rightClassName);
      }
      return {
        left: {
          ref: _this.getDragLeftRef,
          className: leftName,
          style: Object.assign({}, _styles.leftResizeStyle, props.leftStyle)
        },
        right: {
          ref: _this.getDragRightRef,
          className: rightName,
          style: Object.assign({}, _styles.rightResizeStyle, props.rightStyle)
        }
      };
    });
    _this.cacheDataFromProps(_props);
    _this.state = {
      interactMounted: false,
      dragging: null,
      dragStart: null,
      preDragPosition: null,
      dragTime: null,
      dragGroupDelta: null,
      resizing: null,
      resizeEdge: null,
      resizeStart: null,
      resizeTime: null
    };
    _this.timeOutResize = null;
    return _this;
  }
  _inherits(Item, _Component);
  return _createClass(Item, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var shouldUpdate = nextState.dragging !== this.state.dragging || nextState.dragTime !== this.state.dragTime || nextState.dragGroupDelta !== this.state.dragGroupDelta || nextState.resizing !== this.state.resizing || nextState.resizeTime !== this.state.resizeTime || nextProps.keys !== this.props.keys || !(0, _generic.deepObjectCompare)(nextProps.itemProps, this.props.itemProps) || nextProps.selected !== this.props.selected || nextProps.item !== this.props.item || nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || (nextProps.order ? nextProps.order.index : undefined) !== (this.props.order ? this.props.order.index : undefined) || nextProps.dragSnap !== this.props.dragSnap || nextProps.minResizeWidth !== this.props.minResizeWidth || nextProps.canChangeGroup !== this.props.canChangeGroup || nextProps.canSelect !== this.props.canSelect || nextProps.canMove !== this.props.canMove || nextProps.canResizeLeft !== this.props.canResizeLeft || nextProps.canResizeRight !== this.props.canResizeRight || !(0, _generic.deepObjectCompare)(nextProps.dimensions, this.props.dimensions); //The dimension attribute being compared '===' leads to the version before and after the update being the same in value but different in memory, still leading to unnecessary re-rendering, reducing performance.
      return shouldUpdate;
    }
  }, {
    key: "cacheDataFromProps",
    value: function cacheDataFromProps(props) {
      this.itemId = (0, _generic._get)(props.item, props.keys.itemIdKey);
      this.itemTitle = (0, _generic._get)(props.item, props.keys.itemTitleKey);
      this.itemDivTitle = props.keys.itemDivTitleKey ? (0, _generic._get)(props.item, props.keys.itemDivTitleKey) : this.itemTitle;
      this.itemTimeStart = (0, _generic._get)(props.item, props.keys.itemTimeStartKey);
      this.itemTimeEnd = (0, _generic._get)(props.item, props.keys.itemTimeEndKey);
    }
  }, {
    key: "getTimeRatio",
    value: function getTimeRatio() {
      var _this$props2 = this.props,
        canvasTimeStart = _this$props2.canvasTimeStart,
        canvasTimeEnd = _this$props2.canvasTimeEnd,
        canvasWidth = _this$props2.canvasWidth;
      return (0, _calendar.coordinateToTimeRatio)(canvasTimeStart, canvasTimeEnd, canvasWidth);
    }
  }, {
    key: "dragTimeSnap",
    value: function dragTimeSnap(dragTime, considerOffset) {
      var dragSnap = this.props.dragSnap;
      if (dragSnap) {
        var offset = considerOffset ? (0, _moment["default"])().utcOffset() * 60 * 1000 : 0;
        return Math.round(dragTime / dragSnap) * dragSnap - offset % dragSnap;
      } else {
        return dragTime;
      }
    }
  }, {
    key: "resizeTimeSnap",
    value: function resizeTimeSnap(dragTime) {
      var dragSnap = this.props.dragSnap;
      if (dragSnap) {
        var endTime = this.itemTimeEnd % dragSnap;
        return Math.round((dragTime - endTime) / dragSnap) * dragSnap + endTime;
      } else {
        return dragTime;
      }
    }
  }, {
    key: "dragTime",
    value: function dragTime(e) {
      var startTime = (0, _moment["default"])(this.itemTimeStart);
      if (this.state.dragging) {
        return this.dragTimeSnap(this.timeFor(e) + this.state.dragStart.offset, true);
      } else {
        return startTime;
      }
    }
  }, {
    key: "timeFor",
    value: function timeFor(e) {
      var ratio = (0, _calendar.coordinateToTimeRatio)(this.props.canvasTimeStart, this.props.canvasTimeEnd, this.props.canvasWidth);
      var offset = (0, _domHelpers.getSumOffset)(this.props.scrollRef).offsetLeft;
      var scrolls = (0, _domHelpers.getSumScroll)(this.props.scrollRef);
      return (e.pageX - offset + scrolls.scrollLeft) * ratio + this.props.canvasTimeStart;
    }
  }, {
    key: "dragGroupDelta",
    value: function dragGroupDelta(e) {
      var _this$props3 = this.props,
        groupTops = _this$props3.groupTops,
        order = _this$props3.order;
      if (this.state.dragging) {
        if (!this.props.canChangeGroup) {
          return 0;
        }
        var groupDelta = 0;
        var offset = (0, _domHelpers.getSumOffset)(this.props.scrollRef).offsetTop;
        var scrolls = (0, _domHelpers.getSumScroll)(this.props.scrollRef);
        for (var _i = 0, _Object$keys = Object.keys(groupTops); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];
          var groupTop = groupTops[key];
          if (e.pageY - offset + scrolls.scrollTop > groupTop) {
            groupDelta = parseInt(key, 10) - order.index;
          } else {
            break;
          }
        }
        if (this.props.order.index + groupDelta < 0) {
          return 0 - this.props.order.index;
        } else {
          return groupDelta;
        }
      } else {
        return 0;
      }
    }
  }, {
    key: "resizeTimeDelta",
    value: function resizeTimeDelta(e, resizeEdge) {
      var length = this.itemTimeEnd - this.itemTimeStart;
      var timeDelta = this.dragTimeSnap((e.pageX - this.state.resizeStart) * this.getTimeRatio());
      if (length + (resizeEdge === 'left' ? -timeDelta : timeDelta) < (this.props.dragSnap || 1000)) {
        if (resizeEdge === 'left') {
          return length - (this.props.dragSnap || 1000);
        } else {
          return (this.props.dragSnap || 1000) - length;
        }
      } else {
        return timeDelta;
      }
    }
  }, {
    key: "mountInteract",
    value: function mountInteract() {
      var _this2 = this;
      var leftResize = this.props.useResizeHandle ? '.rct-item-handler-resize-left' : true;
      var rightResize = this.props.useResizeHandle ? '.rct-item-handler-resize-right' : true;
      (0, _interactjs["default"])(this.item).resizable({
        edges: {
          left: this.canResizeLeft() && leftResize,
          right: this.canResizeRight() && rightResize,
          top: false,
          bottom: false
        },
        enabled: this.props.selected && (this.canResizeLeft() || this.canResizeRight())
      }).draggable({
        enabled: this.props.selected && this.canMove()
      }).styleCursor(false).on('dragstart', function (e) {
        if (_this2.props.selected) {
          var _e$rect;
          if (Number(e === null || e === void 0 || (_e$rect = e.rect) === null || _e$rect === void 0 ? void 0 : _e$rect.left) + Number(e === null || e === void 0 ? void 0 : e.target.clientWidth) < Number(e === null || e === void 0 ? void 0 : e.pageX)) {
            return false;
          }
          var clickTime = _this2.timeFor(e);
          _this2.setState({
            dragging: true,
            dragStart: {
              x: e.pageX,
              y: e.pageY,
              offset: _this2.itemTimeStart - clickTime
            },
            preDragPosition: {
              x: e.target.offsetLeft,
              y: e.target.offsetTop
            },
            dragTime: _this2.itemTimeStart,
            dragGroupDelta: 0
          });
        } else {
          return false;
        }
      }).on('dragmove', function (e) {
        if (_this2.state.dragging) {
          var dragTime = _this2.dragTime(e);
          var dragGroupDelta = _this2.dragGroupDelta(e);
          if (_this2.props.moveResizeValidator) {
            dragTime = _this2.props.moveResizeValidator('move', _this2.props.item, dragTime);
          }
          if (_this2.props.onDrag) {
            _this2.props.onDrag(_this2.itemId, dragTime, _this2.props.order.index + dragGroupDelta);
          }
          _this2.setState({
            dragTime: dragTime,
            dragGroupDelta: dragGroupDelta
          });
          if (_this2.startedClickingCustom) {
            _this2.startedClickingCustom = false;
          }
        }
      }).on('dragend', function (e) {
        if (_this2.state.dragging) {
          if (_this2.props.onDrop) {
            var dragTime = _this2.dragTime(e);
            if (_this2.props.moveResizeValidator) {
              dragTime = _this2.props.moveResizeValidator('move', _this2.props.item, dragTime);
            }
            _this2.props.onDrop(_this2.itemId, dragTime, _this2.props.order.index + _this2.dragGroupDelta(e));
          }
          _this2.setState({
            dragging: false,
            dragStart: null,
            preDragPosition: null,
            dragTime: null,
            dragGroupDelta: null
          });
        }
      }).on('resizestart', function (e) {
        if (_this2.props.selected) {
          _this2.setState({
            resizing: true,
            resizeEdge: null,
            // we don't know yet
            resizeStart: e.pageX,
            resizeTime: 0
          });
        } else {
          return false;
        }
      }).on('resizemove', function (e) {
        if (_this2.state.resizing) {
          var resizeEdge = _this2.state.resizeEdge;
          if (!resizeEdge) {
            resizeEdge = e.deltaRect.left !== 0 ? 'left' : 'right';
            _this2.setState({
              resizeEdge: resizeEdge
            });
          }
          var resizeTime = _this2.resizeTimeSnap(_this2.timeFor(e));
          if (_this2.props.moveResizeValidator) {
            resizeTime = _this2.props.moveResizeValidator('resize', _this2.props.item, resizeTime, resizeEdge);
          }
          if (_this2.props.onResizing) {
            _this2.props.onResizing(_this2.itemId, resizeTime, resizeEdge);
          }
          _this2.setState({
            resizeTime: resizeTime
          });
        }
      }).on('resizeend', function (e) {
        if (_this2.state.resizing) {
          var resizeEdge = _this2.state.resizeEdge;
          var resizeTime = _this2.resizeTimeSnap(_this2.timeFor(e));
          if (_this2.props.moveResizeValidator) {
            resizeTime = _this2.props.moveResizeValidator('resize', _this2.props.item, resizeTime, resizeEdge);
          }
          if (_this2.props.onResized) {
            _this2.props.onResized(_this2.itemId, resizeTime, resizeEdge, _this2.resizeTimeDelta(e, resizeEdge));
          }
          _this2.setState({
            resizing: null,
            resizeStart: null,
            resizeEdge: null,
            resizeTime: null
          });
          if (_this2.startedClickingCustom) {
            _this2.startedClickingCustom = false;
          }
        }
      }).on('tap', function (e) {
        _this2.actualClick(e, e.pointerType === 'mouse' ? 'click' : 'touch');
      });
      this.setState({
        interactMounted: true
      });
    }
  }, {
    key: "canResizeLeft",
    value: function canResizeLeft() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      if (!props.canResizeLeft) {
        return false;
      }
      var width = parseInt(props.dimensions.width, 10);
      return width >= props.minResizeWidth;
    }
  }, {
    key: "canResizeRight",
    value: function canResizeRight() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      if (!props.canResizeRight) {
        return false;
      }
      var width = parseInt(props.dimensions.width, 10);
      return width >= props.minResizeWidth;
    }
  }, {
    key: "canMove",
    value: function canMove() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      return !!props.canMove;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.cacheDataFromProps(this.props);
      var interactMounted = this.state.interactMounted;
      var couldDrag = prevProps.selected && this.canMove(prevProps);
      var couldResizeLeft = prevProps.selected && this.canResizeLeft(prevProps);
      var couldResizeRight = prevProps.selected && this.canResizeRight(prevProps);
      var willBeAbleToDrag = this.props.selected && this.canMove(this.props);
      var willBeAbleToResizeLeft = this.props.selected && this.canResizeLeft(this.props);
      var willBeAbleToResizeRight = this.props.selected && this.canResizeRight(this.props);
      if (!!this.item) {
        if (this.props.selected && !interactMounted) {
          this.mountInteract();
          interactMounted = true;
        }
        if (interactMounted && (couldResizeLeft !== willBeAbleToResizeLeft || couldResizeRight !== willBeAbleToResizeRight)) {
          var leftResize = this.props.useResizeHandle ? this.dragLeft : true;
          var rightResize = this.props.useResizeHandle ? this.dragRight : true;
          (0, _interactjs["default"])(this.item).resizable({
            enabled: willBeAbleToResizeLeft || willBeAbleToResizeRight,
            edges: {
              top: false,
              bottom: false,
              left: willBeAbleToResizeLeft && leftResize,
              right: willBeAbleToResizeRight && rightResize
            }
          });
        }
        if (interactMounted && couldDrag !== willBeAbleToDrag) {
          (0, _interactjs["default"])(this.item).draggable({
            enabled: willBeAbleToDrag
          });
        }
      } else {
        interactMounted = false;
      }
      this.setState({
        interactMounted: interactMounted
      });
    }
  }, {
    key: "actualClick",
    value: function actualClick(e, clickType) {
      if (!this.props.isGembaMode || !this.canSelectItem()) return;
      if (this.props.canSelect && this.props.onSelect) {
        this.props.onSelect(this.itemId, clickType, e);
      }
    }
  }, {
    key: "getItemStyle",
    value: function getItemStyle(props) {
      var _this$props$item;
      var dimensions = this.props.dimensions;
      var dimensionsTop = dimensions.top;
      if (((_this$props$item = this.props.item) === null || _this$props$item === void 0 ? void 0 : _this$props$item.type) === DEFAULT_TYPE_TRACK_RECORD) {
        var marginTop = this.props.isScheduleScreen ? DEFAULT_MARGIN_TOP_TRACK_RECORD_IN_SCHEDULE : DEFAULT_MARGIN_TOP_TRACK_RECORD_IN_PROCESS_BASIC;
        dimensionsTop += marginTop;
      }
      var baseStyles = {
        position: 'absolute',
        boxSizing: 'border-box',
        left: "".concat(dimensions.left, "px"),
        top: "".concat(dimensionsTop, "px"),
        width: "".concat(dimensions.width, "px"),
        height: "".concat(dimensions.height, "px"),
        lineHeight: "".concat(dimensions.height, "px")
      };
      var finalStyle = Object.assign({}, _styles.overridableStyles, this.props.selected ? _styles.selectedStyle : {}, this.props.selected & this.canMove(this.props) ? _styles.selectedAndCanMove : {}, this.props.selected & this.canResizeLeft(this.props) ? _styles.selectedAndCanResizeLeft : {}, this.props.selected & this.canResizeLeft(this.props) & this.state.dragging ? _styles.selectedAndCanResizeLeftAndDragLeft : {}, this.props.selected & this.canResizeRight(this.props) ? _styles.selectedAndCanResizeRight : {}, this.props.selected & this.canResizeRight(this.props) & this.state.dragging ? _styles.selectedAndCanResizeRightAndDragRight : {}, props.style, baseStyles);
      return finalStyle;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4, _this$props5;
      if (typeof this.props.order === 'undefined' || this.props.order === null) {
        return null;
      }
      var timelineContext = this.context.getTimelineContext();
      var itemContext = {
        dimensions: this.props.dimensions,
        useResizeHandle: this.props.useResizeHandle,
        title: this.itemTitle,
        canMove: this.canMove(this.props),
        canResizeLeft: this.canResizeLeft(this.props),
        canResizeRight: this.canResizeRight(this.props),
        selected: this.props.selected,
        dragging: this.state.dragging,
        dragStart: this.state.dragStart,
        dragTime: this.state.dragTime,
        dragGroupDelta: this.state.dragGroupDelta,
        resizing: this.state.resizing,
        resizeEdge: this.state.resizeEdge,
        resizeStart: this.state.resizeStart,
        resizeTime: this.state.resizeTime,
        width: this.props.dimensions.width
      };
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, !((_this$props4 = this.props) !== null && _this$props4 !== void 0 && (_this$props4 = _this$props4.group) !== null && _this$props4 !== void 0 && _this$props4.isHide) || (_this$props5 = this.props) !== null && _this$props5 !== void 0 && (_this$props5 = _this$props5.group) !== null && _this$props5 !== void 0 && _this$props5.isMerge ? this.props.itemRenderer({
        item: this.props.item,
        timelineContext: timelineContext,
        itemContext: itemContext,
        getItemProps: this.getItemProps,
        getResizeProps: this.getResizeProps
      }) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null));
    }
  }]);
}(_react.Component);
// removed prop type check for SPEED!
// they are coming from a trusted component anyway
// (this complicates performance debugging otherwise)
_defineProperty(Item, "propTypes", {
  canvasTimeStart: _propTypes["default"].number.isRequired,
  canvasTimeEnd: _propTypes["default"].number.isRequired,
  canvasWidth: _propTypes["default"].number.isRequired,
  order: _propTypes["default"].object,
  dragSnap: _propTypes["default"].number,
  minResizeWidth: _propTypes["default"].number,
  selected: _propTypes["default"].bool,
  canChangeGroup: _propTypes["default"].bool.isRequired,
  canMove: _propTypes["default"].bool.isRequired,
  canResizeLeft: _propTypes["default"].bool.isRequired,
  canResizeRight: _propTypes["default"].bool.isRequired,
  keys: _propTypes["default"].object.isRequired,
  item: _propTypes["default"].object.isRequired,
  onSelect: _propTypes["default"].func,
  onDrag: _propTypes["default"].func,
  onDrop: _propTypes["default"].func,
  onResizing: _propTypes["default"].func,
  onResized: _propTypes["default"].func,
  onContextMenu: _propTypes["default"].func,
  itemRenderer: _propTypes["default"].func,
  itemProps: _propTypes["default"].object,
  canSelect: _propTypes["default"].bool,
  dimensions: _propTypes["default"].object,
  groupTops: _propTypes["default"].array,
  useResizeHandle: _propTypes["default"].bool,
  moveResizeValidator: _propTypes["default"].func,
  onItemDoubleClick: _propTypes["default"].func,
  scrollRef: _propTypes["default"].object,
  //Custom
  isHoverToSelectedItem: _propTypes["default"].bool,
  group: _propTypes["default"].object,
  isGembaMode: _propTypes["default"].bool,
  selectedItem: _propTypes["default"].number,
  isScheduleScreen: _propTypes["default"].bool
});
_defineProperty(Item, "defaultProps", {
  selected: false,
  itemRenderer: _defaultItemRenderer.defaultItemRenderer
});
_defineProperty(Item, "contextTypes", {
  getTimelineContext: _propTypes["default"].func
});