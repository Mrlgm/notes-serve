module.exports = {
  port: 3000,
  session: {
    key: 'koa2-note',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/testDB'
}