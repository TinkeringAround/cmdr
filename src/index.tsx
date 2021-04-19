import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

// Styles
import './index.css'
import './store'
import './store/reducer'

// Components
import Layout from './components/layout'
import Navigation from './components/navigation'
import Main from './components/main'

// ==========================================================
ReactDOM.render(
  <Layout>
    <Navigation />
    <Main />
  </Layout>,
  document.getElementById('root'))
serviceWorker.unregister()
