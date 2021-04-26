import { CONSTS } from './actions'
import { useStore } from './index'
import { ActiveRoute, ConfigPayload, HasId, Script, ScriptPayload } from './types'

const { STATUS, ACTION } = CONSTS

const { on, isDev } = window.electron

on(ACTION.updateRoute, (_: any, { route, id }: Partial<ActiveRoute>) => {
  const { activeRoute, update } = useStore.getState()

  update({
    activeRoute: {
      route: route ?? activeRoute.route,
      id: id ?? (id === '' ? '' : activeRoute.id)
    }
  })
})

on(ACTION.addScript, (_: any, { id }: HasId) => {
  const { scripts, update } = useStore.getState()

  scripts[id] = {
    title: 'Untitled',
    exec: '',
    status: STATUS.INACTIVE
  }
  update({ scripts })
})

on(ACTION.deleteScript, (_: any, { id }: HasId) => {
  const { scripts, update } = useStore.getState()

  if (id in scripts) {
    delete scripts[id]
    update({ scripts })
  }
})

on(ACTION.updateScript, (_: any, { id, data, error, exec, title, status }: ScriptPayload) => {
  const { scripts, update } = useStore.getState()

  const script: Script = {
    title: title ?? scripts[id].title,
    status: status ?? scripts[id].status,
    data: data ?? scripts[id].data,
    error: error ?? scripts[id].error,
    exec: exec ?? scripts[id].exec
  }

  if (id in scripts) {
    update({
      scripts: {
        [id]: script
      }
    })
  }
})

on(ACTION.configLoaded, (_: any, { config, error }: ConfigPayload) => {
  useStore.getState().update({ scripts: config ?? {} })

  if (error) console.error(error)

  if(isDev()) {
    useStore.subscribe(state => console.log('State updated', state))
  }
})
