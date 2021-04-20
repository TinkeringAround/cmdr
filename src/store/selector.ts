import { AppState } from './index'

export const selectCommands = (state: AppState) => state.commands

export const selectRoute = (state: AppState) => state.route
