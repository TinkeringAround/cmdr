import React, { FC } from 'react'

interface Props {
  type: 'edit' | 'delete' | 'add' | 'close' | 'run' | 'stop'
  onClick?: any
}

const Icon: FC<Props> = ({ type, onClick = null }) =>
  <span className={`icon icon-${type}`}
       onClick={onClick} />

export default Icon
