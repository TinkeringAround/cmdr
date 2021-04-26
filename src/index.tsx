import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

// Styles
import './index.css'

// Store
import { loadConfig, updateConfig } from './store/actions'
import './store'
import './store/reducer'
import { useStore } from './store'

// Components
import App from './components/app'

// ==========================================================
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()

window.addEventListener('load', () => loadConfig())
window.addEventListener('beforeunload', () =>
  updateConfig(useStore.getState().scripts))
