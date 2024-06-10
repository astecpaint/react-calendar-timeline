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
    this.btnAddRef = React.createRef()
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
    const {
      group,
      groupIdKey,
      groupHeights,
      openAddGroupForm,
      index,
      showTooltip
    } = this.props
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
        <div
          className={
            'rct-drag-drop' +
            (group?.task?.parent_id != null &&
            group?.task?.parent_id != undefined
              ? ' -sub'
              : '')
          }
        >
          <div
            className={
              'rct-siderbar-control-btns' +
              (group?.task?.parent_id != null &&
              group?.task?.parent_id != undefined
                ? ' -sub'
                : '')
            }
          >
            <DragHandle />
            <button
              onClick={() => openAddGroupForm(_get(group, groupIdKey), group)}
              onMouseEnter={() => showTooltip(this.btnAddRef.current, group)}
              onMouseLeave={() => showTooltip(null, group)}
              ref={this.btnAddRef}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export const SortableItem = SortableElement(SortableItemClass)
