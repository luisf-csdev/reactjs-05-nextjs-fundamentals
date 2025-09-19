import Image from 'next/image'
import Link from 'next/link'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/shadcn'

type ProductProps = ComponentProps<'a'> & {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
  }
}

export function Product({ className, product, ...props }: ProductProps) {
  return (
    <Link
      className={cn(
        'group relative flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[linear-gradient(180deg,#1ea483_0%,#7465d4_100%)] p-1',
        className,
      )}
      href={`/product/${product.id}`}
      {...props}
    >
      <Image
        priority
        src={product.imageUrl}
        width={480}
        height={480}
        alt=""
        className="object-cover"
      />
      <footer className="absolute inset-x-1 bottom-1 flex translate-y-[110%] items-center justify-between rounded-md bg-black/60 p-8 opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
        <strong className="text-lg">{product.name}</strong>
        <span className="text-xl font-bold text-green-300">
          {product.price}
        </span>
      </footer>
    </Link>
  )
}
