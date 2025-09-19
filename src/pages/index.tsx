import type { GetStaticProps } from 'next'
import type Stripe from 'stripe'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { stripe } from '@/lib/stripe'

import { ProductLink } from '../components/product-link'

const TWO_HOURS_IN_SECONDS = 60 * 60 * 2

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: TWO_HOURS_IN_SECONDS,
  }
}

type HomeProps = {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  return (
    <div className="w-full max-w-full overflow-hidden">
      <Carousel className="max-w-[calc(100vw-((100vw-1180px)/2)))] ml-auto flex min-h-[656px] w-full *:overflow-visible">
        <CarouselContent className="ml-0 h-full w-[696px] max-w-full gap-12">
          {products.map((product) => (
            <CarouselItem className="pl-0" key={product.id}>
              <ProductLink product={product} className="h-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
