import { IpcRenderer } from 'electron'

// ==========================================================
export type TElectron = {
  invoke: (channel: string, data: object) => void
  on: (channel: string, fn: Function) => IpcRenderer
}

declare global {
  interface Window {
    electron: TElectron
  }
}
