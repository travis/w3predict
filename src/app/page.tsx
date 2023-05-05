import { AuthenticationEnsurer } from '@/components/Authenticator'
import { PredictionCreator } from '@/components/PredictionCreator'
import PredictionsList from '@/components/PredictionsList'
import { SpaceEnsurer } from '@/components/SpaceEnsurer'

export default function Home () {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <AuthenticationEnsurer>
        <SpaceEnsurer>
          <div className='bg-black/30 p-12 rounded w-4/5 flex flex-col space-y-8'>
            <PredictionCreator />
            <PredictionsList />
          </div>
        </SpaceEnsurer>
      </AuthenticationEnsurer>
    </main >
  )
}
