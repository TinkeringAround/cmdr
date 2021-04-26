import React, { FC, useCallback } from 'react'
import { Route } from '../../store/types'
import { updateRoute } from '../../store/actions'

import './navigation.css'

const Navigation: FC = () => {

  const goToOverview = useCallback(() =>
      updateRoute({ route: Route.OVERVIEW, id: '' }),
    [])

  return (
    <aside className="navigation">
      <h1 className='logo'
          onClick={goToOverview}>
        CMDR
      </h1>
    </aside>
  )
}

export default Navigation
