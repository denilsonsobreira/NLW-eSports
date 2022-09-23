import { FormEvent, useEffect, useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController, WarningCircle } from 'phosphor-react'
import { Input } from './Form/Input'
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Game {
    id: string,
    title: string,
    bannerUrl: string,
    _count: {
        ads: number
    }
}
interface FormAd {
    game: string
    name: string
    discord: string
    yearsPlaying: string
    hourStart: string
    hourEnd: string
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormAd>()
    const onsubmit = async (data: FormAd) => {
        //alert('data: ' + JSON.stringify(data));
        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                discord: data.discord,
                weekDays: weekDays.map(Number),
                yearsPlaying: Number(data.yearsPlaying),
                useVoiceChannel: useVoiceChannel,
                hoursStart: data.hourStart,
                hourEnd: data.hourEnd
            })
            alert('Anúncio criado com sucesso!')
        } catch (error) {
            console.log(error)
            alert('Erro ao criar anuncio')
        }
    };

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])
    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        console.log(data)
        console.log(weekDays)

        // try {
        //     await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        //         name: data.name,
        //         discord: data.discord,
        //         weekDays: weekDays.map(Number),
        //         yearsPlaying: Number(data.yearsPlaying),
        //         useVoiceChannel: useVoiceChannel,
        //         hoursStart: data.hourStart,
        //         hourEnd: data.hourEnd
        //     })
        //     alert('Anúncio criado com sucesso!')
        // } catch (error) {   
        //     console.log(error)
        //     alert('Erro ao criar anuncio')
        // }
    }
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
                {/* <form className="mt-8 flex flex-col gap-4" onSubmit={handleCreateAd}> */}
                <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit(onsubmit)}>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">Qual o game?</label>
                        <select id="game" className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none" defaultValue=""
                            {...register("game",{})}
                        >
                            <option value="" disabled >Selecione o game que deseja jogar</option>
                            {games.map(game => {
                                return <option key={game.id} value={game.id}>{game.title}</option>
                            })}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input type="input" placeholder="Como te chamam dentro do game?" className=""
                            {...register("name", { required: true, maxLength: 100 })}
                        />
                        {errors?.name?.type === "required" &&
                            <p className="flex items-center text-red-600"> <WarningCircle color="red" size={20} /> Este campo é obrigatório</p>
                        }
                        {errors?.name?.type === "maxLength" && (
                            <p className="flex items-center text-red-600"><WarningCircle color="red" size={20} /> Nome não pode ultrapassar 100 caracteres</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                            <Input id="yearsPlaying" placeholder="Tudo bem ser ZERO" type="number"
                                {...register("yearsPlaying", { pattern: /^(0|[1-9]\d*)(\.\d+)?$/ })}
                            />
                            {
                                errors.yearsPlaying?.type === "pattern" &&
                                <p className="flex items-center text-red-600 text-sm"><WarningCircle color="red" size={16} />Deve ser maior que 0</p>
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual seu discord?</label>
                            <Input id="discord" placeholder="Usuario#0000" type="input" 
                                {...register("discord",{})}
                            />
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays">Quando costuma jogar?</label>

                            <ToggleGroup.Root type="multiple" className="grid grid-cols-4 gap-1" onValueChange={setWeekDays} value={weekDays}>
                                <ToggleGroup.Item value="0" title="Domingo" className={`w-7 h-7 rounded  ${weekDays.includes("0") ? 'bg-violet-500' : 'bg-zinc-900'}`}   >D</ToggleGroup.Item>
                                <ToggleGroup.Item value="1" title="Segunda" className={`w-7 h-7 rounded  ${weekDays.includes("1") ? 'bg-violet-500' : 'bg-zinc-900'}`}   >S</ToggleGroup.Item>
                                <ToggleGroup.Item value="2" title="Terça" className={`w-7 h-7 rounded  ${weekDays.includes("2") ? 'bg-violet-500' : 'bg-zinc-900'}`}   >T</ToggleGroup.Item>
                                <ToggleGroup.Item value="3" title="Quarta" className={`w-7 h-7 rounded  ${weekDays.includes("3") ? 'bg-violet-500' : 'bg-zinc-900'}`}   >Q</ToggleGroup.Item>
                                <ToggleGroup.Item value="4" title="Quinta" className={`w-7 h-7 rounded  ${weekDays.includes("4") ? 'bg-violet-500' : 'bg-zinc-900'}`}   >Q</ToggleGroup.Item>
                                <ToggleGroup.Item value="5" title="Sexta" className={`w-7 h-7 rounded  ${weekDays.includes("5") ? 'bg-violet-500' : 'bg-zinc-900'}`}   >S</ToggleGroup.Item>
                                <ToggleGroup.Item value="6" title="Sábado" className={`w-7 h-7 rounded  ${weekDays.includes("6") ? 'bg-violet-500' : 'bg-zinc-900'}`}   >S</ToggleGroup.Item>
                            </ToggleGroup.Root>

                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart">Qual horário do dia?</label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input type="time" placeholder="De" id="hourStart"  {...register("hourStart",{})}/>
                                <Input type="time" placeholder="Até" id="hourEnd" {...register("hourEnd",{})} />
                            </div>

                        </div>
                    </div>

                    <label className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                            onCheckedChange={(checked) => checked === true ? setUseVoiceChannel(true) : setUseVoiceChannel(false)}
                            checked={useVoiceChannel}
                        >
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label htmlFor="useVoiceChannel">Costumo me conectar ao chat de voz</label>
                    </label>

                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                        <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" >
                            <GameController size={24} /> Encontrar duo
                        </button>
                    </footer>

                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}