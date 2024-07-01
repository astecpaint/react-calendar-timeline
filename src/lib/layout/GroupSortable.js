import React, { Component } from 'react'
import { SortableList } from '../sortable/SortableContainer'
import { arraysEqual } from '../utility/generic'
import { arrayMove } from 'react-sortable-hoc'

const DEFAULT_SORTABLE_DURATION = 300
export default class GroupSortable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDragging: false, // state check move action
      scrollContainer: null, // state scroll container element

      dragControlElement: null,
      dragItemElements: [], // the item elements of the current group which are being dragged

      displacementSize: 0, // the distance from the position of the mouse pointer holding the move group to the top border of the scroll container
      lastDragPosition: 0, // the last drag position before triggering scroll event
      dragIndex: -1, // the index of the current group which are being dragged
      groupSortableConstraints: null, // Maximum top and bottom border position when dragging a sub group
      firstDragScrollTop: 0, // Distance to top of container when dragging starts
      rctItemElements: new Map(), // the item elements on chart
      sortParentId: null, // the parent id of the current group which are being dragged,
      currentGroup: null,
      rctLockItemElements: new Map() // the item elements will be locked motion
    }
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
      nextProps.sidebarPositionDisplayed ===
        this.props.sidebarPositionDisplayed &&
      nextProps.viewOption === this.props.viewOption &&
      nextProps.isShowTrackRecord === this.props.isShowTrackRecord
    )
  }

  componentWillUnmount() {
    if (this.state.scrollContainer) {
      this.state.scrollContainer.removeEventListener(
        'scroll',
        this.autoScrollEvent
      )
    }
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
   * This function is invoked before sorting begins.
   * It can update state before sorting begins
   * @param {*} sort
   * @param {*} event
   */
  updateBeforeSortStart = (sort, event) => {
    const { scrollContainer, currentGroup, dragIndex } = this.state
    const parentId = currentGroup?.task?.parent_id
    let sortParentId = null,
      groupSortableConstraints = {
        top: 0,
        bottom: 0
      },
      firstDragScrollTop = 0
    if (parentId) {
      const subGroups = []
      document
        .querySelectorAll('.sidebar-grouped-by-' + parentId)
        .forEach(group => {
          if (!group.classList.contains('draggable_task_item')) {
            subGroups.push(group)
          }
        })
      const subGroupsSize = subGroups?.length
      if (subGroupsSize) {
        groupSortableConstraints.top =
          subGroups[1].getBoundingClientRect().top + scrollContainer.scrollTop
        groupSortableConstraints.bottom =
          subGroups[subGroupsSize - 1].getBoundingClientRect().top +
          scrollContainer.scrollTop
        firstDragScrollTop = scrollContainer.scrollTop
      }
      sortParentId = parentId
    }
    this.setState({
      isDragging: true,
      dragIndex: sort.index,
      groupSortableConstraints,
      firstDragScrollTop,
      sortParentId
    })
  }

  /**
   * the function handle event start sort
   * @param {*} sort
   * @param {*} event
   */
  onSortStart = (sort, event) => {
    const { scrollContainer, currentGroup, dragIndex } = this.state
    const displacementSize = event.y + scrollContainer.scrollTop

    const dragItemElements = document.querySelectorAll(
      '.rct_draggable_' + dragIndex
    )

    dragItemElements.forEach(element => {
      element.style.setProperty('z-index', '81', 'important')
      element.classList.add('draggable_task_process')
    })

    const draggableItem = document.querySelector('.draggable_task_item')
    const draggableButton = document.createElement('i')
    draggableButton.className = 'fas fa-arrows-alt draggable_button'
    draggableButton.style.cssText =
      'font-size: 16x; width: 16px; color: white; position: absolute; top: 30px; left: 15px; transform: translate(-50%, -50%); z-index: 83; pointer-events: none;'
    draggableItem.appendChild(draggableButton)

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', this.autoScrollEvent)
    }

    this.state.displacementSize = displacementSize
    this.state.dragItemElements = {
      firstIndex: currentGroup.index,
      lastIndex: currentGroup.index,
      groupMove: '.rct_draggable_' + dragIndex
    }
  }

  /**
   * the function handle event move sort
   * @param {*} sort
   * @param {*} event
   */
  onSortMove = event => {
    const {
      scrollContainer,
      dragItemElements,
      displacementSize,
      groupSortableConstraints,
      firstDragScrollTop,
      sortParentId
    } = this.state
    if (
      (groupSortableConstraints?.top >
        event.clientY + scrollContainer.scrollTop ||
        groupSortableConstraints?.bottom <
          event.clientY + scrollContainer.scrollTop) &&
      sortParentId
    ) {
      let dragTransform = 0
      if (
        groupSortableConstraints?.top >
        event.clientY + scrollContainer.scrollTop
      ) {
        dragTransform =
          groupSortableConstraints?.top -
          displacementSize +
          (firstDragScrollTop - scrollContainer.scrollTop)
      } else if (
        groupSortableConstraints?.bottom <
        event.clientY + scrollContainer.scrollTop
      ) {
        dragTransform =
          groupSortableConstraints?.bottom -
          displacementSize +
          (firstDragScrollTop - scrollContainer.scrollTop)
      }
      document.querySelector('.draggable_task_item').style.transform =
        'translate3d(0px, ' + dragTransform + 'px, 0px)'
    } else {
      event.stopPropagation()
      const newDisplacementSize =
        event.y + scrollContainer.scrollTop - displacementSize
      this.transformElements(dragItemElements, newDisplacementSize, 0)

      this.state.lastDragPosition = event.y
    }
  }

  /**
   * the function handle event over sort
   * @param {*} sort
   * @param {*} event
   */
  onSortOver = sort => {
    const { groups, isDragDrop } = this.props
    const { rctItemElements, sortParentId, rctLockItemElements } = this.state
    let newIndexKey = '.rct_draggable_' + sort.newIndex
    let oldIndexKey = '.rct_draggable_' + sort.oldIndex
    const oldGroup = groups?.find(group => group?.index === sort.oldIndex)

    const newGroup = groups?.find(group => group?.index === sort.newIndex)

    if (sortParentId) {
      if (newGroup?.task?.parent_id !== sortParentId) {
        const lockedIndexKey = '.-sort-index-' + sort.newIndex
        document
          .querySelector(lockedIndexKey)
          .classList.add('disable-transform')
        if (!rctLockItemElements.has(lockedIndexKey)) {
          this.state.rctLockItemElements.set(lockedIndexKey, {
            groupMove: lockedIndexKey
          })
        }
        return
      }
      if (!rctItemElements.has(newIndexKey)) {
        const firstIndex = sort.newIndex
        const lastIndex = sort.newIndex
        this.state.rctItemElements.set(newIndexKey, {
          firstIndex,
          lastIndex,
          groupMove: newIndexKey
        })
      }
    } else {
      newIndexKey =
        '.group-move-' +
        (newGroup?.task?.parent_id
          ? newGroup?.task?.parent_id
          : newGroup?.task?.task_id)
      oldIndexKey =
        '.group-move-' +
        (oldGroup?.task?.parent_id
          ? oldGroup?.task?.parent_id
          : oldGroup?.task?.task_id)

      if (!rctItemElements.has(newIndexKey)) {
        const idFilter = newGroup?.task?.parent_id
          ? newGroup?.task?.parent_id
          : newGroup?.task?.task_id
        const groupFilter = groups.filter(
          group =>
            group?.task?.task_id === idFilter ||
            group?.task?.parent_id === idFilter
        )
        const firstIndex = groupFilter[0].index
        const lastIndex = groupFilter[groupFilter.length - 1].index
        this.state.rctItemElements.set(newIndexKey, {
          firstIndex,
          lastIndex,
          groupMove: newIndexKey
        })
      }
    }

    if (
      sort.newIndex % 12 === 0 &&
      sort.newIndex !== 0 &&
      sort.newIndex !== groups?.length - 1
    ) {
      isDragDrop.current = false
      setTimeout(() => {
        isDragDrop.current = true
      }, [500])
    } else {
      isDragDrop.current = true
    }

    const itemElementsAtOldIndex = rctItemElements.get(oldIndexKey)
    const itemElementsAtNewIndex = rctItemElements.get(newIndexKey)
    const { firstIndex, lastIndex } = itemElementsAtNewIndex
    const {
      firstIndex: oldFirstIndex,
      lastIndex: oldLastIndex
    } = itemElementsAtOldIndex || {
      firstIndex: undefined,
      lastIndex: undefined
    }
    const { newIndex, oldIndex, index } = sort
    if (newIndex > index) {
      if (newIndex > oldIndex) {
        if (newIndex >= firstIndex && newIndex < lastIndex) {
          this.transformElements(
            itemElementsAtNewIndex,
            0,
            DEFAULT_SORTABLE_DURATION
          )
        } else if (newIndex === lastIndex) {
          this.transformElements(
            itemElementsAtNewIndex,
            -60,
            DEFAULT_SORTABLE_DURATION
          )
        }
      } else {
        if (oldIndex === oldFirstIndex) {
          this.transformElements(
            itemElementsAtOldIndex,
            0,
            DEFAULT_SORTABLE_DURATION
          )
        } else if (oldIndex <= oldLastIndex && oldIndex > oldFirstIndex) {
          this.transformElements(
            itemElementsAtOldIndex,
            -60,
            DEFAULT_SORTABLE_DURATION
          )
        }
      }
    } else if (newIndex < index) {
      if (newIndex < oldIndex) {
        if (newIndex <= lastIndex && newIndex > firstIndex) {
          this.transformElements(
            itemElementsAtNewIndex,
            0,
            DEFAULT_SORTABLE_DURATION
          )
        } else if (newIndex === firstIndex) {
          this.transformElements(
            itemElementsAtNewIndex,
            60,
            DEFAULT_SORTABLE_DURATION
          )
        }
      } else {
        if (oldIndex === oldLastIndex) {
          this.transformElements(
            itemElementsAtOldIndex,
            0,
            DEFAULT_SORTABLE_DURATION
          )
        } else if (oldIndex >= oldFirstIndex && oldIndex < oldLastIndex) {
          this.transformElements(
            itemElementsAtOldIndex,
            60,
            DEFAULT_SORTABLE_DURATION
          )
        }
      }
    } else {
      this.transformElements(
        itemElementsAtOldIndex,
        0,
        DEFAULT_SORTABLE_DURATION
      )
    }
  }

  /**
   * the function handle event auto scroll
   * @param {*} sort
   * @param {*} event
   */
  autoScrollEvent = event => {
    const {
      dragItemElements,
      lastDragPosition,
      displacementSize,
      groupSortableConstraints,
      firstDragScrollTop,
      sortParentId
    } = this.state
    if (
      (groupSortableConstraints?.top >
        lastDragPosition + event.target.scrollTop ||
        groupSortableConstraints?.bottom <
          lastDragPosition + event.target.scrollTop) &&
      sortParentId
    ) {
      let dragTransform = 0
      if (
        groupSortableConstraints?.top >
        lastDragPosition + event.target.scrollTop
      ) {
        dragTransform =
          groupSortableConstraints?.top -
          displacementSize +
          (firstDragScrollTop - event.target.scrollTop)
      } else if (
        groupSortableConstraints?.bottom <
        lastDragPosition + event.target.scrollTop
      ) {
        dragTransform =
          groupSortableConstraints?.bottom -
          displacementSize +
          (firstDragScrollTop - event.target.scrollTop)
      }
      document.querySelector('.draggable_task_item').style.transform =
        'translate3d(0px, ' + dragTransform + 'px, 0px)'
    } else {
      const lastDragPositionScroll =
        lastDragPosition + event.target.scrollTop - displacementSize
      this.transformElements(dragItemElements, lastDragPositionScroll, 0)
    }
  }

  /**
   * the function handle event end sort
   * @param {*} sort
   */
  onSortEnd = sort => {
    const {
      scrollContainer,
      rctItemElements,
      dragItemElements,
      sortParentId,
      currentGroup,
      rctLockItemElements
    } = this.state
    const { sortOrderTaskList, groups } = this.props
    let exactlyNewIndex = sort.newIndex

    if (sortParentId) {
      const idFilter = currentGroup?.task?.parent_id
        ? currentGroup?.task?.parent_id
        : currentGroup?.task?.task_id
      const groupFilter = groups.filter(
        group =>
          group?.task?.task_id === idFilter ||
          group?.task?.parent_id === idFilter
      )
      const firstIndex = groupFilter[0].index
      const lastIndex = groupFilter[groupFilter.length - 1].index
      if (sort.newIndex <= firstIndex) {
        exactlyNewIndex = firstIndex + 1
      }
      if (sort.newIndex > lastIndex) {
        exactlyNewIndex = lastIndex
      }
    } else {
      const groupAtNewIndex = groups?.find(
        group => group?.index === sort.newIndex
      )

      const newIndexKey = sortParentId
        ? '.rct_draggable_' + currentGroup.index
        : '.group-move-' +
          (groupAtNewIndex?.task?.parent_id
            ? groupAtNewIndex?.task?.parent_id
            : groupAtNewIndex?.task?.task_id)

      const groupSortable = rctItemElements.get(newIndexKey)
      if (
        sort.oldIndex > sort.newIndex &&
        groupSortable?.lastIndex >= sort.newIndex &&
        sort.newIndex > groupSortable?.firstIndex
      ) {
        exactlyNewIndex = groupSortable?.lastIndex + 1
      } else if (
        sort.oldIndex < sort.newIndex &&
        groupSortable?.lastIndex > sort.newIndex &&
        sort.newIndex >= groupSortable?.firstIndex
      ) {
        exactlyNewIndex = groupSortable?.firstIndex - 1
      }
    }

    document
      .querySelectorAll('.draggable_task_process')
      .forEach(element => element.classList.remove('disable-transform'))

    rctLockItemElements.forEach(elements => {
      this.clearTransformElements(elements)
    })
    rctLockItemElements.clear()

    rctItemElements.forEach(elements => {
      this.clearTransformElements(elements)
    })
    rctItemElements.clear()

    this.clearTransformElements(dragItemElements)

    if (scrollContainer) {
      scrollContainer.removeEventListener('scroll', this.autoScrollEvent)
    }

    sortOrderTaskList(arrayMove, sort.oldIndex, exactlyNewIndex, currentGroup)

    this.setState({
      isDragging: false, // state check move action

      dragControlElement: null,
      dragItemElements: [],

      displacementSize: 0,
      lastDragPosition: 0,
      dragIndex: -1,
      groupSortableConstraints: null,
      sortParentId: null,

      firstDragScrollTop: 0, // Distance to top of container when dragging starts
      rctItemElements: new Map(), // the item elements on chart
      sortParentId: null,
      currentGroup: null,
      rctLockItemElements: new Map()
    })
  }

  /**
   * function handle add style css when handle drag/drop event
   * @param {object[]} groupElements - the array contains list key id
   * @param {number} transformSize - the value of distance transform
   * @param {number} delayDuration - the value of transition duration
   */
  transformElements = (groupElements, transformSize, delayDuration = 0) => {
    const elements = document.querySelectorAll(groupElements?.groupMove)
    for (let i = 0; i < elements?.length; i++) {
      if (elements[i].classList.contains('draggable_task_item')) {
        return
      }
      if (elements[i].classList.contains('draggable_task_process')) {
        elements[i].style.transitionDuration = `${delayDuration}ms`
        elements[i].style.transform = 'translate(0px, ' + transformSize + 'px)'
      } else {
        elements[i].classList.remove('transform-to-above')
        elements[i].classList.remove('transform-to-below')
        elements[i].classList.remove('transform-reset')
        elements[i].classList.remove('disable-transform')
        if (transformSize > 0) {
          elements[i].classList.add('transform-to-above')
        } else if (transformSize < 0) {
          elements[i].classList.add('transform-to-below')
        } else {
          elements[i].classList.add('transform-reset')
        }
      }
    }
  }

  /**
   * function handle remove style css when handle drag/drop event
   * @param {object[]} groupElements - the array contains list key id
   */
  clearTransformElements = groupElements => {
    const elements = document.querySelectorAll(groupElements?.groupMove)
    for (let i = 0; i < elements?.length; i++) {
      if (elements[i].classList.contains('draggable_task_item')) {
        return
      }
      if (elements[i].classList.contains('draggable_task_process')) {
        elements[i].style.transitionDuration = `0ms`
        elements[i].style.transform = 'none'
        elements[i].style.setProperty('z-index', '80', 'important')
        elements[i].classList.remove('draggable_task_process')
      } else {
        elements[i].classList.remove('transform-to-above')
        elements[i].classList.remove('transform-to-below')
        elements[i].classList.remove('transform-reset')
        elements[i].classList.remove('disable-transform')
      }
    }
  }

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
          helperClass="draggable_task_item"
          helperContainer={this.getContainerElement}
          lockToContainerEdges={true}
          lockOffset={['2px', '20px']}
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
