import Link from 'next/link'
import { hash } from '@/app/util'

export default function PredictionLink ({ className = 'text-blue-500 underline', cid, children }: { className?: string, cid: any, children: string | JSX.Element | JSX.Element[] }) {
  return (
    <Link className={className} href={`/predictions/${cid.toString()}`}>{children}</Link>
  )
}