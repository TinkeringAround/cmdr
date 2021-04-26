import React, { FC, useCallback, useEffect, useState } from 'react'
import { useStore } from '../../store'
import { runScript, updateRoute, updateScript } from '../../store/actions'

import './script-editor.css'
import { Route } from '../../store/types'

const ScriptEditor: FC = () => {
  const { id } = useStore().activeRoute
  const { title: scriptTitle, exec: scriptExec } = useStore().scripts[id]
  const [title, setTitle] = useState<string>('')
  const [exec, setExec] = useState<string>('')
  const [dirty, setDirty] = useState<boolean>(false)

  useEffect(() => {
    if (scriptTitle) setTitle(scriptTitle)
  }, [scriptTitle, setTitle])

  useEffect(() => {
    if (scriptExec) setExec(scriptExec)
  }, [scriptExec, setExec])

  const updateTitle = useCallback((value: string | undefined) => {
    if (value) {
      setTitle(value)
      if (!dirty) setDirty(true)
    }
  }, [setTitle, dirty, setDirty])

  const updateExec = useCallback((value: string) => {
    if (value) {
      setExec(value
        .split('\n')
        .join(' && ')
      )
      if (!dirty) setDirty(true)
    }
  }, [setExec, dirty, setDirty])

  const applyChanges = useCallback(() => {
    if (dirty) {
      updateScript(id, { title, exec })
      setDirty(false)
    }
  }, [title, exec, id, dirty, setDirty])

  const run = useCallback(() => {
    if (scriptExec) {
      updateRoute({ route: Route.RUNNER, id })
      runScript(id, scriptExec)
    }
  }, [id, scriptExec])

  return (
    <div className='script-editor'>
      <input className='input title'
             value={title}
             onChange={({ target }) => updateTitle(target?.value)} />

      <textarea className='textarea'
                defaultValue={exec}
                onChange={({ target }) => updateExec(target?.value)} />

      <footer className='controls'>
        <button className={`button primary`}
                onClick={dirty ? applyChanges : run}>
          {dirty ? 'Save Changes' : 'Run Command'}
        </button>
      </footer>
    </div>
  )
}

export default ScriptEditor
