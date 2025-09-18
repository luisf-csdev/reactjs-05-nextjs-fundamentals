import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

import { Product } from '../components/product'

export default function Home() {
  return (
    <div className="w-full max-w-full overflow-hidden">
      <Carousel className="max-w-[calc(100vw-((100vw-1180px)/2)))] ml-auto flex min-h-[656px] w-full *:overflow-visible">
        <CarouselContent className="ml-0 h-full w-[696px] max-w-full gap-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <CarouselItem className="pl-0" key={i}>
              <Product className="h-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
