'use client'

import { useState } from 'react'
import { useUploader } from '@w3ui/react-uploader'
import Loader from './Loader'
import { useUploadsList } from '@w3ui/react-uploads-list'
import PredictionLink from './PredictionLink'

export function PredictionCreator () {
  const [_1, { uploadFile }] = useUploader()
  const [_2, { reload }] = useUploadsList()
  const [currentValue, setCurrentValue] = useState<string>()
  const [saving, setSaving] = useState<boolean>(false)
  const [savedValue, setSavedValue] = useState<string>()
  const [savedCID, setSavedCID] = useState<string>()
  async function saveNote () {
    console.log("saving", currentValue)
    setSaving(true)
    const cid = await uploadFile(new Blob([`${currentValue}`]))
    console.log(`saved as ${cid}`)
    setSavedCID(cid.toString())
    setSavedValue(currentValue)
    reload()
    setCurrentValue('')
    setSaving(false)
  }
  return (
    <div className="flex flex-col items-center space-y-4 text-gray-700">
      <div className="w-full flex flex-col items-center space-y-4">
        <textarea value={currentValue} className='shadow-inner rounded w-96 p-8' onChange={(e) => setCurrentValue(e.target.value)} />
        {saving ? (
          <Loader className='w-8 h-8' />
        ) : (
          <button onClick={() => saveNote()}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-300 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Predict it!
            </span>
          </button>
        )}
      </div >
      {savedCID && (
        <div className='text-center'>
          <h3>Saved</h3>
          <pre>{savedValue}</pre>
          <h3>as</h3>
          <PredictionLink cid={savedCID}>{savedCID}</PredictionLink>
        </div>
      )}
    </div >
  )
}
