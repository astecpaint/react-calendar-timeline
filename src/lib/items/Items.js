import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Item from './Item'
// import ItemGroup from './ItemGroup'

import { _get, arraysEqual, deepObjectCompare, keyBy } from '../utility/generic'
import { getGroupOrders, getVisibleItems } from '../utility/calendar'

// Add the isSelected param to ensure that only currently selected items update the canResizeLeft property,
// helping to limit unnecessary re-rendering of other items.
const canResizeLeft = (item, canResize, isSelected) => {
  if (!canResize || !isSelected) return false
  const value = _get(item, 'canResize')
  return value === 'left' || value === 'both'
}

// Add the isSelected param to ensure that only currently selected items update the canResizeRight property,
// helping to limit unnecessary re-rendering of other items.
const canResizeRight = (item, canResize, isSelected) => {
  if (!canResize || !isSelected) return false
  const value = _get(item, 'canResize')
  return value === 'right' || value === 'both' || value === true
}

export default class Items extends Component {
  static propTypes = {
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,

    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,

    dragSnap: PropTypes.number,
    minResizeWidth: PropTypes.number,
    selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    canChangeGroup: PropTypes.bool.isRequired,
    canMove: PropTypes.bool.isRequired,
    canResize: PropTypes.oneOf([true, false, 'left', 'right', 'both']),
    canSelect: PropTypes.bool,

    keys: PropTypes.object.isRequired,

    moveResizeValidator: PropTypes.func,
    itemSelect: PropTypes.func,
    itemDrag: PropTypes.func,
    itemDrop: PropTypes.func,
    itemResizing: PropTypes.func,
    itemResized: PropTypes.func,

    onItemDoubleClick: PropTypes.func,
    onItemContextMenu: PropTypes.func,

    itemRenderer: PropTypes.func,
    selected: PropTypes.array,

    dimensionItems: PropTypes.array,
    groupTops: PropTypes.array,
    useResizeHandle: PropTypes.bool,
    scrollRef: PropTypes.object,

    //Custom
    isHoverToSelectedItem: PropTypes.bool.isRequired,
    isGembaMode: PropTypes.bool.isRequired,
    itemPositionDisplayed: PropTypes.object.isRequired,
    isScheduleScreen: PropTypes.bool.isRequired,
    currentGroupMove: PropTypes.object
  }

  static defaultProps = {
    selected: []
  }

  shouldComponentUpdate(nextProps) {
    return !(
      arraysEqual(nextProps.groups, this.props.groups) &&
      arraysEqual(nextProps.items, this.props.items) &&
      arraysEqual(nextProps.dimensionItems, this.props.dimensionItems) &&
      nextProps.keys === this.props.keys &&
      nextProps.canvasTimeStart === this.props.canvasTimeStart &&
      nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.selectedItem === this.props.selectedItem &&
      nextProps.selected === this.props.selected &&
      nextProps.dragSnap === this.props.dragSnap &&
      nextProps.minResizeWidth === this.props.minResizeWidth &&
      nextProps.canChangeGroup === this.props.canChangeGroup &&
      nextProps.canMove === this.props.canMove &&
      nextProps.canResize === this.props.canResize &&
      nextProps.canSelect === this.props.canSelect &&
      nextProps.isHoverToSelectedItem === this.props.isHoverToSelectedItem &&
      nextProps.isGembaMode === this.props.isGembaMode &&
      deepObjectCompare(
        this.props.itemPositionDisplayed,
        nextProps.itemPositionDisplayed
      ) &&
      nextProps.isScheduleScreen === this.props.isScheduleScreen &&
      nextProps.currentGroupMove === this.props.currentGroupMove
    )
  }

  isSelected(item, itemIdKey) {
    if (!this.props.selected) {
      return this.props.selectedItem === _get(item, itemIdKey)
    } else {
      let target = _get(item, itemIdKey)
      return this.props.selected.includes(target)
    }
  }

  getVisibleItems(canvasTimeStart, canvasTimeEnd) {
    const { keys, items } = this.props

    return getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys)
  }

  render() {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      dimensionItems,
      keys,
      groups,
      isHoverToSelectedItem,
      isGembaMode,
      selectedItem,
      itemPositionDisplayed,
      isScheduleScreen,
      currentGroupMove
    } = this.props
    const { itemIdKey, itemGroupKey } = keys

    const groupOrders = getGroupOrders(groups, keys, itemPositionDisplayed)
    const visibleItems = this.getVisibleItems(
      canvasTimeStart,
      canvasTimeEnd,
      groupOrders
    )
    const sortedDimensionItems = keyBy(dimensionItems, 'id')

    return (
      <div className="rct-items">
        {visibleItems
          .filter(item => sortedDimensionItems[_get(item, itemIdKey)])
          .filter(item => {
            const currentGroupMoveId =
              currentGroupMove?.task?.parent_id ||
              currentGroupMove?.task?.task_id
            const itemMove =
              currentGroupMoveId !== null && currentGroupMoveId !== undefined
                ? item?.task?.parent_id === currentGroupMoveId ||
                  item?.task?.task_id === currentGroupMoveId ||
                  item?.belongTaskParentId === currentGroupMoveId ||
                  item?.belongTaskId === currentGroupMoveId
                : false
            return !!groupOrders?.[item?.group]?.isShow || itemMove
          })
          .map(item => (
            <Item
              key={_get(item, itemIdKey)}
              item={item}
              keys={this.props.keys}
              order={groupOrders[_get(item, itemGroupKey)]}
              dimensions={
                sortedDimensionItems[_get(item, itemIdKey)].dimensions
              }
              selected={this.isSelected(item, itemIdKey)}
              canChangeGroup={
                _get(item, 'canChangeGroup') !== undefined
                  ? _get(item, 'canChangeGroup')
                  : this.props.canChangeGroup
              }
              canMove={
                _get(item, 'canMove') !== undefined
                  ? _get(item, 'canMove')
                  : this.props.canMove
              }
              canResizeLeft={canResizeLeft(
                item,
                this.props.canResize,
                this.isSelected(item, itemIdKey)
              )}
              canResizeRight={canResizeRight(
                item,
                this.props.canResize,
                this.isSelected(item, itemIdKey)
              )}
              canSelect={
                _get(item, 'canSelect') !== undefined
                  ? _get(item, 'canSelect')
                  : this.props.canSelect
              }
              useResizeHandle={this.props.useResizeHandle}
              groupTops={this.props.groupTops}
              canvasTimeStart={this.props.canvasTimeStart}
              canvasTimeEnd={this.props.canvasTimeEnd}
              canvasWidth={this.props.canvasWidth}
              dragSnap={this.props.dragSnap}
              minResizeWidth={this.props.minResizeWidth}
              onResizing={this.props.itemResizing}
              onResized={this.props.itemResized}
              moveResizeValidator={this.props.moveResizeValidator}
              onDrag={this.props.itemDrag}
              onDrop={this.props.itemDrop}
              onItemDoubleClick={this.props.onItemDoubleClick}
              onContextMenu={this.props.onItemContextMenu}
              onSelect={this.props.itemSelect}
              itemRenderer={this.props.itemRenderer}
              scrollRef={this.props.scrollRef}
              isHoverToSelectedItem={isHoverToSelectedItem}
              group={groupOrders?.[item?.group]?.group}
              isGembaMode={isGembaMode}
              selectedItem={selectedItem}
              isScheduleScreen={isScheduleScreen}
            />
          ))}
      </div>
    )
  }
}
