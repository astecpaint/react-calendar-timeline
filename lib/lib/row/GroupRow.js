"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _PreventClickOnDrag = _interopRequireDefault(require("../interaction/PreventClickOnDrag"));
var _calendar = require("../utility/calendar");
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
var HEIGHT_GEMBA = 23,
  SPACING_TOP_ROW = 7,
  BG_COLOR_TASK = '#8CD1FF',
  MIN_WIDTH_TASK = 52,
  COUNT_TIME = 4,
  MAX_NUMBER_OF_DRAG_DAYS = 59,
  HEIGHT_ROW_TASK = 60,
  BG_COLOR_GROUP_TASK = 'rgba(203, 228, 254, 0.3)',
  HEIGHT_ROW_GEMBA = 64,
  OPACITY_ROW_TASK = 0.15;
var GroupRow = /*#__PURE__*/function (_Component) {
  function GroupRow(props) {
    var _this;
    _classCallCheck(this, GroupRow);
    _this = _callSuper(this, GroupRow, [props]);
    _defineProperty(_this, "renderCreateTask", function (group, countTime, left, width) {
      if (countTime < COUNT_TIME) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          position: 'absolute',
          left: "".concat(left, "px"),
          top: "".concat(SPACING_TOP_ROW, "px"),
          height: "".concat(HEIGHT_GEMBA, "px"),
          width: "".concat(width, "px"),
          minWidth: "".concat(MIN_WIDTH_TASK, "px"),
          backgroundColor: BG_COLOR_TASK,
          borderRadius: '6px',
          paddingLeft: '5px',
          display: 'flex',
          alignItems: 'center',
          zIndex: 2
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          whiteSpace: 'nowrap'
        }
      }, group === null || group === void 0 ? void 0 : group.title));
    });
    _defineProperty(_this, "renderBgColor", function (isShowBgColorGroup, group, canvasTimeStart, canvasTimeEnd, canvasWidth, isCreateTaskList) {
      var isHide = group.isHide,
        isEmptyGroup = group.isEmptyGroup,
        task = group.task,
        minBeginDate = group.minBeginDate,
        maxEndDate = group.maxEndDate,
        isTaskList = group.isTaskList,
        expanded = group.expanded,
        isCustomGroup = group.isCustomGroup;
      var _ref = task !== null && task !== void 0 ? task : {},
        isEmptySubGroup = _ref.isEmptySubGroup,
        task_color = _ref.task_color,
        parent_task_color = _ref.parent_task_color;
      var newIsHide = !isTaskList ? isHide : isHide || !expanded;
      if (!isShowBgColorGroup || newIsHide || isEmptyGroup || isEmptySubGroup || !minBeginDate || !maxEndDate) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
      }
      var timeStartDate = (0, _moment["default"])(minBeginDate).valueOf();
      var timeEndDate = (0, _moment["default"])(maxEndDate).set({
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 59
      }).valueOf();
      var left = (0, _calendar.calculateXPositionForTime)(canvasTimeStart, canvasTimeEnd, canvasWidth, timeStartDate);
      var right = (0, _calendar.calculateXPositionForTime)(canvasTimeStart, canvasTimeEnd, canvasWidth, timeEndDate);
      var width = right - left;
      var bgColor = isTaskList || isCustomGroup ? task_color : parent_task_color;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          position: 'absolute',
          width: width,
          top: 0,
          left: left,
          height: "".concat(isCreateTaskList ? HEIGHT_ROW_TASK : HEIGHT_ROW_GEMBA, "px"),
          backgroundColor: bgColor !== null && bgColor !== void 0 ? bgColor : BG_COLOR_GROUP_TASK,
          opacity: bgColor ? OPACITY_ROW_TASK : 1,
          zIndex: 1
        }
      });
    });
    _defineProperty(_this, "calendarScrollWithTime", function (scrollLeft) {
      var _this$props = _this.props,
        width = _this$props.width,
        canvasTimeStart = _this$props.canvasTimeStart,
        visibleTimeStart = _this$props.visibleTimeStart,
        visibleTimeEnd = _this$props.visibleTimeEnd,
        speedScrollHorizontal = _this$props.speedScrollHorizontal;
      var zoom = visibleTimeEnd - visibleTimeStart;
      var visibleTimeStartOld = canvasTimeStart + zoom * scrollLeft / width;
      var newVisibleTimeStart = canvasTimeStart + zoom * (scrollLeft + speedScrollHorizontal) / width;
      var visibleTimeChange = newVisibleTimeStart - visibleTimeStartOld;
      return visibleTimeChange;
    });
    _defineProperty(_this, "calendarStopAutoScroll", function (timeStart) {
      var newTimeStart = new Date(timeStart);
      var dayStartToTime = newTimeStart.getTime();
      var endScrollLeft = Number(dayStartToTime) - Number(_this.props.onDayToTime(MAX_NUMBER_OF_DRAG_DAYS));
      var endScrollRight = Number(dayStartToTime) + Number(_this.props.onDayToTime(MAX_NUMBER_OF_DRAG_DAYS));
      return {
        endScrollLeft: endScrollLeft,
        endScrollRight: endScrollRight
      };
    });
    _defineProperty(_this, "handleMouseDown", function (e) {
      var _group$task, _group$task2;
      var _this$props2 = _this.props,
        group = _this$props2.group,
        isCreateTaskList = _this$props2.isCreateTaskList,
        getTimeFromRowClickEvent = _this$props2.getTimeFromRowClickEvent;
      if (!isCreateTaskList || (0, _calendar.checkValueDate)(group === null || group === void 0 || (_group$task = group.task) === null || _group$task === void 0 ? void 0 : _group$task.begin_date) && (0, _calendar.checkValueDate)(group === null || group === void 0 || (_group$task2 = group.task) === null || _group$task2 === void 0 ? void 0 : _group$task2.end_date) || !!(group !== null && group !== void 0 && group.isEmptyGroup) || !!(group !== null && group !== void 0 && group.isAddinationForm)) {
        return;
      }
      _this.startTimeTaskCreating = getTimeFromRowClickEvent(e);
      _this.intervalTouchTime = setInterval(function () {
        if (this.state.countTime < COUNT_TIME) {
          this.setState({
            countTime: this.state.countTime + 1
          });
        } else {
          document.querySelector('.rct-horizontal-lines').style.cursor = 'pointer';
        }
      }.bind(_this), 500);
    });
    _defineProperty(_this, "handleMouseUp", function () {
      if (!_this.intervalTouchTime) return;
      clearInterval(_this.intervalTouchTime);
      _this.intervalTouchTime = null;
    });
    _defineProperty(_this, "handleResetData", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
        var _this$props3, isCreateTaskList, group, getTimeFromRowClickEvent, endTime, endDate, maxEndDate, startDate, minStartDate;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this$props3 = _this.props, isCreateTaskList = _this$props3.isCreateTaskList, group = _this$props3.group, getTimeFromRowClickEvent = _this$props3.getTimeFromRowClickEvent;
              if (isCreateTaskList) {
                _context.next = 3;
                break;
              }
              return _context.abrupt("return");
            case 3:
              endTime = _this.endTimeTmp || getTimeFromRowClickEvent(e);
              if (!(endTime >= _this.startTimeTaskCreating)) {
                _context.next = 12;
                break;
              }
              endDate = endTime;
              maxEndDate = (0, _moment["default"])(_this.startTimeTaskCreating).add(MAX_NUMBER_OF_DRAG_DAYS, 'days').valueOf();
              if (endDate > maxEndDate) {
                endDate = maxEndDate;
              }
              _context.next = 10;
              return _this.props.onCreateTaskList(group, _this.startTimeTaskCreating, endDate);
            case 10:
              _context.next = 17;
              break;
            case 12:
              startDate = endTime;
              minStartDate = (0, _moment["default"])(_this.startTimeTaskCreating).add(-MAX_NUMBER_OF_DRAG_DAYS, 'days').valueOf();
              if (startDate < minStartDate) {
                startDate = minStartDate;
              }
              _context.next = 17;
              return _this.props.onCreateTaskList(group, startDate, _this.startTimeTaskCreating);
            case 17:
              clearInterval(_this.intervalTouchTime);
              clearInterval(_this.refreshIntervalId);
              document.querySelector('.rct-horizontal-lines').style.cursor = 'default';
              _this.startTimeTaskCreating = 0;
              _this.endTimeTmp = 0;
              _this.intervalTouchTime = null;
              _this.refreshIntervalId = null;
              _this.setState({
                left: 0,
                width: 0,
                countTime: 0,
                isOutChart: false
              });
            case 25:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
    _defineProperty(_this, "handleMouseMove", function (e) {
      var _this$props4 = _this.props,
        canvasTimeStart = _this$props4.canvasTimeStart,
        canvasTimeEnd = _this$props4.canvasTimeEnd,
        visibleTimeStart = _this$props4.visibleTimeStart,
        visibleTimeEnd = _this$props4.visibleTimeEnd,
        speedScrollHorizontal = _this$props4.speedScrollHorizontal,
        isCreateTaskList = _this$props4.isCreateTaskList,
        scrollRef = _this$props4.scrollRef,
        getTimeFromRowClickEvent = _this$props4.getTimeFromRowClickEvent,
        onDayToTime = _this$props4.onDayToTime,
        canvasWidth = _this$props4.canvasWidth;
      if (!isCreateTaskList || _this.state.countTime < COUNT_TIME || !scrollRef) {
        return;
      }
      var timeStart = _this.startTimeTaskCreating,
        timeEnd = getTimeFromRowClickEvent(e),
        newVisibleTimeStart = visibleTimeStart + onDayToTime(0.5),
        newVisibleTimeEnd = visibleTimeEnd - onDayToTime(0.5),
        isDragToLeftInChart = timeEnd <= timeStart,
        isDragToLeftOutChart = timeEnd < newVisibleTimeStart;
      var _this$calendarStopAut = _this.calendarStopAutoScroll(timeStart),
        endScrollLeft = _this$calendarStopAut.endScrollLeft,
        endScrollRight = _this$calendarStopAut.endScrollRight;
      if (timeEnd <= endScrollLeft || timeEnd >= endScrollRight) return;else if (newVisibleTimeStart < timeEnd && newVisibleTimeEnd > timeEnd || newVisibleTimeStart >= timeEnd && timeStart <= timeEnd && visibleTimeStart < timeStart || newVisibleTimeEnd <= timeEnd && timeStart > timeEnd && visibleTimeEnd > timeStart) {
        if (_this.state.isOutChart) {
          clearInterval(_this.refreshIntervalId);
          _this.refreshIntervalId = null;
          _this.setState({
            isOutChart: false
          });
        }
        var left = (0, _calendar.calculateXPositionForTime)(canvasTimeStart, canvasTimeEnd, canvasWidth, isDragToLeftInChart ? timeEnd : timeStart);
        var right = (0, _calendar.calculateXPositionForTime)(canvasTimeStart, canvasTimeEnd, canvasWidth, isDragToLeftInChart ? timeStart : timeEnd);
        var width = right - left;
        _this.setState({
          width: width,
          left: left
        });
        _this.endTimeTmp = timeEnd;
        return;
      } else {
        if (!_this.endTimeTmp) {
          _this.endTimeTmp = timeEnd;
        }
        if (!_this.state.isOutChart) {
          _this.refreshIntervalId = setInterval(function () {
            var isStartSmallerThanEnd = _this.startTimeTaskCreating < _this.endTimeTmp;
            var scrollLeft = scrollRef.scrollLeft;
            var leftScroll = scrollLeft + speedScrollHorizontal,
              scrollTime = _this.calendarScrollWithTime(scrollLeft),
              right = 0,
              left = _this.state.left;
            if (_this.endTimeTmp < endScrollLeft || _this.endTimeTmp > endScrollRight) {
              clearInterval(_this.refreshIntervalId);
              return;
            }
            if (isDragToLeftOutChart) {
              leftScroll = scrollLeft - speedScrollHorizontal;
              scrollTime = -scrollTime;
            }
            scrollRef.scroll({
              left: leftScroll
            });
            if (isDragToLeftOutChart) {
              right = (0, _calendar.calculateXPositionForTime)(canvasTimeStart, canvasTimeEnd, canvasWidth, isStartSmallerThanEnd ? _this.endTimeTmp : timeStart);
              var oldTimeStart = (0, _calendar.calculateTimeForXPosition)(canvasTimeStart, canvasTimeEnd, canvasWidth, _this.state.left);
              left = (0, _calendar.calculateXPositionForTime)(canvasTimeStart, canvasTimeEnd, canvasWidth, isStartSmallerThanEnd ? oldTimeStart + scrollTime : _this.endTimeTmp);
            } else {
              var oldTimeEnd = (0, _calendar.calculateTimeForXPosition)(canvasTimeStart, canvasTimeEnd, canvasWidth, left + _this.state.width);
              right = (0, _calendar.calculateXPositionForTime)(canvasTimeStart, canvasTimeEnd, canvasWidth, isStartSmallerThanEnd ? _this.endTimeTmp : oldTimeEnd + scrollTime);
              left = (0, _calendar.calculateXPositionForTime)(canvasTimeStart, canvasTimeEnd, canvasWidth, isStartSmallerThanEnd ? _this.startTimeTaskCreating : _this.endTimeTmp);
            }
            var width = right - left;
            _this.setState({
              width: width,
              left: left
            });
            _this.endTimeTmp += scrollTime;
          }, 10);
          _this.setState({
            isOutChart: true
          });
        }
      }
    });
    _this.state = {
      left: 0,
      width: 0,
      countTime: 0,
      isOutChart: false
    };
    _this.intervalTouchTime = null;
    _this.startTimeTaskCreating = 0;
    _this.refreshIntervalId = null;
    _this.endTimeTmp = 0;
    return _this;
  }
  _inherits(GroupRow, _Component);
  return _createClass(GroupRow, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.countTime >= COUNT_TIME) {
        window.addEventListener('mouseup', this.handleResetData, true);
      } else {
        window.removeEventListener('mouseup', this.handleResetData, true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
        onContextMenu = _this$props5.onContextMenu,
        onDoubleClick = _this$props5.onDoubleClick,
        isEvenRow = _this$props5.isEvenRow,
        style = _this$props5.style,
        onClick = _this$props5.onClick,
        clickTolerance = _this$props5.clickTolerance,
        horizontalLineClassNamesForGroup = _this$props5.horizontalLineClassNamesForGroup,
        group = _this$props5.group,
        canvasTimeStart = _this$props5.canvasTimeStart,
        canvasTimeEnd = _this$props5.canvasTimeEnd,
        canvasWidth = _this$props5.canvasWidth,
        isShowBgColorGroup = _this$props5.isShowBgColorGroup,
        isCreateTaskList = _this$props5.isCreateTaskList,
        index = _this$props5.index,
        itemPositionDisplayed = _this$props5.itemPositionDisplayed;
      var _this$state = this.state,
        countTime = _this$state.countTime,
        left = _this$state.left,
        width = _this$state.width;
      var classNamesForGroup = [];
      if (horizontalLineClassNamesForGroup) {
        classNamesForGroup = horizontalLineClassNamesForGroup(group);
      }
      var start = itemPositionDisplayed.start,
        end = itemPositionDisplayed.end;
      return /*#__PURE__*/_react["default"].createElement(_PreventClickOnDrag["default"], {
        clickTolerance: clickTolerance,
        onClick: onClick,
        onRowMouseDown: this.handleMouseDown,
        onRowMouseUp: this.handleMouseUp,
        onRowMouseMove: this.handleMouseMove
      }, /*#__PURE__*/_react["default"].createElement("div", {
        onContextMenu: onContextMenu,
        onDoubleClick: onDoubleClick,
        className: (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') + (classNamesForGroup ? classNamesForGroup.join(' ') : ''),
        style: style
      }, index >= start && index <= end && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, this.renderCreateTask(group, countTime, left, width), this.renderBgColor(isShowBgColorGroup, group, canvasTimeStart, canvasTimeEnd, canvasWidth, isCreateTaskList))));
    }
  }]);
}(_react.Component);
_defineProperty(GroupRow, "propTypes", {
  onClick: _propTypes["default"].func.isRequired,
  onDoubleClick: _propTypes["default"].func.isRequired,
  onContextMenu: _propTypes["default"].func.isRequired,
  isEvenRow: _propTypes["default"].bool.isRequired,
  style: _propTypes["default"].object.isRequired,
  clickTolerance: _propTypes["default"].number.isRequired,
  group: _propTypes["default"].object.isRequired,
  horizontalLineClassNamesForGroup: _propTypes["default"].func,
  width: _propTypes["default"].number.isRequired,
  canvasTimeStart: _propTypes["default"].number.isRequired,
  canvasTimeEnd: _propTypes["default"].number.isRequired,
  visibleTimeStart: _propTypes["default"].number.isRequired,
  visibleTimeEnd: _propTypes["default"].number.isRequired,
  speedScrollHorizontal: _propTypes["default"].number.isRequired,
  isCreateTaskList: _propTypes["default"].bool.isRequired,
  onCreateTaskList: _propTypes["default"].func.isRequired,
  scrollRef: _propTypes["default"].object,
  getTimeFromRowClickEvent: _propTypes["default"].func.isRequired,
  onDayToTime: _propTypes["default"].func.isRequired,
  canvasWidth: _propTypes["default"].number.isRequired,
  isShowBgColorGroup: _propTypes["default"].bool.isRequired,
  index: _propTypes["default"].number.isRequired,
  itemPositionDisplayed: _propTypes["default"].object.isRequired
});
var _default = exports["default"] = GroupRow;