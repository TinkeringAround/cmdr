import React, { FC, useCallback } from 'react'
import { useStore } from '../../store'
import { CONSTS, killScript, runScript } from '../../store/actions'

import './script-runner.css'

import Icon from '../icon'

const ScriptRunner: FC = () => {
  const { id } = useStore().activeRoute
  const { title, data, status, exec } = useStore().scripts[id]

  const run = useCallback(() => {
    if (exec) runScript(id, exec)
  }, [id, exec])

  const stop = useCallback(() =>
    killScript(id), [id])

  const isRunning = useCallback(() =>
    status === CONSTS.STATUS.RUNNING, [status])

  return (
    <div className='script-runner'>
      <div className='header'>
        <div className='left'>
          <div className={`status ${status}`} />
          <h1>{title}</h1>
        </div>

        <div className='right'>
          <button className='button primary'
                  onClick={isRunning() ? stop : run}>
            <Icon type={isRunning() ? 'stop' : 'run'} />
            <span>{isRunning() ? "Stop" : "Run"}</span>
          </button>
        </div>
      </div>

      <textarea className='textarea' value={data} readOnly />
    </div>
  )
}

export default ScriptRunner
