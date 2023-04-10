import { AuthenticationEnsurer } from '@/components/Authenticator'
import { PredictionCreator } from '@/components/PredictionCreator'
import PredictionsList from '@/components/PredictionsList'

export default function Home () {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthenticationEnsurer>
        <PredictionCreator />
        <PredictionsList />
      </AuthenticationEnsurer>
    </main >
  )
}
