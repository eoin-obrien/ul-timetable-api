import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import schema from './schema';
import { buildDataLoaders } from './dataloaders';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });

const port = process.env.NODE_ENV === 'production'
  ? process.env.PORT || 8080
  : process.env.PORT || 3000;

const logFormat = process.env.NODE_ENV === 'production'
  ? 'combined'
  : 'dev';

// Connect to MongoDB
(<any>mongoose).Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Create Express server with CORS support
const app = express().use('*', cors());

// Configure port
app.set('port', port);

// Use Apache combined log format in production
app.use(morgan(logFormat));

// GraphQL
app.use('/graphql', bodyParser.json(), graphqlExpress(() => ({
  schema,
  context: { dataloaders: buildDataLoaders() },
})));

// GraphiQL
app.use('/', graphiqlExpress({
  endpointURL: '/graphql',
}));

// Start Express server
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')} in ${app.get('env')} mode`);
});

module.exports = app;
