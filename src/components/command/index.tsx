import React, { FC, Fragment, useCallback } from 'react'
import { useStore } from '../../store'
import { selectCommands } from '../../store/selector'
import { runCommand } from '../../store/actions'

import "./command.css"

type Props = {
  id: string
}

const Command: FC<Props> = ({ id }) => {
  const command = useStore(selectCommands)[id]

  const runCmd = useCallback(() => {
    if (command.exec) runCommand(id, command.exec)
  }, [id, command])

  return (
    <Fragment>
      {command &&
      <div className='command' onClick={runCmd}>
        <div className="left">
          <div className={`status ${command.status}`}/>
          <span>{command.title}</span>
        </div>
        <div className="right">TODO</div>
      </div>}
    </Fragment>
  )
}

export default Command
