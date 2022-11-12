import React, { useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { fillHistoryData, fillSessionData } from '../../../../Redux/Actions/actions'
import { FunctionContext } from '../CreateContext.js'

function DropGameModal(props) {

    const initialState = {
        team_1_score: 0,
        team_2_score: 0,
    }

    const { game, token } = props


    const dispatch = useDispatch()
    const handleClose = useContext(FunctionContext)


    const [endGame, setEndGame] = useState(false)
    const [score, setScore] = useState(initialState)


    const handleEndGame = async () => {
        try {

            const response = await fetch(`${process.env.REACT_APP_URL}/players/overtime/${game._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(score)
            })
            if (response.ok) {
                dispatch(fillSessionData())
                dispatch(fillHistoryData())
                props.onHide()
                handleClose()
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleMolalClose = () => {
        props.onHide()
        setEndGame(false)
        setScore(initialState)
    }


    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className='active-game-delete-modal'>
                    {
                        endGame
                            ?
                            <>
                                <span>What was the score?</span>
                                <div className='active-game-delete-modal-score-container'>
                                    {
                                        game.teams.map((team, index) => (
                                            <div key={team.team_id} className='active-game-delete-modal-score'>
                                                <span> {`Team ${team.team_id}`} </span>
                                                <span>
                                                    <input
                                                        type="text"
                                                        value={score[`team_${team.team_id}_score`]}
                                                        onChange={(e) => setScore({ ...score, [`team_${team.team_id}_score`]: e.target.value })}
                                                    />
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                                < div className='delete-modal-buttons'>
                                    <span onClick={handleEndGame}>Confirm</span>
                                    <span onClick={handleMolalClose} > Cancel</span>
                                </div>
                            </>
                            :
                            <>
                                <span>
                                    Are you sure you want to end the game?
                                </span>
                                < div className='delete-modal-buttons'>
                                    <span onClick={() => setEndGame(true)}>Yes</span>
                                    <span onClick={props.onHide}>No</span>
                                </div>
                            </>
                    }
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default DropGameModal
