import React, { useState } from 'react'
import { VscAdd } from 'react-icons/vsc'
import CreateGameModal from './CreateGameModal'
import { Container } from 'react-bootstrap'

function NewGame(props) {

    const [modalShow, setModalShow] = useState(false)

    return (
        <Container className='create-new-game active-game' >
            <div
                className='d-flex'
                onClick={() => setModalShow(true)}
            >
                <span> New Game </span>
                <span
                    className='ml-2'
                >
                    <VscAdd />
                </span>
            </div>
            <CreateGameModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container >
    )
}

export default NewGame
