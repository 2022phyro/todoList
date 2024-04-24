# DbTodos

An interactive todo application built with postgres express and react.

## Installation
Download the source code for both the frontend and the backend here
```bash
git clone https://github.com/2022phyro/todoList.git
cd todoList
```
It is divided into two directories: **backend** and **frontend**

### Backend
Navigate to the backend directory
```bash
cd backend
```
Add a .env file in the root directory of the backend folder and add the following environment variables
```env .env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_NAME=your_db_name

 ALLOWED_ORIGINS="http://localhost:3000,https://example.com,..." # Add your frontend hosts
 MAX_AGE=86400 # Validity window of the refresh tokens
 JWT_SECRET=your_secret_key
```
Install the dependencies
```bash
npm install
```
Start the server
```bash
npm start
```

### Frontend
Navigate to the frontend directory
```bash
cd frontend
```
Install the dependencies
```bash
npm install
```
Set the base url for the api in the src/config.js files Thisbshould be where the backend is hosted
```javascript src/config.js
export const BASE_URL = 'http://localhost:5000';
```
To preview the server you can run
```bash
npm run dev
```
To host, build the frontend
```bash
npm run build
```
This will create a build folder in the frontend directory which you can host on any server.
