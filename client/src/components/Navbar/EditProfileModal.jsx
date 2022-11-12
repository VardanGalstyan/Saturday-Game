import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { ClockLoader } from "react-spinners";
import { Modal, Form, Col, Button } from 'react-bootstrap'
import { RiErrorWarningFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { fillSessionData, fillUserData } from '../../Redux/Actions/actions'



function EditProfileModal(props) {

    const data = props.data
    const token = localStorage.getItem('footballAccessToken');
    const dispatch = useDispatch()


    const initialState = useMemo(() => {
        return {
            full_name: data ? data.full_name : '',
            email: data ? data.email : '',
        }
    }, [data])

    const [editData, setEditData] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setEditData(initialState)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.REACT_APP_URL}/players/me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editData)
            })
            if (response.ok) {
                setIsLoading(false)
                props.onHide()
                dispatch(fillUserData(token))
                dispatch(fillSessionData())
            } else {
                setError(true)
                setIsLoading(false)
            }
        } catch (error) {
            setError(true)
            setIsLoading(false)
            console.log(error)
        }
    }

    const handleClose = useCallback(() => {
        props.onHide()
        setEditData(initialState)
    }, [initialState, props])

    const handleError = useCallback(() => {
        setError(false)
    }, [])


    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='new-game-modal'
        >
            <Modal.Body>
                <div className='new-game-modal-body'>
                    <Form
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Form.Group as={Col}>
                            <Form.Control
                                type="text"
                                placeholder="Full Name"
                                value={editData.full_name}
                                onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}


                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                disabled
                                autoComplete='email'
                                value={editData.email}
                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {
                    isLoading ?
                        <ClockLoader color={"#fff"} size={25} /> :
                        error ?
                            <span onClick={handleError} className='boarding-error'><RiErrorWarningFill />Invalid Credentials</span>
                            :
                            <Button
                                type="submit"
                                className='form-button'
                                onClick={handleSubmit}
                            >
                                Edit
                            </Button>
                }
                <Button
                    className='form-button'
                    onClick={handleClose}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default EditProfileModal
