import React, { FC, useCallback } from 'react'
import { Route, useStore } from '../../store'
import { addScript } from '../../store/actions'
import { UtilityService } from '../../services/utility.service'

import './content.css'

import Overview from '../overview'
import Icon from '../icon'
import ScriptEditor from '../script-editor'

const Content: FC = () => {
  const { route } = useStore().activeRoute

  const createScript = useCallback(() =>
    addScript(UtilityService.createId()), [])

  return (
    <main>
      <header>
        {route === Route.OVERVIEW &&
        <button className='button primary' onClick={createScript}>
          <Icon type='add' />
          <span>New Command</span>
        </button>}
      </header>

      {route === Route.OVERVIEW && <Overview />}
      {route === Route.EDITOR && <ScriptEditor />}
    </main>
  )
}

export default Content
