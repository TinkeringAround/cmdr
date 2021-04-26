import React, { FC } from 'react'

import "./app.css"

import Navigation from '../navigation'
import Content from '../content'

const App: FC = () => (
  <div className="app">
    <Navigation />
    <Content />
  </div>
)
export default App
