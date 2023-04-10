'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'

import { hash } from '@/app/util'
import { gatewayHost } from '@/components/services'

export default function CID () {
  const { cid } = useParams()
  const { data: message } = useSWR(
    `https://${cid}.ipfs.${gatewayHost}/`,
    (...args) => fetch(...args).then(res => res.text())
  )
  //console.log(res.data)
  //const message = "foo"
  return (
    <div className='m-auto max-w-xl min-h-screen flex flex-col justify-center items-center text-center'>
      <h1 className='font-mono'>{hash(cid)}</h1>
      <p className='my-12'>
        is the sha256 hash of 
      </p>
      <h2 className='font-mono'>{cid}</h2>
      <p className='my-12'>
        which is the unique content ID of the prediction
      </p>
      <pre>{message}</pre>
      <p className='my-12'>
        if somebody shared the hash above, it is a mathematical certainty that they either knew the 
        prediction or discovered the content ID or hash through some other means
      </p>
    </div>
  )
}