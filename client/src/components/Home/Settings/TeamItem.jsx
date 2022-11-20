import React from 'react'
import { Col } from 'react-bootstrap'
import { Droppable } from 'react-beautiful-dnd'
import TeamSingleItem from './TeamSingleItem'

function TeamItem(props) {

    return (
        <Col xs={5} className='team-container'>
            <div className='team-container-header' >
                Team {props.id}
            </div>
            <Droppable droppableId={props.id.toString()} >
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='team-list'
                    >


                        {props.team.map((player, index) => (
                            <TeamSingleItem
                                key={player._id}
                                index={index}
                                player={player}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Col >
    )
}

export default TeamItem
