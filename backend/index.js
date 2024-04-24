const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const helmet = require('helmet');
const { response } = require('./src/utils/formats');
const addRoutes = require('./src/routes');
const app = express();
require('dotenv').config()
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

 app.use(cors({
   origin: function (origin, callback) {
     if (allowedOrigins.includes(origin)) {
       callback(null, origin);
     } else {
       callback(new Error('Not allowed by CORS'));
     }
   },
   credentials: true,
 }));
//app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(helmet());
addRoutes(app)
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json(response(500, {}, {error: 'Something went wrong. Please try again later'}))
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
