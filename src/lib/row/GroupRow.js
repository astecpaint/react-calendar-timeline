import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'
import {
  calculateTimeForXPosition,
  calculateXPositionForTime,
  checkValueDate
} from '../utility/calendar'
import moment from 'moment'

const HEIGHT_GEMBA = 23,
  SPACING_TOP_ROW = 7,
  BG_COLOR_TASK = '#8CD1FF',
  MIN_WIDTH_TASK = 52,
  COUNT_TIME = 4,
  MAX_NUMBER_OF_DRAG_DAYS = 59,
  HEIGHT_ROW_TASK = 60,
  BG_COLOR_GROUP_TASK = 'rgba(203, 228, 254, 0.3)',
  HEIGHT_ROW_GEMBA = 64,
  OPACITY_ROW_TASK = 0.15

class GroupRow extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    isEvenRow: PropTypes.bool.isRequired,
    style: PropTypes.object.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    group: PropTypes.object.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func,
    width: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    speedScrollHorizontal: PropTypes.number.isRequired,
    isCreateTaskList: PropTypes.bool.isRequired,
    onCreateTaskList: PropTypes.func.isRequired,
    scrollRef: PropTypes.object,
    getTimeFromRowClickEvent: PropTypes.func.isRequired,
    onDayToTime: PropTypes.func.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    isShowBgColorGroup: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    itemPositionDisplayed: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      left: 0,
      width: 0,
      countTime: 0,
      isOutChart: false
    }

    this.intervalTouchTime = null
    this.startTimeTaskCreating = 0
    this.refreshIntervalId = null
    this.endTimeTmp = 0
  }

  componentDidUpdate() {
    if (this.state.countTime >= COUNT_TIME) {
      window.addEventListener('mouseup', this.handleResetData, true)
    } else {
      window.removeEventListener('mouseup', this.handleResetData, true)
    }
  }

  renderCreateTask = (group, countTime, left, width) => {
    if (countTime < COUNT_TIME) return <></>

    return (
      <div
        style={{
          position: 'absolute',
          left: `${left}px`,
          top: `${SPACING_TOP_ROW}px`,
          height: `${HEIGHT_GEMBA}px`,
          width: `${width}px`,
          minWidth: `${MIN_WIDTH_TASK}px`,
          backgroundColor: BG_COLOR_TASK,
          borderRadius: '6px',
          paddingLeft: '5px',
          display: 'flex',
          alignItems: 'center',
          zIndex: 2
        }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>{group?.title}</span>
      </div>
    )
  }

  renderBgColor = (
    isShowBgColorGroup,
    group,
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    isCreateTaskList
  ) => {
    const {
      isHide,
      isEmptyGroup,
      task,
      minBeginDate,
      maxEndDate,
      isTaskList,
      expanded,
      isCustomGroup
    } = group
    const { isEmptySubGroup, task_color, parent_task_color } = task ?? {}
    const newIsHide = !isTaskList ? isHide : isHide || !expanded

    if (
      !isShowBgColorGroup ||
      newIsHide ||
      isEmptyGroup ||
      isEmptySubGroup ||
      !minBeginDate ||
      !maxEndDate
    ) {
      return <></>
    }

    const timeStartDate = moment(minBeginDate).valueOf()
    const timeEndDate = moment(maxEndDate)
      .set({
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 59
      })
      .valueOf()

    const left = calculateXPositionForTime(
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      timeStartDate
    )

    const right = calculateXPositionForTime(
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      timeEndDate
    )

    const width = right - left

    const bgColor = isTaskList || isCustomGroup ? task_color : parent_task_color

    return (
      <div
        style={{
          position: 'absolute',
          width,
          top: 0,
          left,
          height: `${isCreateTaskList ? HEIGHT_ROW_TASK : HEIGHT_ROW_GEMBA}px`,
          backgroundColor: bgColor ?? BG_COLOR_GROUP_TASK,
          opacity: bgColor ? OPACITY_ROW_TASK : 1,
          zIndex: 1
        }}
      />
    )
  }

  calendarScrollWithTime = scrollLeft => {
    const {
      width,
      canvasTimeStart,
      visibleTimeStart,
      visibleTimeEnd,
      speedScrollHorizontal
    } = this.props

    const zoom = visibleTimeEnd - visibleTimeStart

    const visibleTimeStartOld = canvasTimeStart + (zoom * scrollLeft) / width
    const newVisibleTimeStart =
      canvasTimeStart + (zoom * (scrollLeft + speedScrollHorizontal)) / width

    const visibleTimeChange = newVisibleTimeStart - visibleTimeStartOld
    return visibleTimeChange
  }

  calendarStopAutoScroll = timeStart => {
    const newTimeStart = new Date(timeStart)
    const dayStartToTime = newTimeStart.getTime()
    const endScrollLeft =
      Number(dayStartToTime) -
      Number(this.props.onDayToTime(MAX_NUMBER_OF_DRAG_DAYS))
    const endScrollRight =
      Number(dayStartToTime) +
      Number(this.props.onDayToTime(MAX_NUMBER_OF_DRAG_DAYS))

    return { endScrollLeft, endScrollRight }
  }

  handleMouseDown = e => {
    const { group, isCreateTaskList, getTimeFromRowClickEvent } = this.props

    if (
      !isCreateTaskList ||
      (checkValueDate(group?.task?.begin_date) &&
        checkValueDate(group?.task?.end_date)) ||
      !!group?.isEmptyGroup ||
      !!group?.isAddinationForm
    ) {
      return
    }

    this.startTimeTaskCreating = getTimeFromRowClickEvent(e)
    this.intervalTouchTime = setInterval(
      function() {
        if (this.state.countTime < COUNT_TIME) {
          this.setState({ countTime: this.state.countTime + 1 })
        } else {
          document.querySelector('.rct-horizontal-lines').style.cursor =
            'pointer'
        }
      }.bind(this),
      500
    )
  }

  handleMouseUp = () => {
    if (!this.intervalTouchTime) return

    clearInterval(this.intervalTouchTime)
    this.intervalTouchTime = null
  }

  handleResetData = async e => {
    const { isCreateTaskList, group, getTimeFromRowClickEvent } = this.props

    if (!isCreateTaskList) return

    const endTime = this.endTimeTmp || getTimeFromRowClickEvent(e)

    if (endTime >= this.startTimeTaskCreating) {
      let endDate = endTime
      const maxEndDate = moment(this.startTimeTaskCreating)
        .add(MAX_NUMBER_OF_DRAG_DAYS, 'days')
        .valueOf()

      if (endDate > maxEndDate) {
        endDate = maxEndDate
      }

      await this.props.onCreateTaskList(
        group,
        this.startTimeTaskCreating,
        endDate
      )
    } else {
      let startDate = endTime
      const minStartDate = moment(this.startTimeTaskCreating)
        .add(-MAX_NUMBER_OF_DRAG_DAYS, 'days')
        .valueOf()

      if (startDate < minStartDate) {
        startDate = minStartDate
      }

      await this.props.onCreateTaskList(
        group,
        startDate,
        this.startTimeTaskCreating
      )
    }

    clearInterval(this.intervalTouchTime)
    clearInterval(this.refreshIntervalId)
    document.querySelector('.rct-horizontal-lines').style.cursor = 'default'

    this.startTimeTaskCreating = 0
    this.endTimeTmp = 0
    this.intervalTouchTime = null
    this.refreshIntervalId = null
    this.setState({ left: 0, width: 0, countTime: 0, isOutChart: false })
  }

  handleMouseMove = e => {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      visibleTimeStart,
      visibleTimeEnd,
      speedScrollHorizontal,
      isCreateTaskList,
      scrollRef,
      getTimeFromRowClickEvent,
      onDayToTime,
      canvasWidth
    } = this.props

    if (!isCreateTaskList || this.state.countTime < COUNT_TIME || !scrollRef) {
      return
    }

    const timeStart = this.startTimeTaskCreating,
      timeEnd = getTimeFromRowClickEvent(e),
      newVisibleTimeStart = visibleTimeStart + onDayToTime(0.5),
      newVisibleTimeEnd = visibleTimeEnd - onDayToTime(0.5),
      isDragToLeftInChart = timeEnd <= timeStart,
      isDragToLeftOutChart = timeEnd < newVisibleTimeStart

    const { endScrollLeft, endScrollRight } = this.calendarStopAutoScroll(
      timeStart
    )

    if (timeEnd <= endScrollLeft || timeEnd >= endScrollRight) return
    else if (
      (newVisibleTimeStart < timeEnd && newVisibleTimeEnd > timeEnd) ||
      (newVisibleTimeStart >= timeEnd &&
        timeStart <= timeEnd &&
        visibleTimeStart < timeStart) ||
      (newVisibleTimeEnd <= timeEnd &&
        timeStart > timeEnd &&
        visibleTimeEnd > timeStart)
    ) {
      if (this.state.isOutChart) {
        clearInterval(this.refreshIntervalId)
        this.refreshIntervalId = null
        this.setState({ isOutChart: false })
      }

      const left = calculateXPositionForTime(
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        isDragToLeftInChart ? timeEnd : timeStart
      )

      const right = calculateXPositionForTime(
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        isDragToLeftInChart ? timeStart : timeEnd
      )

      const width = right - left
      this.setState({ width, left })
      this.endTimeTmp = timeEnd
      return
    } else {
      if (!this.endTimeTmp) {
        this.endTimeTmp = timeEnd
      }

      if (!this.state.isOutChart) {
        this.refreshIntervalId = setInterval(() => {
          const isStartSmallerThanEnd =
            this.startTimeTaskCreating < this.endTimeTmp
          const { scrollLeft } = scrollRef
          let leftScroll = scrollLeft + speedScrollHorizontal,
            scrollTime = this.calendarScrollWithTime(scrollLeft),
            right = 0,
            left = this.state.left

          if (
            this.endTimeTmp < endScrollLeft ||
            this.endTimeTmp > endScrollRight
          ) {
            clearInterval(this.refreshIntervalId)
            return
          }

          if (isDragToLeftOutChart) {
            leftScroll = scrollLeft - speedScrollHorizontal
            scrollTime = -scrollTime
          }

          scrollRef.scroll({ left: leftScroll })

          if (isDragToLeftOutChart) {
            right = calculateXPositionForTime(
              canvasTimeStart,
              canvasTimeEnd,
              canvasWidth,
              isStartSmallerThanEnd ? this.endTimeTmp : timeStart
            )
            const oldTimeStart = calculateTimeForXPosition(
              canvasTimeStart,
              canvasTimeEnd,
              canvasWidth,
              this.state.left
            )
            left = calculateXPositionForTime(
              canvasTimeStart,
              canvasTimeEnd,
              canvasWidth,
              isStartSmallerThanEnd
                ? oldTimeStart + scrollTime
                : this.endTimeTmp
            )
          } else {
            const oldTimeEnd = calculateTimeForXPosition(
              canvasTimeStart,
              canvasTimeEnd,
              canvasWidth,
              left + this.state.width
            )
            right = calculateXPositionForTime(
              canvasTimeStart,
              canvasTimeEnd,
              canvasWidth,
              isStartSmallerThanEnd ? this.endTimeTmp : oldTimeEnd + scrollTime
            )
            left = calculateXPositionForTime(
              canvasTimeStart,
              canvasTimeEnd,
              canvasWidth,
              isStartSmallerThanEnd
                ? this.startTimeTaskCreating
                : this.endTimeTmp
            )
          }

          const width = right - left
          this.setState({ width, left })
          this.endTimeTmp += scrollTime
        }, 10)

        this.setState({ isOutChart: true })
      }
    }
  }

  render() {
    const {
      onContextMenu,
      onDoubleClick,
      isEvenRow,
      style,
      onClick,
      clickTolerance,
      horizontalLineClassNamesForGroup,
      group,
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      isShowBgColorGroup,
      isCreateTaskList,
      index,
      itemPositionDisplayed
    } = this.props

    const { countTime, left, width } = this.state

    let classNamesForGroup = []
    if (horizontalLineClassNamesForGroup) {
      classNamesForGroup = horizontalLineClassNamesForGroup(group)
    }
    const { start, end } = itemPositionDisplayed

    return (
      <PreventClickOnDrag
        clickTolerance={clickTolerance}
        onClick={onClick}
        onRowMouseDown={this.handleMouseDown}
        onRowMouseUp={this.handleMouseUp}
        onRowMouseMove={this.handleMouseMove}
      >
        <div
          onContextMenu={onContextMenu}
          onDoubleClick={onDoubleClick}
          className={
            (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') +
            (classNamesForGroup ? classNamesForGroup.join(' ') : '')
          }
          style={style}
        >
          {index >= start && index <= end && (
            <>
              {this.renderCreateTask(group, countTime, left, width)}
              {this.renderBgColor(
                isShowBgColorGroup,
                group,
                canvasTimeStart,
                canvasTimeEnd,
                canvasWidth,
                isCreateTaskList
              )}
            </>
          )}
        </div>
      </PreventClickOnDrag>
    )
  }
}

export default GroupRow
