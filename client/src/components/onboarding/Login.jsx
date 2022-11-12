import React, { useState, useContext } from 'react'
import { UserContext } from '../../App';
import { ClockLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap'
import { RiErrorWarningFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { fillUserData } from '../../Redux/Actions/actions';


function Login() {

    const { token, setToken } = useContext(UserContext);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialState = {
        email: '',
        password: '',
    }

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [player, setPlayer] = useState(initialState);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_URL}/players/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(player)
            })
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('footballAccessToken', data.accessToken);
                setLoading(false)
                setToken(data.accessToken)
                navigate('/')
                dispatch(fillUserData(data.accessToken))
            } else {
                setError(true)
                setLoading(false)
            }

        } catch (error) {
            setError(true)
            console.log(error);
        }
    }

    const handleError = () => {
        setError(false)
        setPlayer(initialState)
    }


    return (
        <div className='sign-in-form'>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} className='form-group-item'>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        autoComplete="email"
                        value={player.email}
                        onChange={(e) => setPlayer({ ...player, email: e.target.value })}
                    />
                </Form.Group>
                <Form.Group as={Col} className='form-group-item'>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        autoComplete='current-password'
                        value={player.password}
                        onChange={(e) => setPlayer({ ...player, password: e.target.value })}
                    />
                </Form.Group>
                <div className='form-button-area'>
                    {
                        loading ?
                            <ClockLoader color={"#fff"} size={25} /> :
                            error ?
                                <span onClick={handleError} className='boarding-error'>
                                    <RiErrorWarningFill />
                                    Invalid Credentials
                                </span>
                                :
                                <Button type="submit" className='form-button' >
                                    SIGN IN
                                </Button>
                    }
                </div>
            </Form>
        </div>
    )
}

export default Login
