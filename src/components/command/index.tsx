import React, { FC, Fragment, useCallback } from 'react'
import { useStore } from '../../store'
import { selectCommands } from '../../store/selector'
import { CONSTS, killCommand, runCommand } from '../../store/actions'

import "./command.css"

import Icon from '../icon'

type Props = {
  id: string
}

const Command: FC<Props> = ({ id }) => {
  const {title, status, exec} = useStore(selectCommands)[id]

  const runCmd = useCallback(() => {
    if (exec) runCommand(id, exec)
  }, [id, exec])

  const stopCmd = useCallback(() => killCommand(id), [id])

  const commandIsRunning = status === CONSTS.STATUS.RUNNING

  return (
    <Fragment>
      {title && status &&
      <div className='command' >
        <div className="left">
          <div className={`status ${status}`}/>
        </div>
        <div className="middle">
          <span>{title}</span>
        </div>
        <div className="right">
          {!commandIsRunning && <Icon type='run' onClick={runCmd}/>}
          {commandIsRunning && <Icon type='stop' onClick={stopCmd}/>}
          <Icon type='edit'/>
          <Icon type='delete'/>
        </div>
      </div>}
    </Fragment>
  )
}

export default Command
