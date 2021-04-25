import { CONSTS } from './actions'
import { Script, useStore } from './index'

const ACTION = CONSTS.ACTION

const { on } = window.electron

export interface ScriptPayload extends Readonly<Script> {
  id: string;
}

on(ACTION.updateScript, (_: any, { data, id, status, error }: ScriptPayload) => {
  const { scripts, update } = useStore.getState()

  if (id in scripts) {
    update({
      scripts: {
        [id]: {
          ...scripts[id],
          status,
          data,
          error
        }
      }
    })
  }
})

export interface ConfigPayload {
  status: string
  config?: {
    [key: string]: Script;
  }
  error?: string
}

on(ACTION.configLoaded, (_: any, { config, error }: ConfigPayload) => {
  useStore.getState().update({ scripts: config ?? {} })

  if (error) console.error(error)

  useStore.subscribe(state => {
    // TODO: Save store snapshot to config.json
    console.log('State updated', state)
  })
})

on(ACTION.deleteScript, ({ id }: { id: string }) => {
  const { scripts, update } = useStore.getState()

  if (id in scripts) {
    delete scripts[id]
    update({ scripts })
  }
})
