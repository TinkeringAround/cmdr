import React, { FC, useCallback } from 'react'
import { Route, useStore } from '../../store'
import { addScript } from '../../store/actions'
import { UtilityService } from '../../services/utility.service'

import './content.css'

import Overview from '../overview'
import Icon from '../icon'
import ScriptEditor from '../script-editor'

const Content: FC = () => {
  const { activeRoute } = useStore()

  const createScript = useCallback(() =>
    addScript(UtilityService.createId()), [])

  return (
    <main>
      <header>
        <button className='button primary' onClick={createScript}>
          <Icon type='add' />
          <span>New Command</span>
        </button>
      </header>

      {activeRoute.route === Route.OVERVIEW && <Overview />}
      {activeRoute.route === Route.EDITOR && <ScriptEditor />}
    </main>
  )
}

export default Content
