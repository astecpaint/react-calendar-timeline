import React, { Component } from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import { SortableItem } from './SortableItem'
import { arraysEqual, deepObjectCompare } from '../utility/generic'

class SortableListClass extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    return !(
      arraysEqual(nextProps.groups, this.props.groups) &&
      nextProps.groupIdKey === this.props.groupIdKey &&
      nextProps.groupRightTitleKey === this.props.groupRightTitleKey &&
      nextProps.groupTitleKey === this.props.groupTitleKey &&
      nextProps.isRightSidebar === this.props.isRightSidebar &&
      deepObjectCompare(
        nextProps.sidebarPositionDisplayed,
        this.props.sidebarPositionDisplayed
      ) &&
      nextProps.viewOption === this.props.viewOption &&
      nextProps.isShowTrackRecord === this.props.isShowTrackRecord
    )
  }

  render() {
    const {
      groups,
      groupIdKey,
      groupRightTitleKey,
      groupTitleKey,
      isRightSidebar,
      openAddGroupForm,
      groupRenderer,
      buttonTooltipRenderer,
      sidebarPositionDisplayed
    } = this.props

    return (
      <div
        className="list-task-draggable"
        id="dropzone-task"
        style={{ borderTopWidth: '0px' }}
      >
        {groups?.map((item, index) => (
          <SortableItem
          keyIndex={item.index}
          key={`item-${item.index}`}
          index={item.index}
          group={item}
          disabled={false}
          groupIdKey={groupIdKey}
          openAddGroupForm={openAddGroupForm}
          groupRenderer={groupRenderer}
          isRightSidebar={isRightSidebar}
          groupRightTitleKey={groupRightTitleKey}
          groupTitleKey={groupTitleKey}
          ButtonTooltip={buttonTooltipRenderer}
          currentIndex={index}
          sidebarPositionDisplayed={sidebarPositionDisplayed}
        />
        ))}
      </div>
    )
  }
}

export const SortableList = SortableContainer(SortableListClass)
