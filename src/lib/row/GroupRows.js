import PropTypes from 'prop-types'
import React, { Component } from 'react'
import GroupRow from './GroupRow'

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
    onCreateTaskList: PropTypes.func.isRequired,
    scrollRef: PropTypes.object,
    getTimeFromRowClickEvent: PropTypes.func.isRequired,
    onDayToTime: PropTypes.func.isRequired,
    isShowBgColorGroup: PropTypes.bool.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.lineCount === this.props.lineCount &&
      nextProps.groupHeights === this.props.groupHeights &&
      nextProps.groups === this.props.groups
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
      onCreateTaskList,
      scrollRef,
      getTimeFromRowClickEvent,
      onDayToTime,
      isShowBgColorGroup
    } = this.props
    let lines = []

    for (let i = 0; i < lineCount; i++) {
      lines.push(
        <GroupRow
          clickTolerance={clickTolerance}
          onContextMenu={evt => onRowContextClick(evt, i)}
          onClick={evt => onRowClick(evt, i)}
          onDoubleClick={evt => onRowDoubleClick(evt, i)}
          key={`horizontal-line-${i}`}
          isEvenRow={i % 2 === 0}
          group={groups[i]}
          horizontalLineClassNamesForGroup={horizontalLineClassNamesForGroup}
          style={{
            width: `${canvasWidth}px`,
            height: `${groupHeights[i]}px`,
            position: 'relative'
          }}
          width={width}
          canvasTimeStart={canvasTimeStart}
          canvasTimeEnd={canvasTimeEnd}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          speedScrollHorizontal={speedScrollHorizontal}
          isCreateTaskList={isCreateTaskList}
          onCreateTaskList={onCreateTaskList}
          scrollRef={scrollRef}
          getTimeFromRowClickEvent={getTimeFromRowClickEvent}
          onDayToTime={onDayToTime}
          canvasWidth={canvasWidth}
          isShowBgColorGroup={isShowBgColorGroup}
        />
      )
    }

    return <div className="rct-horizontal-lines">{lines}</div>
  }
}
