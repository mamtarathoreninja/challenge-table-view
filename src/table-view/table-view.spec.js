import React from 'react'
import TableView from './table-view'
import { Select, Table } from '../index'

const minProps = {
  columns: [
    {
      label: 'Name',
      dataKey: 'name'
    },
    {
      label: 'Age',
      dataKey: 'age'
    }
  ],
  rows: [
    { name: 'Mike', age: 25, id: 1245 },
    { name: 'Jennifer', age: 30, id: 46874 }
  ],
  filter: [
    {label: 'Name', dataKey: 'name' }
    ]
}

test('renders a TableView', () => {
  const wrapper = shallow(<TableView {...minProps} />)
  expect(wrapper).toMatchSnapshot()
})

test('should have 1 Select', () => {
  const wrapper = mount(<TableView {...minProps} />)
  expect(wrapper.find(Select)).toHaveLength(1)
})

test('should have 1 table', () => {
  const wrapper = mount(<TableView {...minProps} />)
  expect(wrapper.find(Table)).toHaveLength(1)
})
