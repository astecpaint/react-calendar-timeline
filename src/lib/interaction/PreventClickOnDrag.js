import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { composeEvents } from '../utility/events'

class PreventClickOnDrag extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    onRowMouseDown: PropTypes.func,
    onRowMouseUp: PropTypes.func,
    onRowMouseMove: PropTypes.func
  }

  handleMouseDown = evt => {
    this.originClickX = evt.clientX
  }

  handleMouseUp = evt => {
    if (Math.abs(this.originClickX - evt.clientX) > this.props.clickTolerance) {
      this.cancelClick = true
    }
  }

  handleClick = evt => {
    if (!this.cancelClick) {
      this.props.onClick(evt)
    }

    this.cancelClick = false
    this.originClickX = null
  }

  render() {
    const childElement = React.Children.only(this.props.children)
    return React.cloneElement(childElement, {
      onMouseDown: composeEvents(
        this.handleMouseDown,
        this.props?.onRowMouseDown
      ),
      onMouseUp: composeEvents(this.handleMouseUp, this.props?.onRowMouseUp),
      onMouseMove: this.props?.onRowMouseMove,
      onClick: this.handleClick
    })
  }
}

export default PreventClickOnDrag
