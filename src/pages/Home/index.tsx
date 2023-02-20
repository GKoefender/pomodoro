import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

import { HomeContainer, FormContainer, CountDownContainer, Separator, StartCountdownButton, MinutesAmountInput, TaskInput, StopCountdownButton } from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5, 'O cliclo precisa ser de no mínimo 5 minutos.').max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  interruptedDate?: Date
}

const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [currentMinutes, setCurrentMinutes] = useState(0)
  const minutes = activeCycleId === null ? '00' : currentMinutes.toString().padStart(2, '0')
  const seconds = activeCycleId === null ? '00' : currentSeconds.toString().padStart(2, '0')

  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  useEffect(() => {
    if (activeCycle != null) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds])

  useEffect(() => {
    setTimeout(() => {
      if (activeCycleId !== null) {
        if (currentSeconds !== 0 || currentMinutes !== 0) {
          if (currentSeconds === 0) {
            setCurrentSeconds(59)
            setCurrentMinutes(state => state - 1)
          } else {
            setCurrentSeconds(state => state - 1)
          }
        }
      }
    }, 1000)
  }, [activeCycleId, currentSeconds, currentMinutes])

  const handleCreateNewCycle = (data: newCycleFormData) => {
    const newCycleId = String(new Date().getTime())

    const newCycle: Cycle = {
      id: newCycleId,
      task: data.task,
      minutesAmount: data.minutesAmount
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycleId)

    setCurrentMinutes(newCycle.minutesAmount)
    setCurrentSeconds(0)

    reset()
  }

  function handleInterruptCycle () {
    setCycles(cycles.map(cycle => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle
      }
    }))

    setActiveCycleId(null)
  }

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const task = watch('task')
  const isSubmitDisabled = task.length === 0

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para seu projeto"
            list="task-suggestions"
            disabled={!(activeCycle == null)}
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
           type="number"
           id="minutesAmount"
           placeholder="00"
           step={5}
           min={0}
           max={60}
           disabled={!(activeCycle == null) }
           {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
          <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>

      {(activeCycle != null)
        ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
          <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
          )
        : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
            Começar
          </StartCountdownButton>
          )}
      </form>
    </HomeContainer>
  )
}

export { Home }
