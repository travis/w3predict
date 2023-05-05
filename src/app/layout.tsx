import Providers from '@/components/Providers'
import './globals.css'

export const metadata = {
  title: 'w3predict',
  description: 'the future is ours to see',
}

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body className='text-gray-100 bg-robot bg-fixed bg-cover'>{children}</body>
      </Providers>
    </html>
  )
}
