import {Schema, model, Model, Document, connect} from 'mongoose';

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

// below are TypeScript defintions
// each subject can have different branches. For example subject=English, branch=English Language and Literature (more specific)
type Branch = {
  branch: string,
  hourlyRate: number
}

type Subject = {
  subject: string,
  branches: Branch[]
}

type Location = {
  city: string,
  districts: string[] | 'entire city'
};

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

enum Hour {
  twelveAM = '00:00',
  oneAM = '01:00',
  twoAM = '02:00',
  threeAM = '03:00',
  fourAM = '04:00',
  fiveAM = '05:00',
  sixAM = '06:00',
  sevenAM = '07:00',
  eightAM = '08:00',
  nineAM = '09:00',
  tenAM = '10:00',
  elevenAM = '11:00',
  twelvePM = '12:00',
  onePM = '13:00',
  twoPM = '14:00',
  threePM = '15:00',
  fourPM = '16:00',
  fivePM = '17:00',
  sixPM = '18:00',
  sevenPM = '19:00',
  eightPM = '20:00',
  ninePM = '21:00',
  tenPM = '22:00',
  elevenPM = '23:00'
}

type Timeslot = {
  start: Hour,
  end: Hour
}

type Availability = {
  day: Day
  timeslots: Timeslot[]
}

export interface TutorInterface extends Document{
  name: string,
  profileUrl: string,
  age: number,
  gender: string,
  email: string,
  selfIntroduction?: string,
  remote: boolean,
  subjects: Subject[],
  inPerson: boolean,
  teachingLocations?: Location[]
  availability?: Availability[]
}

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

