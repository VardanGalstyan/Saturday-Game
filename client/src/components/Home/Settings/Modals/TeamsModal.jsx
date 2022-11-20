import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { IoShirtSharp } from 'react-icons/io5'

function TeamsModal({ game, ...props }) {


    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='player-modal'
        >
            <Modal.Body>
                <div className='teams-confirmed players-joined'>
                    {
                        game?.teams?.length > 0 ? game?.teams?.map(team => (
                            <div key={team.team_id} className='single-team-confirmed'>
                                <span >{`Team ${team.team_id}`}</span>
                                <div className='single-team-players'>
                                    {
                                        team.players.map(player => (
                                            <div key={player._id} className={`${team.team_id === '1' ? 'team-blue' : "team-purple"}`}>
                                                <span><IoShirtSharp /></span>
                                                <span>{player.full_name}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                            : <span> no teams assigned yet!</span>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='form-button' onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default TeamsModal
