import { Product } from '../components/product'

export default function Home() {
  return (
    <div className="max-w-[calc(100vw-((100vw-1180px)/2)))] ml-auto flex min-h-[656px] w-full gap-12">
      <Product />
      <Product />
    </div>
  )
}
