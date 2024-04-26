import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'

import { _get, arraysEqual } from '../utility/generic'
import GroupSortable from './GroupSortable'
import GroupContent from './GroupContent'

export default class Sidebar extends Component {
  static propTypes = {
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    groupHeights: PropTypes.array.isRequired,
    keys: PropTypes.object.isRequired,
    groupRenderer: PropTypes.func,
    isRightSidebar: PropTypes.bool,
    isShowDragHandleButton: PropTypes.bool,
    sortOrderTaskList: PropTypes.func,
    openAddGroupForm: PropTypes.func
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.keys === this.props.keys &&
      nextProps.width === this.props.width &&
      nextProps.height === this.props.height &&
      arraysEqual(nextProps.groups, this.props.groups) &&
      arraysEqual(nextProps.groupHeights, this.props.groupHeights) &&
      nextProps.isShowInforGemba === this.props.isShowInforGemba &&
      nextProps.isShowDragHandleButton === this.props.isShowDragHandleButton &&
      nextProps.sortOrderTaskList === this.props.sortOrderTaskList
    )
  }

  renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey) {
    if (this.props.groupRenderer) {
      return React.createElement(this.props.groupRenderer, {
        group,
        isRightSidebar
      })
    } else {
      return _get(group, isRightSidebar ? groupRightTitleKey : groupTitleKey)
    }
  }

  render() {
    const {
      width,
      groupHeights,
      height,
      isRightSidebar,
      isShowDragHandleButton,
      sortOrderTaskList,
      canSortableGroups,
      groupRenderer
    } = this.props
    const { groupIdKey, groupTitleKey, groupRightTitleKey } = this.props.keys

    const sidebarStyle = {
      width: `${width}px`,
      height: `${height}px`
    }

    const groupsStyle = {
      width: `${width}px`
    }

    let groupLines = this.props.groups.map((group, index) => {
      const elementStyle = {
        height: `${groupHeights[index]}px`,
        lineHeight: `${groupHeights[index]}px`
      }

      return (
        <Fragment key={_get(group, groupIdKey)}>
          {(!group?.isHide && !group?.isMerge) || group?.isMerge ? (
            <div
              className={`rct-sidebar-row rct-sidebar-row-${
                index % 2 === 0 ? 'even' : 'odd'
              } ${group?.isMerge ? 'rct-sidebar-row-full-width' : ''}`}
              style={elementStyle}
            >
              <GroupContent
                group={group}
                isRightSidebar={isRightSidebar}
                groupTitleKey={groupTitleKey}
                groupRightTitleKey={groupRightTitleKey}
                groupRenderer={groupRenderer}
              />
            </div>
          ) : (
            <></>
          )}
        </Fragment>
      )
    })

    const newGroups =
      this.props.groups?.filter(
        group =>
          (!group?.isHide && !group?.isMerge) ||
          group?.isMerge ||
          group?.isEmptyGroup
      ) ?? []

    return (
      <div
        className={'rct-sidebar' + (isRightSidebar ? ' rct-sidebar-right' : '')}
        style={sidebarStyle}
      >
        {canSortableGroups ? (
          <div style={groupsStyle}>
            <GroupSortable
              groups={newGroups}
              groupHeights={groupHeights}
              isRightSidebar={isRightSidebar}
              groupTitleKey={groupTitleKey}
              groupRightTitleKey={groupRightTitleKey}
              groupIdKey={groupIdKey}
              groupRenderer={this.props.groupRenderer}
              sortOrderTaskList={sortOrderTaskList}
              isShowDragHandleButton={isShowDragHandleButton}
              openAddGroupForm={this.props.openAddGroupForm}
            />
          </div>
        ) : (
          <div style={groupsStyle}>{groupLines}</div>
        )}
      </div>
    )
  }
}
