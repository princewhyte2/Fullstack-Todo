import express,{Express,Request,Response} from 'express';
import todoRouter from './routes/todo';
const app:Express = express();
app.use(express.json());


app.get('/ping', (_req:Request, res:Response):void => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/todos', todoRouter);

export default app;
