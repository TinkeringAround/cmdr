import { CONSTS } from './actions'
import { Command, useStore } from './index'

const ACTION = CONSTS.ACTION

const { on } = window.electron

export interface CommandPayload extends Readonly<Command> {
  id: string;
}

on(ACTION.updateCommand, (_: any, { data, id, status, error }: CommandPayload) => {
  const command = useStore.getState().commands[id]

  useStore.setState({
    commands: {
      [id]: {
        ...command,
        status,
        data,
        error
      }
    }
  })
})

on(ACTION.errorCommand, (_: any, event: any) => {
  console.log('TODO', event)
})
