import Image from 'next/image'
import Link from 'next/link'

import tee from '../assets/logo.svg'

export function Product() {
  return (
    <Link
      className="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[linear-gradient(180deg,#1ea483_0%,#7465d4_100%)] p-1"
      href="#"
    >
      <Image
        priority
        src={tee}
        width={520}
        height={480}
        alt=""
        className="object-cover"
      />
      <footer className="absolute inset-x-1 bottom-1 flex translate-y-[110%] items-center justify-between rounded-md bg-black/60 p-8 opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
        <strong className="text-lg">Tee X</strong>
        <span className="text-xl font-bold text-green-300">$79,90</span>
      </footer>
    </Link>
  )
}
