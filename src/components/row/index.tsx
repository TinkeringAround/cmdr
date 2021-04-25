import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import { Script, useStore } from '../../store'
import { CONSTS, deleteScript, killScript, runScript } from '../../store/actions'

import './row.css'

import Icon from '../icon'

type Props = {
  id: string
}

const Row: FC<Props> = ({ id }) => {
  const { scripts } = useStore()
  const [script, setScript] = useState<Script | null>(null)

  useEffect(() => {
    if (scripts && !script) setScript(scripts[id])
  }, [scripts, setScript, id])

  const run = useCallback(() => {
    if (script?.exec) runScript(id, script.exec)
  }, [id, script])

  const stop = useCallback(() => killScript(id), [id])

  const deleteScrpt = useCallback(() => deleteScript(id), [id])

  const isRunning = script?.status === CONSTS.STATUS.RUNNING

  return (
    <Fragment>
      {script &&
      <div className='script'>
        <div className='left'>
          <div className={`status ${script.status}`} />
        </div>
        <div className='middle'>
          <span>{script.title}</span>
        </div>
        <div className='right'>
          {!isRunning && <Icon type='run' onClick={run} />}
          {isRunning && <Icon type='stop' onClick={stop} />}
          <Icon type='edit' />
          <Icon type='delete' onClick={deleteScrpt} />
        </div>
      </div>}
    </Fragment>
  )
}

export default Row
