import React, { FC } from 'react'
import { useStore } from '../../store'

import './script-list.css'

import ScriptItem from '../script-item'

const ScriptList: FC = () => {
  const { scripts } = useStore()

  return (
    <div className='script-list'>
      {Object
        .keys(scripts)
        .map((id) =>
          <ScriptItem id={id} key={id} />)}
    </div>
  )
}

export default ScriptList
