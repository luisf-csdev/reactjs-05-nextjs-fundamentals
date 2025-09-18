import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import Image from 'next/image'

import logoImg from '../assets/logo.svg'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-svh flex-col items-start justify-center">
      <header className="mx-auto mb-8 w-full max-w-[1180px] pt-8">
        <Image priority src={logoImg} width={130} alt="" />
      </header>

      <Component {...pageProps} />
    </div>
  )
}
