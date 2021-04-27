import React, { FC } from 'react'

import './icon.css'

interface Props {
  type: 'edit' | 'delete' | 'add' | 'save' | 'run' | 'stop' | 'clipboard' | 'undo'
  disabled?: boolean
  onClick?: any
}

const Icon: FC<Props> = ({ type, disabled = false, onClick = null }) =>
  <span className={`icon icon-${type} ${disabled ? 'disabled' : ''}`}
        title={`${type.charAt(0).toUpperCase()}${type.slice(1)}`}
        onClick={onClick} />

export default Icon
