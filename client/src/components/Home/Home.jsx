import './style.css'
import React from 'react'
import { useSelector } from 'react-redux'
import ActiveGames from './ActiveGames'
import NewGame from './CreateGame/NewGame'

function Home() {

    const activeGames = useSelector(state => state.sessions.data)
    const gamesInHistory = useSelector(state => state.history.data)

    return (
        <div className='home'>
            {
                gamesInHistory.length > 0 ?
                    activeGames
                        ?.filter(session => gamesInHistory
                            ?.find(item => item.session._id === session._id) === undefined)
                        .map(newGame => <ActiveGames key={newGame._id} game={newGame} />) :
                    activeGames.map(newGame => <ActiveGames key={newGame._id} game={newGame} />)
            }
            <NewGame />
        </div>
    )
}

export default Home
