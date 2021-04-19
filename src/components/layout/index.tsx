import React, { FC } from 'react'

import "./layout.css"

const Layout: FC = ({children}) => {
  return (
    <div className="layout">
      {children}
    </div>
  )
}

export default Layout
