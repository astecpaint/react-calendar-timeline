import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Items from './items/Items'
import Sidebar from './layout/Sidebar'
import Columns from './columns/Columns'
import GroupRows from './row/GroupRows'
import ScrollElement from './scroll/ScrollElement'
import MarkerCanvas from './markers/MarkerCanvas'
import windowResizeDetector from '../resize-detector/window'

import {
  getMinUnit,
  calculateTimeForXPosition,
  calculateScrollCanvas,
  getCanvasBoundariesFromVisibleTime,
  getCanvasWidth,
  stackTimelineItems
} from './utility/calendar'
import { _get, _length } from './utility/generic'
import { defaultKeys, defaultTimeSteps } from './default-config'
import { TimelineStateProvider } from './timeline/TimelineStateContext'
import { TimelineMarkersProvider } from './markers/TimelineMarkersContext'
import { TimelineHeadersProvider } from './headers/HeadersContext'
import TimelineHeaders from './headers/TimelineHeaders'
import DateHeader from './headers/DateHeader'

export const DEFAULT_HEIGHT_ROW = 64,
  DEFAULT_HEIGHT_ROW_PROCESS_BASIC = 60,
  DEFAULT_HEIGHT_HEADER = 112,
  DEFAULT_ROW_DISPLAYED = 12,
  DEFAULT_BUFFER_ROW = 1,
  DEFAULT_SCROLL_TOP = 0,
  DEFAULT_BUFFER_ROW_IN_SIDEBAR = 2

export default class ReactCalendarTimeline extends Component {
  static propTypes = {
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    sidebarWidth: PropTypes.number,
    rightSidebarWidth: PropTypes.number,
    dragSnap: PropTypes.number,
    minResizeWidth: PropTypes.number,
    lineHeight: PropTypes.number,
    itemHeightRatio: PropTypes.number,

    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    buffer: PropTypes.number,

    clickTolerance: PropTypes.number,

    canChangeGroup: PropTypes.bool,
    canMove: PropTypes.bool,
    canResize: PropTypes.oneOf([true, false, 'left', 'right', 'both']),
    useResizeHandle: PropTypes.bool,
    canSelect: PropTypes.bool,

    stackItems: PropTypes.bool,

    traditionalZoom: PropTypes.bool,

    itemTouchSendsClick: PropTypes.bool,

    horizontalLineClassNamesForGroup: PropTypes.func,

    onItemMove: PropTypes.func,
    onItemResize: PropTypes.func,
    onItemClick: PropTypes.func,
    onItemSelect: PropTypes.func,
    onItemDeselect: PropTypes.func,
    onCanvasClick: PropTypes.func,
    onItemDoubleClick: PropTypes.func,
    onItemContextMenu: PropTypes.func,
    onCanvasDoubleClick: PropTypes.func,
    onCanvasContextMenu: PropTypes.func,
    onZoom: PropTypes.func,
    onItemDrag: PropTypes.func,

    moveResizeValidator: PropTypes.func,

    itemRenderer: PropTypes.func,
    groupRenderer: PropTypes.func,

    className: PropTypes.string,
    style: PropTypes.object,

    keys: PropTypes.shape({
      groupIdKey: PropTypes.string,
      groupTitleKey: PropTypes.string,
      groupLabelKey: PropTypes.string,
      groupRightTitleKey: PropTypes.string,
      itemIdKey: PropTypes.string,
      itemTitleKey: PropTypes.string,
      itemDivTitleKey: PropTypes.string,
      itemGroupKey: PropTypes.string,
      itemTimeStartKey: PropTypes.string,
      itemTimeEndKey: PropTypes.string
    }),
    headerRef: PropTypes.func,
    scrollRef: PropTypes.func,

    timeSteps: PropTypes.shape({
      second: PropTypes.number,
      minute: PropTypes.number,
      hour: PropTypes.number,
      day: PropTypes.number,
      month: PropTypes.number,
      year: PropTypes.number
    }),

    defaultTimeStart: PropTypes.object,
    defaultTimeEnd: PropTypes.object,

    visibleTimeStart: PropTypes.number,
    visibleTimeEnd: PropTypes.number,
    onTimeChange: PropTypes.func,
    onBoundsChange: PropTypes.func,

    selected: PropTypes.array,

    resizeDetector: PropTypes.shape({
      addListener: PropTypes.func,
      removeListener: PropTypes.func
    }),

    verticalLineClassNamesForTime: PropTypes.func,

    children: PropTypes.node,

    //Custom
    isHoverToSelectedItem: PropTypes.bool,
    isShowInforGemba: PropTypes.bool,
    isGembaMode: PropTypes.bool,

    canSortableGroups: PropTypes.bool,
    isShowDragHandleButton: PropTypes.bool,
    sortOrderTaskList: PropTypes.func,
    onStartSort: PropTypes.func,
    openAddGroupForm: PropTypes.func,
    canMoveChart: PropTypes.bool,
    isCreateTaskList: PropTypes.bool,
    onCreateTask: PropTypes.func,
    isShowBgColorGroup: PropTypes.bool,
    scrollContainer: PropTypes.node,
    buttonTooltipRenderer: PropTypes.node,

    isScheduleScreen: PropTypes.bool,
    defaultRowDisplayed: PropTypes.number,
    defaultBufferRow: PropTypes.number,
    scrollTop: PropTypes.number,
    isDragDrop: PropTypes.object,

    isCreateTrackRecord: PropTypes.bool
  }

  static defaultProps = {
    sidebarWidth: 150,
    rightSidebarWidth: 0,
    dragSnap: 1000 * 60 * 15, // 15min
    minResizeWidth: 10,
    speedScrollHorizontal: 5, // scroll speed when moving or resizing
    lineHeight: 30,
    itemHeightRatio: 0.65,
    buffer: 6,

    minZoom: 60 * 60 * 1000, // 1 hour
    maxZoom: 5 * 365.24 * 86400 * 1000, // 5 years

    clickTolerance: 3, // how many pixels can we drag for it to be still considered a click?

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
    keys: defaultKeys,
    timeSteps: defaultTimeSteps,
    headerRef: () => {},
    scrollRef: () => {},

    // if you pass in visibleTimeStart and visibleTimeEnd, you must also pass onTimeChange(visibleTimeStart, visibleTimeEnd),
    // which needs to update the props visibleTimeStart and visibleTimeEnd to the ones passed
    visibleTimeStart: null,
    visibleTimeEnd: null,
    onTimeChange: function(
      visibleTimeStart,
      visibleTimeEnd,
      updateScrollCanvas
    ) {
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
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
    onStartSort: null,
    openAddGroupForm: null,
    canMoveChart: false,
    isCreateTaskList: false,
    onCreateTask: async (group, startTime, endTime, isCreateTaskList) => {},
    isShowBgColorGroup: false,
    scrollContainer: null,
    buttonTooltipRenderer: null,

    isScheduleScreen: false,
    defaultRowDisplayed: DEFAULT_ROW_DISPLAYED,
    defaultBufferRow: DEFAULT_BUFFER_ROW,
    scrollTop: DEFAULT_SCROLL_TOP,
    isDragDrop: { current: null },

    isCreateTrackRecord: false
  }

  static childContextTypes = {
    getTimelineContext: PropTypes.func
  }

  getChildContext() {
    return {
      getTimelineContext: () => {
        return this.getTimelineContext()
      }
    }
  }

  getTimelineContext = () => {
    const {
      width,
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd
    } = this.state

    return {
      timelineWidth: width,
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd
    }
  }

  getTimelineUnit = () => {
    const { width, visibleTimeStart, visibleTimeEnd } = this.state

    const { timeSteps } = this.props

    const zoom = visibleTimeEnd - visibleTimeStart
    const minUnit = getMinUnit(zoom, width, timeSteps)

    return minUnit
  }

  constructor(props) {
    super(props)

    this.getSelected = this.getSelected.bind(this)
    this.hasSelectedItem = this.hasSelectedItem.bind(this)
    this.isItemSelected = this.isItemSelected.bind(this)

    let visibleTimeStart = null
    let visibleTimeEnd = null

    if (this.props.defaultTimeStart && this.props.defaultTimeEnd) {
      visibleTimeStart = this.props.defaultTimeStart.valueOf()
      visibleTimeEnd = this.props.defaultTimeEnd.valueOf()
    } else if (this.props.visibleTimeStart && this.props.visibleTimeEnd) {
      visibleTimeStart = this.props.visibleTimeStart
      visibleTimeEnd = this.props.visibleTimeEnd
    } else {
      //throwing an error because neither default or visible time props provided
      throw new Error(
        'You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline'
      )
    }

    const [canvasTimeStart, canvasTimeEnd] = getCanvasBoundariesFromVisibleTime(
      visibleTimeStart,
      visibleTimeEnd,
      props.buffer
    )

    this.state = {
      width: 1000,
      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd,
      canvasTimeStart: canvasTimeStart,
      canvasTimeEnd: canvasTimeEnd,
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
    }

    const canvasWidth = getCanvasWidth(this.state.width, props.buffer)

    const {
      dimensionItems,
      height,
      groupHeights,
      groupTops
    } = stackTimelineItems(
      props.items,
      props.groups,
      canvasWidth,
      this.state.canvasTimeStart,
      this.state.canvasTimeEnd,
      props.keys,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems,
      this.state.draggingItem,
      this.state.resizingItem,
      this.state.dragTime,
      this.state.resizingEdge,
      this.state.resizeTime,
      this.state.newGroupOrder
    )

    /* eslint-disable react/no-direct-mutation-state */
    this.state.dimensionItems = dimensionItems
    this.state.height = height
    this.state.groupHeights = groupHeights
    this.state.groupTops = groupTops

    this.scrollComponentTemporary = null
    this.scrollLeftTemporary = null
    this.isScrolling = false
    /* eslint-enable */
  }

  componentDidMount() {
    this.resize(this.props)

    if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
      this.props.resizeDetector.addListener(this)
    }

    windowResizeDetector.addListener(this)

    this.lastTouchDistance = null
  }

  componentWillUnmount() {
    if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
      this.props.resizeDetector.removeListener(this)
    }

    windowResizeDetector.removeListener(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visibleTimeStart, visibleTimeEnd, items, groups } = nextProps

    // This is a gross hack pushing items and groups in to state only to allow
    // For the forceUpdate check
    let derivedState = { items, groups }

    // if the items or groups have changed we must re-render
    const forceUpdate = items !== prevState.items || groups !== prevState.groups

    // We are a controlled component
    if (visibleTimeStart && visibleTimeEnd) {
      // Get the new canvas position
      Object.assign(
        derivedState,
        calculateScrollCanvas(
          visibleTimeStart,
          visibleTimeEnd,
          forceUpdate,
          items,
          groups,
          nextProps,
          prevState
        )
      )
    } else if (forceUpdate) {
      // Calculate new item stack position as canvas may have changed
      const canvasWidth = getCanvasWidth(prevState.width, nextProps.buffer)
      Object.assign(
        derivedState,
        stackTimelineItems(
          items,
          groups,
          canvasWidth,
          prevState.canvasTimeStart,
          prevState.canvasTimeEnd,
          nextProps.keys,
          nextProps.lineHeight,
          nextProps.itemHeightRatio,
          nextProps.stackItems,
          prevState.draggingItem,
          prevState.resizingItem,
          prevState.dragTime,
          prevState.resizingEdge,
          prevState.resizeTime,
          prevState.newGroupOrder
        )
      )
    }

    // check update time

    return derivedState
  }

  componentDidUpdate(prevProps, prevState) {
    const newZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const oldZoom = prevState.visibleTimeEnd - prevState.visibleTimeStart

    // are we changing zoom? Report it!
    if (this.props.onZoom && newZoom !== oldZoom) {
      this.props.onZoom(this.getTimelineContext(), this.getTimelineUnit())
    }

    // The bounds have changed? Report it!
    if (
      this.props.onBoundsChange &&
      this.state.canvasTimeStart !== prevState.canvasTimeStart
    ) {
      this.props.onBoundsChange(
        this.state.canvasTimeStart,
        this.state.canvasTimeStart + newZoom * 3
      )
    }

    // Check the scroll is correct
    const scrollLeft = Math.round(
      (this.state.width *
        (this.state.visibleTimeStart - this.state.canvasTimeStart)) /
        newZoom
    )
    const componentScrollLeft = Math.round(
      (prevState.width *
        (prevState.visibleTimeStart - prevState.canvasTimeStart)) /
        oldZoom
    )

    if (componentScrollLeft !== scrollLeft) {
      this.scrollComponent.scrollLeft = scrollLeft
      this.scrollHeaderRef.scrollLeft = scrollLeft
    }
  }

  resize = (props = this.props) => {
    const { width: containerWidth } = this.container.getBoundingClientRect()

    let width = containerWidth - props.sidebarWidth - props.rightSidebarWidth
    const canvasWidth = getCanvasWidth(width, props.buffer)
    const {
      dimensionItems,
      height,
      groupHeights,
      groupTops
    } = stackTimelineItems(
      props.items,
      props.groups,
      canvasWidth,
      this.state.canvasTimeStart,
      this.state.canvasTimeEnd,
      props.keys,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems,
      this.state.draggingItem,
      this.state.resizingItem,
      this.state.dragTime,
      this.state.resizingEdge,
      this.state.resizeTime,
      this.state.newGroupOrder
    )

    // this is needed by dragItem since it uses pageY from the drag events
    // if this was in the context of the scrollElement, this would not be necessary

    this.setState({
      width,
      dimensionItems,
      height,
      groupHeights,
      groupTops
    })
    //initial scroll left is the buffer - 1 (1 is visible area) divided by 2 (2 is the buffer split on the right and left of the timeline)
    const scrollLeft = width * ((props.buffer - 1) / 2)
    this.scrollComponent.scrollLeft = scrollLeft
    this.scrollHeaderRef.scrollLeft = scrollLeft
  }

  onScroll = scrollX => {
    const width = this.state.width

    const canvasTimeStart = this.state.canvasTimeStart

    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart

    const visibleTimeStart = canvasTimeStart + (zoom * scrollX) / width

    if (
      this.state.visibleTimeStart !== visibleTimeStart ||
      this.state.visibleTimeEnd !== visibleTimeStart + zoom
    ) {
      this.props.onTimeChange(
        visibleTimeStart,
        visibleTimeStart + zoom,
        this.updateScrollCanvas,
        this.getTimelineUnit()
      )
    }
  }

  // called when the visible time changes
  updateScrollCanvas = (
    visibleTimeStart,
    visibleTimeEnd,
    forceUpdateDimensions,
    items = this.props.items,
    groups = this.props.groups
  ) => {
    this.setState(
      calculateScrollCanvas(
        visibleTimeStart,
        visibleTimeEnd,
        forceUpdateDimensions,
        items,
        groups,
        this.props,
        this.state
      )
    )
  }

  handleWheelZoom = (speed, xPosition, deltaY) => {
    this.changeZoom(1.0 + (speed * deltaY) / 500, xPosition / this.state.width)
  }

  changeZoom = (scale, offset = 0.5) => {
    const { minZoom, maxZoom } = this.props
    const oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart
    const newZoom = Math.min(
      Math.max(Math.round(oldZoom * scale), minZoom),
      maxZoom
    ) // min 1 min, max 20 years
    const newVisibleTimeStart = Math.round(
      this.state.visibleTimeStart + (oldZoom - newZoom) * offset
    )

    this.props.onTimeChange(
      newVisibleTimeStart,
      newVisibleTimeStart + newZoom,
      this.updateScrollCanvas,
      this.getTimelineUnit()
    )
  }

  showPeriod = (from, to) => {
    let visibleTimeStart = from.valueOf()
    let visibleTimeEnd = to.valueOf()

    let zoom = visibleTimeEnd - visibleTimeStart
    // can't zoom in more than to show one hour
    if (zoom < this.props.minZoom) {
      return
    }

    this.props.onTimeChange(
      visibleTimeStart,
      visibleTimeStart + zoom,
      this.updateScrollCanvas,
      this.getTimelineUnit()
    )
  }

  selectItem = (item, clickType, e) => {
    if (
      item === this.state.selectedItem ||
      !!this.state.draggingItem ||
      !!this.state.resizingItem
    )
      return

    if (
      this.isItemSelected(item) ||
      (this.props.itemTouchSendsClick && clickType === 'touch')
    ) {
      if (item && this.props.onItemClick) {
        const time = this.timeFromItemEvent(e)
        this.props.onItemClick(item, e, time)
      }
    } else {
      this.setState({ selectedItem: item })
      if (item && this.props.onItemSelect) {
        const time = this.timeFromItemEvent(e)
        this.props.onItemSelect(item, e, time)
      } else if (item === null && this.props.onItemDeselect) {
        this.props.onItemDeselect(e) // this isnt in the docs. Is this function even used?
      }
    }
    this.setState({
      scrollTime: this.calendarScrollWithTime(this.props.speedScrollHorizontal)
    })
  }

  doubleClickItem = (item, e) => {
    if (this.props.onItemDoubleClick) {
      const time = this.timeFromItemEvent(e)
      this.props.onItemDoubleClick(item, e, time)
    }
  }

  contextMenuClickItem = (item, e) => {
    if (this.props.onItemContextMenu) {
      const time = this.timeFromItemEvent(e)
      this.props.onItemContextMenu(item, e, time)
    }
  }

  // TODO: this is very similar to timeFromItemEvent, aside from which element to get offsets
  // from.  Look to consolidate the logic for determining coordinate to time
  // as well as generalizing how we get time from click on the canvas
  getTimeFromRowClickEvent = e => {
    const { dragSnap, buffer } = this.props
    const { width, canvasTimeStart, canvasTimeEnd } = this.state
    // this gives us distance from left of row element, so event is in
    // context of the row element, not client or page
    const offsetX = e?.nativeEvent?.offsetX || e?.offsetX

    let time = calculateTimeForXPosition(
      canvasTimeStart,

      canvasTimeEnd,
      getCanvasWidth(width, buffer),
      offsetX
    )
    time = Math.floor(time / dragSnap) * dragSnap

    return time
  }

  timeFromItemEvent = e => {
    const { width, visibleTimeStart, visibleTimeEnd } = this.state
    const { dragSnap } = this.props

    const scrollComponent = this.scrollComponent
    const { left: scrollX } = scrollComponent.getBoundingClientRect()

    const xRelativeToTimeline = e.clientX - scrollX

    const relativeItemPosition = xRelativeToTimeline / width
    const zoom = visibleTimeEnd - visibleTimeStart
    const timeOffset = relativeItemPosition * zoom

    let time = Math.round(visibleTimeStart + timeOffset)
    time = Math.floor(time / dragSnap) * dragSnap

    return time
  }

  dragItem = (item, dragTime, newGroupOrder) => {
    if (!this.state.dragMoveItemCalled) {
      const {
        dayStartToTime,
        dayEndToTime,
        endScrollLeft,
        endScrollRight
      } = this.calendarStopAutoScroll(
        this.props.items[item - 1].start_date,
        this.props.items[item - 1].complete_date
      )
      this.setState({
        timeStartDefault: dayStartToTime,
        timeEndDefault: dayEndToTime,
        endScrollLeft: endScrollLeft,
        endScrollRight: endScrollRight,
        dragMoveItemCalled: true
      })
    }

    window.clearInterval(this.refreshIntervalId)

    if (
      this.state.endScrollRight <
        Number(
          dragTime + (this.state.timeEndDefault - this.state.timeStartDefault)
        ) ||
      this.state.endScrollLeft > Number(dragTime)
    ) {
      return
    }

    let stopScroll = false

    if (
      !stopScroll &&
      this.state.visibleTimeEnd - this.handleDayToTime(2) < dragTime
    ) {
      const dataItem = item
      let dataDragTime = dragTime
      this.refreshIntervalId = window.setInterval(
        function() {
          this.onScroll(
            this.scrollComponent.scrollLeft + this.props.speedScrollHorizontal
          )
          if (
            dataDragTime +
              (this.state.timeEndDefault - this.state.timeStartDefault) <
            this.state.endScrollRight
          ) {
            dataDragTime += this.state.scrollTime
          }

          let newGroup = this.props.groups[newGroupOrder]
          const keys = this.props.keys

          this.setState({
            draggingItem: dataItem,
            dragTime: dataDragTime,
            newGroupOrder: newGroupOrder,
            dragGroupTitle: newGroup ? _get(newGroup, keys.groupLabelKey) : ''
          })

          this.updatingItem({
            eventType: 'move',
            itemId: dataItem,
            time: dataDragTime,
            newGroupOrder
          })

          if (
            dataDragTime > this.state.visibleTimeStart &&
            this.state.visibleTimeEnd - this.handleDayToTime(1) >=
              this.state.endScrollRight
          ) {
            stopScroll = true
            clearInterval(this.refreshIntervalId)
          }
        }.bind(this),
        10
      )
    } else if (
      !stopScroll &&
      this.state.visibleTimeStart + this.handleDayToTime(2) >
        dragTime + (this.state.timeEndDefault - this.state.timeStartDefault)
    ) {
      const dataItem = item
      let dataDragTime = dragTime
      this.refreshIntervalId = window.setInterval(
        function() {
          this.onScroll(this.scrollComponent.scrollLeft - 5)
          if (dataDragTime > this.state.endScrollLeft) {
            dataDragTime -= this.state.scrollTime
          }

          let newGroup = this.props.groups[newGroupOrder]
          const keys = this.props.keys

          this.setState({
            draggingItem: dataItem,
            dragTime: dataDragTime,
            newGroupOrder: newGroupOrder,
            dragGroupTitle: newGroup ? _get(newGroup, keys.groupLabelKey) : ''
          })

          this.updatingItem({
            eventType: 'move',
            itemId: dataItem,
            time: dataDragTime,
            newGroupOrder
          })

          if (
            dataDragTime > this.state.visibleTimeStart &&
            this.state.visibleTimeStart + this.handleDayToTime(1) <=
              this.state.endScrollLeft
          ) {
            stopScroll = true
            clearInterval(this.refreshIntervalId)
          }
        }.bind(this),
        10
      )
    }

    let newGroup = this.props.groups[newGroupOrder]
    const keys = this.props.keys

    this.setState({
      draggingItem: item,
      dragTime: dragTime,
      newGroupOrder: newGroupOrder,
      dragGroupTitle: newGroup ? _get(newGroup, keys.groupLabelKey) : ''
    })

    this.updatingItem({
      eventType: 'move',
      itemId: item,
      time: dragTime,
      newGroupOrder
    })
  }

  dropItem = (item, dragTime, newGroupOrder) => {
    let dataDragTime = dragTime

    window.clearInterval(this.refreshIntervalId)
    this.setState({ dragMoveItemCalled: false })

    if (
      dataDragTime + (this.state.timeEndDefault - this.state.timeStartDefault) >
      this.state.endScrollRight
    ) {
      dataDragTime =
        this.state.endScrollRight -
        (this.state.timeEndDefault - this.state.timeStartDefault)
    }

    if (this.state.endScrollLeft > dataDragTime) {
      dataDragTime = this.state.endScrollLeft
    }

    this.setState({
      draggingItem: null,
      dragTime: null,
      dragGroupTitle: null,
      selectedItem: null
    })
    if (this.props.onItemMove) {
      this.props.onItemMove(item, dataDragTime, newGroupOrder)
    }
  }

  handleDayToTime = numberOfDays => {
    const oneDay = 24 * 60 * 60 * 1000
    const time = numberOfDays * oneDay
    return time
  }

  calendarScrollWithTime = scrollLeftPlus => {
    const width = this.state.width

    const canvasTimeStart = this.state.canvasTimeStart

    const zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart

    const visibleTimeStartOld =
      canvasTimeStart + (zoom * this.scrollComponent.scrollLeft) / width
    const visibleTimeStart =
      canvasTimeStart +
      (zoom * (this.scrollComponent.scrollLeft + scrollLeftPlus)) / width

    const visibleTimeChange = visibleTimeStart - visibleTimeStartOld
    return visibleTimeChange
  }
  calendarStopAutoScroll = (defaultTimeStart, defaultTimeEnd) => {
    const timeStart = new Date(defaultTimeStart)
    const dayStartToTime = timeStart.getTime()
    const endScrollLeft =
      Number(dayStartToTime) - Number(this.handleDayToTime(90))
    const timeEnd = new Date(defaultTimeEnd)
    const dayEndToTime = timeEnd.getTime()
    const endScrollRight =
      Number(dayEndToTime) + Number(this.handleDayToTime(90))
    return {
      dayStartToTime,
      dayEndToTime,
      endScrollLeft,
      endScrollRight
    }
  }

  resizingItem = (item, resizeTime, edge) => {
    if (!this.state.resizingItemCalled) {
      const {
        dayStartToTime,
        dayEndToTime,
        endScrollLeft,
        endScrollRight
      } = this.calendarStopAutoScroll(
        this.props.items[item - 1].start_date,
        this.props.items[item - 1].complete_date
      )
      this.setState({
        timeStartDefault: dayStartToTime,
        timeEndDefault: dayEndToTime,
        endScrollLeft: endScrollLeft,
        endScrollRight: endScrollRight,
        resizingItemCalled: true
      })
    }

    window.clearInterval(this.refreshIntervalId)

    if (
      this.state.endScrollRight < Number(resizeTime) ||
      this.state.endScrollLeft > Number(resizeTime)
    ) {
      return
    }

    let stopScroll = false

    if (
      !stopScroll &&
      this.state.visibleTimeEnd - this.handleDayToTime(1) < resizeTime
    ) {
      const dataItem = item
      const dataEdge = edge
      let dataResizeTime = resizeTime
      this.refreshIntervalId = window.setInterval(
        function() {
          this.onScroll(
            this.scrollComponent.scrollLeft + this.props.speedScrollHorizontal
          )
          if (dataResizeTime < this.state.endScrollRight) {
            dataResizeTime += this.state.scrollTime
          }

          this.setState({
            resizingItem: dataItem,
            resizingEdge: dataEdge,
            resizeTime: dataResizeTime
          })

          this.updatingItem({
            eventType: 'resize',
            itemId: dataItem,
            time: dataResizeTime,
            edge
          })

          if (
            edge === 'right' &&
            this.state.visibleTimeEnd - this.handleDayToTime(1) >=
              this.state.endScrollRight
          ) {
            stopScroll = true
            clearInterval(this.refreshIntervalId)
          }

          if (
            edge === 'left' &&
            Number(dataResizeTime) >
              Number(this.state.timeEndDefault - this.handleDayToTime(0.49))
          ) {
            stopScroll = true
            clearInterval(this.refreshIntervalId)
          }
        }.bind(this),
        10
      )
    } else if (
      !stopScroll &&
      this.state.visibleTimeStart + this.handleDayToTime(1) > resizeTime
    ) {
      const dataItem = item
      const dataEdge = edge
      let dataResizeTime = resizeTime
      this.refreshIntervalId = window.setInterval(
        function() {
          this.onScroll(
            this.scrollComponent.scrollLeft - this.props.speedScrollHorizontal
          )
          if (dataResizeTime > this.state.endScrollLeft) {
            dataResizeTime -= this.state.scrollTime
          }

          this.setState({
            resizingItem: dataItem,
            resizingEdge: dataEdge,
            resizeTime: dataResizeTime
          })
          this.updatingItem({
            eventType: 'resize',
            itemId: dataItem,
            time: dataResizeTime,
            edge
          })

          if (
            edge === 'left' &&
            this.state.visibleTimeStart + this.handleDayToTime(1) <=
              this.state.endScrollLeft
          ) {
            stopScroll = true
            clearInterval(this.refreshIntervalId)
          }

          if (
            edge === 'right' &&
            Number(dataResizeTime) <
              Number(this.handleDayToTime(0.49) + this.state.timeStartDefault)
          ) {
            stopScroll = true
            clearInterval(this.refreshIntervalId)
            this.onScroll(
              this.scrollComponent.scrollLeft - this.props.speedScrollHorizontal
            )
          }
        }.bind(this),
        10
      )
    }

    this.setState({
      resizingItem: item,
      resizingEdge: edge,
      resizeTime: resizeTime
    })

    this.updatingItem({
      eventType: 'resize',
      itemId: item,
      time: resizeTime,
      edge
    })
  }

  resizedItem = (item, resizeTime, edge, timeDelta) => {
    let dataResizeTime = resizeTime

    if (edge === 'right' && dataResizeTime > this.state.endScrollRight) {
      dataResizeTime = this.state.endScrollRight
    }

    if (edge === 'left' && this.state.endScrollLeft > dataResizeTime) {
      dataResizeTime = this.state.endScrollLeft
    }

    window.clearInterval(this.refreshIntervalId)
    this.setState({ resizingItemCalled: false })
    this.setState({
      resizingItem: null,
      resizingEdge: null,
      resizeTime: null,
      selectedItem: null
    })
    if (this.props.onItemResize && timeDelta !== 0) {
      this.props.onItemResize(item, dataResizeTime, edge)
    }
  }

  updatingItem = ({ eventType, itemId, time, edge, newGroupOrder }) => {
    if (this.props.onItemDrag) {
      this.props.onItemDrag({
        eventType,
        itemId,
        time,
        edge,
        newGroupOrder
      })
    }
  }

  columns(
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    minUnit,
    timeSteps,
    height
  ) {
    return (
      <Columns
        canvasTimeStart={canvasTimeStart}
        canvasTimeEnd={canvasTimeEnd}
        canvasWidth={canvasWidth}
        lineCount={_length(this.props.groups)}
        minUnit={minUnit}
        timeSteps={timeSteps}
        height={height}
        verticalLineClassNamesForTime={this.props.verticalLineClassNamesForTime}
      />
    )
  }

  handleRowClick = (e, rowIndex) => {
    // shouldnt this be handled by the user, as far as when to deselect an item?
    if (this.hasSelectedItem()) {
      this.selectItem(null)
    }

    if (this.props.onCanvasClick == null) return

    const time = this.getTimeFromRowClickEvent(e)
    const groupId = _get(
      this.props.groups[rowIndex],
      this.props.keys.groupIdKey
    )
    this.props.onCanvasClick(groupId, time, e)
  }

  handleRowDoubleClick = (e, rowIndex) => {
    if (this.props.onCanvasDoubleClick == null) return

    const time = this.getTimeFromRowClickEvent(e)
    const groupId = _get(
      this.props.groups[rowIndex],
      this.props.keys.groupIdKey
    )
    this.props.onCanvasDoubleClick(groupId, time, e)
  }

  handleScrollContextMenu = (e, rowIndex) => {
    if (this.props.onCanvasContextMenu == null) return

    const timePosition = this.getTimeFromRowClickEvent(e)

    const groupId = _get(
      this.props.groups[rowIndex],
      this.props.keys.groupIdKey
    )

    if (this.props.onCanvasContextMenu) {
      e.preventDefault()
      this.props.onCanvasContextMenu(groupId, timePosition, e)
    }
  }

  rows(
    canvasWidth,
    groupHeights,
    groups,
    width,
    canvasTimeStart,
    canvasTimeEnd,
    visibleTimeStart,
    visibleTimeEnd,
    speedScrollHorizontal,
    isCreateTaskList,
    onCreateTask,
    isShowBgColorGroup,
    itemPositionDisplayed,
    isCreateTrackRecord
  ) {
    return (
      <GroupRows
        groups={groups}
        canvasWidth={canvasWidth}
        lineCount={_length(this.props.groups)}
        groupHeights={groupHeights}
        clickTolerance={this.props.clickTolerance}
        onRowClick={this.handleRowClick}
        onRowDoubleClick={this.handleRowDoubleClick}
        horizontalLineClassNamesForGroup={
          this.props.horizontalLineClassNamesForGroup
        }
        onRowContextClick={this.handleScrollContextMenu}
        width={width}
        canvasTimeStart={canvasTimeStart}
        canvasTimeEnd={canvasTimeEnd}
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
        speedScrollHorizontal={speedScrollHorizontal}
        isCreateTaskList={isCreateTaskList}
        onCreateTask={onCreateTask}
        scrollRef={this.scrollComponent}
        getTimeFromRowClickEvent={this.getTimeFromRowClickEvent}
        onDayToTime={this.handleDayToTime}
        isShowBgColorGroup={isShowBgColorGroup}
        isScheduleScreen={this.props.isScheduleScreen}
        itemPositionDisplayed={itemPositionDisplayed}
        isCreateTrackRecord={isCreateTrackRecord}
        resizingItemCalled={this.state.resizingItemCalled}
        dragMoveItemCalled={this.state.dragMoveItemCalled}
      />
    )
  }

  items(
    canvasTimeStart,
    zoom,
    canvasTimeEnd,
    canvasWidth,
    minUnit,
    dimensionItems,
    groupHeights,
    groupTops,
    itemPositionDisplayed
  ) {
    return (
      <Items
        canvasTimeStart={canvasTimeStart}
        canvasTimeEnd={canvasTimeEnd}
        canvasWidth={canvasWidth}
        dimensionItems={dimensionItems}
        groupTops={groupTops}
        items={this.props.items}
        groups={this.props.groups}
        keys={this.props.keys}
        selectedItem={this.state.selectedItem}
        dragSnap={this.props.dragSnap}
        minResizeWidth={this.props.minResizeWidth}
        canChangeGroup={this.props.canChangeGroup}
        canMove={this.props.canMove}
        canResize={this.props.canResize}
        useResizeHandle={this.props.useResizeHandle}
        canSelect={this.props.canSelect}
        moveResizeValidator={this.props.moveResizeValidator}
        itemSelect={this.selectItem}
        itemDrag={this.dragItem}
        itemDrop={this.dropItem}
        onItemDoubleClick={this.doubleClickItem}
        onItemContextMenu={
          this.props.onItemContextMenu ? this.contextMenuClickItem : undefined
        }
        itemResizing={this.resizingItem}
        itemResized={this.resizedItem}
        itemRenderer={this.props.itemRenderer}
        selected={this.props.selected}
        scrollRef={this.scrollComponent}
        isHoverToSelectedItem={this.props.isHoverToSelectedItem}
        isGembaMode={this.props.isGembaMode}
        itemPositionDisplayed={itemPositionDisplayed}
        isScheduleScreen={this.props.isScheduleScreen}
      />
    )
  }

  handleHeaderRef = el => {
    this.scrollHeaderRef = el
    this.props.headerRef(el)
  }

  sidebar(height, groupHeights) {
    const {
      sidebarWidth,
      canSortableGroups,
      isShowDragHandleButton,
      sortOrderTaskList,
      openAddGroupForm,
      scrollContainer,
      buttonTooltipRenderer,
      isScheduleScreen,
      onStartSort,
      isDragDrop
    } = this.props
    const sidebarPositionDisplayed = this.getItemDisplayPosition(
      DEFAULT_BUFFER_ROW_IN_SIDEBAR
    )

    return (
      sidebarWidth && (
        <Sidebar
          groups={this.props.groups}
          groupRenderer={this.props.groupRenderer}
          keys={this.props.keys}
          width={sidebarWidth}
          groupHeights={groupHeights}
          height={height}
          isShowInforGemba={this.props.isShowInforGemba}
          canSortableGroups={canSortableGroups}
          isShowDragHandleButton={isShowDragHandleButton}
          sortOrderTaskList={sortOrderTaskList}
          onStartSort={onStartSort}
          openAddGroupForm={openAddGroupForm}
          buttonTooltipRenderer={buttonTooltipRenderer}
          scrollContainer={scrollContainer}
          isScheduleScreen={isScheduleScreen}
          sidebarPositionDisplayed={sidebarPositionDisplayed}
          isDragDrop={isDragDrop}
        />
      )
    )
  }

  rightSidebar(height, groupHeights) {
    const {
      rightSidebarWidth,
      canSortableGroups,
      isShowDragHandleButton,
      sortOrderTaskList,
      openAddGroupForm,
      scrollContainer,
      buttonTooltipRenderer,
      onStartSort,
      isDragDrop
    } = this.props
    return (
      rightSidebarWidth && (
        <Sidebar
          groups={this.props.groups}
          keys={this.props.keys}
          groupRenderer={this.props.groupRenderer}
          isRightSidebar
          width={rightSidebarWidth}
          groupHeights={groupHeights}
          height={height}
          isShowInforGemba={this.props.isShowInforGemba}
          canSortableGroups={canSortableGroups}
          isShowDragHandleButton={isShowDragHandleButton}
          sortOrderTaskList={sortOrderTaskList}
          onStartSort={onStartSort}
          openAddGroupForm={openAddGroupForm}
          scrollContainer={scrollContainer}
          buttonTooltipRenderer={buttonTooltipRenderer}
          isDragDrop={isDragDrop}
        />
      )
    )
  }

  /**
   * check if child of type TimelineHeader
   * refer to for explanation https://github.com/gaearon/react-hot-loader#checking-element-types
   */
  isTimelineHeader = child => {
    if (child.type === undefined) return false
    return child.type.secretKey === TimelineHeaders.secretKey
  }

  childrenWithProps(
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    dimensionItems,
    groupHeights,
    groupTops,
    height,
    visibleTimeStart,
    visibleTimeEnd,
    minUnit,
    timeSteps
  ) {
    if (!this.props.children) {
      return null
    }

    // convert to an array and remove the nulls
    const childArray = Array.isArray(this.props.children)
      ? this.props.children.filter(c => c)
      : [this.props.children]

    const childProps = {
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd,
      dimensionItems,
      items: this.props.items,
      groups: this.props.groups,
      keys: this.props.keys,
      groupHeights: groupHeights,
      groupTops: groupTops,
      selected: this.getSelected(),
      height: height,
      minUnit: minUnit,
      timeSteps: timeSteps
    }

    return React.Children.map(childArray, child => {
      if (!this.isTimelineHeader(child)) {
        return React.cloneElement(child, childProps)
      } else {
        return null
      }
    })
  }

  renderHeaders = () => {
    if (this.props.children) {
      let headerRenderer
      React.Children.map(this.props.children, child => {
        if (this.isTimelineHeader(child)) {
          headerRenderer = child
        }
      })
      if (headerRenderer) {
        return headerRenderer
      }
    }
    return (
      <TimelineHeaders>
        <DateHeader unit="primaryHeader" />
        <DateHeader />
      </TimelineHeaders>
    )
  }

  getSelected() {
    return this.state.selectedItem && !this.props.selected
      ? [this.state.selectedItem]
      : this.props.selected || []
  }

  hasSelectedItem() {
    if (!Array.isArray(this.props.selected)) return !!this.state.selectedItem
    return this.props.selected.length > 0
  }

  isItemSelected(itemId) {
    const selectedItems = this.getSelected()
    return selectedItems.some(i => i === itemId)
  }
  getScrollElementRef = el => {
    this.props.scrollRef(el)
    this.scrollComponent = el
  }

  refHandler = el => {
    this.scrollComponentTemporary = el
    if (el) {
      el.addEventListener('scroll', this.handleScroll, {
        passive: false
      })
      el.addEventListener('mouseup', this.handleScrollEnd)
      this.scrollComponentTemporary.scrollLeft =
        (this.scrollComponentTemporary.scrollWidth -
          this.scrollComponentTemporary.offsetWidth) /
        2
    }
  }

  handleScroll = e => {
    const distanceScroll =
      (this.scrollComponentTemporary.scrollLeft - this.scrollLeftTemporary) /
      3.2
    if (!this.isScrolling) {
      this.isScrolling = true
    } else {
      this.onScroll(this.scrollComponent.scrollLeft + Number(distanceScroll))
    }
    this.scrollLeftTemporary = this.scrollComponentTemporary.scrollLeft
  }

  handleScrollEnd = e => {
    this.scrollComponentTemporary.scrollLeft =
      (this.scrollComponentTemporary.scrollWidth -
        this.scrollComponentTemporary.offsetWidth) /
      2
    this.isScrolling = false
  }

  getItemDisplayPosition = (
    bufferRowInSidebar = DEFAULT_BUFFER_ROW,
    scrollTop = this.props.scrollTop,
    numberOfRowDisplayed = this.props.defaultRowDisplayed,
    bufferRow = this.props.defaultBufferRow
  ) => {
    const numberOfMaxItemTopOrBottom = Math.round(
      numberOfRowDisplayed * bufferRow * bufferRowInSidebar
    )
    const numberOfItemTopHided =
      (scrollTop - DEFAULT_HEIGHT_HEADER) / DEFAULT_HEIGHT_ROW

    if (
      !scrollTop ||
      numberOfItemTopHided < numberOfMaxItemTopOrBottom / bufferRowInSidebar
    ) {
      return {
        start: 0,
        end: numberOfRowDisplayed + numberOfMaxItemTopOrBottom - 1
      }
    }

    let start = Math.floor(numberOfItemTopHided) - numberOfMaxItemTopOrBottom // start position: calculate number of item top will display at buffer block
    if (start < 0) start = 0 // check case value start of sidebar

    const end =
      start + numberOfRowDisplayed + numberOfMaxItemTopOrBottom * 2 - 1 // end position: position top + number of default display (between) + maxItem * 2 (top + max & bottom)

    return { start, end }
  }

  render() {
    const {
      items,
      groups,
      sidebarWidth,
      rightSidebarWidth,
      timeSteps,
      traditionalZoom,
      buffer,
      canMoveChart,
      speedScrollHorizontal,
      isCreateTaskList,
      onCreateTask,
      isShowBgColorGroup,
      isCreateTrackRecord
    } = this.props
    const {
      draggingItem,
      resizingItem,
      width,
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd
    } = this.state
    let { dimensionItems, height, groupHeights, groupTops } = this.state

    const zoom = visibleTimeEnd - visibleTimeStart
    const canvasWidth = getCanvasWidth(width, buffer)
    const minUnit = getMinUnit(zoom, width, timeSteps)

    const isInteractingWithItem =
      !!draggingItem || !!resizingItem || !canMoveChart

    if (isInteractingWithItem) {
      const stackResults = stackTimelineItems(
        items,
        groups,
        canvasWidth,
        this.state.canvasTimeStart,
        this.state.canvasTimeEnd,
        this.props.keys,
        this.props.lineHeight,
        this.props.itemHeightRatio,
        this.props.stackItems,
        this.state.draggingItem,
        this.state.resizingItem,
        this.state.dragTime,
        this.state.resizingEdge,
        this.state.resizeTime,
        this.state.newGroupOrder
      )
      dimensionItems = stackResults.dimensionItems
      height = stackResults.height
      groupHeights = stackResults.groupHeights
      groupTops = stackResults.groupTops
    }

    const outerComponentStyle = {
      height: `${height + 20}px` // 20px because custom scroll-y
    }

    const itemPositionDisplayed = this.getItemDisplayPosition()

    return (
      <TimelineStateProvider
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
        canvasTimeStart={canvasTimeStart}
        canvasTimeEnd={canvasTimeEnd}
        canvasWidth={canvasWidth}
        showPeriod={this.showPeriod}
        timelineUnit={minUnit}
        timelineWidth={this.state.width}
      >
        <TimelineMarkersProvider>
          <TimelineHeadersProvider
            registerScroll={this.handleHeaderRef}
            timeSteps={timeSteps}
            leftSidebarWidth={this.props.sidebarWidth}
            rightSidebarWidth={this.props.rightSidebarWidth}
          >
            <div
              style={this.props.style}
              ref={el => (this.container = el)}
              className={`react-calendar-timeline ${this.props.className}`}
            >
              {this.renderHeaders()}
              <div style={outerComponentStyle} className="rct-outer">
                {sidebarWidth > 0 ? this.sidebar(height, groupHeights) : null}
                <ScrollElement
                  scrollRef={this.getScrollElementRef}
                  width={width}
                  height={height}
                  onZoom={this.changeZoom}
                  onWheelZoom={this.handleWheelZoom}
                  traditionalZoom={traditionalZoom}
                  onScroll={this.onScroll}
                  isInteractingWithItem={isInteractingWithItem}
                >
                  <MarkerCanvas>
                    {this.columns(
                      canvasTimeStart,
                      canvasTimeEnd,
                      canvasWidth,
                      minUnit,
                      timeSteps,
                      height
                    )}
                    {this.rows(
                      canvasWidth,
                      groupHeights,
                      groups,
                      width,
                      canvasTimeStart,
                      canvasTimeEnd,
                      visibleTimeStart,
                      visibleTimeEnd,
                      speedScrollHorizontal,
                      isCreateTaskList,
                      onCreateTask,
                      isShowBgColorGroup,
                      itemPositionDisplayed,
                      isCreateTrackRecord
                    )}
                    {this.items(
                      canvasTimeStart,
                      zoom,
                      canvasTimeEnd,
                      canvasWidth,
                      minUnit,
                      dimensionItems,
                      groupHeights,
                      groupTops,
                      itemPositionDisplayed
                    )}
                    {this.childrenWithProps(
                      canvasTimeStart,
                      canvasTimeEnd,
                      canvasWidth,
                      dimensionItems,
                      groupHeights,
                      groupTops,
                      height,
                      visibleTimeStart,
                      visibleTimeEnd,
                      minUnit,
                      timeSteps
                    )}
                  </MarkerCanvas>
                </ScrollElement>
                {groups?.length && !canMoveChart && (
                  <div className="scroll-temporary-container">
                    <div className="scroll-temporary-header"></div>
                    <div
                      className="scroll-temporary-body"
                      ref={this.refHandler}
                    >
                      <div className="content">&nbsp;</div>
                    </div>
                  </div>
                )}

                {rightSidebarWidth > 0
                  ? this.rightSidebar(height, groupHeights)
                  : null}
              </div>
            </div>
          </TimelineHeadersProvider>
        </TimelineMarkersProvider>
      </TimelineStateProvider>
    )
  }
}
