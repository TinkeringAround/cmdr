import create, { State } from 'zustand'
import { CONSTS } from './actions'

const STATUS = CONSTS.STATUS

export interface Command {
  data?: string;
  error?: string;
  status: typeof STATUS;
  title?: string;
}

export interface AppState extends State {
  commands: {
    [key: string]: Command;
  }
}

export const useStore = create<AppState>(() => ({
  commands: {},
}))

useStore.subscribe(state => console.log("State updated", state))
