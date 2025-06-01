import React, { PureComponent } from 'react'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import { _get, deepObjectCompare } from '../utility/generic'
import { DEFAULT_HEIGHT_ROW_PROCESS_BASIC } from '../Timeline'
import { SORTABLE_LAYER_CLASS_NAME } from '../common/constants'

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

  getSortableClassName = group => {
    const { ONE, TWO, THREE } = SORTABLE_LAYER_CLASS_NAME
    const { isSection, task, customId } = group
    const parentId = task?.parent_id
    const taskId = task?.task_id

    const sortableClassNames = ['sortable', ` sortable-group-${group?.index}`]
    if (parentId && taskId) {
      sortableClassNames.push(` ${ONE}--${taskId}`)
    }
    if (!isSection && (parentId || taskId)) {
      sortableClassNames.push(` ${TWO}--${parentId || taskId}`)
    }
    if (customId) {
      sortableClassNames.push(` ${THREE}--${customId}`)
    }

    return sortableClassNames.join('')
  }

  render() {
    const {
      group,
      groupIdKey,
      openAddGroupForm,
      ButtonTooltip,
      currentIndex,
      sidebarPositionDisplayed
    } = this.props
    const { start, end } = sidebarPositionDisplayed
    const sortableClassNameStr = this.getSortableClassName(group)

    return (
      <div
        className={
          sortableClassNameStr +
          ' rct-sidebar-row rct-sidebar-row-' +
          (group.index % 2 === 0 ? 'even' : 'odd') +
          (group?.isSection ? ' rct-sidebar-row-full-width' : '')
        }
        style={{
          height: `${group?.height || DEFAULT_HEIGHT_ROW_PROCESS_BASIC}px`,
          lineHeight: `${group?.height || DEFAULT_HEIGHT_ROW_PROCESS_BASIC}px`
        }}
      >
        {((currentIndex >= start && currentIndex <= end) ||
          group?.isAddinationForm) && (
          <>
            {this.state.groupChildren}
            {!group?.isEmptyGroup && !group?.task?.isEmptySubGroup && (
              <div
                className={
                  'rct-drag-drop' +
                  (group?.task?.parent_id != null &&
                  group?.task?.parent_id != undefined
                    ? ' -sub'
                    : '') +
                  (group?.isSection ? ' -task-pqa' : '')
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

                  {!group?.isSection && (
                    <>
                      {ButtonTooltip ? (
                        <ButtonTooltip
                          group={group}
                          children={
                            <button onClick={() => openAddGroupForm(group)}>
                              <i className="fas fa-plus" />
                            </button>
                          }
                        />
                      ) : (
                        <button onClick={() => openAddGroupForm(group)}>
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
