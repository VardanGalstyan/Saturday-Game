import React from "react";
import { useSelector } from "react-redux";
import HistoryItem from "./HistoryItem";
import "./style.css";

function History() {
  const history = useSelector((state) => state.history.data);

  return (
    <div className="history">
      <div className="history-wrapper">
        {history
          ?.sort(
            (a, b) =>
              new Date(b.session.session_date) -
              new Date(a.session.session_date)
          )
          .map((item) => (
            <HistoryItem game={item.session} key={item._id} />
          ))}
      </div>
    </div>
  );
}

export default History;
