import Link from 'next/link'
import { hash } from '@/app/util'

export default function PredictionLink ({ className = 'overflow-hidden text-ellipsis hover:text-pink-200', cid, children }: { className?: string, cid: any, children: string | JSX.Element | JSX.Element[] }) {
  return (
    <Link className={className} href={`/predictions/${cid.toString()}`}>{children}</Link>
  )
}