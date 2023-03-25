import React from 'react'

export const StartButton = ({onClick}:{onClick:() => void}) => {
  return (
    <button onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.13,104.13,0,0,0,128,24Zm36.44,110.66-48,32A8.05,8.05,0,0,1,112,168a8,8,0,0,1-8-8V96a8,8,0,0,1,12.44-6.66l48,32a8,8,0,0,1,0,13.32Z"></path></svg>
    </button>
  )
}

export const StopButton = ({onClick}:{onClick:() => void}) => {
  return (
    <button onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.13,104.13,0,0,0,128,24ZM112,160a8,8,0,0,1-16,0V96a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V96a8,8,0,0,1,16,0Z"></path></svg>
    </button>
  )
}
