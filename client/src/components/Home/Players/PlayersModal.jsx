import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { IoShirtSharp } from 'react-icons/io5'

function PlayersModal(props) {

    const { players } = props

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='player-modal'
        >
            <Modal.Body>
                <div className='players-joined'>
                    {
                        players && players.map(player => (
                            <div key={player._id} className='players-joined-item'>
                                <span><IoShirtSharp /></span>
                                <span>{player.full_name}</span>
                            </div>
                        ))
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='form-button' onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PlayersModal
