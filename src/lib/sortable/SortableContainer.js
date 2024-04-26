import React, { Component, Fragment } from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import { SortableItem } from './SortableItem'
import { arraysEqual } from '../utility/generic'

class SortableListClass extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    return !(
      arraysEqual(nextProps.groups, this.props.groups) &&
      arraysEqual(nextProps.groupHeights, this.props.groupHeights) &&
      nextProps.groupIdKey === this.props.groupIdKey &&
      nextProps.groupRightTitleKey === this.props.groupRightTitleKey &&
      nextProps.groupTitleKey === this.props.groupTitleKey &&
      nextProps.isRightSidebar === this.props.isRightSidebar
    )
  }

  render() {
    const {
      groups,
      groupHeights,
      groupIdKey,
      groupRightTitleKey,
      groupTitleKey,
      isRightSidebar,
      openAddGroupForm,
      groupRenderer
    } = this.props
    return (
      <div
        className="list-task-draggable"
        id="dropzone-task"
        style={{ borderTopWidth: '0px' }}
      >
        {groups?.map((item, index) => {
          return !!item?.isEmptyGroup || !!item?.task?.isEmptySubGroup ? (
            <Fragment key={index}>
              {groupRenderer
                ? React.createElement(groupRenderer, {
                    group: item,
                    isRightSidebar
                  })
                : _get(
                    item,
                    isRightSidebar ? groupRightTitleKey : groupTitleKey
                  )}
            </Fragment>
          ) : (
            <SortableItem
              keyIndex={item.index}
              key={`item-${item.index}`}
              index={index}
              group={item}
              disabled={false}
              groupIdKey={groupIdKey}
              groupHeights={groupHeights}
              openAddGroupForm={openAddGroupForm}
              groupRenderer={groupRenderer}
              isRightSidebar={isRightSidebar}
              groupRightTitleKey={groupRightTitleKey}
              groupTitleKey={groupTitleKey}
            />
          )
        })}
      </div>
    )
  }
}

export const SortableList = SortableContainer(SortableListClass)
