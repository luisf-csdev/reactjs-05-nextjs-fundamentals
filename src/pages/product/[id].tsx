import axios from 'axios'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import type Stripe from 'stripe'

import { stripe } from '@/lib/stripe'

const ONE_HOUR_IN_SECONDS = 60 * 60 * 1

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: 'prod_T50AlRiqVVJSW1' },
      },
    ],
    fallback: 'blocking',
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: ONE_HOUR_IN_SECONDS,
  }
}

type ProductProps = {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      // Connect with some observability tool (Datadog / Sentry )
      setIsCreatingCheckoutSession(false)
      console.error('Failed while redirecting to checkout', err)
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <div className="mx-auto grid max-w-[1180px] grid-cols-2 items-stretch gap-16">
        <div className="flex h-[656px] w-full max-w-[576px] items-center justify-center rounded-md bg-[linear-gradient(180deg,#1ea483_0%,#7465d4_100%)] p-1">
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt=""
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-300">{product.name}</h1>
          <span className="mt-4 block text-2xl text-green-300">
            {product.price}
          </span>

          <p className="text-md mt-10 leading-[1.6] text-gray-300">
            {product.description}
          </p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
            className="text-md hover:not-[disabled]:bg-green-300 mt-auto cursor-pointer rounded-md border-0 bg-green-500 p-5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Buy now
          </button>
        </div>
      </div>
    </>
  )
}
