import { mongooseInstance, Schema } from './user';

const BranchSchema = new Schema ({
    branch: String,
    hourlyRate: Number
}, {_id: false});

const SubjectSchema = new Schema ({
  subject: String,
  branches: [BranchSchema],
}, {_id: false});

const TutorSchema = new Schema ({
  userId: { 
    type: String, 
    required: true },
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

const Tutors = mongooseInstance.model('tutors', TutorSchema);

export default Tutors;

