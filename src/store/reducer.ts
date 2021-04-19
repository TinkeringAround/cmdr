import { CONSTS } from './actions'
import { Command, useStore } from './index'

const ACTION = CONSTS.ACTION
const STATUS = CONSTS.STATUS

const { on } = window.electron

export interface CommandPayload extends Partial<Readonly<Command>> {
  id: string;
  data?: string;
  error?: string;
  status: typeof STATUS;
}

on(ACTION.updateCommand, (_: any, { data, id, status, error }: CommandPayload) => {
  useStore.setState({
    commands: {
      [id]: {
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
