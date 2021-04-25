import React, { FC } from 'react'
import { useStore } from '../../store'

import './overview.css'

import Row from '../row'

const Overview: FC = () => {
  const { scripts } = useStore()

  return (
    <div className='overview'>
      {Object
        .keys(scripts)
        .map((id) =>
          <Row id={id} key={id} />)}
    </div>
  )
}

export default Overview
