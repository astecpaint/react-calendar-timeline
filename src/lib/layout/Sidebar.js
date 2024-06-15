import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { _get, arraysEqual, deepObjectCompare } from '../utility/generic'
import GroupSortable from './GroupSortable'
import GroupContent from './GroupContent'
import {
  DEFAULT_HEIGHT_ROW,
  DEFAULT_HEIGHT_ROW_PROCESS_BASIC
} from '../Timeline'

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
    openAddGroupForm: PropTypes.func,
    scrollContainer: PropTypes.node,
    buttonTooltipRenderer: PropTypes.node,

    isScheduleScreen: PropTypes.bool.isRequired,
    sidebarPositionDisplayed: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.keys === this.props.keys &&
      nextProps.width === this.props.width &&
      nextProps.height === this.props.height &&
      arraysEqual(nextProps.groups, this.props.groups) &&
      // arraysEqual(nextProps.groupHeights, this.props.groupHeights) &&
      nextProps.isShowInforGemba === this.props.isShowInforGemba &&
      nextProps.isShowDragHandleButton === this.props.isShowDragHandleButton &&
      nextProps.isScheduleScreen === this.props.isScheduleScreen &&
      deepObjectCompare(
        this.props.sidebarPositionDisplayed,
        nextProps.sidebarPositionDisplayed
      )
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
      groupRenderer,
      scrollContainer,
      buttonTooltipRenderer,
      groups,
      isScheduleScreen,
      sidebarPositionDisplayed
    } = this.props
    const { groupIdKey, groupTitleKey, groupRightTitleKey } = this.props.keys

    const sidebarStyle = {
      width: `${width}px`,
      height: `${height}px`
    }

    const groupsStyle = {
      width: `${width}px`
    }

    const { start, end } = sidebarPositionDisplayed
    const newGroupDisplayed = groups.filter(
      group => (!group?.isHide && !group?.isMerge) || !!group?.isMerge
    )

    const groupLines = newGroupDisplayed.map((group, index) => {
      const defaultHeight = isScheduleScreen
        ? DEFAULT_HEIGHT_ROW
        : DEFAULT_HEIGHT_ROW_PROCESS_BASIC

      const elementStyle = {
        height: `${group?.height || defaultHeight}px`,
        lineHeight: `${group?.height || defaultHeight}px`
      }

      return (
        <div
          key={_get(group, groupIdKey)}
          className={`rct-sidebar-row rct-sidebar-row-${
            index % 2 === 0 ? 'even' : 'odd'
          } ${
            !!group?.isMerge && !!group?.isCustomGroup
              ? 'rct-sidebar-row-full-width'
              : ''
          }`}
          style={elementStyle}
        >
          {index >= start && index <= end && (
            <GroupContent
              group={group}
              isRightSidebar={isRightSidebar}
              groupTitleKey={groupTitleKey}
              groupRightTitleKey={groupRightTitleKey}
              groupRenderer={groupRenderer}
            />
          )}
        </div>
      )
    })

    const newGroups =
      groups.filter(
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
              scrollContainer={scrollContainer}
              buttonTooltipRenderer={buttonTooltipRenderer}
              sidebarPositionDisplayed={sidebarPositionDisplayed}
            />
          </div>
        ) : (
          <div style={groupsStyle}>{groupLines}</div>
        )}
      </div>
    )
  }
}
