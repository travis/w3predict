"use client"

import {
  Authenticator as AuthCore,
  useAuthenticator
} from '@w3ui/react-keyring'
import { Logo } from './brand'
import Loader from './Loader'

export function AuthenticationForm (): JSX.Element {
  const [{ email, submitted }] = useAuthenticator()
  console.log(email)
  return (
    <div className='authenticator'>
      <AuthCore.Form className='text-white/80 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-md px-10 pt-8 pb-8'>
        <div className='flex flex-row gap-4 mb-8 flex justify-center gap-4'>
          <Logo />
        </div>
        <div>
          <label className='block mb-2 uppercase text-xs font-semibold tracking-wider m-1 font-mono' htmlFor='authenticator-email'>Email</label>
          <AuthCore.EmailInput className='block rounded-md p-2 w-80 bg-white text-black shadow-md' id='authenticator-email' required />
        </div>
        <button
          className='mt-2 bg-white/0 w-full hover:bg-blue-800 rounded-md w-full text-sm font-medium py-2 px-8 transition-colors ease-in'
          type='submit'
          disabled={submitted}
        >
          Authorize
        </button>
      </AuthCore.Form>
    </div >
  )
}

export function AuthenticationSubmitted (): JSX.Element {
  const [{ email }] = useAuthenticator()

  return (
    <div className='authenticator'>
      <div className='text-white bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-md px-10 pt-8 pb-8'>
        <div className='flex flex-row gap-4 mb-8 flex justify-center gap-4'>
          <Logo className='w-36' />
        </div>
        <h1 className='text-xl font-semibold'>Verify your email address!</h1>
        <p className='pt-2 pb-4'>
          Click the link in the email we sent to <span className='font-semibold tracking-wide'>{email}</span> to authorize this agent.
        </p>
        <AuthCore.CancelButton className='w3ui-button hidden' >
          Cancel
        </AuthCore.CancelButton>
      </div>
    </div>
  )
}

export function AuthenticationEnsurer ({
  children
}: {
  children: JSX.Element | JSX.Element[]
}): JSX.Element {
  const [{ submitted, account, agent }] = useAuthenticator()
  const authenticated = !!account
  if (authenticated) {
    return <>{children}</>
  }
  if (submitted) {
    return <AuthenticationSubmitted />
  }
  if (agent) {
    return <AuthenticationForm />
  }
  return <Loader className='w-16 h-16'/>
}


