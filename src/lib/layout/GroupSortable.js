import React, { Component } from 'react'
import { SortableList } from '../sortable/SortableContainer'
import { arraysEqual, deepObjectCompare } from '../utility/generic'
import _ from 'lodash'
import { SORTABLE_LAYER_CLASS_NAME } from '../common/constants'

const DEFAULT_SORTABLE_DURATION = 300
const DRAG_LEVEL_GROUP = {
  ONE: 1,
  TWO: 2,
  THREE: 3
}

const initState = {
  isDragging: false, // state check move action

  lastDragPosition: 0, // the last drag position before triggering scroll event
  currentGroup: null, // the current group

  startScrollTop: 0, // the start scroll top
  topGroup: null, // the sortable top group
  bottomGroup: null, // the sortable bottom group
  offsetMouseToSidebarTop: 0, // the offset mouse to sidebar top
  sortableGroupElms: new Map(), // the sortable group dom elements
  dragItemElms: null, // the drag item dom elements
  sortableZone: {
    // limit top and bottom can drag drop
    top: 0,
    bottom: 0
  },
  startDragToTopPosition: 0, // the start drag to top position
  transformSize: 0, // the transform size
  dragContainer: null, // the drag container element
  lastScrollTop: 0, // the last scroll top
  sortableGroups: new Map(), // the sortable groups
  dragLevel: null, // the drag level
  swappedGroup: new Map(), // the swapped group
  swappedClassName: [], // the swapped class name
  lastSwappedIndex: null // the last swapped index
}
export default class GroupSortable extends Component {
  constructor(props) {
    super(props)
    this.state = initState
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const derivedState = {}
    if (!prevState.scrollContainer) {
      if (nextProps.scrollContainer) {
        Object.assign(derivedState, {
          scrollContainer: nextProps.scrollContainer
        })
      }
    }
    return derivedState
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      arraysEqual(nextProps.groups, this.props.groups) &&
      // arraysEqual(nextProps.groupHeights, this.props.groupHeights) &&
      nextProps.groupIdKey === this.props.groupIdKey &&
      nextProps.groupRightTitleKey === this.props.groupRightTitleKey &&
      nextProps.groupTitleKey === this.props.groupTitleKey &&
      nextProps.isRightSidebar === this.props.isRightSidebar &&
      nextState.isDragging === this.state.isDragging &&
      nextProps.isShowDragHandleButton === this.props.isShowDragHandleButton &&
      deepObjectCompare(
        nextProps.sidebarPositionDisplayed,
        this.props.sidebarPositionDisplayed
      ) &&
      nextProps.viewOption === this.props.viewOption &&
      nextProps.isShowTrackRecord === this.props.isShowTrackRecord
    )
  }

  componentWillUnmount() {
    if (this.props.scrollContainer) {
      this.props.scrollContainer.removeEventListener(
        'scroll',
        this.autoScrollEvent
      )
    }
  }

  /**
   * Get the sortable groups
   * @param {object[]} groups - the list of groups
   * @param {object} currentGroup - the current group
   * @param {number} dragLevel - the drag level
   * @returns {object[]} the list of sortable groups
   */
  getSortableGroups = (groups, currentGroup, dragLevel) => {
    let sortableGroups = new Map()
    let topGroup = null // the top group, it is the first group in the list draggable transform
    let bottomGroup = null // the bottom group, it is the last group in the list draggable transform

    switch (dragLevel) {
      case DRAG_LEVEL_GROUP.ONE: // this is the first level of draggable transform
        groups.forEach(group => {
          if (group?.task?.parent_id === currentGroup?.task?.parent_id) {
            // find the first level groups
            if (topGroup === null) {
              topGroup = group
            }
            bottomGroup = group
            sortableGroups.set(group?.index, {
              topLinked: group,
              bottomLinked: group
            })
          }
        })
        break
      case DRAG_LEVEL_GROUP.TWO: // this is the second level of draggable transform
        groups.forEach(group => {
          // find the second level groups
          const isTask =
            group?.isCustomGroup &&
            !group?.isSection &&
            group?.customId === currentGroup?.customId

          if (isTask) {
            if (topGroup === null) {
              topGroup = group
            }
            // get sortable linked groups
            const linkedGroups = groups.filter(
              groupFilter =>
                (groupFilter?.task?.parent_id === group?.task?.task_id ||
                  groupFilter?.task?.task_id === group?.task?.task_id) &&
                !_.isNil(group?.task?.task_id)
            )
            const linkedIndex = {
              topLinked: linkedGroups[0],
              bottomLinked: linkedGroups[linkedGroups.length - 1]
            }
            // set the linked groups to the sortable groups
            sortableGroups.set(linkedIndex?.topLinked?.index, linkedIndex)
            sortableGroups.set(linkedIndex?.bottomLinked?.index, linkedIndex)
            bottomGroup = linkedGroups[linkedGroups.length - 1] || group
          }
        })
        break
      case DRAG_LEVEL_GROUP.THREE: // this is the third level of draggable transform
      default:
        groups.forEach(group => {
          // find the third level groups
          const isSection = group?.isSection
          if (isSection) {
            if (topGroup === null) {
              topGroup = group
            }
            // get sortable linked groups
            const linkedGroups = groups.filter(
              groupFilter => groupFilter?.customId === group?.customId
            )
            const linkedIndex = {
              topLinked: linkedGroups[0],
              bottomLinked: linkedGroups[linkedGroups.length - 1]
            }
            // set the linked groups to the sortable groups
            sortableGroups.set(linkedIndex?.topLinked?.index, linkedIndex)
            sortableGroups.set(linkedIndex?.bottomLinked?.index, linkedIndex)
            bottomGroup = linkedGroups[linkedGroups.length - 1] || group
          }
        })
        break
    }
    return { sortableGroups, topGroup, bottomGroup }
  }

  /**
   * Get the drag level of the current group
   * @param {object} currentGroup - the current group
   * @returns {number} the drag level of the current group
   */
  getDragLevel = currentGroup => {
    if (currentGroup?.task?.parent_id) {
      return DRAG_LEVEL_GROUP.ONE
    }

    if (currentGroup?.isCustomGroup && !currentGroup?.isSection) {
      return DRAG_LEVEL_GROUP.TWO
    }

    return DRAG_LEVEL_GROUP.THREE
  }

  /**
   * Get the offset of the mouse to the top of the sidebar
   * @param {object} event - the event object
   * @param {number} index - the index of the current group
   * @returns {number} the offset of the mouse to the top of the sidebar
   */
  getOffsetMouseToSidebarTop = (event, dragGroupRect) => {
    return event.y - dragGroupRect?.top
  }

  /**
   * This function is invoked before sorting begins, and can be used to cancel sorting before it begins
   * @param {object} event - draggable handle element event
   * @returns {boolean}
   * return if return true then sort event will be cancel else the sort event will be start
   */
  shouldCancelStart = event => {
    const { onStartSort, groups } = this.props
    const currentGroupIndex = Number(
      event?.target?.getAttribute('data-group-index')
    )
    const currentGroup = groups?.find(
      groupFind => groupFind?.index === currentGroupIndex
    )
    this.state.currentGroup = currentGroup
    return event.target?.sortableHandle ? onStartSort(currentGroup) : false
  }

  /**
   * Get the sortable elements
   * @param {object} currentGroup - the current group
   * @param {object} topGroup - the top group
   * @param {object} bottomGroup - the bottom group
   * @returns {object[]} the list of sortable elements
   */
  getSortableElements = (currentGroup, topGroup, bottomGroup) => {
    const dragGroupElm = document.querySelector(
      '.sortable-group-' + (currentGroup?.index ?? -1)
    )
    const dragItemElms = document.querySelectorAll(
      '.sortable-item-' + (currentGroup?.index ?? -1)
    )
    const topGroupElm = document.querySelector(
      '.sortable-group-' + (topGroup?.index ?? -1)
    )
    const bottomGroupElm = document.querySelector(
      '.sortable-group-' + (bottomGroup?.index ?? -1)
    )
    return {
      dragGroupElm,
      dragItemElms,
      topGroupElm,
      bottomGroupElm
    }
  }

  /**
   * Set style for drag container element
   * @param {object[]} dragItemElms - the list item element
   * @param {object} dragContainer - the drag container element
   */
  setStyleDragElement = (dragItemElms, dragContainer) => {
    const draggableButton = document.createElement('i')
    draggableButton.className = 'fas fa-arrows-alt drag_button'
    draggableButton.style.cssText =
      'font-size: 16px; width: 16px; color: white; position: absolute; top: 50%; left: 12px; transform: translate(-50%, -50%); z-index: 100; pointer-events: none;'
    dragContainer.classList.add('foreground')
    dragContainer.appendChild(draggableButton)

    if (dragItemElms.length <= 0) return
    dragItemElms.forEach(item => {
      item.classList.add('foreground')
    })
  }

  /**
   * function handle set transform for element
   * @param {object[]} elements - the list of elements
   * @param {number} transformSize - the size of transform
   * @param {number} transformDuration - the duration of transform
   */
  handleTransformElement = (
    elements,
    transformSize,
    transformDuration = 0,
    isReset = false
  ) => {
    elements.forEach(element => {
      if (!element || !element.style) return
      element.style.setProperty(
        '--translateY',
        transformSize === 0 ? 'none' : `${transformSize}px`,
        'important'
      )
      element.style.setProperty(
        '--transition-duration',
        transformDuration === 0 ? 'none' : `${transformDuration}ms`,
        'important'
      )
      if (isReset) {
        element.classList.remove('foreground')
      }
    })
  }

  /**
   * Get the transform class name
   * @param {number} dragLevel - the drag level
   * @param {object} groupTransform - the group transform
   * @returns {string} the transform class name
   */
  getTransformClassName = (dragLevel, groupTransform) => {
    const { ONE, TWO, THREE } = SORTABLE_LAYER_CLASS_NAME
    const { task, customId } = groupTransform
    const taskId = task?.task_id
    const parentId = task?.parent_id

    switch (dragLevel) {
      case DRAG_LEVEL_GROUP.ONE:
        return `.${ONE}--${taskId}`
      case DRAG_LEVEL_GROUP.TWO:
        return `.${TWO}--${parentId || taskId}`
      case DRAG_LEVEL_GROUP.THREE:
        return `.${THREE}--${customId}`
      default:
        return ''
    }
  }

  /**
   * Apply the transform to the elements
   * @param {string} transformClassName - the transform class name
   * @param {number} swapSize - the size of swap
   * @param {number} transformDuration - the duration of transform
   */
  applyTransformToElements = (
    transformClassName,
    swapSize,
    transformDuration = DEFAULT_SORTABLE_DURATION,
    isReset = false
  ) => {
    const elements = document.querySelectorAll(transformClassName)
    this.handleTransformElement(elements, swapSize, transformDuration, isReset)
  }

  /**
   * Clear the styles
   */
  resetState = () => {
    this.state.swappedClassName.forEach(transformClassName => {
      this.applyTransformToElements(transformClassName, 0, 0, true)
    })
    this.handleTransformElement(this.state.dragItemElms, 0, 0, true)
    this.handleTransformElement([this.state.dragContainer], 0, 0, true)
    this.setState(initState)
  }

  /**
   * This function is invoked before sorting begins.
   * It can update state before sorting begins
   * @param {object} sort - the sort object
   * @param {object} event - the event object
   */
  updateBeforeSortStart = (sort, event) => {
    const { currentGroup } = this.state
    const { setCurrentGroupMove } = this.props
    setCurrentGroupMove(currentGroup)
  }

  /**
   * the function handle event start sort
   * @param {object} sort - the sort object
   * @param {object} event - the event object
   */
  onSortStart = (sort, event) => {
    const { currentGroup } = this.state
    const { scrollContainer, onLogGroupSortable, groups } = this.props

    const dragLevel = this.getDragLevel(currentGroup)

    // get sortable groups by group list, current group and drag level
    const { sortableGroups, topGroup, bottomGroup } = this.getSortableGroups(
      groups,
      currentGroup,
      dragLevel
    )

    const scrollTop = scrollContainer?.scrollTop || 0

    const {
      dragGroupElm,
      dragItemElms,
      topGroupElm,
      bottomGroupElm
    } = this.getSortableElements(currentGroup, topGroup, bottomGroup)

    const dragGroupRect = dragGroupElm?.getBoundingClientRect()
    // get transform size
    const transformSize = dragGroupRect?.height

    const offsetMouseToSidebarTop = this.getOffsetMouseToSidebarTop(
      event,
      dragGroupRect
    )

    const topElmRect = topGroupElm?.getBoundingClientRect()
    const bottomElmRect = bottomGroupElm?.getBoundingClientRect()

    // get sortable zone, this is the zone that the draggable group can be moved
    const sortableZone = {
      top: topElmRect?.top + offsetMouseToSidebarTop + scrollTop,
      bottom:
        bottomElmRect?.top +
        offsetMouseToSidebarTop +
        scrollTop -
        (bottomGroup?.isEmptyGroup ? transformSize : 0)
    }

    const dragContainer = document.querySelector('.drag_container')
    this.setStyleDragElement(dragItemElms, dragContainer)

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', this.autoScrollEvent)
    }

    const startDragToTopPosition = event.y + scrollTop
    this.state.lastDragPosition = event.y
    this.state.startScrollTop = scrollTop
    this.state.startDragToTopPosition = startDragToTopPosition
    this.state.dragContainer = dragContainer
    this.state.sortableZone = sortableZone
    this.state.transformSize = transformSize
    this.state.dragItemElms = dragItemElms
    this.state.dragGroupElm = dragGroupElm
    this.state.transformSize = transformSize
    this.state.offsetMouseToSidebarTop = offsetMouseToSidebarTop
    this.state.sortableGroups = sortableGroups
    this.state.topGroup = topGroup
    this.state.bottomGroup = bottomGroup
    this.state.dragLevel = dragLevel
  }

  /**
   * the function handle event move sort
   * @param {object} sort - the sort object
   * @param {object} event - the event object
   */
  onSortMove = event => {
    const { scrollContainer } = this.props
    // The element will only be moved within a certain range, which can be within the group containing it or within the drag-drop area.

    const {
      sortableZone,
      startDragToTopPosition,
      dragItemElms,
      dragContainer,
      startScrollTop
    } = this.state
    const scrollTop = scrollContainer.scrollTop
    const mouseYToTop = event.y + scrollTop

    const isOverTop = mouseYToTop < sortableZone?.top
    const isOverBottom = mouseYToTop > sortableZone?.bottom

    if (!isOverTop && !isOverBottom) {
      event.stopPropagation()
      this.state.lastDragPosition = event.y
      this.state.lastScrollTop = scrollTop
    }

    const stuckPosition = isOverTop ? sortableZone?.top : sortableZone?.bottom

    // for element
    let transformElms = dragItemElms ?? []
    let newTransformSize =
      (isOverTop || isOverBottom ? stuckPosition : event.y + scrollTop) -
      startDragToTopPosition
    this.handleTransformElement(transformElms, newTransformSize)

    // for container
    transformElms = [dragContainer]
    newTransformSize =
      (isOverTop || isOverBottom
        ? stuckPosition + (startScrollTop - scrollTop)
        : event.y + startScrollTop) - startDragToTopPosition
    this.handleTransformElement(transformElms, newTransformSize)
  }

  /**
   * the function handle event auto scroll
   * @param {object} event - the event object
   */
  autoScrollEvent = event => {
    // The element will only be moved within a certain range, which can be within the group containing it or within the drag-drop area.
    const {
      sortableZone,
      startDragToTopPosition,
      dragItemElms,
      dragContainer,
      lastDragPosition,
      startScrollTop
    } = this.state
    const scrollTop = event.target.scrollTop
    const mouseYToTop = lastDragPosition + scrollTop

    const isOverTop = mouseYToTop < sortableZone?.top
    const isOverBottom = mouseYToTop > sortableZone?.bottom

    const stuckPosition = isOverTop ? sortableZone?.top : sortableZone?.bottom
    // for element
    let transformElms = dragItemElms ?? []
    let newTransformSize =
      (isOverTop || isOverBottom
        ? stuckPosition
        : lastDragPosition + scrollTop) - startDragToTopPosition
    this.handleTransformElement(transformElms, newTransformSize)

    // for container
    transformElms = [dragContainer]
    newTransformSize =
      (isOverTop || isOverBottom
        ? stuckPosition + (startScrollTop - scrollTop)
        : lastDragPosition + startScrollTop) - startDragToTopPosition
    this.handleTransformElement(transformElms, newTransformSize)
  }

  /**
   * the function handle event over sort
   * @param {object} sort - the sort object
   * @param {object} event - the event object
   */
  onSortOver = sort => {
    const { index, newIndex: skipNewIndex, oldIndex: skipOldIndex } = sort
    const { sortableGroups, dragLevel, transformSize } = this.state

    // loop to ensure elements are swapped in the correct position in case newIndex and oldIndex are not adjacent
    for (
      let skipIndex = 0;
      Math.abs(skipIndex) < Math.abs(skipOldIndex - skipNewIndex);
      skipOldIndex - skipNewIndex > 0 ? skipIndex++ : skipIndex--
    ) {
      const newIndex = skipNewIndex + skipIndex
      const oldIndex = newIndex + (skipOldIndex - skipNewIndex > 0 ? 1 : -1)

      const nextGroup = sortableGroups.get(newIndex)
      const previousGroup = sortableGroups.get(oldIndex)

      let swapGroup = null
      let swapSize = 0

      if (newIndex > index) {
        if (
          newIndex > oldIndex &&
          newIndex === nextGroup?.bottomLinked?.index
        ) {
          // down until down
          swapGroup = nextGroup?.bottomLinked
          swapSize = -transformSize
          this.state.swappedGroup.set(nextGroup?.topLinked?.index, nextGroup)
        } else if (
          newIndex < oldIndex &&
          oldIndex === previousGroup?.topLinked?.index
        ) {
          // down but up
          swapGroup = _.cloneDeep(
            this.state.swappedGroup.get(oldIndex)?.topLinked
          )
          swapSize = 0
          this.state.swappedGroup.delete(oldIndex)
        }
      } else if (newIndex < index) {
        if (newIndex < oldIndex && newIndex === nextGroup?.topLinked?.index) {
          swapGroup = nextGroup?.topLinked
          swapSize = transformSize
          this.state.swappedGroup.set(nextGroup?.bottomLinked?.index, nextGroup)
          // up until up
        } else if (
          newIndex > oldIndex &&
          oldIndex === previousGroup?.bottomLinked?.index
        ) {
          // up but down
          swapGroup = _.cloneDeep(
            this.state.swappedGroup.get(oldIndex)?.bottomLinked
          )
          this.state.swappedGroup.delete(oldIndex)
          swapSize = 0
        }
      } else {
        swapGroup = this.state.swappedGroup.get(oldIndex)?.bottomLinked
        this.state.swappedGroup.delete(oldIndex)
        swapSize = 0
      }

      if (swapGroup) {
        const clearTransformClassName = this.getTransformClassName(
          dragLevel,
          swapGroup
        )
        this.state.swappedClassName.push(clearTransformClassName)
        this.state.lastSwappedIndex = skipNewIndex

        this.applyTransformToElements(clearTransformClassName, swapSize)
      }
    }
  }

  /**
   * the function handle event end sort
   * @param {*} sort
   */
  onSortEnd = sort => {
    const { topGroup, bottomGroup, lastSwappedIndex, dragLevel } = this.state
    const {
      sortOrderTaskList,
      scrollContainer,
      setCurrentGroupMove,
      actualGroups
    } = this.props
    const { newIndex, oldIndex } = sort

    const isOverTop = newIndex < topGroup?.index
    const isOverBottom = newIndex >= bottomGroup?.index

    let exactlyNewIndex = newIndex

    // get exactly new index
    if (isOverTop) {
      // if over top, set the new index to the top group index
      exactlyNewIndex = topGroup?.index
    } else if (isOverBottom) {
      // if over bottom, set the new index to the bottom group index
      exactlyNewIndex = bottomGroup?.index - (bottomGroup?.isEmptyGroup ? 1 : 0)
    } else if (!isOverTop && !isOverBottom) {
      // if not over top and bottom, set the new index to the last swapped index
      exactlyNewIndex = lastSwappedIndex ?? oldIndex
    }

    if (scrollContainer) {
      scrollContainer.removeEventListener('scroll', this.autoScrollEvent)
    }

    if (
      dragLevel !== DRAG_LEVEL_GROUP.ONE &&
      !isOverTop &&
      newIndex > oldIndex &&
      exactlyNewIndex !== oldIndex
    ) {
      const groupDragged = actualGroups.find(
        group => group.index === exactlyNewIndex
      )
      if (groupDragged) {
        const {
          expanded,
          isSection,
          isCustomGroup,
          customId,
          task
        } = groupDragged
        if (!expanded) {
          let numberOfChildGroup = 0
          if (dragLevel === DRAG_LEVEL_GROUP.TWO) {
            if (isCustomGroup) {
              numberOfChildGroup = actualGroups.filter(
                group =>
                  group.customId === customId &&
                  group.task?.parent_id === task?.task_id
              ).length
            }
          } else if (isSection && !isOverBottom) {
            numberOfChildGroup = actualGroups.filter(
              group =>
                group.customId === customId &&
                group.task?.task_id !== task?.task_id
            ).length
          }
          exactlyNewIndex += numberOfChildGroup
        }
      }
    }

    this.resetState()
    setCurrentGroupMove(null)
    sortOrderTaskList(sort.oldIndex, exactlyNewIndex, dragLevel)
  }

  /**
   * get container element
   * @returns {JSX.Element}
   */
  getContainerElement = () => {
    const dropZoneTask = document.getElementById('dropzone-task')
    return dropZoneTask
  }

  render() {
    const { isDragging } = this.state
    const {
      groups,
      groupHeights,
      isRightSidebar,
      groupTitleKey,
      groupRightTitleKey,
      groupIdKey,
      groupRenderer,
      isShowDragHandleButton,
      openAddGroupForm,
      buttonTooltipRenderer,
      sidebarPositionDisplayed,
      viewOption,
      isShowTrackRecord
    } = this.props
    return (
      <div
        className={
          isShowDragHandleButton && !isDragging ? 'hover-show-sortable' : ''
        }
      >
        <SortableList
          useDragHandle
          lockAxis="y"
          helperClass="drag_container"
          helperContainer={this.getContainerElement}
          lockToContainerEdges={true}
          lockOffset={['10px', '10px']}
          shouldCancelStart={this.shouldCancelStart}
          updateBeforeSortStart={this.updateBeforeSortStart}
          onSortStart={this.onSortStart}
          onSortMove={this.onSortMove}
          onSortOver={this.onSortOver}
          onSortEnd={this.onSortEnd}
          groups={groups}
          groupIdKey={groupIdKey}
          groupHeights={groupHeights}
          isRightSidebar={isRightSidebar}
          openAddGroupForm={openAddGroupForm}
          groupRenderer={groupRenderer}
          groupRightTitleKey={groupRightTitleKey}
          groupTitleKey={groupTitleKey}
          buttonTooltipRenderer={buttonTooltipRenderer}
          sidebarPositionDisplayed={sidebarPositionDisplayed}
          viewOption={viewOption}
          isShowTrackRecord={isShowTrackRecord}
        />
      </div>
    )
  }
}
