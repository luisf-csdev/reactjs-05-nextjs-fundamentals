import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import type Stripe from 'stripe'

import { stripe } from '@/lib/stripe'

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const rawSessionId = query.session_id
  if (!rawSessionId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(rawSessionId)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }
}

type SuccessProps = {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Purchase made | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="mx-auto flex h-[656px] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-100">Purchase made!</h1>

        <div className="mt-16 flex h-[145px] w-full max-w-[130px] items-center justify-center rounded-md bg-[linear-gradient(180deg,#1ea483_0%,#7465d4_100%)] p-1">
          <Image
            className="object-cover"
            src={product.imageUrl}
            width={120}
            height={110}
            alt=""
          />
        </div>

        <p className="mt-8 max-w-[560px] text-center text-xl leading-[1.4] text-gray-300">
          Woohoo <strong>{customerName}</strong>, your{' '}
          <strong>{product.name}</strong> is on its way to your house!
        </p>

        <Link
          className="mt-20 block text-lg font-bold text-green-500 hover:text-green-300"
          href="/"
        >
          Back to catalog
        </Link>
      </div>
    </>
  )
}
