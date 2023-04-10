'use client'
import type { UploadListResult } from '@w3ui/uploads-list-core'
import { UploadsList } from '@w3ui/react-uploads-list'
import Loader from '@/components/Loader'
import PredictionLink from '@/components/PredictionLink'

interface PredictionsProps {
  uploads?: UploadListResult[]
  loading: boolean
}
function Predictions ({ uploads, loading }: PredictionsProps): JSX.Element {
  if (loading) {
    return <Loader />
  } else {
    return (
      <>
        {uploads?.map(({ root }) => (
          <PredictionLink cid={root}>{root.toString()}</PredictionLink>
        ))}
      </>
    )
  }
}

export default function PredictionsList () {
  return (
    <UploadsList>
      {(props) => (
        <div className='mb-5 flex flex-col'>
          <Predictions uploads={props.uploadsList?.[0].data} loading={props.uploadsList?.[0].loading ?? false} />
        </div>
      )}
    </UploadsList>
  )
}