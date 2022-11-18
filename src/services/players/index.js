import { Router } from "express";
import { JTWAuthenticate } from "../../auth/tools.js";
import PlayerModel from "./schema.js";
import { SessionModel } from "../sessions/schema.js";
import { LocationModel } from "../sessions/schema.js";
import HistoryModel from "../history/schema.js";
import createHttpError from "http-errors";
import { JWTAuthPlayerMiddleWear } from "../../auth/token.js";
import uuid from "react-uuid";

const playerRouter = Router();

// U S E R    A R E A

playerRouter.post("/", async (req, res, next) => {
  try {
    const newPlayer = await PlayerModel.create(req.body);
    const savedPlayer = await newPlayer.save();
    const accessToken = await JTWAuthenticate(savedPlayer);
    res.status(201).send({ savedPlayer, accessToken });
  } catch (error) {
    console.log("problem", error);
    next(error);
  }
});

// Creates a temporary player
playerRouter.post("/temp-player", async (req, res, next) => {
  try {
    const newPlayer = await PlayerModel.create({
      ...req.body,
      isTemp: true,
      email: `temp-player-${uuid()}@saturday-game.am`,
    });
    const savedPlayer = await newPlayer.save();
    res.status(201).send({ savedPlayer });
  } catch (error) {
    console.log("problem", error);
    next(error);
  }
});

playerRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const player = await PlayerModel.checkCredentials(email, password);
    if (player) {
      const accessToken = await JTWAuthenticate(player);
      res.send({ accessToken, id: player._id });
    } else {
      next(createHttpError(401, "credentials are not ok!"));
    }
  } catch (error) {
    next(error);
  }
});

playerRouter.get("/", JWTAuthPlayerMiddleWear, async (req, res, next) => {
  try {
    const players = await PlayerModel.find();
    res.send(players);
  } catch (error) {
    console.log("problem", error);
    next(error);
  }
});

playerRouter.get("/me", JWTAuthPlayerMiddleWear, async (req, res, next) => {
  try {
    const player = await PlayerModel.findById(req.player._id);
    res.send(player);
  } catch (error) {
    console.log("problem", error);
    next(error);
  }
});

playerRouter.put("/me", JWTAuthPlayerMiddleWear, async (req, res, next) => {
  try {
    const updatedPlayer = await PlayerModel.findByIdAndUpdate(
      req.player._id,
      req.body,
      { new: true }
    );
    res.send(updatedPlayer);
  } catch (error) {
    console.log("problem", error);
    next(error);
  }
});

// S E S S I O N  A R E A

playerRouter.post(
  "/me/session",
  JWTAuthPlayerMiddleWear,
  async (req, res, next) => {
    try {
      const historyLength = (await HistoryModel.find()).length;
      const newSession = await SessionModel.create({
        ...req.body,
        session_name: `Game #${historyLength + 1}`,
        host: req.player._id,
        active_game: true,
      });
      const savedSession = await newSession.save();
      const locations = await LocationModel.find({
        location_name: savedSession.session_location,
      });
      if (locations.length === 0) {
        const newLocation = await LocationModel.create({
          location_name: savedSession.session_location.toLowerCase(),
        });
        await newLocation.save();
      }
      res.status(201).send(savedSession);
    } catch (error) {
      console.log("problem", error);
      next(error);
    }
  }
);

playerRouter.put(
  "/me/session/:sessionId",
  JWTAuthPlayerMiddleWear,
  async (req, res, next) => {
    try {
      const sessionId = req.params.sessionId;
      const updatedSession = await SessionModel.findByIdAndUpdate(
        sessionId,
        req.body,
        { new: true }
      );
      res.send(updatedSession);
    } catch (error) {
      console.log("problem", error);
      next(error);
    }
  }
);

playerRouter.delete(
  "/me/:sessionId/remove",
  JWTAuthPlayerMiddleWear,
  async (req, res, next) => {
    try {
      const session = await SessionModel.findByIdAndDelete(
        req.params.sessionId
      );
      if (session) {
        res.send("session deleted");
      } else {
        next(createHttpError(404, "No session with this id has been found!"));
      }
    } catch (error) {}
  }
);

// S E S S I O N  M A N A G E M E N T

playerRouter.put(
  "/join/:sessionId/:playerId",
  JWTAuthPlayerMiddleWear,
  async (req, res, next) => {
    try {
      const { sessionId } = req.params;
      const { playerId } = req.params;

      let session = await SessionModel.findById(sessionId);
      const isPlaying = session.players.some(
        (player) => player.toString() === playerId.toString()
      );

      if (isPlaying) {
        await SessionModel.findByIdAndUpdate(sessionId, {
          $pull: { players: playerId },
        });
        if (
          session.teams.length > 0 &&
          session.teams.some((team) =>
            team.players.some((player) => player._id === playerId)
          )
        ) {
          let selectedUserTeam = session.teams.find((team) =>
            team.players.find((player) => player._id === playerId)
          );
          const filteredTeamMember = selectedUserTeam.players.filter(
            (player) => player._id !== playerId
          );
          selectedUserTeam.players = filteredTeamMember;
          session.teams.splice(
            session.teams.indexOf(parseInt(selectedUserTeam.team_id) - 1),
            1,
            selectedUserTeam
          );
          session.save();
        }
      } else {
        await SessionModel.findByIdAndUpdate(sessionId, {
          $push: { players: playerId },
        });
      }
      res.status(200).send(session);
    } catch (error) {
      console.log("problem", error);
      next(error);
    }
  }
);

playerRouter.put(
  "/confirm/:sessionId",
  JWTAuthPlayerMiddleWear,
  async (req, res, next) => {
    try {
      const { sessionId } = req.params;
      const session = await SessionModel.findById(sessionId);
      if (session.teams.length === 0) {
        await SessionModel.findByIdAndUpdate(sessionId, {
          $push: { teams: req.body },
        });
      } else {
        await SessionModel.findByIdAndUpdate(sessionId, {
          $set: { teams: [] },
        });
      }
      res.status(200).send({ message: "success" });
    } catch (error) {
      console.log("problem", error);
      next(error);
    }
  }
);

playerRouter.put(
  "/play/:sessionId",
  JWTAuthPlayerMiddleWear,
  async (req, res, next) => {
    try {
      const { sessionId } = req.params;
      const session = await SessionModel.findById(sessionId);
      if (session.playing) {
        await SessionModel.findByIdAndUpdate(sessionId, {
          $set: { playing: false },
        });
      } else {
        await SessionModel.findByIdAndUpdate(sessionId, {
          $set: { playing: true },
        });
      }
      res.status(200).send(session);
    } catch (error) {
      console.log("problem", error);
      next(error);
    }
  }
);

playerRouter.put(
  "/overtime/:sessionId",
  JWTAuthPlayerMiddleWear,
  async (req, res, next) => {
    try {
      const { sessionId } = req.params;
      let session = await SessionModel.findById(sessionId);
      if (session.playing) {
        const addedScore = session.teams.map((team) => ({
          ...team,
          score: req.body[`team_${team.team_id}_score`],
        }));
        session.teams = addedScore;
        await SessionModel.findByIdAndUpdate(sessionId, {
          $set: { playing: false, active_game: false },
        });
        const newHistory = await HistoryModel.create({ session: sessionId });
        newHistory.save();
        session.save();
      }
      res.status(200).send({ message: "success" });
    } catch (error) {
      console.log("problem", error);
      next(error);
    }
  }
);

// L O C A T I O N  A R E A

playerRouter.get("/locations", async (req, res, next) => {
  try {
    const locations = await LocationModel.find();
    res.send(locations);
  } catch (error) {
    console.log("problem", error);
    next(error);
  }
});

export default playerRouter;
