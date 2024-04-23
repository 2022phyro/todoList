const UserRouter = require('./user')
const TodoRouter = require('./todo')


function addRoutes (app) {
  app.use('/api/v1/auth', UserRouter)
  app.use('/api/v1/todos', TodoRouter)
}

module.exports = addRoutes
