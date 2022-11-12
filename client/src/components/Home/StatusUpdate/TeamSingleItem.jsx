import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

function TeamSingleItem(props) {

    const { player, index } = props

    return (
        <Draggable draggableId={player._id.toString()} index={index}>
            {(provided) => (
                <div
                    className='team-player-item'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <span className='single-player' >
                        {`${index === 0 ? `GK` : index} ${player.full_name}`}
                    </span>
                </div>
            )}
        </Draggable>
    )
}

export default TeamSingleItem
