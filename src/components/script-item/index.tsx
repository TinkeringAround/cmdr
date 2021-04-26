import React, { FC, Fragment, useCallback } from 'react'
import { useStore } from '../../store'
import { CONSTS, deleteScript, killScript, runScript, updateRoute } from '../../store/actions'
import { Route } from '../../store/types'

import './script-item.css'

import Icon from '../icon'

type Props = {
  id: string
}

const ScriptItem: FC<Props> = ({ id }) => {
  const { title, status, exec } = useStore().scripts[id]

  const run = useCallback(() => {
    if (exec) runScript(id, exec)
  }, [id, exec])

  const stop = useCallback(() => killScript(id), [id])

  const showOutput = useCallback(() => updateRoute({ route: Route.RUNNER, id }), [id])

  const edit = useCallback(() => updateRoute({ route: Route.EDITOR, id }), [id])

  const deleteScrpt = useCallback(() => deleteScript(id), [id])

  const isRunning = useCallback(() => status === CONSTS.STATUS.RUNNING, [status])

  return (
    <Fragment>
      {title && status &&
      <div className='script-item'>
        <div className='left'>
          <div className={`status ${status}`} />
        </div>

        <div className='middle'>
          <span>{title}</span>
        </div>

        <div className='right'>
          {!isRunning() && <Icon type='run' onClick={run} disabled={!exec} />}
          {isRunning() && <Icon type='stop' onClick={stop} />}
          <Icon type='output' onClick={showOutput} />
          <Icon type='edit' onClick={edit} />
          <Icon type='delete' onClick={deleteScrpt} />
        </div>
      </div>}
    </Fragment>
  )
}

export default ScriptItem
