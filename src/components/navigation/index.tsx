import React, { FC } from 'react'
import { useStore } from '../../store'
import { selectCommands } from '../../store/selector'

import "./navigation.css"

import Command from '../command'

const Navigation: FC = () => {
  const commands = useStore(selectCommands)

  return (
    <aside>
      {Object
        .keys(commands)
        .map((id) => <Command id={id} key={id} />)
      }
      <div className='command'>
          <span>
            New Command
          </span>
      </div>
    </aside>
  )
}

export default Navigation
