import { useState } from 'react'
import { Container } from 'react-bootstrap'
import TeamsModal from '../Home/StatusUpdate/Modals/TeamsModal'


function HistoryItem({ game }) {



    const [showTeamsModal, setShowTeamsModal] = useState(false)

    const date = new Date(game?.session_date).toDateString().split(' ').splice(1, 3).join(' ')
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = new Date(game?.session_date);
    let dayName = days[day.getDay()];

    return (
        <Container className='active-game'>
            <div className='active-game-header'>
                <span>{game?.session_name}</span>
                <span>{date}</span>
            </div>
            <div className='active-game-date'>
                <span>{dayName} |</span>
                <span>{game?.session_time}</span>
            </div>
            <div className='active-game-location'>
                <span>{game?.session_location}</span>
            </div>
            <div className='history-game-score'>
                <span>{game?.teams[0]?.score}</span> : <span> {game?.teams[1]?.score}</span>
            </div>
            <div className='active-game-created-by'>
                <div className='active-game-players'>
                    <div className='active-game-badges'>
                        <span>Room | </span>
                        <span>{game?.session_room}</span>
                    </div>
                    <div
                        className='active-game-badges-status'
                        onClick={() => setShowTeamsModal(true)}
                    >
                        <span>Teams</span>
                    </div>
                </div>
                <span>Hosted by {game?.host.full_name}</span>
            </div>
            <TeamsModal
                show={showTeamsModal}
                onHide={() => setShowTeamsModal(false)}
                game={game}
            />

        </Container >
    )
}

export default HistoryItem
