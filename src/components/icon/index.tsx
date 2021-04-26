import React, { FC } from 'react'

import "./icon.css"

interface Props {
  type: 'edit' | 'delete' | 'add' | 'close' | 'run' | 'stop' | 'output'
  disabled?: boolean
  onClick?: any
}

const Icon: FC<Props> = ({ type, disabled = false, onClick = null }) =>
  <span className={`icon icon-${type} ${disabled ? 'disabled' : ''}`}
       onClick={onClick} />

export default Icon
