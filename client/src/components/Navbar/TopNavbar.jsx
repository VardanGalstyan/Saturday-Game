import './style.css'
import { useState, useEffect, useCallback } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import atob from 'atob'
import EditProfileModal from './EditProfileModal'

function TopNavbar() {

    const token = localStorage.getItem('footballAccessToken')
    const navigate = useNavigate()
    const data = useSelector(state => state.user.data)

    const [showModal, setShowModal] = useState(false)
    const [isExpended, setIsExpended] = useState(false)

    const handleLogout = useCallback(() => {
        localStorage.removeItem('footballAccessToken')
        navigate('/register')
    }, [navigate])

    const isTokenExpired = token => Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000


    useEffect(() => {
        if (token && isTokenExpired(token)) {
            handleLogout()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        isExpended && setIsExpended(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate])


    return (
        <Container className='navbar-container' fluid>
            <Navbar collapseOnSelect expanded={isExpended} expand="lg" bg="dark" variant="dark" fixed='top' onToggle={() => setIsExpended(!isExpended)}>
                <Navbar.Brand onClick={() => navigate(token ? '/' : 'login')}>{token && data.full_name ? `Welcome ${data.full_name}` : `welcome`}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        {token &&
                            <>
                                <Nav.Link onClick={() => navigate('/')}>ACTIVE GAMES</Nav.Link>
                                <Nav.Link onClick={() => navigate('history')}>HISTORY</Nav.Link>
                            </>
                        }
                    </Nav>
                    <Nav>
                        {token ?
                            <>
                                <Nav.Link onClick={() => setShowModal(true)}>Edit Profile</Nav.Link>
                                <Nav.Link onClick={handleLogout}>LOG OUT</Nav.Link>
                            </> :
                            <>
                                <Nav.Link onClick={(e) => navigate('login')}>Sign in</Nav.Link>
                                <Nav.Link onClick={(e) => navigate('register')}>Sign up</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
                <EditProfileModal show={showModal} onHide={() => setShowModal(false)} data={data} />
            </Navbar>
        </Container>
    )
}

export default TopNavbar
