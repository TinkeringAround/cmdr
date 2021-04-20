import create, { State } from 'zustand'
import { CONSTS } from './actions'

const STATUS = CONSTS.STATUS

export interface Command {
  data?: string;
  error?: string;
  status: string;
  title?: string;
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
      title: 'Test Command',
      status: STATUS.SUCCESS,
      data: 'Test',
    }
  }
}))

useStore.subscribe(state => console.log('State updated', state))
