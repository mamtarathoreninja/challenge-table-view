import React from 'react'
import createReactClass from 'create-react-class'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
// import PropTypes from 'prop-types'
import {Select, Table} from '../index'
import Button from '@material-ui/core/Button'

const TableView = createReactClass({
  displayName: 'TableView',
  propTypes: {},

  getDefaultProps () {
    return {
      rows: [],
      columns: []
    }
  },

  getInitialState () {
    return {
      filterFields: {}
    }
  },
  recursive (filterField, keys, counter, row) {
    if (filterField[keys[counter]].includes(row[keys[counter]])) {
      if (keys.length === counter + 1) return row
      else {
        counter++
        return this.recursive(filterField, keys, counter, row)
      }
    }
  },
  getRows () {
    const {rows} = this.props
    const {filterFields} = this.state
    const keys = Object.keys(filterFields)
    if (keys.length !== 0) {
      return rows.filter((row) => {
        let counter = 0
        return this.recursive(filterFields, keys, counter, row)
      })
    }
    return rows
  },

  onlyUnique (value, index, self) {
    return self.indexOf(value) === index
  },
  getItems (item) {
    const {rows} = this.props
    return rows.map((row) => row[item]).filter(this.onlyUnique)
  },
  render () {
    const { columns, classes, filter } = this.props
    return (
      <Paper className={classes.root}>
        <div className={classes.flexDiv}>
          {filter.map((select) => {
            return (<Select
              multiple
              label={select.label}
              value={this.state.filterFields[select.dataKey] || []}
              name={select.dataKey}
              items={this.getItems(select.dataKey)}
              onChange={e => {
                const filterFields = { ...this.state.filterFields, [select.dataKey]: e.target.value }
                this.setState({ filterFields })
              }}
            />)
          })}
          {Object.keys(this.state.filterFields).length > 0 && (<Button
            variant='contained'
            size='large'
            color='primary'
            className={classes.button}
            onClick={(e) => this.setState({filterFields: {}})}
          >
                Clear Filters
          </Button>)}
        </div>
        <Table
          rows={this.getRows()}
          columns={columns} />
      </Paper>
    )
  }
})

const styles = () => ({
  root: {
    width: '100%',
    marginTop: 15,
    overflowX: 'auto'
  },
  flexDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '15px'
  },
  table: {
    minWidth: 650
  }
})

export default withStyles(styles)(TableView)
