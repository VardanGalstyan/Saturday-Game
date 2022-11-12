import { useState } from "react";
import AddPlayerModal from "./AddPlayerModal";

function AddTempPlayer({ game, token }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="active-game-join mr-3">
      <span onClick={() => setModalShow(true)}>Add a Bro</span>
      <AddPlayerModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        game={game}
        token={token}
      />
    </div>
  );
}

export default AddTempPlayer;
