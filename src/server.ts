import * as express from 'express';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as graphqlHTTP from 'express-graphql';
import * as morgan from 'morgan';
import * as compression from 'compression';
import schema from './schema';
import { buildDataLoaders } from './dataloaders';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });

const port = process.env.PORT || 3000;
const logFormat = process.env.NODE_ENV === 'production'
  ? 'combined'
  : 'dev';

// Connect to MongoDB
(<any>mongoose).Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);

mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Create Express server
const app = express();

// Configure port
app.set('port', port);

// Compress responses
app.use(compression());

// Use Apache combined log format in production
app.use(morgan(logFormat));

// GraphQL
app.use('/graphql', (req, res) => {
  const dataloaders = buildDataLoaders();
  graphqlHTTP({
    schema,
    context:{ dataloaders },
    graphiql: true,
    pretty: true,
  })(req, res);
});

// Start Express server
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')} in ${app.get('env')} mode`);
});

module.exports = app;
