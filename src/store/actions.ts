import { ACTION } from '../consts'
import { ActiveRoute, Script } from './index'

const { dispatch, trigger } = window.electron

export const updateRoute = (activeRoute: Partial<ActiveRoute>) => trigger(ACTION.updateRoute, { ...activeRoute })

export const addScript = (id: string) => trigger(ACTION.addScript, { id })
export const deleteScript = (id: string) => trigger(ACTION.deleteScript, { id })
export const killScript = (id: string) => dispatch(ACTION.killScript, { id })
export const runScript = (id: string, exec: string) => dispatch(ACTION.runScript, { id, exec })
export const updateScript = (id: string, script: Partial<Script>) => trigger(ACTION.updateScript, { id, ...script })

export const loadConfig = () => dispatch(ACTION.loadConfig)

export * as CONSTS from '../consts'
