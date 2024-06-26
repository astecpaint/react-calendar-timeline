import PropTypes from 'prop-types'
import React, { Component } from 'react'
import GroupRow from './GroupRow'
import { deepObjectCompare } from '../utility/generic'
import {
  DEFAULT_HEIGHT_ROW,
  DEFAULT_HEIGHT_ROW_PROCESS_BASIC
} from '../Timeline'

export default class GroupRows extends Component {
  static propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    lineCount: PropTypes.number.isRequired,
    groupHeights: PropTypes.array.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onRowDoubleClick: PropTypes.func.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    groups: PropTypes.array.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func,
    onRowContextClick: PropTypes.func.isRequired,
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
    isShowBgColorGroup: PropTypes.bool.isRequired,
    isScheduleScreen: PropTypes.bool.isRequired,
    itemPositionDisplayed: PropTypes.object.isRequired,
    isCreateTrackRecord: PropTypes.bool.isRequired,
    resizingItemCalled: PropTypes.bool,
    dragMoveItemCalled: PropTypes.bool,
    isShowTrackRecord: PropTypes.bool
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.resizingItemCalled ||
      nextProps.dragMoveItemCalled ||
      (nextProps.canvasWidth === this.props.canvasWidth &&
        nextProps.lineCount === this.props.lineCount &&
        nextProps.groupHeights === this.props.groupHeights &&
        nextProps.groups === this.props.groups &&
        deepObjectCompare(
          this.props.itemPositionDisplayed,
          nextProps.itemPositionDisplayed
        ) &&
        nextProps.isShowTrackRecord === this.props.isShowTrackRecord)
    )
  }

  render() {
    const {
      canvasWidth,
      lineCount,
      groupHeights,
      onRowClick,
      onRowDoubleClick,
      clickTolerance,
      groups,
      horizontalLineClassNamesForGroup,
      onRowContextClick,
      width,
      canvasTimeStart,
      canvasTimeEnd,
      visibleTimeStart,
      visibleTimeEnd,
      speedScrollHorizontal,
      isCreateTaskList,
      onCreateTask,
      scrollRef,
      getTimeFromRowClickEvent,
      onDayToTime,
      isShowBgColorGroup,
      isScheduleScreen,
      itemPositionDisplayed,
      isCreateTrackRecord
    } = this.props
    let lines = []

    const newGroups = groups.filter(
      group => (!group?.isHide && !group?.isMerge) || !!group?.isMerge
    )
    const newLineCount = newGroups.length
    const defaultHeight = isScheduleScreen
      ? DEFAULT_HEIGHT_ROW
      : DEFAULT_HEIGHT_ROW_PROCESS_BASIC

    for (let i = 0; i < newLineCount; i++) {
      lines.push(
        <GroupRow
          clickTolerance={clickTolerance}
          onContextMenu={evt => onRowContextClick(evt, i)}
          onClick={evt => onRowClick(evt, i)}
          onDoubleClick={evt => onRowDoubleClick(evt, i)}
          key={`horizontal-line-${i}`}
          isEvenRow={i % 2 === 0}
          group={newGroups[i]}
          horizontalLineClassNamesForGroup={horizontalLineClassNamesForGroup}
          style={{
            width: `${canvasWidth}px`,
            height: `${newGroups[i]?.height || defaultHeight}px`,
            position: 'relative'
          }}
          width={width}
          canvasTimeStart={canvasTimeStart}
          canvasTimeEnd={canvasTimeEnd}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          speedScrollHorizontal={speedScrollHorizontal}
          isCreateTaskList={isCreateTaskList}
          onCreateTask={onCreateTask}
          scrollRef={scrollRef}
          getTimeFromRowClickEvent={getTimeFromRowClickEvent}
          onDayToTime={onDayToTime}
          canvasWidth={canvasWidth}
          isShowBgColorGroup={isShowBgColorGroup}
          index={i}
          itemPositionDisplayed={itemPositionDisplayed}
          isScheduleScreen={isScheduleScreen}
          isCreateTrackRecord={isCreateTrackRecord}
        />
      )
    }

    return <div className="rct-horizontal-lines">{lines}</div>
  }
}
