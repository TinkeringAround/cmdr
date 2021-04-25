import create, { State } from 'zustand'

export interface Script {
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

export interface Scripts {
  [key: string]: Script;
}

export interface AppState extends State {
  route: Route,
  scripts: Scripts,
  update: (state: Partial<AppState>) => void
}

export const useStore = create<AppState>((set) => ({
  route: Route.OVERVIEW,
  scripts: {},
  update: (partial: Partial<AppState>) => set(partial)
}))
