import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fillSessionData } from "../../Redux/Actions/actions";
import HistoryItem from "./HistoryItem";
import "./style.css";

function History() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fillSessionData("inactive"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, loading } = useSelector((state) => state.sessions);

  if (loading) {
    return <div className="text-white"> ... Loading </div>;
  }

  return (
    <div className="history">
      <div className="history-wrapper">
        {data
          ?.sort((a, b) => new Date(b.session_date) - new Date(a.session_date))
          .map((game) => (
            <HistoryItem game={game} key={game._id} />
          ))}
      </div>
    </div>
  );
}

export default History;
