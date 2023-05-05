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
      <div className="w-full flex flex-col items-center space-y-8">
        <textarea autoFocus value={currentValue}
          className='shadow-inner rounded w-full p-8 text-2xl text-white font-bold bg-transparent backdrop-blur-lg focus:ring-0 focus:ring-offset-0 focus:outline-pink-500'
          onChange={(e) => setCurrentValue(e.target.value)} />
        {saving ? (
          <Loader className='w-16 h-16 text-white' />
        ) : (
          <button onClick={() => saveNote()} className="relative inline-block text-lg group">
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-pink-500/50 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-pink-500/50 group-hover:-rotate-180 ease"></span>
              <span className="relative">Predict it!</span>
            </span>
            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-pink-500/50 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
          </button>
          // <button onClick={() => saveNote()}
          //   className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-lg font-black tracking-widest rounded group bg-gradient-to-br from-pink-300 to-blue-300 group-hover:from-blue-300 group-hover:to-pink-300 text-white focus:ring-4 focus:outline-none">
          //   <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900/30 rounded-md group-hover:bg-transparent">
          //     Predict it!
          //   </span>
          // </button>
        )}
      </div >
      {savedCID && (
        <div className='text-center text-white text-xl overflow-hidden text-ellipsis max-w-sm'>
          <h3>Saved</h3>
          <pre>{savedValue}</pre>
          <h3>as</h3>
          <PredictionLink className="overflow-hidden text-ellipsis hover:text-pink-200 text-5xl font-bold" cid={savedCID}>{savedCID}</PredictionLink>
        </div>
      )}
    </div >
  )
}
