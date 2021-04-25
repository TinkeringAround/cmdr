import React, { FC } from 'react'
import { useStore } from '../../store'

import './overview.css'

import ScriptOverview from '../script-overview'

const Overview: FC = () => {
  const { scripts } = useStore()

  return (
    <div className='overview'>
      {Object
        .keys(scripts)
        .map((id) =>
          <ScriptOverview id={id} key={id} />)}
    </div>
  )
}

export default Overview
