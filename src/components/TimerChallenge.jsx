import React, { useRef, useState } from 'react'
import ResultModel from './ResultModel'

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef()
    const dialog = useRef()
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)

    const timerIsActive = targetTime > 0 && timeRemaining < targetTime * 1000

    if (timeRemaining <= 0) {
        clearInterval(timer.current)
        dialog.current.open()
    }

    const handleReset = () => {
        setTimeRemaining(targetTime * 1000)
    }

    const handleStart = () => {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
        }, 10)
    }

    const hansleStop = () => {
        dialog.current.open()
        clearInterval(timer.current)
    }
    return (
        <>
            <ResultModel
                ref={dialog}
                targetTime={targetTime}
                remainingTime={timeRemaining}
                onReset={handleReset}
            />
            <section className='challenge'>
                <h2>{title}</h2>
                <p className='challenge-time'>
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? hansleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}
