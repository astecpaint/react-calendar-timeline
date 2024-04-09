import React, { Component } from 'react'
import { _get, deepObjectCompare } from '../utility/generic'

/**
 * GroupContent component contains the content of the sidebar
 * This component is added to manage the sidebar content lifecycle to optimize gallery performance
 * @class GroupContent
 * @extends {Component}
 * @param {object} props
 * @param {object} props.group - group content data
 * @param {function} props.groupRenderer - function helps render group component
 * @param {boolean} props.isRightSidebar - the value check the component is right sidebar or not
 * @param {string} props.groupTitleKey - the key value for group title
 * @param {string} props.groupRightTitleKey - the key value for group right title
 */
export default class GroupContent extends Component {
  // The sidebar content only updates when the group or groupRenderer property changes
  shouldComponentUpdate(nextProps) {
    return (
      !deepObjectCompare(this.props.group, nextProps.group) ||
      !deepObjectCompare(this.props.groupRenderer, nextProps.groupRenderer)
    )
  }

  render() {
    const {
      group,
      groupRenderer,
      isRightSidebar,
      groupTitleKey,
      groupRightTitleKey
    } = this.props
    return (
      <>
        {groupRenderer
          ? React.createElement(groupRenderer, {
              group,
              isRightSidebar
            })
          : _get(group, isRightSidebar ? groupRightTitleKey : groupTitleKey)}
      </>
    )
  }
}
