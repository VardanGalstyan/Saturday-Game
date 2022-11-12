import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { ClockLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux'
import { fillSessionData } from '../../../Redux/Actions/actions'
import { RiErrorWarningFill } from 'react-icons/ri'

function CreateGameModal(props) {

    const dispatch = useDispatch()
    const locations = useSelector(state => state.locations.data)
    const game = props.game
    const method = game ? 'PUT' : 'POST'



    const initialState = {
        session_date: game ? game.session_date.split('T')[0].toString() : '',
        session_time: game ? game.session_time : '',
        session_location: game ? game.session_location : '',
        session_room: game ? game.session_room : '',
    }

    useEffect(() => {
        setData(initialState)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game && game])

    const token = localStorage.getItem('footballAccessToken');
    const [data, setData] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const isLocation = locations.find(location => location.location_name === data.session_location || initialState.session_location)


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await fetch(`${process.env.REACT_APP_URL}/players/me/session/${game ? game._id : ""}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                setLoading(false)
                setError(false)
                setData(initialState)
                dispatch(fillSessionData())
                props.onHide()
            } else {
                setLoading(false)
                setError(true)
            }

        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    const handleClose = () => {
        props.onHide()
        setData(initialState)
    }

    const handleError = () => {
        setError(false)
        setData(initialState)
    }



    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='new-game-modal'
        >
            <Modal.Body>
                <div className='new-game-modal-body'>
                    <Form onSubmit={(e) => handleSubmit(e)} >
                        <Row>
                            <Form.Group xs={6} as={Col}>
                                <Form.Control
                                    type="date"
                                    placeholder="Date"
                                    value={data.session_date}
                                    onChange={(e) => setData({ ...data, session_date: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    type="time"
                                    placeholder="Time"
                                    value={data.session_time}
                                    onChange={(e) => setData({ ...data, session_time: e.target.value })}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group xs={7} as={Col} >
                                <Form.Control
                                    className='location-parent'
                                    type="text"
                                    placeholder="Location"
                                    value={data.session_location}
                                    onChange={(e) => setData({ ...data, session_location: e.target.value })}
                                />
                                {
                                    data.session_location.length > 2 && !isLocation &&
                                    <span className='location-list'>
                                        {locations.filter(item => item.location_name.toLowerCase().includes(data.session_location.toLowerCase())).map((location) => (
                                            <span
                                                onClick={() => setData({ ...data, session_location: location.location_name })}
                                                key={location._id}
                                                className='location-list-item'>
                                                {location.location_name}
                                            </span>
                                        ))}
                                    </span>
                                }
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    type="number"
                                    placeholder="Changing Room"
                                    value={data.session_room}
                                    onChange={(e) => setData({ ...data, session_room: e.target.value })}
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className='form-button'
                    onClick={handleClose}>
                    Close
                </Button>
                {
                    loading ?
                        <ClockLoader color={"#fff"} size={25} /> :
                        error ?
                            <span onClick={handleError} className='boarding-error'><RiErrorWarningFill />Invalid Credentials</span>
                            :
                            <Button onClick={handleSubmit} className='form-button'>
                                {game ? "SAVE" : "NEW GAME"}
                            </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default CreateGameModal
