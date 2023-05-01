import mongoose from 'mongoose';

const Schema = mongoose.Schema; // CLASS

const studentSchema = new Schema({
	// DEFINE OUR DATA
	name: String,
  profilePicUrl: String,
  age: Number,
	email: String,
  selfIntroduction: String
	}
);

const Students = mongoose.model('students', studentSchema); // MAKE A 'TABLE' BASED ON A SCHEMA

export default Students;