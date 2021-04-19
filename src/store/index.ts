import create, { State } from 'zustand'

export interface AppState extends State {
  commands: object
}

export const useStore = create<AppState>(() => ({
  commands: {},
}))

useStore.subscribe(state => console.log("State updated", state))
