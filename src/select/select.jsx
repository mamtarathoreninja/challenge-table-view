import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import { Select, MenuItem, InputLabel } from '@material-ui/core'

export default createReactClass({
  displayName: 'Select',
  propTypes: {
    items: PropTypes.array,
    label: PropTypes.string
  },
  getDefaultProps () {
    return {
      items: []
    }
  },
  render () {
    const { items, label, ...rest } = this.props
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: '100px', marginRight: '10px' }}>
        <InputLabel style={{ fontSize: 12 }}>{label}</InputLabel>
        <Select {...rest}>
          {items.map(x => (
            <MenuItem key={x} value={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </div>
    )
  }
})
