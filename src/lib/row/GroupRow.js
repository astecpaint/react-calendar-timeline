import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'

const DEFAULT_HEIGHT_TASK = 32,
  DEFAULT_PADDING_BOTTOM = 8

class GroupRow extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    isEvenRow: PropTypes.bool.isRequired,
    style: PropTypes.object.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    group: PropTypes.object.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func
  }

  renderBorderTaskList = () => {
    const { group } = this.props
    const { height, task_list, expanded, isGroupLoading } = group

    const numberOfTaskList = task_list?.length ?? 0
    if (!numberOfTaskList) return <></>

    const topPositionOfTaskFirst =
      height - (DEFAULT_HEIGHT_TASK * numberOfTaskList + DEFAULT_PADDING_BOTTOM)

    return (
      <>
        {expanded &&
          !isGroupLoading &&
          task_list.map((task, taskIndex) => (
            <div
              key={`${task?.task_id}-${taskIndex}`}
              style={{
                position: 'absolute',
                top: `${topPositionOfTaskFirst +
                  DEFAULT_HEIGHT_TASK * taskIndex}px`,
                left: 0,
                width: '100%',
                borderTop: '1px dashed #e3e3e3'
              }}
            />
          ))}
      </>
    )
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
      group
    } = this.props

    let classNamesForGroup = []
    if (horizontalLineClassNamesForGroup) {
      classNamesForGroup = horizontalLineClassNamesForGroup(group)
    }

    return (
      <>
        {!group?.isHide || group?.isMerge ? (
          <PreventClickOnDrag clickTolerance={clickTolerance} onClick={onClick}>
            <div
              onContextMenu={onContextMenu}
              onDoubleClick={onDoubleClick}
              className={
                (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') +
                (classNamesForGroup ? classNamesForGroup.join(' ') : '')
              }
              style={style}
            >
              {this.renderBorderTaskList()}
            </div>
          </PreventClickOnDrag>
        ) : (
          <></>
        )}
      </>
    )
  }
}

export default GroupRow
