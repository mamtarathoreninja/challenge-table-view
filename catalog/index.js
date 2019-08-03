import React from 'react'
import ReactDOM from 'react-dom'
import { Catalog } from 'catalog'
import logo from './static/lincx-logo.svg'

const pages = [
  {
    path: '/',
    title: 'Catalog',
    content: 'Catalog'
  },
  {
    title: 'Components',
    pages: [
      {
        path: '/components/table',
        title: 'Table',
        imports: {
          Table: require('../src').Table,
          data: require('./pages/fixtures/movies.json')
        },
        content: require('./pages/components/table.md')
      },
      {
        path: '/components/select',
        title: 'Select',
        imports: {
          Select: require('../src').Select
        },
        content: require('./pages/components/select.md')
      },
      {
        path: '/components/table-view',
        title: 'Table-View',
        imports: {
          TableView: require('../src').TableView,
          data: require('./pages/fixtures/movies.json')
        },
        content: require('./pages/components/table-view.md')
      }
    ]
  }
]

ReactDOM.render(
  <Catalog title='Catalog' logoSrc={logo} pages={pages} />,
  document.getElementById('catalog')
)
