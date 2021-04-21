import {ACTION} from '../consts'

const { invoke } = window.electron

export const runCommand = (id: string, exec: string) => invoke(ACTION.runCommand, {id, exec})

export * as CONSTS from '../consts'

