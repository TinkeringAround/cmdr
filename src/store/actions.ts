import {ACTION} from '../consts'

const { invoke } = window.electron

export const runCommand = (command: string) => invoke(ACTION.runCommand, command)

export * as CONSTS from '../consts'

