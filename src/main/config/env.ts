export default {
  mogoUrl: global.__MONGO_URI__ ?? 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT ?? 5050
}
