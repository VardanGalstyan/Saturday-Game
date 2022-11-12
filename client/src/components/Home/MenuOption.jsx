import React from 'react'
import { Container } from 'react-bootstrap'

function MenuOption() {
    return (
        <Container className='menu-option'>
            <div className='menu-option-holder'>
                <span className='menu-option-item'>ACTIVE GAMES</span>
                <span className='menu-option-item'>HISTORY</span>
                <span className='menu-option-item'>LOG</span>
            </div>
        </Container>
    )
}

export default MenuOption
