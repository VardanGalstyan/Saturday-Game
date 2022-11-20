import { useMemo } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fillSessionData } from "../../../../../Redux/Actions/actions";
import "./index.css";

function AddPlayerModal({ game, token, ...props }) {
  const dispatch = useDispatch();

  const [playerName, setPlayerName] = useState("");
  const [tempPlayerId, setTempPlayerId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const tempPlayers = useSelector((state) =>
    state.players.data.filter((player) => player.isTemp)
  );

  // Filters out joined players and searches for registered temporary players
  const filteredTempPlayers = useMemo(() => {
    return tempPlayers
      .filter(
        (tp) => tp._id !== game.players.find((p) => p._id === tp._id)?._id
      )
      .filter((f) =>
        f.full_name.toLowerCase().includes(playerName.toLowerCase())
      );
  }, [game, tempPlayers, playerName]);

  const isTempPlayer = tempPlayers.find(
    (player) => player.full_name.toLowerCase() === playerName.toLowerCase()
  );

  function handleTempPlayer(player) {
    setTempPlayerId(player._id);
    setPlayerName(player.full_name);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    let newPlayer;
    try {
      setIsLoading(true);
      if (!tempPlayerId) {
        res = await fetch(`${process.env.REACT_APP_URL}/players/temp-player`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ full_name: playerName }),
        });
        newPlayer = await res.json();
      }
      if (newPlayer || tempPlayerId) {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/players/join/${game._id}/${
            tempPlayerId ?? newPlayer?.savedPlayer._id
          }`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          setPlayerName("");
          setIsLoading(false);
          props.onHide();
          dispatch(fillSessionData());
        }
      } else {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      className="player-modal"
      centered>
      <Modal.Body>
        <div className="players-joined">
          <form onSubmit={(e) => handleSubmit(e)} className="d-flex">
            <input
              className="w-100"
              type="text"
              placeholder="Full Name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            {tempPlayers.length > 0 &&
            playerName.length > 1 &&
            !isTempPlayer ? (
              <div className="add-player-modal-dropdown">
                {filteredTempPlayers.map((player) => (
                  <span
                    className="add-player-modal-dropdown-item"
                    key={player._id}
                    onClick={() => handleTempPlayer(player)}>
                    {player.full_name}
                  </span>
                ))}
              </div>
            ) : null}
            <Button className="form-button" type="submit">
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddPlayerModal;
