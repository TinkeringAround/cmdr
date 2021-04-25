import React, { FC } from 'react'
import { Route, useStore } from '../../store'

import './main.css'

import Overview from '../overview'

const Main: FC = () => {
  const { route } = useStore()

  return (
    <main>
      <header>
        <button className='button primary'>
          New Command
        </button>
      </header>

      {route === Route.OVERVIEW && <Overview />}
    </main>
  )
}

export default Main
