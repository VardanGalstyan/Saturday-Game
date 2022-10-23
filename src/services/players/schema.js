import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const PlayerSchema = new Schema(
  {
    full_name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      sparse: true,
      required: [true, "User email is required!"],
      dropDups: [true, "A user with a similar email address already exists"],
    },
    password: { type: String, required: false },
    isTemp: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

PlayerSchema.pre("save", async function (next) {
  const newPlayer = this;
  const plainPW = newPlayer.password;

  if (newPlayer.isModified("password")) {
    newPlayer.password = await bcrypt.hash(plainPW, 10);
  }
  next();
});

//removes password field from Schema
PlayerSchema.methods.toJSON = function () {
  const playerDocument = this;
  const playerObject = playerDocument.toObject();
  delete playerObject.password;
  delete playerObject.__v;
  return playerObject;
};

PlayerSchema.statics.checkCredentials = async function (email, plainPW) {
  const player = await this.findOne({ email });
  if (player) {
    const isMatch = await bcrypt.compare(plainPW, player.password);
    if (isMatch) return player;
    else return null;
  } else {
    return null;
  }
};

export default model("Player", PlayerSchema);
