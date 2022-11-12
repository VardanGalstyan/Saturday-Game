import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ActiveGameDeleteModal from "./StatusUpdate/Modals/ActiveGameDeleteModal";
import PlayersModal from "./Players/PlayersModal";
import StatusUpdateModal from "./StatusUpdate/Modals/StatusUpdateModal";
import MyTimer from "./MyTimer";

import Join from "./StatusUpdate/Join";
import TeamsModal from "./StatusUpdate/Modals/TeamsModal";
import CreateGameModal from "./CreateGame/CreateGameModal";
import AddTempPlayer from "./StatusUpdate/AddTempPlayer";

function ActiveGames(props) {
  const { game } = props;
  const token = localStorage.getItem("footballAccessToken");

  const join = useSelector((state) => state.user.data);
  const isHost = game.host._id === join._id;

  // S T A T E S
  const [modalShow, setModalShow] = useState(false);
  const [showPlayersModal, setShowPlayersModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showTeamsModal, setShowTeamsModal] = useState(false);
  const [showEditGame, setShowEditGame] = useState(false);

  // D A T E  M E T H O D S

  const date = new Date(game.session_date)
    .toDateString()
    .split(" ")
    .splice(1, 3)
    .join(" ");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = new Date(game.session_date);
  let dayName = days[day.getDay()];

  return (
    <Container className="active-game">
      <div className="active-game-header">
        <span>{game.session_name}</span>
        <span>{date}</span>
      </div>
      <div className="active-game-date">
        <span>{dayName} |</span>
        <span>{game.session_time}</span>
      </div>
      <div className="active-game-location">
        <span>{game.session_location}</span>
      </div>
      {game.playing && <MyTimer game={game} />}
      <div className="d-flex">
        <Join game={game} token={token} join={join} />
        <AddTempPlayer game={game} token={token} />
      </div>
      <div className="active-game-created-by">
        <div className="active-game-players">
          <div
            className="active-game-badges-players"
            onClick={() => setShowPlayersModal(true)}>
            <span>players|</span>
            <span>{game.players.length}</span>
          </div>
          <div className="active-game-badges">
            <span>Room | </span>
            <span>{game.session_room}</span>
          </div>
          {isHost && (
            <div
              className="active-game-badges-status"
              onClick={() => setShowStatusModal(true)}>
              {/* <span>Settings</span> */}
              <span>Settings</span>
            </div>
          )}
          {game.teams.length > 0 && (
            <div
              className="active-game-badges-status"
              onClick={() => setShowTeamsModal(true)}>
              <span>Teams</span>
            </div>
          )}
        </div>
        {isHost && (
          <div className="active-game-buttons mt-2">
            <span onClick={() => setShowEditGame(true)}>Edit</span>
            <span onClick={() => setModalShow(true)}>Delete</span>
          </div>
        )}
        <span>Hosted by {game.host.full_name}</span>
      </div>
      <ActiveGameDeleteModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        game={game}
        token={token}
      />
      <PlayersModal
        show={showPlayersModal}
        onHide={() => setShowPlayersModal(false)}
        players={game && game.players}
      />
      <StatusUpdateModal
        show={showStatusModal}
        onHide={() => setShowStatusModal(false)}
        game={game}
        token={token}
      />
      <TeamsModal
        show={showTeamsModal}
        onHide={() => setShowTeamsModal(false)}
        game={game}
      />
      <CreateGameModal
        show={showEditGame}
        onHide={() => setShowEditGame(false)}
        game={game}
        token={token}
      />
    </Container>
  );
}

export default ActiveGames;
