import "./style.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ActiveGames from "./ActiveGames";
import NewGame from "./CreateGame/NewGame";
import { useEffect } from "react";
import { fillSessionData } from "../../Redux/Actions/actions";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fillSessionData("active"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, loading } = useSelector((state) => state.sessions);

  if (loading) {
    return <div className="text-white"> ... Loading </div>;
  }

  return (
    <div className="home">
      {data?.map((game) => (
        <ActiveGames key={game._id} game={game} />
      ))}
      <NewGame />
    </div>
  );
}

export default Home;
