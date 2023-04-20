import {Schema, model, connect} from 'mongoose';

// IIFE to connect to mongoDB
(async function () {
  try {
    await connect('mongodb://localhost/tutor');
    console.log('connected to database!');
  } catch (e) {
    console.log(e, 'unsuccessful connection to database')
  }
})()

// each subject can have different branches. For example subject=English, branch=English Language and Literature
type Branch = {
  branch: string,
  hourlyRate: number
}

type Subject = {
  subject: string,
  branches: Branch[]
};

type Subjects = Subject[];

interface TutorInterface {
  name: string,
  profileUrl: string,
  age: number,
  gender: string,
  email: string,
  selfIntroduction?: string,
  remote: boolean,
  inPerson: boolean,
  subjects: Subjects
}

// const SubjectBranchSchema = {

// }

const BranchSchema = new Schema<Branch>({
  branch: String,
  hourlyRate: Number
});

const SubjectSchema = new Schema<Subject>({
  subject: String,
  branches: [BranchSchema]
});

const TutorSchema = new Schema<TutorInterface>({
  name: {
    type: String,
    required: true
  },
  profileUrl: {
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
    required: true
  },
  selfIntroduction: String,
  remote: {
    type: Boolean,
    required: true
  },
  inPerson: {
    type: Boolean,
    required: true
  },
  subjects: [SubjectSchema]
});

const Tutor = model('Tutor', TutorSchema);

export default Tutor;