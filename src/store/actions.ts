import { ACTION } from '../consts'

const { dispatch, trigger } = window.electron

export const runScript = (id: string, exec: string) => dispatch(ACTION.runScript, { id, exec })
export const killScript = (id: string) => dispatch(ACTION.killScript, { id })
export const deleteScript = (id: string) => trigger(ACTION.deleteScript, { id })

export const loadConfig = () => dispatch(ACTION.loadConfig)

export * as CONSTS from '../consts'
