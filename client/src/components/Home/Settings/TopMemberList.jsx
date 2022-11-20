import React from 'react'
import { TiDelete } from 'react-icons/ti'
import { useDispatch } from 'react-redux'
import { fillSessionData } from '../../../Redux/Actions/actions'

function TopMemberList({ player, game, token }) {

    const dispatch = useDispatch()

    const handleRemovePlayer = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/players/join/${game}/${player._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.ok) {
                dispatch(fillSessionData())
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='status-update-item' key={player._id}>
            <span className='mr-1'>{player.full_name}</span>
            <span
                className='status-update-item-icon'
                onClick={handleRemovePlayer}
            >
                <TiDelete />
            </span>
        </div>
    )
}

export default TopMemberList
