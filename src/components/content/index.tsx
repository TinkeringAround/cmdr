import React, { FC, useCallback } from 'react'
import { useStore } from '../../store'
import { addScript } from '../../store/actions'
import { Route } from '../../store/types'
import { UtilityService } from '../../services/utility.service'

import './content.css'

import Icon from '../icon'
import ScriptList from '../script-list'
import ScriptEditor from '../script-editor'
import ScriptRunner from '../script-runner'

const Content: FC = () => {
  const { route } = useStore().activeRoute

  const createScript = useCallback(() =>
    addScript(UtilityService.createId()), [])

  return (
    <main>
      <header>
        <h1 className="route">{route}</h1>
        {route === Route.OVERVIEW &&
        <button className='button primary'
                onClick={createScript}>
          <Icon type='add' />
        </button>}
      </header>

      {route === Route.OVERVIEW && <ScriptList />}
      {route === Route.EDITOR && <ScriptEditor />}
      {route === Route.RUNNER && <ScriptRunner />}
    </main>
  )
}

export default Content
