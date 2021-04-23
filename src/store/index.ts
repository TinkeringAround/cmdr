import create, { State } from 'zustand'
import { loadConfig } from './actions'

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
  } | null,
}

export const useStore = create<AppState>(() => ({
  route: Route.OVERVIEW,
  commands: null
}))

loadConfig()

