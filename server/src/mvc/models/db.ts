import mongoose, { connect } from 'mongoose';

export const mongooseInstance = mongoose;

(async function () {
  try {
    await connect('mongodb://127.0.0.1/tutor');
    console.log('Connected to the database');
  } catch (error) {
    console.log('Failed to connect to the database');
  }
})();