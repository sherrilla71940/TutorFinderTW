In both the client and server you will need to set up your environmental variables (port and host). The server uses these variables to start the server, and the client uses the variables to make http requests to the correct url. Each env file is located at the root of the folder (client and server).

### Starting the backend API:

Move into the server folder in your terminal and type **npm run serve**. This will compile all your server TypeScript files and start your server on the host and port you specified in your server env file.

### Starting the frontend server:

<div style="display: flex; flex-direction: row; align-items: start; flex-wrap: wrap; gap: 5px">
<img src="./screenshots/tf1.png" width="400px" />
<img src="./screenshots/tf2.png" width="400px" />
<img src="./screenshots/tf3.png" width="300px" />
<img src="./screenshots/tf4.png" width="500px" />
</div>
<br>

# Getting started

Make sure you have Node.js installed or install it. Install the dependencies by running `npm install` command in the `server` and `client` directories.

To start a local development server:

1. create a `.env` file in `server/src` directory and populate it with `PORT` and `SECRET` variables:

```TypeScript
PORT=8080
SECRET="YOUR SECRET KEY"
```

2. run `nodemon index.ts` command from `server/src` directory

To start the frontend server run `npm start` command from the top of the `client` directory.

By default, the frontend connects to `http://localhost:8080`. If you wish to use a different port, edit the `env.ts` file in `client/src` directory.

In the `mocks` directory you will find a `json` file with four user profiles: one student and three tutors. You can start the app and load this file into your MongoDB and copy the `uploads` directory into `server/src` directory to display images for these profiles. `Password1` is the password for all the mock profiles.

# Tech stack

TypeScript on the frontend and the backend

## Front end

[`React`](https://react.dev/), [`Bulma`](https://bulma.io/) (CSS framework)

## Backend

[`Node.js`](https://nodejs.org/en) and [`Express`](https://nodejs.org/en) for creating the server, [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) and [`bcrypt`](https://www.npmjs.com/package/bcrypt) for authentication, [`multer`](https://www.npmjs.com/package/multer) for form data handling, [`MongoDB`](https://www.mongodb.com/) with [`Mongoose`](https://mongoosejs.com/) (ODM library).

# Contributors

This project was intially started by [Aaron Sherill](https://github.com/sherrilla71940) and has been greatly improved through the contributions of [Anton Novak](https://github.com/anton-novak) and [Danny Gold](https://github.com/dgold01). Their valuable contributions and enhancements have been instrumental in elevating the project's development and enhancing its overall quality.
