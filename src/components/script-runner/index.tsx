import React, { FC, useCallback } from 'react'
import { useStore } from '../../store'
import { CONSTS, killScript, runScript, updateRoute } from '../../store/actions'
import { Route } from '../../store/types'

import './script-runner.css'

import Icon from '../icon'

const ScriptRunner: FC = () => {
  const { id } = useStore().activeRoute
  const { title, data, status, exec, error } = useStore().scripts[id]

  const output = useCallback(() => {
    let output = data ?? ''
    if (data) output += '\n'
    if (error?.message && error.stack) output += `${error.message}\n\n${error.stack}`
    return output
  }, [data, error])

  const run = useCallback(() => {
    if (exec) runScript(id, exec)
  }, [id, exec])

  const stop = useCallback(() =>
    killScript(id), [id])

  const edit = useCallback(() =>
    updateRoute({ route: Route.EDITOR, id }), [id])

  const copyToClipBoard = useCallback(() => {
    if (data) navigator.clipboard.writeText(data)
  }, [data])

  const isRunning = useCallback(() =>
    status === CONSTS.STATUS.RUNNING, [status])

  return (
    <div className='script-runner'>
      <div className='header'>
        <div className={`status ${status}`} />
        <h1>{title}</h1>
      </div>

      <textarea className={`textarea ${status}`}
                value={output()}
                readOnly />

      <footer>
        <button className='button'
                onClick={copyToClipBoard}>
          <Icon type='clipboard' />
          <span>Copy To Clipboard</span>
        </button>
        <button className='button'
                onClick={edit}>
          <Icon type='edit' />
          <span>Edit</span>
        </button>
        <button className='button primary'
                onClick={isRunning() ? stop : run}>
          <Icon type={isRunning() ? 'stop' : 'run'} />
          <span>{isRunning() ? 'Stop' : 'Execute'}</span>
        </button>
      </footer>
    </div>
  )
}

export default ScriptRunner
