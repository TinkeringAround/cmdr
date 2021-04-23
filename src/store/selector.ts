import { AppState } from './index'

export const selectCommands = (state: AppState) => {
  return state.commands ?? {}
}

export const selectRoute = (state: AppState) => state.route
