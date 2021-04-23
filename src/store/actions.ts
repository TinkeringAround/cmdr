import {ACTION} from '../consts'

const { invoke } = window.electron

export const runCommand = (id: string, exec: string) => invoke(ACTION.runCommand, {id, exec})
export const killCommand = (id: string) => invoke(ACTION.killCommand, { id })

export const loadConfig = () => invoke(ACTION.loadConfig)

export * as CONSTS from '../consts'

