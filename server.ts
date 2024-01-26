import app from './app';
import log from './utils/logger';

const port = process.env.PORT || 5050;

const startServer = async () => {
  try {
    await app.listen(port);
    log.info(`Server Started: ${port}`);
  } catch (error) {
    console.error('Error starting server:', error);
    log.info('Server Failed to Start')
  }
};

startServer();

// run server with npx nodemon server.ts