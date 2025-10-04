import { Schema, model } from 'mongoose';

export const PET_TYPE = {
  DOG: 'dog',
  CAT: 'cat',
  BUNNY: 'bunny',
};

export const PET_MOOD = {
  HAPPY: 'happy',
  SAD: 'sad',
  HUNGRY: 'hungry',
  DIRTY: 'dirty',
};

export const PET_ACTIVITY = {
  IDLE: 'idle',
  FEED: 'feed',
  PLAY: 'play',
  SHOWER: 'shower',
};

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(PET_TYPE),
      required: true,
    },
    mood: {
      type: String,
      enum: Object.values(PET_MOOD),
      default: PET_MOOD.HAPPY,
    },
    activity: {
      type: String,
      enum: Object.values(PET_ACTIVITY),
      default: PET_ACTIVITY.IDLE,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hungry: {
      type: Number,
      default: 0,
    },
    dirty: {
      type: Number,
      default: 0,
    },
    idleSince: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Pet = model('Pet', petSchema);
