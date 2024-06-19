import React, { Component } from 'react'
import { SortableList } from '../sortable/SortableContainer'
import { arraysEqual } from '../utility/generic'
import { arrayMove } from 'react-sortable-hoc'

const DEFAULT_SORTABLE_DURATION = 300
export default class GroupSortable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDraging: false, // state check move action
      scrollContainer: null, // state scroll container element

      dragControlElement: null,
      dragItemElements: [], // the item elements of the current group which are being dragged

      displacementSize: 0, // the distance from the position of the mouse pointer holding the move group to the top border of the scroll container
      lastDragPosition: 0, // the last drag position before triggering scroll event
      dragIndex: -1, // the index of the current group which are being dragged
      groupPositionLimit: null, // Maximum top and bottom border position when dragging a sub group
      firstDragScrollTop: 0, // Distance to top of container when dragging starts
      rctItemElements: new Map(), // the item elements on chart
      sortParentId: null // the parent id of the current group which are being dragged
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
      nextState.isDraging === this.state.isDraging &&
      nextProps.isShowDragHandleButton === this.props.isShowDragHandleButton &&
      nextProps.sidebarPositionDisplayed === this.props.sidebarPositionDisplayed
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
   * the function handle event start sort
   * @param {*} sort
   * @param {*} event
   */
  onSortStart = (sort, event) => {
    const { groups, onStartSort } = this.props
    const { scrollContainer } = this.state
    const currentGroup = groups?.find(group => group?.index === sort.index)
    const parentId = currentGroup?.task?.parent_id
    const groupPositionLimit = {}

    if (parentId) {
      const subGroups = document.querySelectorAll('.group-move-' + parentId)
      const subGroupsSize = subGroups?.length
      if (subGroupsSize) {
        groupPositionLimit.top =
          subGroups[1].getBoundingClientRect().top + scrollContainer.scrollTop
        groupPositionLimit.bottom =
          subGroups[subGroupsSize - 2].getBoundingClientRect().top +
          groups[0].height +
          scrollContainer.scrollTop
        this.state.groupPositionLimit = groupPositionLimit
        this.state.firstDragScrollTop = scrollContainer.scrollTop
      }
      this.state.sortParentId = parentId
    } else {
      onStartSort(currentGroup)
    }

    const dragIndex = sort.index
    const displacementSize = event.y + scrollContainer.scrollTop

    const dragItemElements = document.querySelectorAll(
      '.rct_draggable_' + dragIndex
    )

    dragItemElements.forEach(element => {
      element.style.setProperty('z-index', '81', 'important')
      element.classList.add('draggable_task_process')
    })

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', this.autoScrollEvent)
    }

    const dragableItem = document.querySelector('.draggable_task_item')
    const dragableButton = document.createElement('i')
    dragableButton.className = 'fas fa-arrows-alt draggable_button'
    dragableButton.style.cssText =
      'font-size: 16x; width: 16px; color: white; position: absolute; top: 30px; left: 15px; transform: translate(-50%, -50%); z-index: 83;'
    dragableItem.appendChild(dragableButton)

    this.state.displacementSize = displacementSize
    this.state.dragItemElements = {
      firstIndex: currentGroup.index,
      lastIndex: currentGroup.index,
      groupMove: '.rct_draggable_' + dragIndex
    }
    this.setState({
      isDraging: true,
      dragIndex: dragIndex
    })
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
      groupPositionLimit,
      firstDragScrollTop
    } = this.state
    let dragTransform = 0
    if (groupPositionLimit?.top > event.clientY + scrollContainer.scrollTop) {
      dragTransform =
        groupPositionLimit?.top -
        displacementSize +
        (firstDragScrollTop - scrollContainer.scrollTop)
    } else if (
      groupPositionLimit?.bottom <
      event.clientY + scrollContainer.scrollTop
    ) {
      dragTransform =
        groupPositionLimit?.bottom -
        displacementSize +
        (firstDragScrollTop - scrollContainer.scrollTop)
    }
    if (
      groupPositionLimit?.top > event.clientY + scrollContainer.scrollTop ||
      groupPositionLimit?.bottom < event.clientY + scrollContainer.scrollTop
    ) {
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
    const { groupHeights, groups, isDragDrop } = this.props
    const { rctItemElements, sortParentId } = this.state
    let newIndexKey = '.rct_draggable_' + sort.newIndex
    let oldIndexKey = '.rct_draggable_' + sort.oldIndex
    const oldGroup = groups?.find(group => group?.index === sort.oldIndex)

    const newGroup = groups?.find(group => group?.index === sort.newIndex)

    if (sortParentId) {
      if (newGroup?.task?.parent_id !== sortParentId) {
        document
          .querySelector('.-sort-index-' + sort.newIndex)
          .classList.add('disable-transform')
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

    if (sort.newIndex % 12 === 0) {
      isDragDrop.current = false
      setTimeout(() => {
        isDragDrop.current = true
      }, 500)
    }

    if (sort.newIndex > sort.index) {
      if (
        (sort.newIndex > sort.oldIndex &&
          sort.newIndex >= rctItemElements.get(newIndexKey).lastIndex) ||
        (sort.newIndex < sort.oldIndex &&
          sort.newIndex > rctItemElements.get(newIndexKey).firstIndex &&
          sort.newIndex < rctItemElements.get(newIndexKey).lastIndex)
      ) {
        this.transformElements(
          rctItemElements.get(newIndexKey),
          -60,
          DEFAULT_SORTABLE_DURATION
        )
      } else if (
        sort.newIndex < sort.oldIndex &&
        sort.newIndex <= rctItemElements.get(oldIndexKey).firstIndex
      ) {
        this.transformElements(
          rctItemElements.get(oldIndexKey),
          0,
          DEFAULT_SORTABLE_DURATION
        )
      } else {
        document
          .querySelectorAll(rctItemElements.get(newIndexKey).groupMove)
          .forEach(element => element.classList.add('disable-transform'))
      }
    } else if (sort.newIndex < sort.index) {
      if (
        (sort.newIndex < sort.oldIndex &&
          sort.newIndex <= rctItemElements.get(newIndexKey).firstIndex) ||
        (sort.newIndex > sort.oldIndex &&
          sort.newIndex < rctItemElements.get(newIndexKey).lastIndex &&
          sort.newIndex > rctItemElements.get(newIndexKey).firstIndex)
      ) {
        this.transformElements(
          rctItemElements.get(newIndexKey),
          60,
          DEFAULT_SORTABLE_DURATION
        )
      } else if (
        sort.newIndex > sort.oldIndex &&
        sort.newIndex >= rctItemElements.get(oldIndexKey).lastIndex
      ) {
        this.transformElements(
          rctItemElements.get(oldIndexKey),
          0,
          DEFAULT_SORTABLE_DURATION
        )
      } else {
        document
          .querySelectorAll(rctItemElements.get(newIndexKey).groupMove)
          .forEach(element => element.classList.add('disable-transform'))
      }
    } else {
      this.transformElements(
        rctItemElements.get(oldIndexKey),
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
      groupPositionLimit,
      firstDragScrollTop
    } = this.state
    if (
      groupPositionLimit?.top > lastDragPosition + event.target.scrollTop ||
      groupPositionLimit?.bottom < lastDragPosition + event.target.scrollTop
    ) {
      let dragTransform = 0
      if (groupPositionLimit?.top > lastDragPosition + event.target.scrollTop) {
        dragTransform =
          groupPositionLimit?.top -
          displacementSize +
          (firstDragScrollTop - event.target.scrollTop)
      } else if (
        groupPositionLimit?.bottom <
        lastDragPosition + event.target.scrollTop
      ) {
        dragTransform =
          groupPositionLimit?.bottom -
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
    const { scrollContainer, rctItemElements, dragItemElements } = this.state
    const { sortOrderTaskList } = this.props

    document
      .querySelectorAll('.disable-transform')
      .forEach(element => element.classList.remove('disable-transform'))

    rctItemElements.forEach(elements => {
      this.clearTransformElements(elements)
    })
    rctItemElements.clear()

    this.clearTransformElements(dragItemElements)

    if (scrollContainer) {
      scrollContainer.removeEventListener('scroll', this.autoScrollEvent)
    }

    if (sort.oldIndex !== sort.newIndex) {
      sortOrderTaskList(arrayMove, sort.oldIndex, sort.newIndex)
    }

    this.setState({
      isDraging: false, // state check move action

      dragControlElement: null,
      dragItemElements: [],

      displacementSize: 0,
      lastDragPosition: 0,
      dragIndex: -1,
      groupPositionLimit: null,
      sortParentId: null,

      firstDragScrollTop: 0, // Distance to top of container when dragging starts
      rctItemElements: new Map(), // the item elements on chart
      sortParentId: null
    })
  }

  transformElements = (groupElements, transformSize, delayDuration) => {
    const elements = document.querySelectorAll(groupElements.groupMove)
    for (let i = 0; i < elements?.length; i++) {
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

  clearTransformElements = groupElements => {
    const elements = document.querySelectorAll(groupElements.groupMove)
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains('draggable_task_process')) {
        elements[i].style.transitionDuration = `0ms`
        elements[i].style.transform = 'none'
        elements[i].classList.remove('draggable_task_process')
      } else {
        elements[i].classList.remove('transform-to-above')
        elements[i].classList.remove('transform-to-below')
        elements[i].classList.remove('transform-reset')
      }
    }
  }

  getContainerElement = () => {
    const dropZoneTask = document.getElementById('dropzone-task')
    return dropZoneTask
  }
  render() {
    const { isDraging } = this.state
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
      sidebarPositionDisplayed
    } = this.props
    return (
      <div
        className={
          isShowDragHandleButton && !isDraging ? 'hover-show-sortable' : ''
        }
      >
        <SortableList
          useDragHandle
          lockAxis="y"
          helperClass="draggable_task_item"
          helperContainer={this.getContainerElement}
          lockToContainerEdges={true}
          lockOffset={['2px', '10px']}
          onSortStart={this.onSortStart}
          onSortMove={this.onSortMove}
          onSortOver={this.onSortOver}
          onSortEnd={this.onSortEnd}
          groups={groups}
          groupIdKey={groupIdKey}
          groupHeights={groupHeights}
          isRightSidebar={isRightSidebar}
          isDraging={isDraging}
          openAddGroupForm={openAddGroupForm}
          groupRenderer={groupRenderer}
          groupRightTitleKey={groupRightTitleKey}
          groupTitleKey={groupTitleKey}
          buttonTooltipRenderer={buttonTooltipRenderer}
          sidebarPositionDisplayed={sidebarPositionDisplayed}
        />
      </div>
    )
  }
}
