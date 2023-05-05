"use client"

import { useKeyring } from '@w3ui/react-keyring'
import { SpaceCreatorForm } from './SpaceCreator'
import { SpaceRegistrar } from './SpaceRegistrar'

export function SpaceEnsurer ({
  children
}: {
  children: JSX.Element | JSX.Element[]
}): JSX.Element {
  const [{ space, account }] = useKeyring()
  if (space && space.registered()) {
    return <>{children}</>
  } else if (space) {
    return <SpaceRegistrar />
  } else {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-black text-center">
          <h1 className="my-4 text-lg">Welcome {account}!</h1>
          <p>
            To get started with w3predict you will need to create a space.
          </p>
          <p>
            Give it a name and hit create!
          </p>
          <SpaceCreatorForm className='mt-4' />
        </div>
      </div>
    )
  }
}
