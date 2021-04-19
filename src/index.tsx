import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

// Styles
import './index.css'
import './store'
import './store/reducer'

// ==========================================================
const App: FC = () => {
  return <div />
}

// ==========================================================
ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()
