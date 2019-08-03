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
      filterFields: {},
      tableRows: [],
      options: {}
    }
  },
  componentDidMount () {
    const {filter} = this.props
    let { options } = this.state
    this.getRows(this.state.filterFields)
    filter.forEach((select) => {
      options[select.dataKey] = this.getItems(select.dataKey)
    })
    this.setState({ options })
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
  getRows (filterFields) {
    const {rows} = this.props
    const keys = Object.keys(filterFields)
    let filteredRows = []
    if (keys.length !== 0) {
      filteredRows = rows.filter((row) => {
        let counter = 0
        return this.recursive(filterFields, keys, counter, row)
      })
    }
    this.setState({
      tableRows: filteredRows.length ? filteredRows : rows
    })
  },

  onlyUnique (value, index, self) {
    return self.indexOf(value) === index
  },
  getItems (item) {
    const {rows} = this.props
    return rows.map((row) => row[item]).filter(this.onlyUnique)
  },
  handleOnChange: function (e) {
    const { value = [], name } = e.target
    const filterFields = { ...this.state.filterFields, [name]: value }
    this.setState({ filterFields })
    this.getRows(filterFields)
  },
  clearFilter: function () {
    this.setState({filterFields: {}})
  },
  render () {
    const { columns, classes, filter } = this.props
    const { options } = this.state
    return (
      <Paper className={classes.root}>
        <div className={classes.flexDiv}>
          {filter.map((select) => {
            return (<Select
              key={select.dataKey}
              multiple
              label={select.label}
              data-select={select}
              value={this.state.filterFields[select.dataKey] || []}
              name={select.dataKey}
              items={options[select.dataKey]}
              onChange={this.handleOnChange}
            />)
          })}
          {Object.keys(this.state.filterFields).length > 0 && (<Button
            variant='contained'
            size='large'
            color='primary'
            className={classes.button}
            onClick={this.clearFilter}
          >
                Clear Filters
          </Button>)}
        </div>
        <Table
          rows={this.state.tableRows}
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
