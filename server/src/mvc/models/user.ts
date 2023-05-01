import mongoose from 'mongoose';

const Schema = mongoose.Schema; // CLASS

const userSchema = new Schema({
	// DEFINE OUR DATA
	name: String,
	email: String,
  type: String,
  password: String,
  isComplete: Boolean
	}
);

const Users = mongoose.model('users', userSchema); // MAKE A 'TABLE' BASED ON A SCHEMA

export default Users;