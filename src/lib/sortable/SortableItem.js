import React, { PureComponent } from 'react'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import { _get, deepObjectCompare } from '../utility/generic'
import { DEFAULT_HEIGHT_ROW_PROCESS_BASIC } from '../Timeline'

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

const DragHandle = SortableHandle(({ groupIndex }) => (
  <button className="drag-handle-btn" data-group-index={groupIndex}>
    <i
      class="icon-drag fas fa-grip-lines-vertical"
      style={{ pointerEvents: 'none' }}
    ></i>
  </button>
))

class SortableItemClass extends PureComponent {
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
    const {
      group,
      groupIdKey,
      openAddGroupForm,
      ButtonTooltip,
      currentIndex,
      sidebarPositionDisplayed,
    } = this.props;
    const { start, end } = sidebarPositionDisplayed

    return (
      <div
        className={
          'rct-sidebar-row rct-sidebar-row-' +
          (group.index % 2 === 0 ? 'even' : 'odd') +
          (' -sort-index-' + group?.index) +
          (group?.task?.parent_id
            ? ' -sub sidebar-grouped-by-' +
            group?.task?.parent_id +
            ' group-move-' +
            group?.task?.parent_id
            : ' sidebar-grouped-by-' +
            group?.task?.task_id +
            ' group-move-' +
            group?.task?.task_id) +
          (group?.isTaskPQA ? ' rct-sidebar-row-full-width' : '')
        }
        style={{
          height: `${group?.height || DEFAULT_HEIGHT_ROW_PROCESS_BASIC}px`,
          lineHeight: `${group?.height || DEFAULT_HEIGHT_ROW_PROCESS_BASIC}px`,
        }}
      >
        {((currentIndex >= start && currentIndex <= end) ||
          group?.isAddinationForm) && (
            <>
              {this.state.groupChildren}
              {(!group?.isEmptyGroup && !group?.task?.isEmptySubGroup) && (
                <div
                  className={
                    'rct-drag-drop' +
                    (group?.task?.parent_id != null &&
                      group?.task?.parent_id != undefined
                      ? ' -sub'
                      : '') + (group?.isTaskPQA ? ' -task-pqa' : '')
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
                    <DragHandle groupIndex={group?.index} />

                    {!group?.isTaskPQA && (
                      <>
                        {ButtonTooltip ? (
                          <ButtonTooltip
                            group={group}
                            children={
                              <button
                                onClick={() =>
                                  openAddGroupForm(_get(group, groupIdKey), group)
                                }
                              >
                                <i className="fas fa-plus" />
                              </button>
                            }
                          />
                        ) : (
                          <button
                            onClick={() =>
                              openAddGroupForm(_get(group, groupIdKey), group)
                            }
                          >
                            <i className="fas fa-plus" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
      </div>
    )
  }
}

export const SortableItem = SortableElement(SortableItemClass)
