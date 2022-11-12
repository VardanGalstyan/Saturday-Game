import React from 'react';
import { useStopwatch } from 'react-timer-hook';

function MyTimer({ game }) {

    const date = game.session_date.split('T')[0]
    const time = game.session_time
    const newDate = `${date}T${time}`
    const sessionDate = new Date(newDate)
    const sessionEpochDay = Math.floor(sessionDate / 1000)
    const currentEpochDay = Math.floor(new Date() / 1000)
    const stopwatchOffset = new Date()
    const timeDifference = currentEpochDay - sessionEpochDay
    stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + timeDifference)

    const {
        seconds,
        minutes,
        hours,
        // isRunning,
        // start,
        // reset,
        // pause,
    } = useStopwatch({ autoStart: true, offsetTimestamp: stopwatchOffset });


    // const handleStop = () => {
    //     pause()
    // }


    const secondsArray = seconds.toString().split('')
    const minutesArray = minutes.toString().split('')
    const hoursArray = hours.toString().split('')

    // const sessionDuration = `${hours} hrs ${minutes} min`


    return (
        <div className='timer-container mb-3'>
            <div className='timer-items-holder'>
                <span>{hoursArray[1] ? hoursArray[0] : 0}</span><span>{hoursArray[1] ? hoursArray[1] : hoursArray[0]}</span> :
                <span>{minutesArray[1] ? minutesArray[0] : 0}</span><span>{minutesArray[1] ? minutesArray[1] : minutesArray[0]}</span> :
                <span>{secondsArray[1] ? secondsArray[0] : 0}</span><span>{secondsArray[1] ? secondsArray[1] : secondsArray[0]}</span>
            </div>
            {
                /* <p>{isRunning ? 'Running' : 'Paused'}</p>
                <button onClick={start}>Start</button>
                <button onClick={handleStop}>Pause</button>
                <button onClick={reset}>Reset</button> */
            }
        </div>
    );
}

export default MyTimer