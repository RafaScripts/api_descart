import express from 'express';
import routes from './routes';
import Database from './database';
import cors from 'cors';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

routes('/api/v1/leads', app);



Database().then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});