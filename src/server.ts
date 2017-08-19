import * as express from 'express';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as graphqlHTTP from 'express-graphql';
import schema from './schema';
import { buildDataLoaders } from './dataloaders';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });



// Connect to MongoDB
(<any>mongoose).Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);

mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Create Express server
const app = express();


// Express configuration
app.set('port', process.env.PORT || 3000);

// GraphQL
app.use('/graphql',  (req, res) => {
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
  console.log(`  App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
