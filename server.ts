import app from './app';
import log from './utils/logger';

const port = process.env.PORT || 5050;

const startServer = async () => {
  try {
    await app.listen(port);
    log.info('Server Started');

    console.log(`Server running on port ${port}`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();

// run server with npx nodemon server.ts