import { CONSTS } from './actions'
import { Command, useStore } from './index'

const ACTION = CONSTS.ACTION

const { on } = window.electron

export interface CommandPayload extends Readonly<Command> {
  id: string;
}

on(ACTION.updateCommand, (_: any, { data, id, status, error }: CommandPayload) => {
  const commands = useStore.getState().commands

  if (commands && id in commands) {
    useStore.setState({
      commands: {
        [id]: {
          ...commands[id],
          status,
          data,
          error
        }
      }
    })
  }
})

export interface ConfigPayload {
  status: string
  config?: {
    [key: string]: Command;
  }
  error?: string
}

on(ACTION.configLoaded, (_: any, { config, error }: ConfigPayload) => {
  useStore.setState({ commands: config ?? {} })

  if (error) console.error(error)

  useStore.subscribe(state => {
    // TODO: Save store snapshot to config.json
    console.log('State updated', state)
  })
})
