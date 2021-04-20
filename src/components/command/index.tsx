import React, { FC, Fragment } from 'react'
import { useStore } from '../../store'
import { selectCommands } from '../../store/selector'

import "./command.css"

type Props = {
  id: string
}

const Command: FC<Props> = ({ id }) => {
  const command = useStore(selectCommands)[id]

  return (
    <Fragment>
      {command &&
      <div className='command'>
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
