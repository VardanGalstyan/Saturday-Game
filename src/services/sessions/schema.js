import mongoose from "mongoose";

const { Schema, model } = mongoose;

const LocationSchema = new Schema({
  location_name: { type: String, required: true },
});

const SessionSchema = new Schema(
  {
    active_game: { type: Boolean, default: false, required: true },
    session_name: { type: String, required: true },
    session_date: { type: Date, required: true },
    session_time: { type: String, required: true },
    session_location: { type: String, required: true },
    session_duration: { type: String, required: false },
    session_room: { type: String, required: false },
    playing: { type: Boolean, required: false, default: false },
    players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
    host: { type: Schema.Types.ObjectId, ref: "Player" },
    session_status: { type: Boolean, required: false },
    teams: [],
  },
  { timestamps: true }
);

export const SessionModel = model("Session", SessionSchema);
export const LocationModel = model("Location", LocationSchema);
