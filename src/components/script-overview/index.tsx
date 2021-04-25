import React, { FC, Fragment, useCallback } from 'react'
import { Route, useStore } from '../../store'
import { CONSTS, deleteScript, killScript, runScript, updateRoute } from '../../store/actions'

import './script-editor.css'

import Icon from '../icon'

type Props = {
  id: string
}

const ScriptOverview: FC<Props> = ({ id }) => {
  const { title, status, exec } = useStore().scripts[id]

  const run = useCallback(() => {
    if (exec) runScript(id, exec)
  }, [id, exec])

  const stop = useCallback(() => killScript(id), [id])

  const edit = useCallback(() => updateRoute({ route: Route.EDITOR, id}), [id])

  const deleteScrpt = useCallback(() => deleteScript(id), [id])

  const isRunning = useCallback(() => status === CONSTS.STATUS.RUNNING, [status])

  return (
    <Fragment>
      {title && status &&
      <div className='script-overview'>
        <div className='left'>
          <div className={`status ${status}`} />
        </div>
        <div className='middle'>
          <span>{title}</span>
        </div>
        <div className='right'>
          {!isRunning() && <Icon type='run' onClick={run} />}
          {isRunning() && <Icon type='stop' onClick={stop} />}
          <Icon type='edit' onClick={edit} />
          <Icon type='delete' onClick={deleteScrpt} />
        </div>
      </div>}
    </Fragment>
  )
}

export default ScriptOverview
