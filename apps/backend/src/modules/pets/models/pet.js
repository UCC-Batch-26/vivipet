import { Schema, model } from 'mongoose';

export const PET_TYPE = {
  DOG: 'dog',
  CAT: 'cat',
  BUNNY: 'bunny',
};

export const PET_MOOD = {
  NEUTRAL: 'neutral',
  HAPPY: 'happy',
  SAD: 'sad',
  HUNGRY: 'hungry',
};

export const PET_ACTIVITY = {
  IDLE: 'idle',
  EATING: 'eating',
  PLAYING: 'playing',
  CLEANING: 'cleaning',
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
      default: 'neutral',
    },
    activity: {
      type: String,
      enum: Object.values(PET_ACTIVITY),
      default: 'idle',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Pet = model('Pet', petSchema);
