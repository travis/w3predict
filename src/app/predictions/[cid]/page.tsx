'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import Link from 'next/link'

import { hash } from '@/app/util'
import { gatewayHost } from '@/components/services'

export default function CID () {
  const { cid } = useParams()
  const { data: message } = useSWR(
    `https://${cid}.ipfs.${gatewayHost}/`,
    (...args) => fetch(...args).then(res => res.text())
  )

  return (
    <div className='m-auto min-h-screen flex flex-col justify-center items-center text-center bg-black/80 p-12'>
      <h1 className='font-mono font-bold'>{hash(cid)}</h1>
      <p className='my-12'>
        is the sha256 hash of
      </p>
      <h2 className='font-mono font-bold'>{cid}</h2>
      <p className='my-12'>
        which is the unique content ID of the prediction
      </p>
      <pre className='font-bold'>{message}</pre>
      <p className='my-12 max-w-xl'>
        if somebody shared the hash above, it is a mathematical certainty that they either knew the
        prediction text or discovered the content ID or hash through some other means
      </p>
      <Link href='/' className="relative inline-block text-lg group">
        <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-pink-500/50 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className="absolute left-0 w-64 h-64 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-pink-500/50 group-hover:-rotate-180 ease"></span>
          <span className="relative">Make Another Prediction</span>
        </span>
        <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-pink-500/50 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
      </Link>
    </div>
  )
}