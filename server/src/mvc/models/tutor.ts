import {Schema, model, Model, Document, connect} from 'mongoose';
import { Branch, Subject, TutorInterface } from '../custom-types/types';

// IIFE to connect to mongoDB
(async function () {
  try {
    // await connect('mongodb://localhost/tutor');
    await connect('mongodb://127.0.0.1/tutor');
    console.log('connected to database!');
  } catch (e) {
    console.log(e, 'unsuccessful connection to database')
  }
})()

// below are mongoose schema using ts types which we will use to create out tutor model

const BranchSchema: Schema = new Schema<Branch>({
    branch: String,
    hourlyRate: Number
}, {_id: false});

const SubjectSchema: Schema = new Schema<Subject>({
  subject: String,
  branches: [BranchSchema],
}, {_id: false});


const TutorSchema: Schema = new Schema<TutorInterface>({
  name: {
    type: String,
    required: true
  },
  profilePicUrl: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  selfIntroduction: String,
  remote: {
    type: Boolean,
    required: true
  },
  subjects: {
    type: [SubjectSchema],
    required: true,
    _id: false
  },
  inPerson: {
    type: Boolean,
    required: true
  },
  teachingLocations: {
    type: Schema.Types.Mixed,
    required: false
  },
  availability: {
    type: Schema.Types.Mixed,
    required: false
  }
});


export const Tutor: Model<TutorInterface> = model<TutorInterface>('Tutor', TutorSchema);

