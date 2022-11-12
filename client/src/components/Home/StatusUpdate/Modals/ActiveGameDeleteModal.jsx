import React from 'react'
import { Modal } from 'react-bootstrap'
import { fillSessionData } from '../../../../Redux/Actions/actions';
import { useDispatch } from 'react-redux';

function ActiveGameDeleteModal(props) {

    const game = props.game
    const token = props.token
    const dispatch = useDispatch()

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/players/me/${game._id}/remove`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                dispatch(fillSessionData())
            }
        } catch (error) {

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
                        ARE YOU SURE YOU WANT TO DELETE THIS GAME?
                    </span>
                    <div className='delete-modal-buttons'>
                        <span onClick={handleDelete}>Yes</span>
                        <span onClick={props.onHide}>No</span>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ActiveGameDeleteModal
