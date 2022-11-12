import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { chunkArray, shuffle } from '../../../../utilities/status-utils.js'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import TopMemberList from '../TopMemberList'
import TeamItem from '../TeamItem'
import { fillSessionData } from '../../../../Redux/Actions/actions.js'
import DropGameModal from './DropGameModal.jsx'
import EndGameModal from './EndGameModal.jsx'
import { FunctionContext } from '../CreateContext.js'
import { ClockLoader } from "react-spinners";


function StatusUpdateModal(props) {


    const dispatch = useDispatch()

    // S T A T E S
    const [teamValue, setTeamValue] = useState(0)
    const [teams, setTeams] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [endGameModalShow, setEndGameModalShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { game, token } = props
    const confirmedTeams = game.teams
    const teamsAreConfirmed = confirmedTeams.length > 0
    const teamsAreSet = teams.length > 0


    const handleGenerate = () => {
        if (teams.length > 1 && teamValue !== teams.length) {
            setTeams([])
            setTeams(chunkArray(game.players, teamValue))
        } else {
            setTeams(chunkArray(game.players, teamValue))
        }
    }

    const handleShuffle = () => {
        if (teams.length >= 2) {
            shuffle(game.players)
            setTeams(chunkArray(game.players, teamValue))
        }
    }

    const handleClose = () => {
        props.onHide()
        setTeams([])
        setTeamValue(0)
    }

    const handleClear = () => {
        setTeams([])
        setTeamValue(0)
    }

    const onDragEnd = result => {
        const { destination, source } = result
        if (!destination) {
            return
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        if (destination.droppableId === source.droppableId &&
            destination.index !== source.index) {

            const draggableTeam = teams.find(team => team.team_id === source.droppableId)
            const newTeamPlayers = [...draggableTeam.players]

            const [removed] = newTeamPlayers.splice(source.index, 1)
            newTeamPlayers.splice(destination.index, 0, removed)


            setTeams(teams.map(team => {
                if (team.team_id === source.droppableId) {
                    return { ...team, players: newTeamPlayers }
                }
                return team
            }))
        }

        if (destination.droppableId !== source.droppableId) {
            const draggableTeam = teams.find(team => team.team_id === source.droppableId)
            const droppableTeam = teams.find(team => team.team_id === destination.droppableId)
            const newTeamPlayers = [...draggableTeam.players]
            const newDroppableTeamPlayers = [...droppableTeam.players]
            const [removed] = newTeamPlayers.splice(source.index, 1)
            newDroppableTeamPlayers.splice(destination.index, 0, removed)


            const newTeams = teams.map(team => {
                if (team.team_id === source.droppableId) {
                    return { ...team, players: newTeamPlayers }
                }
                if (team.team_id === destination.droppableId) {
                    return { ...team, players: newDroppableTeamPlayers }
                }
                return team
            })

            setTeams(newTeams)
        }


    }

    const handleConfirmation = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_URL}/players/confirm/${game._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(teams)
            })
            if (response.ok) {
                dispatch(fillSessionData())
                setTimeout(() => {
                    setIsLoading(false)
                    setTeams([])
                }, 400)
            } else {
                setIsLoading(false)
                throw new Error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlePlay = async () => {
        try {
            if (game.playing) {
                setModalShow(true)
            } else {
                setIsLoading(true)
                const response = await fetch(`${process.env.REACT_APP_URL}/players/play/${game._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(teams)
                })
                if (response.ok) {
                    setIsLoading(false)
                    props.onHide()
                    dispatch(fillSessionData())
                } else {
                    setIsLoading(false)
                    throw new Error('Something went wrong')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='status-update-modal'
        >
            {
                isLoading ?
                    <div className='status-update-loader'>
                        <ClockLoader color={"#fff"} size={25} />
                    </div> :
                    <>
                        <Modal.Body>
                            <div className='player-status-container'>
                                {
                                    game.players.map((player) => <TopMemberList
                                        game={game._id}
                                        player={player}
                                        key={player._id}
                                        token={token}
                                    />)
                                }
                            </div>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <div className={`teams-divided`}>
                                    {
                                        (teamsAreConfirmed ? confirmedTeams : teams).map((team, index) => (
                                            <TeamItem
                                                key={team.team_id}
                                                team={team.players}
                                                index={index}
                                                id={team.team_id}
                                            />
                                        ))
                                    }
                                </div>
                            </DragDropContext>
                            {
                                !game.playing &&
                                <div className='player-status-control-line'>
                                    <div className='d-flex'>
                                        {
                                            !teamsAreConfirmed &&
                                            <>
                                                <div className='number-of-teams mr-1'>
                                                    <Form.Group>
                                                        <Form.Control
                                                            as="select"
                                                            size="sm"
                                                            value={teamValue}
                                                            onChange={(e) => setTeamValue(e.target.value)}
                                                        >
                                                            <option>0</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                            <option>6</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </div>
                                                <div className='random-select-button mr-1'>
                                                    <span onClick={handleGenerate}>Generate Teams</span>
                                                </div>
                                            </>
                                        }
                                        {
                                            teamsAreSet &&
                                            <div className='random-select-button mr-1'>
                                                <span onClick={handleShuffle}>Shuffle</span>
                                            </div>
                                        }
                                        {
                                            (teamsAreSet || teamsAreConfirmed) ?
                                                <div className='random-select-button'>
                                                    <span
                                                        onClick={handleConfirmation}
                                                    >{!teamsAreConfirmed ? "Confirm Teams" : "Drop Teams"}</span>
                                                </div> : null
                                        }
                                    </div>
                                    {
                                        (teamsAreSet || teamsAreSet ? !teamsAreConfirmed : null) ?
                                            <div>
                                                <div className='random-select-button'>
                                                    <span onClick={handleClear}>Clear</span>
                                                </div>
                                            </div> : null
                                    }
                                </div>
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <div>
                                {
                                    !teamsAreSet &&
                                    <Button
                                        className='form-button'
                                        onClick={handlePlay}
                                    >
                                        {game.playing ? "Drop" : "Play"}
                                    </Button>
                                }
                                {
                                    game.playing &&
                                    <Button
                                        onClick={() => setEndGameModalShow(true)}
                                        className='form-button'>
                                        End game
                                    </Button>
                                }
                            </div>
                            <Button
                                className='form-button'
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                        <FunctionContext.Provider value={handleClose}>
                            <DropGameModal
                                onHide={() => setModalShow(false)}
                                show={modalShow}
                                game={game}
                                token={token}
                            />
                            <EndGameModal
                                onHide={() => setEndGameModalShow(false)}
                                show={endGameModalShow}
                                game={game}
                                token={token}
                            />
                        </FunctionContext.Provider>
                    </>
            }
        </Modal >
    )
}

export default StatusUpdateModal
