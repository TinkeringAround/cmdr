import create, { State } from 'zustand'
import { ActiveRoute, Route, Scripts } from './types'

export interface AppState extends State {
  activeRoute: ActiveRoute,
  scripts: Scripts,
  update: (state: Partial<AppState>) => void
}

export const useStore = create<AppState>((set) => ({
  activeRoute: { route: Route.OVERVIEW, id: '' },
  scripts: {},
  update: (partial: Partial<AppState>) => set(partial)
}))
