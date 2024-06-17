import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'
import {
  calculateTimeForXPosition,
  calculateXPositionForTime,
  checkValueDate
} from '../utility/calendar'
import moment from 'moment'

const HEIGHT_TASK = 23,
  MARGIN_TOP_OF_TASK = 7,
  BG_COLOR_TASK = '#4fc3f7',
  BG_COLOR_SUB_TASK = '#a6e0fa',
  MIN_WIDTH = 52,
  COUNT_TIME = 1,
  MAX_NUMBER_OF_DRAG_DAYS = 59,
  HEIGHT_ROW_TASK = 60,
  BG_COLOR_GROUP_TASK = 'rgba(203, 228, 254, 0.3)',
  HEIGHT_ROW_GEMBA = 64,
  OPACITY_ROW_TASK = 0.15,
  BG_COLOR_TRACK_RECORD = '#27AE60',
  BG_COLOR_SUB_TRACK_RECORD = '#92D6AF',
  HEIGHT_TRACK_RECORD = 14,
  MARGIN_TOP_OF_TRACK_RECORD = 39

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
    onCreateTask: PropTypes.func.isRequired,
    scrollRef: PropTypes.object,
    getTimeFromRowClickEvent: PropTypes.func.isRequired,
    onDayToTime: PropTypes.func.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    isShowBgColorGroup: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    itemPositionDisplayed: PropTypes.object.isRequired,
    isScheduleScreen: PropTypes.bool.isRequired,
    isCreateTrackRecord: PropTypes.bool.isRequired
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
    this.isCreatingPositionAbove = true
  }

  componentDidUpdate() {
    if (this.state.countTime >= COUNT_TIME) {
      window.addEventListener('mouseup', this.handleResetData, true)
    } else {
      window.removeEventListener('mouseup', this.handleResetData, true)
    }
  }

  renderCreateTask = (
    group,
    countTime,
    left,
    width,
    isCreatingPositionAbove
  ) => {
    if (countTime < COUNT_TIME) return <></>
    const { isMerge } = group

    return (
      <>
        {isCreatingPositionAbove ? (
          <div
            style={{
              position: 'absolute',
              left: `${left}px`,
              top: `${MARGIN_TOP_OF_TASK}px`,
              height: `${HEIGHT_TASK}px`,
              width: `${width}px`,
              minWidth: `${MIN_WIDTH}px`,
              backgroundColor: isMerge ? BG_COLOR_TASK : BG_COLOR_SUB_TASK,
              borderRadius: '6px',
              paddingLeft: '5px',
              display: 'flex',
              alignItems: 'center',
              zIndex: 2
            }}
          >
            <span style={{ whiteSpace: 'nowrap' }}>{group?.title}</span>
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              left: `${left}px`,
              top: `${MARGIN_TOP_OF_TRACK_RECORD}px`,
              height: `${HEIGHT_TRACK_RECORD}px`,
              width: `${width}px`,
              minWidth: `${MIN_WIDTH}px`,
              backgroundColor: isMerge
                ? BG_COLOR_TRACK_RECORD
                : BG_COLOR_SUB_TRACK_RECORD,
              zIndex: 2
            }}
          />
        )}
      </>
    )
  }

  renderBgColor = (
    isShowBgColorGroup,
    group,
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    isScheduleScreen
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
          height: `${isScheduleScreen ? HEIGHT_ROW_GEMBA : HEIGHT_ROW_TASK}px`,
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
    const {
      group,
      isCreateTaskList,
      getTimeFromRowClickEvent,
      isCreateTrackRecord
    } = this.props
    const { task, isEmptyGroup, isAddinationForm } = group
    const { isEmptySubGroup } = task

    const isHasDateTimeTask =
      !!checkValueDate(task?.begin_date) && !!checkValueDate(task?.end_date)
    const isHasTrackRecord = !!task?.track_record_list?.length

    const offsetY = e?.nativeEvent?.offsetY || e?.offsetY || 0
    this.isCreatingPositionAbove = offsetY <= HEIGHT_ROW_TASK / 2

    const isCreatingInvalidTask =
      this.isCreatingPositionAbove && (!isCreateTaskList || isHasDateTimeTask)
    const isCreatingInvalidTrackRecord =
      !this.isCreatingPositionAbove &&
      (!isCreateTrackRecord || isHasTrackRecord)

    if (
      (!isCreateTaskList && !isCreateTrackRecord) ||
      isCreatingInvalidTask ||
      isCreatingInvalidTrackRecord ||
      isEmptyGroup ||
      isAddinationForm ||
      isEmptySubGroup
    ) {
      return
    }

    this.startTimeTaskCreating = moment(
      moment(getTimeFromRowClickEvent(e)).format('YYYY-MM-DD')
    ).valueOf()

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
    const { isCreateTaskList, isCreateTrackRecord } = this.props

    if (!this.intervalTouchTime || (!isCreateTaskList && !isCreateTrackRecord))
      return

    clearInterval(this.intervalTouchTime)
    this.intervalTouchTime = null
  }

  handleResetData = async e => {
    const {
      isCreateTaskList,
      group,
      getTimeFromRowClickEvent,
      isCreateTrackRecord
    } = this.props

    if (!isCreateTaskList && !isCreateTrackRecord) return

    const endTime = this.endTimeTmp || getTimeFromRowClickEvent(e)

    if (endTime >= this.startTimeTaskCreating) {
      let endDate = endTime
      const maxEndDate = moment(this.startTimeTaskCreating)
        .add(MAX_NUMBER_OF_DRAG_DAYS, 'days')
        .valueOf()

      if (endDate > maxEndDate) {
        endDate = maxEndDate
      }

      await this.props.onCreateTask(
        group,
        this.startTimeTaskCreating,
        endDate,
        this.isCreatingPositionAbove
      )
    } else {
      let startDate = endTime
      const endDate = moment(this.startTimeTaskCreating).add(-1, 'days')
      const minStartDate = moment(endDate)
        .add(-MAX_NUMBER_OF_DRAG_DAYS, 'days')
        .valueOf()

      if (startDate < minStartDate) {
        startDate = minStartDate
      }

      await this.props.onCreateTask(
        group,
        startDate,
        endDate,
        this.isCreatingPositionAbove
      )
    }

    clearInterval(this.intervalTouchTime)
    clearInterval(this.refreshIntervalId)
    document.querySelector('.rct-horizontal-lines').style.cursor = 'default'

    this.isCreatingPositionAbove = true
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
      canvasWidth,
      isCreateTrackRecord
    } = this.props

    if (
      (!isCreateTaskList && !isCreateTrackRecord) ||
      this.state.countTime < COUNT_TIME ||
      !scrollRef
    ) {
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
      index,
      itemPositionDisplayed,
      isScheduleScreen
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
              {this.renderCreateTask(
                group,
                countTime,
                left,
                width,
                this.isCreatingPositionAbove
              )}
              {this.renderBgColor(
                isShowBgColorGroup,
                group,
                canvasTimeStart,
                canvasTimeEnd,
                canvasWidth,
                isScheduleScreen
              )}
            </>
          )}
        </div>
      </PreventClickOnDrag>
    )
  }
}

export default GroupRow
