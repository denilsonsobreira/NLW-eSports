import { useState, useEffect } from 'react'
import './styles/main.css'
import logoImg from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal'

import { useKeenSlider } from 'keen-slider/react'

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}
const animation = { duration: 10000, easing: (t: number) => t }

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [optionsSlider, setOptionsSlider] = useState({})
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 'auto',
      spacing: 10,
    },
    renderMode: "performance",
    // created(s) {
    //   s.moveToIdx(5, true, animation)
    // },
    // updated(s) {
    //   s.moveToIdx(s.track.details.abs + 5, true, animation)
    // },
    // animationEnded(s) {
    //   s.moveToIdx(s.track.details.abs + 5, true, animation)
    // },
  })

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
        // setOptionsSlider()
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlwGradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div ref={ref} className="grid grid-cols-6 mt-16 keen-slider max-w-6xl">
        {games.map(game => {
          return (
            <div key={game.id} className="keen-slider__slide relative rounded-lg overflow-hidden">
              <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
            </div>
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />

      </Dialog.Root>
    </div>
  )
}

export default App
