import React, { Component } from 'react'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import { _get, deepObjectCompare } from '../utility/generic'

const renderGroupContent = (
  group,
  groupRenderer,
  isRightSidebar,
  groupRightTitleKey,
  groupTitleKey
) => {
  if (groupRenderer) {
    return React.createElement(groupRenderer, {
      group,
      isRightSidebar
    })
  } else {
    return _get(group, isRightSidebar ? groupRightTitleKey : groupTitleKey)
  }
}

const DragHandle = SortableHandle(() => (
  <button className="drag-handle-btn">
    <i class="icon-drag fas fa-grip-lines-vertical"></i>
  </button>
))

class SortableItemClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groupChildren: renderGroupContent(
        this.props.group,
        this.props.groupRenderer,
        this.props.isRightSidebar,
        this.props.groupRightTitleKey,
        this.props.groupTitleKey
      )
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const derivedState = {}
    if (!deepObjectCompare(nextProps.group, prevState.group)) {
      Object.assign(derivedState, {
        groupChildren: renderGroupContent(
          nextProps.group,
          nextProps.groupRenderer,
          nextProps.isRightSidebar,
          nextProps.groupRightTitleKey,
          nextProps.groupTitleKey
        )
      })
    }
    return derivedState
  }

  render() {
    const { group, groupIdKey, groupHeights, openAddGroupForm } = this.props
    return (
      <div
        key={_get(group, groupIdKey)}
        className={
          'rct-sidebar-row rct-sidebar-row-' +
          (group.index % 2 === 0 ? 'even' : 'odd')
        }
        style={{
          height: `${groupHeights[group.index]}px`,
          lineHeight: `${groupHeights[group.index]}px`
        }}
      >
        {this.state.groupChildren}
        <div className={'rct-drag-drop'}>
          <div className={'rct-siderbar-control-btns'}>
            <DragHandle />
            <button onClick={() => openAddGroupForm(_get(group, groupIdKey))}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export const SortableItem = SortableElement(SortableItemClass)
