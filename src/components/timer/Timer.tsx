import React, { useEffect, useState } from 'react'
import { StartButton, StopButton } from './Buttons'
import * as C from './TimerStyled'

const fixTimeUnits = (units: number) => units < 10 ? `0${units}` : units

function formatTime(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60)
  const seconds = timeInSeconds % 60

  return (`${fixTimeUnits(minutes)} : ${fixTimeUnits(seconds)}`)
}

const Timer = () => {
  console.log('Timer render')
  const [start, setStart] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const label = formatTime(seconds)

  useEffect(() => {
    if(!start) return
    formatTime(seconds)

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [seconds, start])

  return (
    <C.Container>
      <C.Label>
        {label}
      </C.Label>

      {!start && <StartButton onClick={() => setStart(true)} />}
      {start && <StopButton onClick={() => setStart(false)}/>}
    </C.Container>
  )
}

export default Timer