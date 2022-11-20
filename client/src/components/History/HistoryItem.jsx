import { useState } from "react";
import { Container } from "react-bootstrap";
import { utcToDateString, utcToWeekDay } from "../../utilities/dates";
import TeamsModal from "../Home/Settings/Modals/TeamsModal";

function HistoryItem({ game }) {
  const [showTeamsModal, setShowTeamsModal] = useState(false);

  return (
    <Container className="active-game">
      <div className="active-game-header">
        <span>{game?.session_name}</span>
        <span>{utcToDateString(game.session_date)}</span>
      </div>
      <div className="active-game-date">
        <span>{utcToWeekDay(game?.session_date)} |</span>
        <span>{game?.session_time}</span>
      </div>
      <div className="active-game-location">
        <span>{game?.session_location}</span>
      </div>
      <div className="history-game-score">
        <span>{game?.teams[0]?.score}</span>
        <span> {game?.teams[1]?.score}</span>
      </div>
      <div className="active-game-created-by">
        <div className="active-game-players">
          <div className="active-game-badges">
            <span>Room | </span>
            <span>{game?.session_room}</span>
          </div>
          <div
            className="active-game-badges-status"
            onClick={() => setShowTeamsModal(true)}>
            <span>Teams</span>
          </div>
        </div>
        <span>Hosted by {game?.host.full_name}</span>
      </div>
      <TeamsModal
        show={showTeamsModal}
        onHide={() => setShowTeamsModal(false)}
        game={game}
      />
    </Container>
  );
}

export default HistoryItem;
