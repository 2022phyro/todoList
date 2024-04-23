const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const UserRouter = require('./src/routes/user');
const TodoRouter = require('./src/routes/todo');
const app = express();
const allowedOrigins = ['http://localhost:5173', 'http://example.com'];

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
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(helmet());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/auth', UserRouter);
app.use('/todos', TodoRouter)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
