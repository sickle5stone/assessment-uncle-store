#

# assessment-uncle-store

Welcome to the repository for a mock store for Uncle Jack.

Here you will find two folders,

### Backend - NodeJS server serving express API endpoints

### Frontend - React Application with BlueprintJS

#

# Technical Architecture:

- Database: Firebase Firestore

#

- Frontend: ReactJS & BlueprintJS UI Library. Hosted on Firebase Hosting,
  https://uncle-store-76331.web.app/

#

- Backend: Node, Express & Docker server. Running on GCP Google Cloud Run on https://uncle-store-acs4ewqggq-uc.a.run.app

#

Steps to use online:

- Application should run off the frontend instance, and connect to backend via axios requests.

Steps to use locally:

- Backend server can be loaded onto a local docker build, but you will need to setup and configure Firebase credentials to be able to interact with database.

- Backend server can also run in terminal via `npm run start` or built into a docker instance via `docker build . -t backend` and then loaded via `docker run -p 3001:3001 <docker image id>`

- Frontend code can be served via the `build` folder via a static host `http-server` or `serve` packages can use used to load the code locally. You can also run the code locally, simply perform `npm install` and `npm run start`, you will then be able to access the frontend on localhost (default: `localhost:3000`)

Attempted:

- Backend
- Frontend
- GCP Cloud build & Cloud run
- Firebase Hosting & Firestore
- Docker
