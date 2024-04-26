"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _Items = _interopRequireDefault(require("./items/Items"));
var _Sidebar = _interopRequireDefault(require("./layout/Sidebar"));
var _Columns = _interopRequireDefault(require("./columns/Columns"));
var _GroupRows = _interopRequireDefault(require("./row/GroupRows"));
var _ScrollElement = _interopRequireDefault(require("./scroll/ScrollElement"));
var _MarkerCanvas = _interopRequireDefault(require("./markers/MarkerCanvas"));
var _window = _interopRequireDefault(require("../resize-detector/window"));
var _calendar = require("./utility/calendar");
var _generic = require("./utility/generic");
var _defaultConfig = require("./default-config");
var _TimelineStateContext = require("./timeline/TimelineStateContext");
var _TimelineMarkersContext = require("./markers/TimelineMarkersContext");
var _HeadersContext = require("./headers/HeadersContext");
var _TimelineHeaders = _interopRequireDefault(require("./headers/TimelineHeaders"));
var _DateHeader = _interopRequireDefault(require("./headers/DateHeader"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
var ReactCalendarTimeline = exports["default"] = /*#__PURE__*/function (_Component) {
  function ReactCalendarTimeline(_props) {
    var _this;
    _classCallCheck(this, ReactCalendarTimeline);
    _this = _callSuper(this, ReactCalendarTimeline, [_props]);
    _defineProperty(_this, "getTimelineContext", function () {
      var _this$state = _this.state,
        width = _this$state.width,
        visibleTimeStart = _this$state.visibleTimeStart,
        visibleTimeEnd = _this$state.visibleTimeEnd,
        canvasTimeStart = _this$state.canvasTimeStart,
        canvasTimeEnd = _this$state.canvasTimeEnd;
      return {
        timelineWidth: width,
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd,
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd
      };
    });
    _defineProperty(_this, "getTimelineUnit", function () {
      var _this$state2 = _this.state,
        width = _this$state2.width,
        visibleTimeStart = _this$state2.visibleTimeStart,
        visibleTimeEnd = _this$state2.visibleTimeEnd;
      var timeSteps = _this.props.timeSteps;
      var zoom = visibleTimeEnd - visibleTimeStart;
      var minUnit = (0, _calendar.getMinUnit)(zoom, width, timeSteps);
      return minUnit;
    });
    _defineProperty(_this, "resize", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;
      var _this$container$getBo = _this.container.getBoundingClientRect(),
        containerWidth = _this$container$getBo.width;
      var width = containerWidth - props.sidebarWidth - props.rightSidebarWidth;
      var canvasWidth = (0, _calendar.getCanvasWidth)(width, props.buffer);
      var _stackTimelineItems = (0, _calendar.stackTimelineItems)(props.items, props.groups, canvasWidth, _this.state.canvasTimeStart, _this.state.canvasTimeEnd, props.keys, props.lineHeight, props.itemHeightRatio, props.stackItems, _this.state.draggingItem, _this.state.resizingItem, _this.state.dragTime, _this.state.resizingEdge, _this.state.resizeTime, _this.state.newGroupOrder),
        dimensionItems = _stackTimelineItems.dimensionItems,
        height = _stackTimelineItems.height,
        groupHeights = _stackTimelineItems.groupHeights,
        groupTops = _stackTimelineItems.groupTops;

      // this is needed by dragItem since it uses pageY from the drag events
      // if this was in the context of the scrollElement, this would not be necessary

      _this.setState({
        width: width,
        dimensionItems: dimensionItems,
        height: height,
        groupHeights: groupHeights,
        groupTops: groupTops
      });
      //initial scroll left is the buffer - 1 (1 is visible area) divided by 2 (2 is the buffer split on the right and left of the timeline)
      var scrollLeft = width * ((props.buffer - 1) / 2);
      _this.scrollComponent.scrollLeft = scrollLeft;
      _this.scrollHeaderRef.scrollLeft = scrollLeft;
    });
    _defineProperty(_this, "onScroll", function (scrollX) {
      var width = _this.state.width;
      var canvasTimeStart = _this.state.canvasTimeStart;
      var zoom = _this.state.visibleTimeEnd - _this.state.visibleTimeStart;
      var visibleTimeStart = canvasTimeStart + zoom * scrollX / width;
      if (_this.state.visibleTimeStart !== visibleTimeStart || _this.state.visibleTimeEnd !== visibleTimeStart + zoom) {
        _this.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, _this.updateScrollCanvas, _this.getTimelineUnit());
      }
    });
    // called when the visible time changes
    _defineProperty(_this, "updateScrollCanvas", function (visibleTimeStart, visibleTimeEnd, forceUpdateDimensions) {
      var items = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _this.props.items;
      var groups = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _this.props.groups;
      _this.setState((0, _calendar.calculateScrollCanvas)(visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, items, groups, _this.props, _this.state));
    });
    _defineProperty(_this, "handleWheelZoom", function (speed, xPosition, deltaY) {
      _this.changeZoom(1.0 + speed * deltaY / 500, xPosition / _this.state.width);
    });
    _defineProperty(_this, "changeZoom", function (scale) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
      var _this$props = _this.props,
        minZoom = _this$props.minZoom,
        maxZoom = _this$props.maxZoom;
      var oldZoom = _this.state.visibleTimeEnd - _this.state.visibleTimeStart;
      var newZoom = Math.min(Math.max(Math.round(oldZoom * scale), minZoom), maxZoom); // min 1 min, max 20 years
      var newVisibleTimeStart = Math.round(_this.state.visibleTimeStart + (oldZoom - newZoom) * offset);
      _this.props.onTimeChange(newVisibleTimeStart, newVisibleTimeStart + newZoom, _this.updateScrollCanvas, _this.getTimelineUnit());
    });
    _defineProperty(_this, "showPeriod", function (from, to) {
      var visibleTimeStart = from.valueOf();
      var visibleTimeEnd = to.valueOf();
      var zoom = visibleTimeEnd - visibleTimeStart;
      // can't zoom in more than to show one hour
      if (zoom < _this.props.minZoom) {
        return;
      }
      _this.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, _this.updateScrollCanvas, _this.getTimelineUnit());
    });
    _defineProperty(_this, "selectItem", function (item, clickType, e) {
      if (item === _this.state.selectedItem || !!_this.state.draggingItem || !!_this.state.resizingItem) return;
      if (_this.isItemSelected(item) || _this.props.itemTouchSendsClick && clickType === 'touch') {
        if (item && _this.props.onItemClick) {
          var time = _this.timeFromItemEvent(e);
          _this.props.onItemClick(item, e, time);
        }
      } else {
        _this.setState({
          selectedItem: item
        });
        if (item && _this.props.onItemSelect) {
          var _time = _this.timeFromItemEvent(e);
          _this.props.onItemSelect(item, e, _time);
        } else if (item === null && _this.props.onItemDeselect) {
          _this.props.onItemDeselect(e); // this isnt in the docs. Is this function even used?
        }
      }
      _this.setState({
        scrollTime: _this.calendarScrollWithTime(_this.props.speedScrollHorizontal)
      });
    });
    _defineProperty(_this, "doubleClickItem", function (item, e) {
      if (_this.props.onItemDoubleClick) {
        var time = _this.timeFromItemEvent(e);
        _this.props.onItemDoubleClick(item, e, time);
      }
    });
    _defineProperty(_this, "contextMenuClickItem", function (item, e) {
      if (_this.props.onItemContextMenu) {
        var time = _this.timeFromItemEvent(e);
        _this.props.onItemContextMenu(item, e, time);
      }
    });
    // TODO: this is very similar to timeFromItemEvent, aside from which element to get offsets
    // from.  Look to consolidate the logic for determining coordinate to time
    // as well as generalizing how we get time from click on the canvas
    _defineProperty(_this, "getTimeFromRowClickEvent", function (e) {
      var _e$nativeEvent;
      var _this$props2 = _this.props,
        dragSnap = _this$props2.dragSnap,
        buffer = _this$props2.buffer;
      var _this$state3 = _this.state,
        width = _this$state3.width,
        canvasTimeStart = _this$state3.canvasTimeStart,
        canvasTimeEnd = _this$state3.canvasTimeEnd;
      // this gives us distance from left of row element, so event is in
      // context of the row element, not client or page
      var offsetX = (e === null || e === void 0 || (_e$nativeEvent = e.nativeEvent) === null || _e$nativeEvent === void 0 ? void 0 : _e$nativeEvent.offsetX) || (e === null || e === void 0 ? void 0 : e.offsetX);
      var time = (0, _calendar.calculateTimeForXPosition)(canvasTimeStart, canvasTimeEnd, (0, _calendar.getCanvasWidth)(width, buffer), offsetX);
      time = Math.floor(time / dragSnap) * dragSnap;
      return time;
    });
    _defineProperty(_this, "timeFromItemEvent", function (e) {
      var _this$state4 = _this.state,
        width = _this$state4.width,
        visibleTimeStart = _this$state4.visibleTimeStart,
        visibleTimeEnd = _this$state4.visibleTimeEnd;
      var dragSnap = _this.props.dragSnap;
      var scrollComponent = _this.scrollComponent;
      var _scrollComponent$getB = scrollComponent.getBoundingClientRect(),
        scrollX = _scrollComponent$getB.left;
      var xRelativeToTimeline = e.clientX - scrollX;
      var relativeItemPosition = xRelativeToTimeline / width;
      var zoom = visibleTimeEnd - visibleTimeStart;
      var timeOffset = relativeItemPosition * zoom;
      var time = Math.round(visibleTimeStart + timeOffset);
      time = Math.floor(time / dragSnap) * dragSnap;
      return time;
    });
    _defineProperty(_this, "dragItem", function (item, dragTime, newGroupOrder) {
      if (!_this.state.dragMoveItemCalled) {
        var _this$calendarStopAut = _this.calendarStopAutoScroll(_this.props.items[item - 1].start_date, _this.props.items[item - 1].complete_date),
          dayStartToTime = _this$calendarStopAut.dayStartToTime,
          dayEndToTime = _this$calendarStopAut.dayEndToTime,
          endScrollLeft = _this$calendarStopAut.endScrollLeft,
          endScrollRight = _this$calendarStopAut.endScrollRight;
        _this.setState({
          timeStartDefault: dayStartToTime,
          timeEndDefault: dayEndToTime,
          endScrollLeft: endScrollLeft,
          endScrollRight: endScrollRight,
          dragMoveItemCalled: true
        });
      }
      window.clearInterval(_this.refreshIntervalId);
      if (_this.state.endScrollRight < Number(dragTime + (_this.state.timeEndDefault - _this.state.timeStartDefault)) || _this.state.endScrollLeft > Number(dragTime)) {
        return;
      }
      var stopScroll = false;
      if (!stopScroll && _this.state.visibleTimeEnd - _this.handleDayToTime(2) < dragTime) {
        var dataItem = item;
        var dataDragTime = dragTime;
        _this.refreshIntervalId = window.setInterval(function () {
          this.onScroll(this.scrollComponent.scrollLeft + this.props.speedScrollHorizontal);
          if (dataDragTime + (this.state.timeEndDefault - this.state.timeStartDefault) < this.state.endScrollRight) {
            dataDragTime += this.state.scrollTime;
          }
          var newGroup = this.props.groups[newGroupOrder];
          var keys = this.props.keys;
          this.setState({
            draggingItem: dataItem,
            dragTime: dataDragTime,
            newGroupOrder: newGroupOrder,
            dragGroupTitle: newGroup ? (0, _generic._get)(newGroup, keys.groupLabelKey) : ''
          });
          this.updatingItem({
            eventType: 'move',
            itemId: dataItem,
            time: dataDragTime,
            newGroupOrder: newGroupOrder
          });
          if (dataDragTime > this.state.visibleTimeStart && this.state.visibleTimeEnd - this.handleDayToTime(1) >= this.state.endScrollRight) {
            stopScroll = true;
            clearInterval(this.refreshIntervalId);
          }
        }.bind(_this), 10);
      } else if (!stopScroll && _this.state.visibleTimeStart + _this.handleDayToTime(2) > dragTime + (_this.state.timeEndDefault - _this.state.timeStartDefault)) {
        var _dataItem = item;
        var _dataDragTime = dragTime;
        _this.refreshIntervalId = window.setInterval(function () {
          this.onScroll(this.scrollComponent.scrollLeft - 5);
          if (_dataDragTime > this.state.endScrollLeft) {
            _dataDragTime -= this.state.scrollTime;
          }
          var newGroup = this.props.groups[newGroupOrder];
          var keys = this.props.keys;
          this.setState({
            draggingItem: _dataItem,
            dragTime: _dataDragTime,
            newGroupOrder: newGroupOrder,
            dragGroupTitle: newGroup ? (0, _generic._get)(newGroup, keys.groupLabelKey) : ''
          });
          this.updatingItem({
            eventType: 'move',
            itemId: _dataItem,
            time: _dataDragTime,
            newGroupOrder: newGroupOrder
          });
          if (_dataDragTime > this.state.visibleTimeStart && this.state.visibleTimeStart + this.handleDayToTime(1) <= this.state.endScrollLeft) {
            stopScroll = true;
            clearInterval(this.refreshIntervalId);
          }
        }.bind(_this), 10);
      }
      var newGroup = _this.props.groups[newGroupOrder];
      var keys = _this.props.keys;
      _this.setState({
        draggingItem: item,
        dragTime: dragTime,
        newGroupOrder: newGroupOrder,
        dragGroupTitle: newGroup ? (0, _generic._get)(newGroup, keys.groupLabelKey) : ''
      });
      _this.updatingItem({
        eventType: 'move',
        itemId: item,
        time: dragTime,
        newGroupOrder: newGroupOrder
      });
    });
    _defineProperty(_this, "dropItem", function (item, dragTime, newGroupOrder) {
      var dataDragTime = dragTime;
      window.clearInterval(_this.refreshIntervalId);
      _this.setState({
        dragMoveItemCalled: false
      });
      if (dataDragTime + (_this.state.timeEndDefault - _this.state.timeStartDefault) > _this.state.endScrollRight) {
        dataDragTime = _this.state.endScrollRight - (_this.state.timeEndDefault - _this.state.timeStartDefault);
      }
      if (_this.state.endScrollLeft > dataDragTime) {
        dataDragTime = _this.state.endScrollLeft;
      }
      _this.setState({
        draggingItem: null,
        dragTime: null,
        dragGroupTitle: null,
        selectedItem: null
      });
      if (_this.props.onItemMove) {
        _this.props.onItemMove(item, dataDragTime, newGroupOrder);
      }
    });
    _defineProperty(_this, "handleDayToTime", function (numberOfDays) {
      var oneDay = 24 * 60 * 60 * 1000;
      var time = numberOfDays * oneDay;
      return time;
    });
    _defineProperty(_this, "calendarScrollWithTime", function (scrollLeftPlus) {
      var width = _this.state.width;
      var canvasTimeStart = _this.state.canvasTimeStart;
      var zoom = _this.state.visibleTimeEnd - _this.state.visibleTimeStart;
      var visibleTimeStartOld = canvasTimeStart + zoom * _this.scrollComponent.scrollLeft / width;
      var visibleTimeStart = canvasTimeStart + zoom * (_this.scrollComponent.scrollLeft + scrollLeftPlus) / width;
      var visibleTimeChange = visibleTimeStart - visibleTimeStartOld;
      return visibleTimeChange;
    });
    _defineProperty(_this, "calendarStopAutoScroll", function (defaultTimeStart, defaultTimeEnd) {
      var timeStart = new Date(defaultTimeStart);
      var dayStartToTime = timeStart.getTime();
      var endScrollLeft = Number(dayStartToTime) - Number(_this.handleDayToTime(90));
      var timeEnd = new Date(defaultTimeEnd);
      var dayEndToTime = timeEnd.getTime();
      var endScrollRight = Number(dayEndToTime) + Number(_this.handleDayToTime(90));
      return {
        dayStartToTime: dayStartToTime,
        dayEndToTime: dayEndToTime,
        endScrollLeft: endScrollLeft,
        endScrollRight: endScrollRight
      };
    });
    _defineProperty(_this, "resizingItem", function (item, resizeTime, edge) {
      if (!_this.state.resizingItemCalled) {
        var _this$calendarStopAut2 = _this.calendarStopAutoScroll(_this.props.items[item - 1].start_date, _this.props.items[item - 1].complete_date),
          dayStartToTime = _this$calendarStopAut2.dayStartToTime,
          dayEndToTime = _this$calendarStopAut2.dayEndToTime,
          endScrollLeft = _this$calendarStopAut2.endScrollLeft,
          endScrollRight = _this$calendarStopAut2.endScrollRight;
        _this.setState({
          timeStartDefault: dayStartToTime,
          timeEndDefault: dayEndToTime,
          endScrollLeft: endScrollLeft,
          endScrollRight: endScrollRight,
          resizingItemCalled: true
        });
      }
      window.clearInterval(_this.refreshIntervalId);
      if (_this.state.endScrollRight < Number(resizeTime) || _this.state.endScrollLeft > Number(resizeTime)) {
        return;
      }
      var stopScroll = false;
      if (!stopScroll && _this.state.visibleTimeEnd - _this.handleDayToTime(1) < resizeTime) {
        var dataItem = item;
        var dataEdge = edge;
        var dataResizeTime = resizeTime;
        _this.refreshIntervalId = window.setInterval(function () {
          this.onScroll(this.scrollComponent.scrollLeft + this.props.speedScrollHorizontal);
          if (dataResizeTime < this.state.endScrollRight) {
            dataResizeTime += this.state.scrollTime;
          }
          this.setState({
            resizingItem: dataItem,
            resizingEdge: dataEdge,
            resizeTime: dataResizeTime
          });
          this.updatingItem({
            eventType: 'resize',
            itemId: dataItem,
            time: dataResizeTime,
            edge: edge
          });
          if (edge === 'right' && this.state.visibleTimeEnd - this.handleDayToTime(1) >= this.state.endScrollRight) {
            stopScroll = true;
            clearInterval(this.refreshIntervalId);
          }
          if (edge === 'left' && Number(dataResizeTime) > Number(this.state.timeEndDefault - this.handleDayToTime(0.49))) {
            stopScroll = true;
            clearInterval(this.refreshIntervalId);
          }
        }.bind(_this), 10);
      } else if (!stopScroll && _this.state.visibleTimeStart + _this.handleDayToTime(1) > resizeTime) {
        var _dataItem2 = item;
        var _dataEdge = edge;
        var _dataResizeTime = resizeTime;
        _this.refreshIntervalId = window.setInterval(function () {
          this.onScroll(this.scrollComponent.scrollLeft - this.props.speedScrollHorizontal);
          if (_dataResizeTime > this.state.endScrollLeft) {
            _dataResizeTime -= this.state.scrollTime;
          }
          this.setState({
            resizingItem: _dataItem2,
            resizingEdge: _dataEdge,
            resizeTime: _dataResizeTime
          });
          this.updatingItem({
            eventType: 'resize',
            itemId: _dataItem2,
            time: _dataResizeTime,
            edge: edge
          });
          if (edge === 'left' && this.state.visibleTimeStart + this.handleDayToTime(1) <= this.state.endScrollLeft) {
            stopScroll = true;
            clearInterval(this.refreshIntervalId);
          }
          if (edge === 'right' && Number(_dataResizeTime) < Number(this.handleDayToTime(0.49) + this.state.timeStartDefault)) {
            stopScroll = true;
            clearInterval(this.refreshIntervalId);
            this.onScroll(this.scrollComponent.scrollLeft - this.props.speedScrollHorizontal);
          }
        }.bind(_this), 10);
      }
      _this.setState({
        resizingItem: item,
        resizingEdge: edge,
        resizeTime: resizeTime
      });
      _this.updatingItem({
        eventType: 'resize',
        itemId: item,
        time: resizeTime,
        edge: edge
      });
    });
    _defineProperty(_this, "resizedItem", function (item, resizeTime, edge, timeDelta) {
      var dataResizeTime = resizeTime;
      if (edge === 'right' && dataResizeTime > _this.state.endScrollRight) {
        dataResizeTime = _this.state.endScrollRight;
      }
      if (edge === 'left' && _this.state.endScrollLeft > dataResizeTime) {
        dataResizeTime = _this.state.endScrollLeft;
      }
      window.clearInterval(_this.refreshIntervalId);
      _this.setState({
        resizingItemCalled: false
      });
      _this.setState({
        resizingItem: null,
        resizingEdge: null,
        resizeTime: null,
        selectedItem: null
      });
      if (_this.props.onItemResize && timeDelta !== 0) {
        _this.props.onItemResize(item, dataResizeTime, edge);
      }
    });
    _defineProperty(_this, "updatingItem", function (_ref) {
      var eventType = _ref.eventType,
        itemId = _ref.itemId,
        time = _ref.time,
        edge = _ref.edge,
        newGroupOrder = _ref.newGroupOrder;
      if (_this.props.onItemDrag) {
        _this.props.onItemDrag({
          eventType: eventType,
          itemId: itemId,
          time: time,
          edge: edge,
          newGroupOrder: newGroupOrder
        });
      }
    });
    _defineProperty(_this, "handleRowClick", function (e, rowIndex) {
      // shouldnt this be handled by the user, as far as when to deselect an item?
      if (_this.hasSelectedItem()) {
        _this.selectItem(null);
      }
      if (_this.props.onCanvasClick == null) return;
      var time = _this.getTimeFromRowClickEvent(e);
      var groupId = (0, _generic._get)(_this.props.groups[rowIndex], _this.props.keys.groupIdKey);
      _this.props.onCanvasClick(groupId, time, e);
    });
    _defineProperty(_this, "handleRowDoubleClick", function (e, rowIndex) {
      if (_this.props.onCanvasDoubleClick == null) return;
      var time = _this.getTimeFromRowClickEvent(e);
      var groupId = (0, _generic._get)(_this.props.groups[rowIndex], _this.props.keys.groupIdKey);
      _this.props.onCanvasDoubleClick(groupId, time, e);
    });
    _defineProperty(_this, "handleScrollContextMenu", function (e, rowIndex) {
      if (_this.props.onCanvasContextMenu == null) return;
      var timePosition = _this.getTimeFromRowClickEvent(e);
      var groupId = (0, _generic._get)(_this.props.groups[rowIndex], _this.props.keys.groupIdKey);
      if (_this.props.onCanvasContextMenu) {
        e.preventDefault();
        _this.props.onCanvasContextMenu(groupId, timePosition, e);
      }
    });
    _defineProperty(_this, "handleHeaderRef", function (el) {
      _this.scrollHeaderRef = el;
      _this.props.headerRef(el);
    });
    /**
     * check if child of type TimelineHeader
     * refer to for explanation https://github.com/gaearon/react-hot-loader#checking-element-types
     */
    _defineProperty(_this, "isTimelineHeader", function (child) {
      if (child.type === undefined) return false;
      return child.type.secretKey === _TimelineHeaders["default"].secretKey;
    });
    _defineProperty(_this, "renderHeaders", function () {
      if (_this.props.children) {
        var headerRenderer;
        _react["default"].Children.map(_this.props.children, function (child) {
          if (_this.isTimelineHeader(child)) {
            headerRenderer = child;
          }
        });
        if (headerRenderer) {
          return headerRenderer;
        }
      }
      return /*#__PURE__*/_react["default"].createElement(_TimelineHeaders["default"], null, /*#__PURE__*/_react["default"].createElement(_DateHeader["default"], {
        unit: "primaryHeader"
      }), /*#__PURE__*/_react["default"].createElement(_DateHeader["default"], null));
    });
    _defineProperty(_this, "getScrollElementRef", function (el) {
      _this.props.scrollRef(el);
      _this.scrollComponent = el;
    });
    _defineProperty(_this, "refHandler", function (el) {
      _this.scrollComponentTemporary = el;
      if (el) {
        el.addEventListener('scroll', _this.handleScroll, {
          passive: false
        });
        el.addEventListener('mouseup', _this.handleScrollEnd);
        _this.scrollComponentTemporary.scrollLeft = (_this.scrollComponentTemporary.scrollWidth - _this.scrollComponentTemporary.offsetWidth) / 2;
      }
    });
    _defineProperty(_this, "handleScroll", function (e) {
      var distanceScroll = (_this.scrollComponentTemporary.scrollLeft - _this.scrollLeftTemporary) / 3.2;
      if (!_this.isScrolling) {
        _this.isScrolling = true;
      } else {
        _this.onScroll(_this.scrollComponent.scrollLeft + Number(distanceScroll));
      }
      _this.scrollLeftTemporary = _this.scrollComponentTemporary.scrollLeft;
    });
    _defineProperty(_this, "handleScrollEnd", function (e) {
      _this.scrollComponentTemporary.scrollLeft = (_this.scrollComponentTemporary.scrollWidth - _this.scrollComponentTemporary.offsetWidth) / 2;
      _this.isScrolling = false;
    });
    _this.getSelected = _this.getSelected.bind(_this);
    _this.hasSelectedItem = _this.hasSelectedItem.bind(_this);
    _this.isItemSelected = _this.isItemSelected.bind(_this);
    var _visibleTimeStart = null;
    var _visibleTimeEnd = null;
    if (_this.props.defaultTimeStart && _this.props.defaultTimeEnd) {
      _visibleTimeStart = _this.props.defaultTimeStart.valueOf();
      _visibleTimeEnd = _this.props.defaultTimeEnd.valueOf();
    } else if (_this.props.visibleTimeStart && _this.props.visibleTimeEnd) {
      _visibleTimeStart = _this.props.visibleTimeStart;
      _visibleTimeEnd = _this.props.visibleTimeEnd;
    } else {
      //throwing an error because neither default or visible time props provided
      throw new Error('You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline');
    }
    var _getCanvasBoundariesF = (0, _calendar.getCanvasBoundariesFromVisibleTime)(_visibleTimeStart, _visibleTimeEnd, _props.buffer),
      _getCanvasBoundariesF2 = _slicedToArray(_getCanvasBoundariesF, 2),
      _canvasTimeStart = _getCanvasBoundariesF2[0],
      _canvasTimeEnd = _getCanvasBoundariesF2[1];
    _this.state = {
      width: 1000,
      visibleTimeStart: _visibleTimeStart,
      visibleTimeEnd: _visibleTimeEnd,
      canvasTimeStart: _canvasTimeStart,
      canvasTimeEnd: _canvasTimeEnd,
      selectedItem: null,
      dragTime: null,
      dragGroupTitle: null,
      resizeTime: null,
      resizingItem: null,
      resizingEdge: null,
      resizingItemCalled: false,
      dragMoveItemCalled: false,
      scrollTime: 0,
      timeStartDefault: 0,
      timeEndDefault: 0,
      endScrollRight: 0,
      endScrollLeft: 0
    };
    var _canvasWidth = (0, _calendar.getCanvasWidth)(_this.state.width, _props.buffer);
    var _stackTimelineItems2 = (0, _calendar.stackTimelineItems)(_props.items, _props.groups, _canvasWidth, _this.state.canvasTimeStart, _this.state.canvasTimeEnd, _props.keys, _props.lineHeight, _props.itemHeightRatio, _props.stackItems, _this.state.draggingItem, _this.state.resizingItem, _this.state.dragTime, _this.state.resizingEdge, _this.state.resizeTime, _this.state.newGroupOrder),
      _dimensionItems = _stackTimelineItems2.dimensionItems,
      _height = _stackTimelineItems2.height,
      _groupHeights = _stackTimelineItems2.groupHeights,
      _groupTops = _stackTimelineItems2.groupTops;

    /* eslint-disable react/no-direct-mutation-state */
    _this.state.dimensionItems = _dimensionItems;
    _this.state.height = _height;
    _this.state.groupHeights = _groupHeights;
    _this.state.groupTops = _groupTops;
    _this.scrollComponentTemporary = null;
    _this.scrollLeftTemporary = null;
    _this.isScrolling = false;
    /* eslint-enable */
    return _this;
  }
  _inherits(ReactCalendarTimeline, _Component);
  return _createClass(ReactCalendarTimeline, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this2 = this;
      return {
        getTimelineContext: function getTimelineContext() {
          return _this2.getTimelineContext();
        }
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resize(this.props);
      if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
        this.props.resizeDetector.addListener(this);
      }
      _window["default"].addListener(this);
      this.lastTouchDistance = null;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
        this.props.resizeDetector.removeListener(this);
      }
      _window["default"].removeListener(this);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var newZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
      var oldZoom = prevState.visibleTimeEnd - prevState.visibleTimeStart;

      // are we changing zoom? Report it!
      if (this.props.onZoom && newZoom !== oldZoom) {
        this.props.onZoom(this.getTimelineContext(), this.getTimelineUnit());
      }

      // The bounds have changed? Report it!
      if (this.props.onBoundsChange && this.state.canvasTimeStart !== prevState.canvasTimeStart) {
        this.props.onBoundsChange(this.state.canvasTimeStart, this.state.canvasTimeStart + newZoom * 3);
      }

      // Check the scroll is correct
      var scrollLeft = Math.round(this.state.width * (this.state.visibleTimeStart - this.state.canvasTimeStart) / newZoom);
      var componentScrollLeft = Math.round(prevState.width * (prevState.visibleTimeStart - prevState.canvasTimeStart) / oldZoom);
      if (componentScrollLeft !== scrollLeft) {
        this.scrollComponent.scrollLeft = scrollLeft;
        this.scrollHeaderRef.scrollLeft = scrollLeft;
      }
    }
  }, {
    key: "columns",
    value: function columns(canvasTimeStart, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height) {
      return /*#__PURE__*/_react["default"].createElement(_Columns["default"], {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineCount: (0, _generic._length)(this.props.groups),
        minUnit: minUnit,
        timeSteps: timeSteps,
        height: height,
        verticalLineClassNamesForTime: this.props.verticalLineClassNamesForTime
      });
    }
  }, {
    key: "rows",
    value: function rows(canvasWidth, groupHeights, groups, width, canvasTimeStart, canvasTimeEnd, visibleTimeStart, visibleTimeEnd, speedScrollHorizontal, isCreateTaskList, onCreateTaskList, isShowBgColorGroup) {
      return /*#__PURE__*/_react["default"].createElement(_GroupRows["default"], {
        groups: groups,
        canvasWidth: canvasWidth,
        lineCount: (0, _generic._length)(this.props.groups),
        groupHeights: groupHeights,
        clickTolerance: this.props.clickTolerance,
        onRowClick: this.handleRowClick,
        onRowDoubleClick: this.handleRowDoubleClick,
        horizontalLineClassNamesForGroup: this.props.horizontalLineClassNamesForGroup,
        onRowContextClick: this.handleScrollContextMenu,
        width: width,
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd,
        speedScrollHorizontal: speedScrollHorizontal,
        isCreateTaskList: isCreateTaskList,
        onCreateTaskList: onCreateTaskList,
        scrollRef: this.scrollComponent,
        getTimeFromRowClickEvent: this.getTimeFromRowClickEvent,
        onDayToTime: this.handleDayToTime,
        isShowBgColorGroup: isShowBgColorGroup
      });
    }
  }, {
    key: "items",
    value: function items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops, visibleTimeStart) {
      return /*#__PURE__*/_react["default"].createElement(_Items["default"], {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        dimensionItems: dimensionItems,
        groupTops: groupTops,
        items: this.props.items,
        groups: this.props.groups,
        keys: this.props.keys,
        selectedItem: this.state.selectedItem,
        dragSnap: this.props.dragSnap,
        minResizeWidth: this.props.minResizeWidth,
        canChangeGroup: this.props.canChangeGroup,
        canMove: this.props.canMove,
        canResize: this.props.canResize,
        useResizeHandle: this.props.useResizeHandle,
        canSelect: this.props.canSelect,
        moveResizeValidator: this.props.moveResizeValidator,
        itemSelect: this.selectItem,
        itemDrag: this.dragItem,
        itemDrop: this.dropItem,
        onItemDoubleClick: this.doubleClickItem,
        onItemContextMenu: this.props.onItemContextMenu ? this.contextMenuClickItem : undefined,
        itemResizing: this.resizingItem,
        itemResized: this.resizedItem,
        itemRenderer: this.props.itemRenderer,
        selected: this.props.selected,
        scrollRef: this.scrollComponent,
        isHoverToSelectedItem: this.props.isHoverToSelectedItem,
        isGembaMode: this.props.isGembaMode,
        visibleTimeStart: visibleTimeStart
      });
    }
  }, {
    key: "sidebar",
    value: function sidebar(height, groupHeights) {
      var _this$props3 = this.props,
        sidebarWidth = _this$props3.sidebarWidth,
        canSortableGroups = _this$props3.canSortableGroups,
        isShowDragHandleButton = _this$props3.isShowDragHandleButton,
        sortOrderTaskList = _this$props3.sortOrderTaskList,
        openAddGroupForm = _this$props3.openAddGroupForm;
      return sidebarWidth && /*#__PURE__*/_react["default"].createElement(_Sidebar["default"], {
        groups: this.props.groups,
        groupRenderer: this.props.groupRenderer,
        keys: this.props.keys,
        width: sidebarWidth,
        groupHeights: groupHeights,
        height: height,
        isShowInforGemba: this.props.isShowInforGemba,
        canSortableGroups: canSortableGroups,
        isShowDragHandleButton: isShowDragHandleButton,
        sortOrderTaskList: sortOrderTaskList,
        openAddGroupForm: openAddGroupForm
      });
    }
  }, {
    key: "rightSidebar",
    value: function rightSidebar(height, groupHeights) {
      var _this$props4 = this.props,
        rightSidebarWidth = _this$props4.rightSidebarWidth,
        canSortableGroups = _this$props4.canSortableGroups,
        isShowDragHandleButton = _this$props4.isShowDragHandleButton,
        sortOrderTaskList = _this$props4.sortOrderTaskList,
        openAddGroupForm = _this$props4.openAddGroupForm;
      return rightSidebarWidth && /*#__PURE__*/_react["default"].createElement(_Sidebar["default"], {
        groups: this.props.groups,
        keys: this.props.keys,
        groupRenderer: this.props.groupRenderer,
        isRightSidebar: true,
        width: rightSidebarWidth,
        groupHeights: groupHeights,
        height: height,
        isShowInforGemba: this.props.isShowInforGemba,
        canSortableGroups: canSortableGroups,
        isShowDragHandleButton: isShowDragHandleButton,
        sortOrderTaskList: sortOrderTaskList,
        openAddGroupForm: openAddGroupForm
      });
    }
  }, {
    key: "childrenWithProps",
    value: function childrenWithProps(canvasTimeStart, canvasTimeEnd, canvasWidth, dimensionItems, groupHeights, groupTops, height, visibleTimeStart, visibleTimeEnd, minUnit, timeSteps) {
      var _this3 = this;
      if (!this.props.children) {
        return null;
      }

      // convert to an array and remove the nulls
      var childArray = Array.isArray(this.props.children) ? this.props.children.filter(function (c) {
        return c;
      }) : [this.props.children];
      var childProps = {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd,
        dimensionItems: dimensionItems,
        items: this.props.items,
        groups: this.props.groups,
        keys: this.props.keys,
        groupHeights: groupHeights,
        groupTops: groupTops,
        selected: this.getSelected(),
        height: height,
        minUnit: minUnit,
        timeSteps: timeSteps
      };
      return _react["default"].Children.map(childArray, function (child) {
        if (!_this3.isTimelineHeader(child)) {
          return /*#__PURE__*/_react["default"].cloneElement(child, childProps);
        } else {
          return null;
        }
      });
    }
  }, {
    key: "getSelected",
    value: function getSelected() {
      return this.state.selectedItem && !this.props.selected ? [this.state.selectedItem] : this.props.selected || [];
    }
  }, {
    key: "hasSelectedItem",
    value: function hasSelectedItem() {
      if (!Array.isArray(this.props.selected)) return !!this.state.selectedItem;
      return this.props.selected.length > 0;
    }
  }, {
    key: "isItemSelected",
    value: function isItemSelected(itemId) {
      var selectedItems = this.getSelected();
      return selectedItems.some(function (i) {
        return i === itemId;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var _this$props5 = this.props,
        items = _this$props5.items,
        groups = _this$props5.groups,
        sidebarWidth = _this$props5.sidebarWidth,
        rightSidebarWidth = _this$props5.rightSidebarWidth,
        timeSteps = _this$props5.timeSteps,
        traditionalZoom = _this$props5.traditionalZoom,
        buffer = _this$props5.buffer,
        canMoveChart = _this$props5.canMoveChart,
        speedScrollHorizontal = _this$props5.speedScrollHorizontal,
        isCreateTaskList = _this$props5.isCreateTaskList,
        onCreateTaskList = _this$props5.onCreateTaskList,
        isShowBgColorGroup = _this$props5.isShowBgColorGroup;
      var _this$state5 = this.state,
        draggingItem = _this$state5.draggingItem,
        resizingItem = _this$state5.resizingItem,
        width = _this$state5.width,
        visibleTimeStart = _this$state5.visibleTimeStart,
        visibleTimeEnd = _this$state5.visibleTimeEnd,
        canvasTimeStart = _this$state5.canvasTimeStart,
        canvasTimeEnd = _this$state5.canvasTimeEnd;
      var _this$state6 = this.state,
        dimensionItems = _this$state6.dimensionItems,
        height = _this$state6.height,
        groupHeights = _this$state6.groupHeights,
        groupTops = _this$state6.groupTops;
      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasWidth = (0, _calendar.getCanvasWidth)(width, buffer);
      var minUnit = (0, _calendar.getMinUnit)(zoom, width, timeSteps);
      var isInteractingWithItem = !!draggingItem || !!resizingItem || !canMoveChart;
      if (isInteractingWithItem) {
        var stackResults = (0, _calendar.stackTimelineItems)(items, groups, canvasWidth, this.state.canvasTimeStart, this.state.canvasTimeEnd, this.props.keys, this.props.lineHeight, this.props.itemHeightRatio, this.props.stackItems, this.state.draggingItem, this.state.resizingItem, this.state.dragTime, this.state.resizingEdge, this.state.resizeTime, this.state.newGroupOrder);
        dimensionItems = stackResults.dimensionItems;
        height = stackResults.height;
        groupHeights = stackResults.groupHeights;
        groupTops = stackResults.groupTops;
      }
      var outerComponentStyle = {
        height: "".concat(height + 20, "px") // 20px because custom scroll-y
      };
      return /*#__PURE__*/_react["default"].createElement(_TimelineStateContext.TimelineStateProvider, {
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd,
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        showPeriod: this.showPeriod,
        timelineUnit: minUnit,
        timelineWidth: this.state.width
      }, /*#__PURE__*/_react["default"].createElement(_TimelineMarkersContext.TimelineMarkersProvider, null, /*#__PURE__*/_react["default"].createElement(_HeadersContext.TimelineHeadersProvider, {
        registerScroll: this.handleHeaderRef,
        timeSteps: timeSteps,
        leftSidebarWidth: this.props.sidebarWidth,
        rightSidebarWidth: this.props.rightSidebarWidth
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: this.props.style,
        ref: function ref(el) {
          return _this4.container = el;
        },
        className: "react-calendar-timeline ".concat(this.props.className)
      }, this.renderHeaders(), /*#__PURE__*/_react["default"].createElement("div", {
        style: outerComponentStyle,
        className: "rct-outer"
      }, sidebarWidth > 0 ? this.sidebar(height, groupHeights) : null, /*#__PURE__*/_react["default"].createElement(_ScrollElement["default"], {
        scrollRef: this.getScrollElementRef,
        width: width,
        height: height,
        onZoom: this.changeZoom,
        onWheelZoom: this.handleWheelZoom,
        traditionalZoom: traditionalZoom,
        onScroll: this.onScroll,
        isInteractingWithItem: isInteractingWithItem
      }, /*#__PURE__*/_react["default"].createElement(_MarkerCanvas["default"], null, this.columns(canvasTimeStart, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height), this.rows(canvasWidth, groupHeights, groups, width, canvasTimeStart, canvasTimeEnd, visibleTimeStart, visibleTimeEnd, speedScrollHorizontal, isCreateTaskList, onCreateTaskList, isShowBgColorGroup), this.items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops, visibleTimeStart), this.childrenWithProps(canvasTimeStart, canvasTimeEnd, canvasWidth, dimensionItems, groupHeights, groupTops, height, visibleTimeStart, visibleTimeEnd, minUnit, timeSteps))), (groups === null || groups === void 0 ? void 0 : groups.length) && !canMoveChart && /*#__PURE__*/_react["default"].createElement("div", {
        className: "scroll-temporary-container"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "scroll-temporary-header"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "scroll-temporary-body",
        ref: this.refHandler
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "content"
      }, "\xA0"))), rightSidebarWidth > 0 ? this.rightSidebar(height, groupHeights) : null)))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var visibleTimeStart = nextProps.visibleTimeStart,
        visibleTimeEnd = nextProps.visibleTimeEnd,
        items = nextProps.items,
        groups = nextProps.groups;

      // This is a gross hack pushing items and groups in to state only to allow
      // For the forceUpdate check
      var derivedState = {
        items: items,
        groups: groups
      };

      // if the items or groups have changed we must re-render
      var forceUpdate = items !== prevState.items || groups !== prevState.groups;

      // We are a controlled component
      if (visibleTimeStart && visibleTimeEnd) {
        // Get the new canvas position
        Object.assign(derivedState, (0, _calendar.calculateScrollCanvas)(visibleTimeStart, visibleTimeEnd, forceUpdate, items, groups, nextProps, prevState));
      } else if (forceUpdate) {
        // Calculate new item stack position as canvas may have changed
        var canvasWidth = (0, _calendar.getCanvasWidth)(prevState.width, nextProps.buffer);
        Object.assign(derivedState, (0, _calendar.stackTimelineItems)(items, groups, canvasWidth, prevState.canvasTimeStart, prevState.canvasTimeEnd, nextProps.keys, nextProps.lineHeight, nextProps.itemHeightRatio, nextProps.stackItems, prevState.draggingItem, prevState.resizingItem, prevState.dragTime, prevState.resizingEdge, prevState.resizeTime, prevState.newGroupOrder));
      }

      // check update time

      return derivedState;
    }
  }]);
}(_react.Component);
_defineProperty(ReactCalendarTimeline, "propTypes", {
  groups: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]).isRequired,
  items: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]).isRequired,
  sidebarWidth: _propTypes["default"].number,
  rightSidebarWidth: _propTypes["default"].number,
  dragSnap: _propTypes["default"].number,
  minResizeWidth: _propTypes["default"].number,
  lineHeight: _propTypes["default"].number,
  itemHeightRatio: _propTypes["default"].number,
  minZoom: _propTypes["default"].number,
  maxZoom: _propTypes["default"].number,
  buffer: _propTypes["default"].number,
  clickTolerance: _propTypes["default"].number,
  canChangeGroup: _propTypes["default"].bool,
  canMove: _propTypes["default"].bool,
  canResize: _propTypes["default"].oneOf([true, false, 'left', 'right', 'both']),
  useResizeHandle: _propTypes["default"].bool,
  canSelect: _propTypes["default"].bool,
  stackItems: _propTypes["default"].bool,
  traditionalZoom: _propTypes["default"].bool,
  itemTouchSendsClick: _propTypes["default"].bool,
  horizontalLineClassNamesForGroup: _propTypes["default"].func,
  onItemMove: _propTypes["default"].func,
  onItemResize: _propTypes["default"].func,
  onItemClick: _propTypes["default"].func,
  onItemSelect: _propTypes["default"].func,
  onItemDeselect: _propTypes["default"].func,
  onCanvasClick: _propTypes["default"].func,
  onItemDoubleClick: _propTypes["default"].func,
  onItemContextMenu: _propTypes["default"].func,
  onCanvasDoubleClick: _propTypes["default"].func,
  onCanvasContextMenu: _propTypes["default"].func,
  onZoom: _propTypes["default"].func,
  onItemDrag: _propTypes["default"].func,
  moveResizeValidator: _propTypes["default"].func,
  itemRenderer: _propTypes["default"].func,
  groupRenderer: _propTypes["default"].func,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  keys: _propTypes["default"].shape({
    groupIdKey: _propTypes["default"].string,
    groupTitleKey: _propTypes["default"].string,
    groupLabelKey: _propTypes["default"].string,
    groupRightTitleKey: _propTypes["default"].string,
    itemIdKey: _propTypes["default"].string,
    itemTitleKey: _propTypes["default"].string,
    itemDivTitleKey: _propTypes["default"].string,
    itemGroupKey: _propTypes["default"].string,
    itemTimeStartKey: _propTypes["default"].string,
    itemTimeEndKey: _propTypes["default"].string
  }),
  headerRef: _propTypes["default"].func,
  scrollRef: _propTypes["default"].func,
  timeSteps: _propTypes["default"].shape({
    second: _propTypes["default"].number,
    minute: _propTypes["default"].number,
    hour: _propTypes["default"].number,
    day: _propTypes["default"].number,
    month: _propTypes["default"].number,
    year: _propTypes["default"].number
  }),
  defaultTimeStart: _propTypes["default"].object,
  defaultTimeEnd: _propTypes["default"].object,
  visibleTimeStart: _propTypes["default"].number,
  visibleTimeEnd: _propTypes["default"].number,
  onTimeChange: _propTypes["default"].func,
  onBoundsChange: _propTypes["default"].func,
  selected: _propTypes["default"].array,
  resizeDetector: _propTypes["default"].shape({
    addListener: _propTypes["default"].func,
    removeListener: _propTypes["default"].func
  }),
  verticalLineClassNamesForTime: _propTypes["default"].func,
  children: _propTypes["default"].node,
  //Custom
  isHoverToSelectedItem: _propTypes["default"].bool,
  isShowInforGemba: _propTypes["default"].bool,
  isGembaMode: _propTypes["default"].bool,
  canSortableGroups: _propTypes["default"].bool,
  isShowDragHandleButton: _propTypes["default"].bool,
  sortOrderTaskList: _propTypes["default"].func,
  openAddGroupForm: _propTypes["default"].func,
  canMoveChart: _propTypes["default"].bool,
  isCreateTaskList: _propTypes["default"].bool,
  onCreateTaskList: _propTypes["default"].func,
  isShowBgColorGroup: _propTypes["default"].bool
});
_defineProperty(ReactCalendarTimeline, "defaultProps", {
  sidebarWidth: 150,
  rightSidebarWidth: 0,
  dragSnap: 1000 * 60 * 15,
  // 15min
  minResizeWidth: 10,
  speedScrollHorizontal: 5,
  // scroll speed when moving or resizing
  lineHeight: 30,
  itemHeightRatio: 0.65,
  buffer: 6,
  minZoom: 60 * 60 * 1000,
  // 1 hour
  maxZoom: 5 * 365.24 * 86400 * 1000,
  // 5 years

  clickTolerance: 3,
  // how many pixels can we drag for it to be still considered a click?

  canChangeGroup: true,
  canMove: true,
  canResize: 'right',
  useResizeHandle: false,
  canSelect: true,
  stackItems: false,
  traditionalZoom: false,
  horizontalLineClassNamesForGroup: null,
  onItemMove: null,
  onItemResize: null,
  onItemClick: null,
  onItemSelect: null,
  onItemDeselect: null,
  onItemDrag: null,
  onCanvasClick: null,
  onItemDoubleClick: null,
  onItemContextMenu: null,
  onZoom: null,
  verticalLineClassNamesForTime: null,
  moveResizeValidator: null,
  dayBackground: null,
  defaultTimeStart: null,
  defaultTimeEnd: null,
  itemTouchSendsClick: false,
  style: {},
  className: '',
  keys: _defaultConfig.defaultKeys,
  timeSteps: _defaultConfig.defaultTimeSteps,
  headerRef: function headerRef() {},
  scrollRef: function scrollRef() {},
  // if you pass in visibleTimeStart and visibleTimeEnd, you must also pass onTimeChange(visibleTimeStart, visibleTimeEnd),
  // which needs to update the props visibleTimeStart and visibleTimeEnd to the ones passed
  visibleTimeStart: null,
  visibleTimeEnd: null,
  onTimeChange: function onTimeChange(visibleTimeStart, visibleTimeEnd, updateScrollCanvas) {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  },
  // called when the canvas area of the calendar changes
  onBoundsChange: null,
  children: null,
  selected: null,
  //Custom
  isHoverToSelectedItem: false,
  isShowInforGemba: true,
  isGembaMode: true,
  canSortableGroups: false,
  isShowDragHandleButton: false,
  sortOrderTaskList: null,
  openAddGroupForm: null,
  canMoveChart: false,
  isCreateTaskList: false,
  onCreateTaskList: function () {
    var _onCreateTaskList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(group, startTime, endTime) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function onCreateTaskList(_x, _x2, _x3) {
      return _onCreateTaskList.apply(this, arguments);
    }
    return onCreateTaskList;
  }(),
  isShowBgColorGroup: false
});
_defineProperty(ReactCalendarTimeline, "childContextTypes", {
  getTimelineContext: _propTypes["default"].func
});