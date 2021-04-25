import create, { State } from 'zustand'

export interface Script {
  data?: string;
  error?: string;
  status: string;
  title?: string;
  exec?: string;
}

export interface ActiveRoute {
  route: Route,
  id: string
}

export enum Route {
  OVERVIEW = 'overview',
  EDITOR = 'editor'
}

export interface Scripts {
  [key: string]: Script;
}

export interface AppState extends State {
  activeRoute: ActiveRoute,
  scripts: Scripts,
  update: (state: Partial<AppState>) => void
}

export const useStore = create<AppState>((set) => ({
  activeRoute: { route: Route.OVERVIEW, id: "" },
  scripts: {},
  update: (partial: Partial<AppState>) => set(partial)
}))
