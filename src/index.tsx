import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

// Styles
import './index.css'
import './store'
import './store/reducer'

// Store
import { loadConfig } from './store/actions'

// Components
import Layout from './components/layout'
import Navigation from './components/navigation'
import Content from './components/content'

// ==========================================================
ReactDOM.render(
  <Layout>
    <Navigation />
    <Content />
  </Layout>,
  document.getElementById('root'))
serviceWorker.unregister()

window.addEventListener('load', () => loadConfig())
window.addEventListener('beforeunload', () => {
  // save config
  console.log('TODO save config')
})
