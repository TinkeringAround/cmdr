import React, { FC } from 'react'
import { useStore } from '../../store'
import { selectCommands } from '../../store/selector'

import './overview.css'

import Command from '../command'

const Overview: FC = () => {
  const commands = useStore(selectCommands)

  return (
    <div className='overview'>
      {Object
          .keys(commands)
            .map((commandId) =>
              <Command id={commandId} key={commandId} />)}
    </div>
  )
}

export default Overview
