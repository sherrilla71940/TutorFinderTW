import mongoose, { connect } from 'mongoose';

export const mongooseInstance = mongoose;

(async function () {
  try {
    await connect('mongodb://127.0.0.1/tutor');
    console.log('Connected to the database');
  } catch (error) {
    console.log('Failed to connect to the database');
  }
})()

export const Schema = mongooseInstance.Schema;

const BranchSchema = new Schema({
  branch: String,
  hourlyRate: Number
}, { _id: false });

const SubjectSchema = new Schema({
  subject: String,
  branches: [BranchSchema],
}, { _id: false });

const TutorSchema = new Schema({
  userId: {
    type: String,
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
  teachingLocation: {
    type: String,
    required: false
  },
  availability: {
    type: Schema.Types.Mixed,
    required: false
  }
});

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  password: { type: String, required: true },
  isComplete: { type: Boolean, required: true },
  age: Number,
  selfIntroduction: String,
  profilePicUrl: String,
  tutorDetails: {
    type: TutorSchema
  }
});

const Users = mongooseInstance.model('users', UserSchema);

export default Users;