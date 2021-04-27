import React, { FC, useCallback } from 'react'
import { Route } from '../../store/types'

import './navigation.css'
import { useStore } from '../../store'
import { updateRoute } from '../../store/actions'

const Navigation: FC = () => {
  const { activeRoute: { route } } = useStore()

  const goToOverview = useCallback(() => {
    if (route !== Route.OVERVIEW) updateRoute({ route: Route.OVERVIEW })
  }, [route])

  return (
    <aside className='navigation'>
      <h1 className='logo'
          title='Overview'
          onClick={goToOverview}>
        CMDR
      </h1>
    </aside>
  )
}

export default Navigation
