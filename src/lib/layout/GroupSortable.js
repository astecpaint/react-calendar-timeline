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
      dragItemElements: [],

      displacementSize: 0,
      lastDragPosition: 0,
      dragIndex: -1,

      rctItemElements: new Map()
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const derivedState = {}
    if (!prevState.scrollContainer) {
      const scrollContainerElement = document.getElementById(
        nextProps?.scrollContainerId || 'process-basic-component'
      )
      if (scrollContainerElement) {
        Object.assign(derivedState, {
          scrollContainer: scrollContainerElement
        })
      }
    }
    return derivedState
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      arraysEqual(nextProps.groups, this.props.groups) &&
      arraysEqual(nextProps.groupHeights, this.props.groupHeights) &&
      nextProps.groupIdKey === this.props.groupIdKey &&
      nextProps.groupRightTitleKey === this.props.groupRightTitleKey &&
      nextProps.groupTitleKey === this.props.groupTitleKey &&
      nextProps.isRightSidebar === this.props.isRightSidebar &&
      nextState.isDraging === this.state.isDraging &&
      nextProps.isShowDragHandleButton === this.props.isShowDragHandleButton
    )
  }

  /**
   * the function handle event start sort
   * @param {*} sort
   * @param {*} event
   */
  onSortStart = (sort, event) => {
    const { scrollContainer } = this.state
    const dragIndex = sort.index
    const displacementSize = event.y + scrollContainer.scrollTop

    const dragItemElements = document.querySelectorAll(
      '.rct_draggable_' + dragIndex
    )

    dragItemElements.forEach(element => {
      element.style.setProperty('z-index', '81', 'important')
    })

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', this.autoScrollEvent)
    }

    const dragableItem = document.querySelector('.draggable_task_item')
    const dragableButton = document.createElement('i')
    dragableButton.className = 'fas fa-arrows-alt draggable_button'
    dragableButton.style.cssText =
      'font-size: 24px; width: 24px; color: white; position: absolute; top: 40px; left: 18px; transform: translate(-50%, -50%); z-index: 83;'
    dragableItem.appendChild(dragableButton)

    this.setState({
      isDraging: true,
      dragIndex: dragIndex,
      displacementSize: displacementSize,
      dragItemElements: dragItemElements
    })
  }

  /**
   * the function handle event move sort
   * @param {*} sort
   * @param {*} event
   */
  onSortMove = event => {
    const { scrollContainer, dragItemElements, displacementSize } = this.state

    event.stopPropagation()
    const newDisplacementSize =
      event.y - displacementSize + scrollContainer.scrollTop
    const lastDragPosition = event.y - displacementSize

    this.transformElements(dragItemElements, newDisplacementSize, 0)

    this.setState({
      lastDragPosition: lastDragPosition
    })
  }

  /**
   * the function handle event over sort
   * @param {*} sort
   * @param {*} event
   */
  onSortOver = (sort, event) => {
    const { groupHeights } = this.props
    const { rctItemElements } = this.state
    const newIndexKey = '.rct_draggable_' + sort.newIndex
    const oldIndexKey = '.rct_draggable_' + sort.oldIndex

    if (!rctItemElements.has(newIndexKey)) {
      rctItemElements.set(newIndexKey, document.querySelectorAll(newIndexKey))
    }

    if (sort.newIndex > sort.index) {
      if (sort.newIndex > sort.oldIndex) {
        this.transformElements(
          rctItemElements.get(newIndexKey),
          -groupHeights[sort.index],
          DEFAULT_SORTABLE_DURATION
        )
      } else {
        this.transformElements(
          rctItemElements.get(oldIndexKey),
          0,
          DEFAULT_SORTABLE_DURATION
        )
      }
    } else if (sort.newIndex < sort.index) {
      if (sort.newIndex < sort.oldIndex) {
        this.transformElements(
          rctItemElements.get(newIndexKey),
          groupHeights[sort.index],
          DEFAULT_SORTABLE_DURATION
        )
      } else {
        this.transformElements(
          rctItemElements.get(oldIndexKey),
          0,
          DEFAULT_SORTABLE_DURATION
        )
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
    const { dragItemElements, lastDragPosition } = this.state
    const lastDragPositionScroll = lastDragPosition + event.target.scrollTop
    this.transformElements(dragItemElements, lastDragPositionScroll, 0)
  }

  /**
   * the function handle event end sort
   * @param {*} sort
   */
  onSortEnd = sort => {
    const { scrollContainer, rctItemElements, dragItemElements } = this.state
    const { groups, sortOrderTaskList } = this.props

    rctItemElements.forEach(elements => {
      this.clearTransformElements(elements)
    })
    rctItemElements.clear()

    this.clearTransformElements(dragItemElements)

    if (scrollContainer) {
      scrollContainer.removeEventListener('scroll', this.autoScrollEvent)
    }

    if (sort.oldIndex !== sort.newIndex) {
      const newList = arrayMove(groups, sort.oldIndex, sort.newIndex)
      const result = newList.map((group, index) => {
        group.task['sort_order'] = index
        return group
      })
      sortOrderTaskList(result)
    }

    this.setState({
      isDraging: false, // state check move action

      dragControlElement: null,
      dragItemElements: [],

      displacementSize: 0,
      lastDragPosition: 0,
      dragIndex: -1
    })
  }

  transformElements = (elements, transformSize, delayDuration) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.transitionDuration = `${delayDuration}ms`
      elements[i].style.transform = 'translate(0px, ' + transformSize + 'px)'
    }
  }

  clearTransformElements = elements => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.transitionDuration = `0ms`
      elements[i].style.transform = 'translate(0px, 0px)'
      elements[i].style.setProperty('z-index', '80', 'important')
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
      openAddGroupForm
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
        />
      </div>
    )
  }
}
