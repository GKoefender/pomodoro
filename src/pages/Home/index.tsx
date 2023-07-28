import { HandPalm, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'

import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles'
import { NewCycleForm } from './NewCycleForms'
import { CountDown } from './CountDown'

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
        } else {
          setActiveCycleId(null)
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
        <NewCycleForm />
        <CountDown />

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
