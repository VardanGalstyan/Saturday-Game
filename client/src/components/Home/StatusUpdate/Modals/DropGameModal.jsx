import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { fillSessionData } from '../../../../Redux/Actions/actions'
import {FunctionContext} from '../CreateContext.js'

function EndGameModal(props) {

    const game = props.game
    const token = props.token
    const dispatch = useDispatch()
    const handleClose = useContext(FunctionContext)


    const handlePlay = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/players/play/${game._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            if (response.ok) {
                props.onHide()
                dispatch(fillSessionData())
                handleClose()
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error) {
            console.log(error)
        }
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
                    <span>
                        Are you sure you want to drop the game?
                    </span>
                    <div className='delete-modal-buttons'>
                        <span onClick={handlePlay}>Yes</span>
                        <span onClick={props.onHide}>No</span>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default EndGameModal
