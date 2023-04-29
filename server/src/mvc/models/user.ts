import mongoose from 'mongoose';

// (async function () {
//   try {
//     await connect('mongodb://127.0.0.1/user');
//     console.log('Connected to the database');
//   } catch (e) {
//     console.log(e, 'Failed to connect to the database')
//   }
// })()

const Schema = mongoose.Schema; // CLASS

const userSchema = new Schema({
	// DEFINE OUR DATA
	name: String,
	email: String,
  type: String,
  password: String
	}
);

const Users = mongoose.model('users', userSchema); // MAKE A 'TABLE' BASED ON A SCHEMA

export default Users;