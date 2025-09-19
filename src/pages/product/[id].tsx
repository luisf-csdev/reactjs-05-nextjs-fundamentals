import Image from 'next/image'

// import { useRouter } from 'next/router'
import logoImg from '@/assets/logo.svg'

export default function Product() {
  // const { query } = useRouter()

  return (
    <div className="mx-auto grid max-w-[1180px] grid-cols-2 items-stretch gap-16">
      <div className="flex h-[656px] w-full max-w-[576px] items-center justify-center rounded-md bg-[linear-gradient(180deg,#1ea483_0%,#7465d4_100%)] p-1">
        <Image
          src={logoImg}
          width={520}
          height={480}
          alt=""
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-300">Tee X</h1>
        <span className="mt-4 block text-2xl text-green-300">$19.90</span>

        <p className="text-md mt-10 leading-[1.6] text-gray-300">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. In cum
          itaque, asperiores inventore doloremque enim veritatis ipsam
          laboriosam quidem, sequi quod qui, magnam nostrum mollitia? Officiis
          labore eligendi quas non?
        </p>

        <button className="text-md mt-auto cursor-pointer rounded-md border-0 bg-green-500 p-5 font-bold text-white hover:bg-green-300">
          Buy now
        </button>
      </div>
    </div>
  )
}
