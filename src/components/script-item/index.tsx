import React, { FC, Fragment, useCallback } from 'react'
import { useStore } from '../../store'
import { CONSTS, killScript, runScript, updateRoute } from '../../store/actions'
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

  const isRunning = useCallback(() => status === CONSTS.STATUS.RUNNING, [status])

  return (
    <Fragment>
      {title && status &&
      <div className='script-item'>
        <div className='left'
             onClick={showOutput}>
          <div className={`status ${status}`} />
        </div>

        <div className='middle'
             onClick={showOutput}>
          <span>{title}</span>
        </div>

        <div className='right'>
          {!isRunning() && <Icon type='run' onClick={run} disabled={!exec} />}
          {isRunning() && <Icon type='stop' onClick={stop} />}
          <Icon type='edit' onClick={edit} />
        </div>
      </div>}
    </Fragment>
  )
}

export default ScriptItem
