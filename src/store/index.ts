import create, { State } from 'zustand'
import { CONSTS } from './actions'

const STATUS = CONSTS.STATUS

export interface Command {
  data?: string;
  error?: string;
  status: string;
  title?: string;
  exec?: string;
}

export enum Route {
  OVERVIEW,
  COMMAND
}

export interface AppState extends State {
  route: Route,
  commands: {
    [key: string]: Command;
  },
}

export const useStore = create<AppState>(() => ({
  route: Route.OVERVIEW,
  commands: {
    '1': {
      title: 'Show current directory',
      status: STATUS.INACTIVE,
      data: 'Test',
      exec: 'dir'
    }
  }
}))

useStore.subscribe(state => console.log('State updated', state))
