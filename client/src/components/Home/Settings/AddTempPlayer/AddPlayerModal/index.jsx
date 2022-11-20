import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fillSessionData } from "../../../../../Redux/Actions/actions";

function AddPlayerModal({ game, token, ...props }) {
  const dispatch = useDispatch();

  const [playerName, setPlayerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_URL}/players/temp-player`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ full_name: playerName }),
        }
      );
      if (res.ok) {
        const newPlayer = await res.json();
        const response = await fetch(
          `${process.env.REACT_APP_URL}/players/join/${game._id}/${newPlayer?.savedPlayer._id}`,
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
