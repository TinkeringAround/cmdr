import React, { FC, useCallback, useEffect, useState } from 'react'
import { useStore } from '../../store'

import './script-editor.css'
import { updateScript } from '../../store/actions'

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
      setExec(value.split("\n").join(" && "))
      if (!dirty) setDirty(true)
    }
  }, [setExec, dirty, setDirty])

  const applyChanges = useCallback(() => {
    updateScript(id, { title, exec })
    setDirty(false)
  }, [title, exec, id, setDirty])

  return (
    <div className='script-editor'>
      <input className='input title' value={title} onChange={({ target }) => updateTitle(target?.value)} />

      <textarea className='exec'
                rows={3}
                cols={30}
                defaultValue={exec}
                onChange={({ target }) => updateExec(target?.value)} />

      <footer>
        <button className={`button primary ${!dirty ? 'disabled' : ''}`}
                onClick={applyChanges}>
          Save
        </button>
      </footer>
    </div>
  )
}

export default ScriptEditor
