import app from './app';

const port = process.env.PORT || 5050;

const startServer = async () => {
  try {
    await app.listen(port);
    console.log(`Server running on port ${port}`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();

// run server with npx nodemon server.ts