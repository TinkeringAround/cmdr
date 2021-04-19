import React, { FC } from 'react'
import { useStore } from '../../store'
import { selectCommands } from '../../store/selector'

type Props = {
  id: string
}

const Command: FC<Props> = ({ id, children }) => {
  const command = useStore(selectCommands)[id]

  return (
    <div className='command'>
      {command.title}
      {children}
    </div>
  )
}

export default Command
