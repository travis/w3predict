import type { ChangeEvent } from 'react'

import React, { useState } from 'react'
import { useKeyring } from '@w3ui/react-keyring'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import Loader from '../components/Loader'

export function SpaceCreatorCreating (): JSX.Element {
  return (
    <div className='flex flex-col items-center space-y-4'>
      <h5>Creating Space...</h5>
      <Loader className='w-6' />
    </div>
  )
}

interface SpaceCreatorFormProps {
  className?: string
}

export function SpaceCreatorForm ({
  className = ''
}: SpaceCreatorFormProps): JSX.Element {
  const [{ account }, { createSpace, registerSpace }] = useKeyring()
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')

  function resetForm (): void {
    setName('')
  }

  async function onSubmit (e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (account) {
      setSubmitted(true)
      try {
        await createSpace(name)
        await registerSpace(account)
      } catch (error) {
        /* eslint-disable no-console */
        console.error(error)
        /* eslint-enable no-console */
        throw new Error('failed to register', { cause: error })
      } finally {
        resetForm()
        setSubmitted(false)
      }
    } else {
      throw new Error('cannot create space, no account found, have you authorized your email?')
    }
  }
  return (
    <div className={className}>
      {
        submitted
          ? (
            <SpaceCreatorCreating />
          )
          : (
            <form
              className='flex flex-col items-center space-y-2'
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                void onSubmit(e)
              }}
            >
              <input
                className='text-black py-1 px-2 rounded w-full'
                placeholder='Name'
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value)
                }}
              />
              <button type='submit' className="relative inline-block text-lg group">
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-pink-500/50 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-32 h-32 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-pink-500/50 group-hover:-rotate-180 ease"></span>
                  <span className="relative">Create</span>
                </span>
                <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-pink-500/50 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
              </button>
            </form>
          )
      }
    </div>
  )
}

interface SpaceCreatorProps {
  className?: string
}

export function SpaceCreator ({
  className = ''
}: SpaceCreatorProps): JSX.Element {
  const [creating, setCreating] = useState(false)

  return (
    <div className={`${className}`}>
      {creating
        ? (
          <SpaceCreatorForm />
        )
        : (
          <button
            className='w3ui-button py-2'
            onClick={() => { setCreating(true) }}
          >
            Add Space
          </button>
        )}
    </div>
  )
  /* eslint-enable no-nested-ternary */
}
