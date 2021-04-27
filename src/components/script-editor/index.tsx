import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useStore } from '../../store'
import { deleteScript, runScript, updateRoute, updateScript } from '../../store/actions'
import { Route } from '../../store/types'

import './script-editor.css'

import Icon from '../icon'

const ScriptEditor: FC = () => {
  const { id } = useStore().activeRoute
  const { title: scriptTitle, exec: scriptExec } = useStore().scripts[id]

  const execTextArea = useRef<HTMLTextAreaElement>(null)

  const [title, setTitle] = useState<string>('')
  const [exec, setExec] = useState<string>('')
  const [dirty, setDirty] = useState<boolean>(false)
  const [backup, setBackup] = useState<{ title: string, exec: string }>({ title: '', exec: '' })

  useEffect(() => {
    if (scriptTitle) setTitle(scriptTitle)
  }, [scriptTitle, setTitle])

  useEffect(() => {
    if (scriptExec) setExec(scriptExec)
  }, [scriptExec, setExec])

  useEffect(() => {
    if (backup.title === '' && backup.exec === '') {
      setBackup({
        title: scriptTitle ?? '',
        exec: scriptExec ?? ''
      })
    }
  }, [backup, setBackup, scriptTitle, scriptExec])

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

  const discardChanges = useCallback(() => {
    if (dirty) {
      const { title, exec } = backup
      setTitle(title)
      setExec(exec)
      if (execTextArea.current != null) {
        execTextArea.current.value = exec.replaceAll(' && ', '\n')
      }
      setDirty(false)
    }
  }, [dirty, backup, setTitle, setExec, setDirty])

  const deleteCmd = useCallback(() => {
    deleteScript(id)
    updateRoute({ route: Route.OVERVIEW })
  }, [id])

  const applyChanges = useCallback(() => {
    if (dirty) {
      setBackup({ title: '', exec: '' })
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
                defaultValue={exec.replaceAll(' && ', '\n')}
                ref={execTextArea}
                onChange={({ target }) => updateExec(target?.value)} />

      <footer className='controls'>
        {dirty &&
        <button className='button'
                onClick={discardChanges}>
          <Icon type='undo' />
          <span>Discard Changes</span>
        </button>}
        <button className='button'
                onClick={deleteCmd}>
          <Icon type='delete' />
          <span>Delete</span>
        </button>
        <button className='button primary'
                onClick={dirty ? applyChanges : run}>
          {dirty && <Icon type='save' />}
          {!dirty && <Icon type='run' />}
          <span>{dirty ? 'Save Changes' : 'Execute'}</span>
        </button>
      </footer>
    </div>
  )
}

export default ScriptEditor
